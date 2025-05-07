
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertCircle, Upload, Loader2, ArrowLeft } from 'lucide-react';

// Definindo schema de validação do formulário com zod
const profileSchema = z.object({
  full_name: z.string().min(2, "Nome completo é obrigatório"),
  username: z.string().min(3, "Username deve ter pelo menos 3 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Username deve conter apenas letras, números e _"),
  weight: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  age: z.coerce.number().int().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ridingPreferences = [
  { id: 'mtb', label: 'MTB' },
  { id: 'speed', label: 'Speed' },
  { id: 'gravel', label: 'Gravel' },
  { id: 'urban', label: 'Urbano' },
  { id: 'ebike', label: 'E-Bike' },
  { id: 'other', label: 'Outros' }
];

const CompleteProfile: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
      username: '',
      weight: undefined,
      height: undefined,
      age: undefined,
    },
  });

  // Carregar dados do perfil existente
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        if (data) {
          form.reset({
            full_name: data.full_name || '',
            username: data.username || '',
            weight: data.weight || undefined,
            height: data.height || undefined,
            age: data.age || undefined,
          });
          
          setAvatarUrl(data.avatar_url || null);
          
          // Carregar preferências se existirem
          if (data.riding_preferences && Array.isArray(data.riding_preferences)) {
            setSelectedPreferences(data.riding_preferences);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error);
        toast.error('Erro ao carregar dados do perfil');
      }
    };

    fetchProfileData();
  }, [user, form]);

  // Verificar disponibilidade de username
  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) return;
    
    setIsCheckingUsername(true);
    setIsUsernameAvailable(null);
    
    try {
      // Não verificar se o username atual é igual ao que já está salvo
      if (user && form.getValues('username') === username) {
        setIsCheckingUsername(false);
        setIsUsernameAvailable(true);
        return;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .neq('id', user?.id || '')
        .maybeSingle();
        
      if (error) throw error;
      
      setIsUsernameAvailable(!data);
    } catch (error) {
      console.error('Erro ao verificar username:', error);
      toast.error('Erro ao verificar disponibilidade do username');
      setIsUsernameAvailable(null);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  // Gerenciar upload de avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Preview do avatar
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    setAvatarFile(file);
  };

  // Toggle de preferências de pedal
  const togglePreference = (preference: string) => {
    setSelectedPreferences((current) => {
      return current.includes(preference)
        ? current.filter(p => p !== preference)
        : [...current, preference];
    });
  };

  // Enviar formulário
  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      let uploadedAvatarUrl = avatarUrl;
      
      // Upload de avatar se houver um novo arquivo
      if (avatarFile) {
        // Criar um bucket para avatares se não existir
        const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('avatars');
        if (bucketError && bucketError.message.includes('not found')) {
          await supabase.storage.createBucket('avatars', {
            public: true,
            fileSizeLimit: 1024 * 1024 * 2 // 2MB
          });
        }
        
        // Upload do arquivo
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);
          
        if (error) throw error;
        
        // Obter URL pública
        const { data: publicUrl } = supabase.storage
          .from('avatars')
          .getPublicUrl(data.path);
          
        uploadedAvatarUrl = publicUrl.publicUrl;
      }
      
      // Atualizar perfil no Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: values.full_name,
          username: values.username,
          weight: values.weight || null,
          height: values.height || null,
          age: values.age || null,
          avatar_url: uploadedAvatarUrl,
          riding_preferences: selectedPreferences,
          is_profile_complete: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Atualizar avatar_url nos metadados do usuário
      if (uploadedAvatarUrl) {
        await updateUserProfile({ avatar_url: uploadedAvatarUrl });
      }
      
      toast.success('Perfil atualizado com sucesso!');
      navigate('/app/profile');
    } catch (error: any) {
      console.error('Erro ao salvar perfil:', error);
      toast.error(`Erro ao salvar perfil: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Complete Seu Perfil | TrailSynk</title>
      </Helmet>
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="bg-white shadow-md">
          <CardHeader className="text-center border-b pb-6">
            <CardTitle className="text-3xl font-bold text-primary">Complete Seu Perfil TrailSynk</CardTitle>
            <CardDescription className="mt-2">
              Complete seu perfil para obter análises de performance personalizadas e uma experiência adaptada às suas necessidades de ciclismo.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group">
                    <Avatar className="w-24 h-24 border-2 border-primary/30">
                      <AvatarImage src={avatarUrl || ''} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
                        {form.getValues('full_name')?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Upload className="h-6 w-6 text-white" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Clique para fazer upload de uma foto</p>
                </div>

                {/* Nome Completo */}
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                            <Input 
                              placeholder="seu_username" 
                              className="pl-8" 
                              {...field} 
                              onChange={(e) => {
                                field.onChange(e);
                                checkUsernameAvailability(e.target.value);
                              }}
                            />
                          </div>
                        </FormControl>
                        
                        {isCheckingUsername && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Loader2 className="animate-spin h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                        
                        {!isCheckingUsername && isUsernameAvailable === true && field.value && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                        )}
                        
                        {!isCheckingUsername && isUsernameAvailable === false && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          </div>
                        )}
                      </div>
                      {!isCheckingUsername && isUsernameAvailable === false && (
                        <p className="text-sm text-red-500 mt-1">Username já está em uso</p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Peso */}
                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Peso (kg)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="70" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Altura */}
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Altura (cm)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="175" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Idade */}
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Idade</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Preferências de Pedal */}
                <div>
                  <Label className="block mb-2">Preferências de Pedal</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ridingPreferences.map((preference) => (
                      <div key={preference.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={preference.id}
                          checked={selectedPreferences.includes(preference.id)}
                          onCheckedChange={() => togglePreference(preference.id)}
                        />
                        <label
                          htmlFor={preference.id}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {preference.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Placeholder para Análise IA */}
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h4 className="font-medium text-sm text-gray-700">Análise de Performance Baseada nos Dados do Perfil</h4>
                  <p className="text-xs text-gray-500 mt-1">Esta funcionalidade utilizará IA para analisar seu perfil e fornecer recomendações personalizadas (Implementação Futura).</p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting || isCheckingUsername || isUsernameAvailable === false}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      'Salvar Perfil'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="border-t pt-6 flex justify-center">
            <Button
              variant="outline"
              onClick={() => navigate('/app/profile')}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CompleteProfile;

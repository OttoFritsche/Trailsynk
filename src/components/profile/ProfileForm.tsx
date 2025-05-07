
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProfileData } from '@/types/profile';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { RidingPreferenceSelector } from './RidingPreferenceSelector';
import { ProfileAvatar } from './ProfileAvatar';

// Validation schema for the form using zod
const profileSchema = z.object({
  full_name: z.string().min(2, "Nome completo é obrigatório"),
  username: z.string().min(3, "Username deve ter pelo menos 3 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Username deve conter apenas letras, números e _"),
  weight: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  age: z.coerce.number().int().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user?: any;
  initialData: ProfileData;
  onSuccess: () => void;
  onCancel?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  initialData,
  onSuccess,
  onCancel
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialData.avatar_url || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    initialData.riding_preferences || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: initialData.full_name || '',
      username: initialData.username || '',
      weight: initialData.weight,
      height: initialData.height,
      age: initialData.age,
    },
  });

  // Verify username availability
  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) return;
    
    setIsCheckingUsername(true);
    setIsUsernameAvailable(null);
    
    try {
      // Don't check if the username is the same as the currently saved one
      if (user && form.getValues('username') === initialData.username) {
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

  // Handle avatar file changes
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create avatar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    setAvatarFile(file);
  };

  const handleFormSubmit = async (values: ProfileFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, this would call your API to update the profile
      console.log('Form values:', values);
      console.log('Avatar file:', avatarFile);
      console.log('Riding preferences:', selectedPreferences);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Perfil atualizado com sucesso!');
      onSuccess();
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error(`Erro ao salvar perfil: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Avatar Upload */}
        <ProfileAvatar 
          avatarUrl={avatarUrl} 
          fullName={form.getValues('full_name')} 
          onAvatarChange={handleAvatarChange} 
        />

        {/* Full Name */}
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
        
        {/* Physical measurements section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Weight */}
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
          
          {/* Height */}
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
          
          {/* Age */}
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
        
        {/* Riding Preferences */}
        <RidingPreferenceSelector 
          selectedPreferences={selectedPreferences} 
          onTogglePreference={(preference) => {
            setSelectedPreferences((current) => {
              return current.includes(preference)
                ? current.filter(p => p !== preference)
                : [...current, preference];
            });
          }} 
        />
        
        {/* AI Analysis Placeholder */}
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h4 className="font-medium text-sm text-gray-700">Análise de Performance Baseada nos Dados do Perfil</h4>
          <p className="text-xs text-gray-500 mt-1">Esta funcionalidade utilizará IA para analisar seu perfil e fornecer recomendações personalizadas (Implementação Futura).</p>
        </div>
        
        {/* Form buttons */}
        <div className="pt-4 flex justify-between">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            type="button"
          >
            Cancelar
          </Button>
          
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90"
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
  );
};

export default ProfileForm;

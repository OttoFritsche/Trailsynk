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
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Loader2, Plus, Edit, Trash } from 'lucide-react';
import { RidingPreferenceSelector } from './RidingPreferenceSelector';
import { ProfileAvatar } from './ProfileAvatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Bicycle } from '@/types/profile';

// Validation schema for the form using zod
const profileSchema = z.object({
  full_name: z.string().min(2, "Nome completo é obrigatório"),
  username: z.string().min(3, "Username deve ter pelo menos 3 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Username deve conter apenas letras, números e _"),
  weight: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  age: z.coerce.number().optional(),
  ride_frequency: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

// Cycling goals options
const cyclingGoals = [
  { id: "fitness", label: "Melhorar Condicionamento Físico / Resistência" },
  { id: "compete", label: "Competir em Provas / Segmentos" },
  { id: "weight_loss", label: "Perder Peso / Emagrecer" },
  { id: "explore", label: "Explorar Novas Rotas / Lugares" },
  { id: "skills", label: "Melhorar Habilidades Específicas (Subida, Descida, Técnico)" },
  { id: "social", label: "Conectar com Outros Ciclistas / Grupos" },
  { id: "tracking", label: "Rastrear Minhas Atividades" },
  { id: "maintenance", label: "Manter Minhas Bicicletas em Dia" },
  { id: "other", label: "Outro" },
];

// Bicycle types
const bikeTypes = [
  { value: "mtb", label: "Mountain Bike (MTB)" },
  { value: "road", label: "Speed" },
  { value: "gravel", label: "Gravel" },
  { value: "urban", label: "Urbana" },
  { value: "ebike", label: "E-Bike" },
  { value: "other", label: "Outra" }
];

// Ride frequency options
const rideFrequencyOptions = [
  { value: "1-2", label: "1-2 vezes por semana" },
  { value: "3-4", label: "3-4 vezes por semana" },
  { value: "5+", label: "5 ou mais vezes por semana" },
  { value: "occasional", label: "Ocasionalmente" },
];

export interface ProfileFormProps {
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
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    initialData.goals || []
  );
  const [bicycles, setBicycles] = useState<Bicycle[]>(
    initialData.bicycles || []
  );
  const [isBicycleDialogOpen, setIsBicycleDialogOpen] = useState(false);
  const [currentBicycle, setCurrentBicycle] = useState<Bicycle | null>(null);
  const [otherGoal, setOtherGoal] = useState(initialData.other_goal || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: initialData.full_name || '',
      username: initialData.username || '',
      weight: initialData.weight,
      height: initialData.height,
      age: initialData.age,
      ride_frequency: initialData.ride_frequency || '',
    },
  });

  // Bicycle form state
  const [bikeForm, setBikeForm] = useState({
    id: '',
    name: '',
    brand: '',
    model: '',
    type: '',
    image_url: '',
    initial_odometer: 0,
    purchase_date: '',
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

  // Handle bicycle form changes
  const handleBikeFormChange = (field: string, value: any) => {
    setBikeForm({
      ...bikeForm,
      [field]: value
    });
  };

  // Open bicycle form dialog in create mode
  const handleAddBicycle = () => {
    setCurrentBicycle(null);
    setBikeForm({
      id: '',
      name: '',
      brand: '',
      model: '',
      type: '',
      image_url: '',
      initial_odometer: 0,
      purchase_date: '',
    });
    setIsBicycleDialogOpen(true);
  };

  // Open bicycle form dialog in edit mode
  const handleEditBicycle = (bike: Bicycle) => {
    setCurrentBicycle(bike);
    setBikeForm({
      id: bike.id,
      name: bike.name,
      brand: bike.brand || '',
      model: bike.model || '',
      type: bike.type || '',
      image_url: bike.image_url || '',
      initial_odometer: bike.initial_odometer || 0,
      purchase_date: bike.purchase_date || '',
    });
    setIsBicycleDialogOpen(true);
  };

  // Save bicycle and close dialog
  const handleSaveBicycle = () => {
    const newBike: Bicycle = {
      id: bikeForm.id || `bike-${Date.now()}`, // Generate an ID if new
      name: bikeForm.name,
      brand: bikeForm.brand,
      model: bikeForm.model,
      type: bikeForm.type,
      image_url: bikeForm.image_url,
      initial_odometer: bikeForm.initial_odometer,
      purchase_date: bikeForm.purchase_date,
    };

    // Update existing or add new
    if (currentBicycle) {
      setBicycles(prev => prev.map(b => b.id === newBike.id ? newBike : b));
    } else {
      setBicycles(prev => [...prev, newBike]);
    }
    
    setIsBicycleDialogOpen(false);
    toast.success(currentBicycle ? 'Bicicleta atualizada!' : 'Bicicleta adicionada!');
  };

  // Delete a bicycle
  const handleDeleteBicycle = (bikeId: string) => {
    setBicycles(prev => prev.filter(b => b.id !== bikeId));
    toast.success('Bicicleta removida!');
  };

  // Upload avatar to storage
  const uploadAvatarToStorage = async (userId: string, file: File) => {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`avatars/${userId}`, file);
    
    if (error) throw error;
    
    // Get public URL after successful upload
    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(data.path);
    
    return publicUrlData.publicUrl;
  };

  // Update user profile in Supabase
  const updateUserProfile = async (
    userId: string,
    formValues: ProfileFormValues,
    avatarUrl: string | null,
    ridingPreferences: string[],
    goals: string[],
    otherGoal: string,
    bicycles: Bicycle[]
  ) => {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formValues.full_name,
        username: formValues.username,
        weight: formValues.weight,
        height: formValues.height,
        age: formValues.age,
        ride_frequency: formValues.ride_frequency,
        riding_preferences: ridingPreferences,
        goals: goals,
        other_goal: otherGoal,
        bicycles: bicycles,
        is_profile_complete: true, // Set is_profile_complete to true
      })
      .eq('id', userId);
    
    if (error) throw error;
    
    return true; // Return success instead of relying on data
  };

  const onSubmit = async (formValues: ProfileFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Upload avatar if changed
      let avatarUrl = initialData?.avatar_url || null;
      if (avatarFile) {
        avatarUrl = await uploadAvatarToStorage(user.id, avatarFile);
      }
      
      // Update user profile in Supabase
      const success = await updateUserProfile(
        user.id,
        formValues,
        avatarUrl,
        selectedPreferences,
        selectedGoals,
        otherGoal,
        bicycles
      );
      
      if (success) {
        toast.success('Perfil atualizado com sucesso!');
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error('Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erro ao atualizar perfil');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        {/* Ride Frequency - New Field */}
        <FormField
          control={form.control}
          name="ride_frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequência de Pedal</FormLabel>
              <Select 
                value={field.value} 
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Quantas vezes por semana você pedala?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {rideFrequencyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
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

        {/* User Goals - New Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Meus Objetivos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cyclingGoals.map((goal) => (
              <div key={goal.id} className="flex items-start space-x-2">
                <Checkbox
                  id={`goal-${goal.id}`}
                  checked={selectedGoals.includes(goal.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedGoals([...selectedGoals, goal.id]);
                    } else {
                      setSelectedGoals(selectedGoals.filter(g => g !== goal.id));
                    }
                  }}
                />
                <label
                  htmlFor={`goal-${goal.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {goal.label}
                </label>
              </div>
            ))}
          </div>
          
          {selectedGoals.includes('other') && (
            <div className="mt-2">
              <Label htmlFor="other-goal">Especifique outro objetivo:</Label>
              <Input 
                id="other-goal" 
                value={otherGoal} 
                onChange={e => setOtherGoal(e.target.value)}
                className="mt-1"
                placeholder="Descreva seu objetivo..."
              />
            </div>
          )}
        </div>

        {/* Bicycles Section - New */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Minhas Bicicletas</h3>
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={handleAddBicycle}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Adicionar Nova Bicicleta
            </Button>
          </div>

          {bicycles.length === 0 ? (
            <div className="text-center py-8 border border-dashed rounded-md">
              <p className="text-muted-foreground">Você ainda não adicionou nenhuma bicicleta</p>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={handleAddBicycle} 
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar Agora
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {bicycles.map((bike) => (
                <div 
                  key={bike.id} 
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center">
                      {bike.image_url ? (
                        <img 
                          src={bike.image_url} 
                          alt={bike.name} 
                          className="h-full w-full object-cover rounded-md" 
                        />
                      ) : (
                        <div className="text-gray-400">🚲</div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{bike.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {[bike.brand, bike.model].filter(Boolean).join(" • ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditBicycle(bike)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteBicycle(bike.id)}
                      className="text-red-400 hover:text-red-600" 
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* AI Analysis Placeholder */}
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h4 className="font-medium text-sm text-gray-700">Análise de Performance Baseada nos Dados do Perfil e Bicicletas</h4>
          <p className="text-xs text-gray-500 mt-1">
            Seus dados de perfil (Peso, Altura, Idade, Frequência, Preferências, Objetivos) e informações sobre suas bicicletas 
            serão utilizados pela IA para fornecer recomendações personalizadas de treinos, rotas e manutenções.
          </p>
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

      {/* Bicycle Add/Edit Dialog */}
      <Dialog open={isBicycleDialogOpen} onOpenChange={setIsBicycleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{currentBicycle ? 'Editar Bicicleta' : 'Adicionar Nova Bicicleta'}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Bike Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bike-name" className="text-right">
                Nome
              </Label>
              <Input
                id="bike-name"
                value={bikeForm.name}
                onChange={(e) => handleBikeFormChange('name', e.target.value)}
                placeholder="Ex: Minha MTB"
                className="col-span-3"
              />
            </div>
            
            {/* Brand */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bike-brand" className="text-right">
                Marca
              </Label>
              <Input
                id="bike-brand"
                value={bikeForm.brand}
                onChange={(e) => handleBikeFormChange('brand', e.target.value)}
                placeholder="Ex: Scott, Specialized, etc"
                className="col-span-3"
              />
            </div>
            
            {/* Model */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bike-model" className="text-right">
                Modelo
              </Label>
              <Input
                id="bike-model"
                value={bikeForm.model}
                onChange={(e) => handleBikeFormChange('model', e.target.value)}
                placeholder="Ex: Scale, Rockhopper, etc"
                className="col-span-3"
              />
            </div>
            
            {/* Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bike-type" className="text-right">
                Tipo
              </Label>
              <Select 
                value={bikeForm.type} 
                onValueChange={(value) => handleBikeFormChange('type', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo de bicicleta" />
                </SelectTrigger>
                <SelectContent>
                  {bikeTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Initial Odometer */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bike-odometer" className="text-right">
                Odômetro (km)
              </Label>
              <Input
                id="bike-odometer"
                type="number"
                value={bikeForm.initial_odometer}
                onChange={(e) => handleBikeFormChange('initial_odometer', parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="col-span-3"
              />
            </div>
            
            {/* Purchase Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bike-date" className="text-right">
                Data de Compra
              </Label>
              <Input
                id="bike-date"
                type="date"
                value={bikeForm.purchase_date}
                onChange={(e) => handleBikeFormChange('purchase_date', e.target.value)}
                className="col-span-3"
              />
            </div>
            
            {/* Image Upload - Placeholder */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bike-image" className="text-right">
                Imagem
              </Label>
              <div className="col-span-3">
                <div className="h-[100px] w-full border-2 border-dashed rounded-md flex items-center justify-center bg-gray-50">
                  <span className="text-sm text-muted-foreground">Função de upload de imagem em breve</span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSaveBicycle} disabled={!bikeForm.name}>Salvar Bicicleta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default ProfileForm;

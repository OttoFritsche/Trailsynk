
import { supabase } from '@/integrations/supabase/client';
import { NutritionProfile, NutritionSuggestion, NutritionFormValues } from '@/types/nutrition';
import { toast } from 'sonner';

export const nutritionService = {
  // Get the user's nutrition profile
  async getUserNutritionProfile(): Promise<NutritionProfile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Você precisa estar logado para acessar seu perfil nutricional');
        return null;
      }
      
      const { data, error } = await supabase
        .from('user_nutrition_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error) {
        if (error.code === 'PGRST116') {
          // No profile found, not an error
          return null;
        }
        throw error;
      }
      
      return data as NutritionProfile;
    } catch (error) {
      console.error('Erro ao buscar perfil nutricional:', error);
      toast.error('Não foi possível buscar seu perfil nutricional');
      return null;
    }
  },
  
  // Create or update the user's nutrition profile
  async saveNutritionProfile(profileData: NutritionFormValues): Promise<string | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Você precisa estar logado para salvar seu perfil nutricional');
        return null;
      }
      
      // Check if the user already has a profile
      const { data: existingProfile } = await supabase
        .from('user_nutrition_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      let profileId: string;
      
      if (existingProfile) {
        // Update existing profile
        const { data, error } = await supabase
          .from('user_nutrition_profiles')
          .update({
            weight: profileData.weight,
            height: profileData.height,
            age: profileData.age,
            activity_level: profileData.activity_level,
            goals: profileData.goals,
            dietary_restrictions: profileData.dietary_restrictions,
            other_restrictions: profileData.other_restrictions,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProfile.id)
          .select('id')
          .single();
          
        if (error) throw error;
        profileId = data.id;
        
        toast.success('Perfil nutricional atualizado com sucesso');
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from('user_nutrition_profiles')
          .insert([{
            user_id: user.id,
            weight: profileData.weight,
            height: profileData.height,
            age: profileData.age,
            activity_level: profileData.activity_level,
            goals: profileData.goals,
            dietary_restrictions: profileData.dietary_restrictions,
            other_restrictions: profileData.other_restrictions
          }])
          .select('id')
          .single();
          
        if (error) throw error;
        profileId = data.id;
        
        // Update the user's profile with the nutrition profile ID
        await supabase
          .from('profiles')
          .update({ nutrition_profile_id: profileId })
          .eq('id', user.id);
          
        toast.success('Perfil nutricional criado com sucesso');
      }
      
      return profileId;
    } catch (error) {
      console.error('Erro ao salvar perfil nutricional:', error);
      toast.error('Não foi possível salvar seu perfil nutricional');
      return null;
    }
  },
  
  // Get the user's nutrition suggestions
  async getNutritionSuggestions(): Promise<NutritionSuggestion[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Você precisa estar logado para acessar suas sugestões nutricionais');
        return [];
      }
      
      const { data, error } = await supabase
        .from('nutrition_suggestions')
        .select('*')
        .eq('user_id', user.id)
        .order('recommended_at', { ascending: false });
        
      if (error) throw error;
      
      return data as NutritionSuggestion[];
    } catch (error) {
      console.error('Erro ao buscar sugestões nutricionais:', error);
      toast.error('Não foi possível buscar suas sugestões nutricionais');
      return [];
    }
  },
  
  // Get a specific nutrition suggestion
  async getNutritionSuggestionById(suggestionId: string): Promise<NutritionSuggestion | null> {
    try {
      const { data, error } = await supabase
        .from('nutrition_suggestions')
        .select('*')
        .eq('id', suggestionId)
        .single();
        
      if (error) throw error;
      
      return data as NutritionSuggestion;
    } catch (error) {
      console.error('Erro ao buscar detalhe da sugestão nutricional:', error);
      toast.error('Não foi possível carregar os detalhes da sugestão');
      return null;
    }
  },
  
  // Create a new nutrition suggestion
  async createNutritionSuggestion(suggestion: Omit<NutritionSuggestion, 'id' | 'user_id' | 'created_at'>): Promise<string | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Você precisa estar logado para criar uma sugestão nutricional');
        return null;
      }
      
      const { data, error } = await supabase
        .from('nutrition_suggestions')
        .insert([{
          ...suggestion,
          user_id: user.id
        }])
        .select('id')
        .single();
        
      if (error) throw error;
      
      return data.id;
    } catch (error) {
      console.error('Erro ao criar sugestão nutricional:', error);
      toast.error('Não foi possível criar a sugestão nutricional');
      return null;
    }
  },
  
  // Delete a nutrition suggestion
  async deleteNutritionSuggestion(suggestionId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('nutrition_suggestions')
        .delete()
        .eq('id', suggestionId);
        
      if (error) throw error;
      
      toast.success('Sugestão nutricional excluída com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao excluir sugestão nutricional:', error);
      toast.error('Não foi possível excluir a sugestão');
      return false;
    }
  }
};

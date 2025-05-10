
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';
import { UserStats, UserBadge } from '@/types/profile';

/**
 * Serviço para gerenciar operações relacionadas ao usuário
 */
export const userService = {
  /**
   * Busca o perfil do usuário atual
   */
  async getCurrentUserProfile(): Promise<ProfileData | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      return data as ProfileData;
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      return null;
    }
  },
  
  /**
   * Atualiza o perfil do usuário
   */
  async updateUserProfile(profileData: Partial<ProfileData>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return false;
      
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
        
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return false;
    }
  },
  
  /**
   * Busca estatísticas do usuário
   */
  async getUserStats(userId: string): Promise<UserStats | null> {
    try {
      // Aqui você implementaria a lógica para buscar as estatísticas
      // do usuário a partir da sua API ou diretamente do Supabase
      
      // Exemplo de mock para demonstração
      return {
        totalDistance: 235.7,
        totalDuration: 1450,
        highestElevation: 890,
        longestRide: 58.3,
        totalRides: 24,
        weeklyAverage: 42.5,
        totalElevationGain: 4250,
        avgSpeed: 24.8,
        favoriteRouteType: 'Montanha'
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas do usuário:', error);
      return null;
    }
  },
  
  /**
   * Busca badges do usuário
   */
  async getUserBadges(userId: string): Promise<UserBadge[]> {
    try {
      // Implementação real buscaria do banco de dados
      return [];
    } catch (error) {
      console.error('Erro ao buscar badges:', error);
      return [];
    }
  }
};

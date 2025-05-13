
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Route {
  id: string;
  name: string;
  description?: string;
  distance: number;
  elevation: number;
  created_by: string;
  created_at: string;
  difficulty?: 'easy' | 'moderate' | 'hard';
  route_data: any;  // Dados GeoJSON ou similar
  image_url?: string;
  is_public: boolean;
  tags?: string[];
  likes_count?: number;
  route_type?: string;
}

interface RouteFilters {
  distance_min?: number;
  distance_max?: number;
  elevation_min?: number;
  elevation_max?: number;
  difficulty?: string;
  route_type?: string;
}

export const routeService = {
  async getUserRoutes(userId: string): Promise<Route[]> {
    try {
      const { data, error } = await supabase
        .from('routes_data')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Cast the data to Route[] type
      return data as unknown as Route[];
    } catch (error) {
      console.error('Erro ao buscar rotas do usuário:', error);
      toast.error('Não foi possível carregar suas rotas');
      return [];
    }
  },
  
  async getRouteById(routeId: string): Promise<Route | null> {
    try {
      const { data, error } = await supabase
        .from('routes_data')
        .select('*')
        .eq('id', routeId)
        .single();
        
      if (error) throw error;
      
      return data as unknown as Route;
    } catch (error) {
      console.error('Erro ao buscar detalhes da rota:', error);
      toast.error('Não foi possível carregar os detalhes da rota');
      return null;
    }
  },
  
  async createRoute(routeData: Omit<Route, 'id' | 'created_by' | 'created_at'>): Promise<string | null> {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        toast.error('Você precisa estar logado para criar uma rota');
        return null;
      }
      
      const { data, error } = await supabase
        .from('routes_data')
        .insert([
          {
            ...routeData,
            user_id: userData.user.id, // Note: using user_id instead of created_by to match the schema
          }
        ])
        .select('id')
        .single();
        
      if (error) throw error;
      
      toast.success('Rota criada com sucesso!');
      return data.id;
    } catch (error) {
      console.error('Erro ao criar rota:', error);
      toast.error('Não foi possível criar a rota');
      return null;
    }
  },
  
  async updateRoute(routeId: string, updates: Partial<Route>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('routes_data')
        .update(updates)
        .eq('id', routeId);
        
      if (error) throw error;
      
      toast.success('Rota atualizada com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao atualizar rota:', error);
      toast.error('Não foi possível atualizar a rota');
      return false;
    }
  },
  
  async deleteRoute(routeId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('routes_data')
        .delete()
        .eq('id', routeId);
        
      if (error) throw error;
      
      toast.success('Rota excluída com sucesso!');
      return true;
    } catch (error) {
      console.error('Erro ao excluir rota:', error);
      toast.error('Não foi possível excluir a rota');
      return false;
    }
  },
  
  async searchRoutes(query: string, filters?: RouteFilters): Promise<Route[]> {
    try {
      let routesQuery = supabase
        .from('routes_data')
        .select('*')
        .eq('is_public', true)
        .ilike('name', `%${query}%`);
      
      // Aplicar filtros se fornecidos
      if (filters) {
        if (filters.distance_min) {
          routesQuery = routesQuery.gte('distance_km', filters.distance_min);
        }
        
        if (filters.distance_max) {
          routesQuery = routesQuery.lte('distance_km', filters.distance_max);
        }
        
        if (filters.elevation_min) {
          routesQuery = routesQuery.gte('elevation_gain_m', filters.elevation_min);
        }
        
        if (filters.elevation_max) {
          routesQuery = routesQuery.lte('elevation_gain_m', filters.elevation_max);
        }
        
        if (filters.difficulty) {
          routesQuery = routesQuery.eq('difficulty', filters.difficulty);
        }
        
        if (filters.route_type) {
          routesQuery = routesQuery.eq('type', filters.route_type);
        }
      }
      
      const { data, error } = await routesQuery;
        
      if (error) throw error;
      
      return data as unknown as Route[];
    } catch (error) {
      console.error('Erro ao buscar rotas:', error);
      toast.error('Não foi possível pesquisar rotas');
      return [];
    }
  },
  
  async likeRoute(routeId: string): Promise<boolean> {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        toast.error('Você precisa estar logado para curtir uma rota');
        return false;
      }
      
      const { error } = await supabase
        .from('route_likes')
        .insert([
          { 
            route_id: routeId,
            user_id: userData.user.id 
          }
        ]);
        
      if (error) {
        // Se o erro for de violação de chave única, o usuário já curtiu esta rota
        if (error.code === '23505') {
          // Remover o like (unlike)
          const { error: unlikeError } = await supabase
            .from('route_likes')
            .delete()
            .eq('route_id', routeId)
            .eq('user_id', userData.user.id);
            
          if (unlikeError) throw unlikeError;
          
          toast.success('Você descurtiu esta rota');
          return true;
        }
        
        throw error;
      }
      
      toast.success('Você curtiu esta rota');
      return true;
    } catch (error) {
      console.error('Erro ao curtir/descurtir rota:', error);
      toast.error('Não foi possível processar sua ação');
      return false;
    }
  }
};

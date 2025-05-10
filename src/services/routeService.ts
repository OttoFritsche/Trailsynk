
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
      
      // Transform the data to match the Route interface
      const routes: Route[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        distance: item.distance_km || 0,
        elevation: item.elevation_gain_m || 0,
        created_by: item.user_id,
        created_at: item.created_at,
        route_data: item.coordinates,
        is_public: true, // Default to true since there's no is_public field
        route_type: item.type,
      }));
      
      return routes;
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
      
      if (!data) return null;

      // Transform to match Route interface
      const route: Route = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        distance: data.distance_km || 0,
        elevation: data.elevation_gain_m || 0,
        created_by: data.user_id,
        created_at: data.created_at,
        route_data: data.coordinates,
        is_public: true, // Default value
        route_type: data.type,
      };
      
      return route;
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
      
      // Transform from Route to routes_data format
      const routeDataDb = {
        name: routeData.name,
        description: routeData.description,
        distance_km: routeData.distance,
        elevation_gain_m: routeData.elevation,
        coordinates: routeData.route_data,
        type: routeData.route_type,
        user_id: userData.user.id,
      };
      
      const { data, error } = await supabase
        .from('routes_data')
        .insert([routeDataDb])
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
      // Transform from Route to routes_data format
      const updatesDb: any = {};
      
      if (updates.name) updatesDb.name = updates.name;
      if (updates.description !== undefined) updatesDb.description = updates.description;
      if (updates.distance !== undefined) updatesDb.distance_km = updates.distance;
      if (updates.elevation !== undefined) updatesDb.elevation_gain_m = updates.elevation;
      if (updates.route_data !== undefined) updatesDb.coordinates = updates.route_data;
      if (updates.route_type !== undefined) updatesDb.type = updates.route_type;
      
      const { error } = await supabase
        .from('routes_data')
        .update(updatesDb)
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
        
        if (filters.route_type) {
          routesQuery = routesQuery.eq('type', filters.route_type);
        }
      }
      
      const { data, error } = await routesQuery;
        
      if (error) throw error;

      // Transform to match Route interface
      const routes: Route[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || '',
        distance: item.distance_km || 0,
        elevation: item.elevation_gain_m || 0,
        created_by: item.user_id,
        created_at: item.created_at,
        route_data: item.coordinates,
        is_public: true, // Default value
        route_type: item.type,
        difficulty: 'moderate' as 'easy' | 'moderate' | 'hard', // Default value
      }));
      
      return routes;
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
      
      // Note: This is a placeholder implementation since we don't have a route_likes table
      // In a real implementation, this would interact with a route_likes table
      toast.success('Funcionalidade de curtir será implementada em breve');
      return true;
    } catch (error) {
      console.error('Erro ao curtir/descurtir rota:', error);
      toast.error('Não foi possível processar sua ação');
      return false;
    }
  }
};

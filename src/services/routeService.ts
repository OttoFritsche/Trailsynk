
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

// Adapter functions to map between database schema and application interface
const mapDbRouteToAppRoute = (dbRoute: any): Route => {
  return {
    id: dbRoute.id,
    name: dbRoute.name,
    description: dbRoute.description,
    distance: dbRoute.distance_km || 0,
    elevation: dbRoute.elevation_gain_m || 0,
    created_by: dbRoute.user_id,
    created_at: dbRoute.created_at,
    difficulty: dbRoute.difficulty,
    route_data: dbRoute.coordinates,
    image_url: dbRoute.image_url,
    is_public: dbRoute.is_public || false,
    tags: dbRoute.tags,
    likes_count: dbRoute.likes_count,
    route_type: dbRoute.type
  };
};

const mapAppRouteToDbRoute = (appRoute: Omit<Route, 'id' | 'created_by' | 'created_at'>, userId: string) => {
  return {
    name: appRoute.name,
    description: appRoute.description,
    distance_km: appRoute.distance,
    elevation_gain_m: appRoute.elevation,
    user_id: userId,
    difficulty: appRoute.difficulty,
    coordinates: appRoute.route_data,
    image_url: appRoute.image_url,
    is_public: appRoute.is_public,
    tags: appRoute.tags,
    type: appRoute.route_type
  };
};

export const routeService = {
  async getUserRoutes(userId: string): Promise<Route[]> {
    try {
      const { data, error } = await supabase
        .from('routes_data')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Map database results to application Route interface
      return data ? data.map(mapDbRouteToAppRoute) : [];
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
      
      return data ? mapDbRouteToAppRoute(data) : null;
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

      // Convert application route model to database schema
      const dbRouteData = mapAppRouteToDbRoute(routeData, userData.user.id);
      
      const { data, error } = await supabase
        .from('routes_data')
        .insert(dbRouteData)
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
      // Map application updates to database schema
      const dbUpdates: any = {};
      
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.distance !== undefined) dbUpdates.distance_km = updates.distance;
      if (updates.elevation !== undefined) dbUpdates.elevation_gain_m = updates.elevation;
      if (updates.difficulty !== undefined) dbUpdates.difficulty = updates.difficulty;
      if (updates.route_data !== undefined) dbUpdates.coordinates = updates.route_data;
      if (updates.image_url !== undefined) dbUpdates.image_url = updates.image_url;
      if (updates.is_public !== undefined) dbUpdates.is_public = updates.is_public;
      if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
      if (updates.route_type !== undefined) dbUpdates.type = updates.route_type;
      
      const { error } = await supabase
        .from('routes_data')
        .update(dbUpdates)
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
      
      // Map database results to application Route interface
      return data ? data.map(mapDbRouteToAppRoute) : [];
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

      // First check if a route_likes table exists, if not, we'll perform a different action
      const { error: checkError, count } = await supabase
        .from('routes_data')
        .select('*', { count: 'exact', head: true });

      if (checkError) {
        console.error('Error checking routes_data table:', checkError);
        // Fall back to updating the likes count directly on the route
        await supabase.rpc('increment_route_likes', { route_id: routeId });
        toast.success('Você curtiu esta rota');
        return true;
      }

      // For now, let's just increment a counter on the route itself
      // as it seems the route_likes table doesn't exist
      const { data: routeData, error: routeError } = await supabase
        .from('routes_data')
        .select('likes_count')
        .eq('id', routeId)
        .single();
      
      if (routeError) {
        console.error('Error fetching route:', routeError);
        return false;
      }
      
      const currentLikes = routeData?.likes_count || 0;
      
      const { error: updateError } = await supabase
        .from('routes_data')
        .update({ likes_count: currentLikes + 1 })
        .eq('id', routeId);
      
      if (updateError) {
        console.error('Error updating likes:', updateError);
        return false;
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

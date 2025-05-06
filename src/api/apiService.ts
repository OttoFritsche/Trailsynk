
import { Activity } from "@/components/app/ActivityFeedItem";
import { toast } from "sonner";

// URL base do backend configurada por ambiente
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Interface para estatísticas do usuário
export interface UserStats {
  totalDistance: number;
  totalDuration: number;
  highestElevation: number;
  longestRide: number;
}

// Interface para badges do usuário
export interface UserBadge {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  dateEarned: Date;
}

// Classe de erro customizada para API
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Função auxiliar para fazer requisições com tratamento de erros
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  try {
    // Recuperar token de autenticação (exemplo, ajuste conforme sua implementação)
    const authToken = localStorage.getItem('authToken');
    
    const headers = {
      'Content-Type': 'application/json',
      ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
      ...options.headers
    };
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(errorData.message || 'Erro na requisição', response.status);
    }
    
    return response.json();
  } catch (error) {
    // Se for um erro da nossa API, apenas repassamos
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Caso contrário, é um erro de rede ou outro tipo
    console.error('Erro na API:', error);
    throw new ApiError('Falha na comunicação com o servidor', 500);
  }
}

// Serviços de API para atividades
export const activityService = {
  // Buscar atividades para o feed
  getActivities: async (): Promise<Activity[]> => {
    return fetchWithAuth('/api/activities');
  },
  
  // Curtir uma atividade
  likeActivity: async (activityId: string): Promise<{ success: boolean }> => {
    return fetchWithAuth(`/api/activities/${activityId}/like`, { method: 'POST' });
  },
  
  // Adicionar um comentário a uma atividade
  addComment: async (activityId: string, content: string): Promise<{ success: boolean }> => {
    return fetchWithAuth(`/api/activities/${activityId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content })
    });
  }
};

// Serviços de API para perfil de usuário
export const userService = {
  // Buscar estatísticas do usuário
  getUserStats: async (): Promise<UserStats> => {
    return fetchWithAuth('/api/user/stats');
  },
  
  // Buscar badges do usuário
  getUserBadges: async (): Promise<UserBadge[]> => {
    return fetchWithAuth('/api/user/badges');
  },
  
  // Atualizar perfil do usuário
  updateUserProfile: async (profileData: Record<string, any>): Promise<{ success: boolean }> => {
    return fetchWithAuth('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }
};

// Serviços de API para conexão com Strava
export const stravaService = {
  // Iniciar processo de autorização Strava
  initiateStravaAuth: (): void => {
    window.location.href = `${API_URL}/auth/strava`;
  },
  
  // Verificar status da conexão com Strava
  checkStravaConnection: async (): Promise<{ connected: boolean }> => {
    return fetchWithAuth('/api/strava/status');
  },
  
  // Sincronizar atividades com Strava
  syncStravaActivities: async (): Promise<{ success: boolean; count: number }> => {
    try {
      const result = await fetchWithAuth('/api/strava/sync', { method: 'POST' });
      toast.success(`${result.count} atividades sincronizadas com sucesso!`);
      return result;
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao sincronizar atividades');
      }
      throw error;
    }
  }
};

// Serviços de API para rotas
export const routeService = {
  // Buscar rotas do usuário
  getUserRoutes: async (): Promise<any[]> => {
    return fetchWithAuth('/api/routes');
  },
  
  // Buscar detalhes de uma rota específica
  getRouteDetails: async (routeId: string): Promise<any> => {
    return fetchWithAuth(`/api/routes/${routeId}`);
  }
};


import { NutritionProfile, NutritionSuggestion, NutritionFormValues } from '@/types/nutrition';
import { ApiError } from '@/api/apiService';

// Mock data for development
const mockProfile: NutritionProfile = {
  id: '123',
  user_id: 'user123',
  weight: 70,
  height: 175,
  age: 30,
  activity_level: 'moderado',
  goals: ['melhorar_performance', 'saúde_geral'],
  dietary_restrictions: [],
  other_restrictions: null
};

const mockSuggestions: NutritionSuggestion[] = [
  {
    id: '1',
    user_id: 'user123',
    type: 'pre_treino',
    description: 'Batata doce (100g) com frango grelhado (120g) e uma maçã. Consumir 1-2 horas antes do treino.',
    recommended_at: new Date().toISOString(),
    calories: 350,
    proteins: 25,
    carbs: 45,
    fats: 5
  },
  {
    id: '2',
    user_id: 'user123',
    type: 'pos_treino',
    description: 'Shake proteico com banana e aveia. 1 banana média, 30g de aveia, 1 scoop de whey protein, 300ml de leite ou água.',
    recommended_at: new Date().toISOString(),
    calories: 380,
    proteins: 30,
    carbs: 50,
    fats: 5
  },
  {
    id: '3',
    user_id: 'user123',
    type: 'diario',
    description: 'Aumentar consumo de alimentos ricos em ferro como carnes vermelhas magras, feijão e vegetais de folhas verdes escuras para evitar fadiga durante treinos longos.',
    recommended_at: new Date().toISOString()
  }
];

// API service for nutrition
export const nutritionService = {
  // Get user nutrition profile
  getUserNutritionProfile: async (): Promise<NutritionProfile | null> => {
    try {
      // In production, this would be a fetch to the backend
      // return await api.get('/api/v1/nutrition/profile');
      
      // For now, return mock data
      return mockProfile;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        // No profile found
        return null;
      }
      throw error;
    }
  },

  // Save user nutrition profile
  saveNutritionProfile: async (data: NutritionFormValues): Promise<NutritionProfile> => {
    try {
      // In production, this would be a fetch to the backend
      // return await api.put('/api/v1/nutrition/profile', data);
      
      // For now, return updated mock data
      const updatedProfile = {
        ...mockProfile,
        ...data,
        id: mockProfile.id,
        user_id: mockProfile.user_id,
        updated_at: new Date().toISOString()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return updatedProfile;
    } catch (error) {
      console.error('Error saving nutrition profile:', error);
      throw error;
    }
  },

  // Get nutrition suggestions
  getNutritionSuggestions: async (): Promise<NutritionSuggestion[]> => {
    try {
      // In production, this would be a fetch to the backend
      // return await api.get('/api/v1/nutrition/suggestions');
      
      // For now, return mock data
      return mockSuggestions;
    } catch (error) {
      console.error('Error fetching nutrition suggestions:', error);
      throw error;
    }
  },

  // Create nutrition suggestion
  createNutritionSuggestion: async (data: Partial<NutritionSuggestion>): Promise<NutritionSuggestion> => {
    try {
      // In production, this would be a fetch to the backend
      // return await api.post('/api/v1/nutrition/suggestions', data);
      
      // For now, return mock created suggestion
      const newSuggestion = {
        id: `new-${Date.now()}`,
        user_id: 'user123',
        type: data.type || 'diario',
        description: data.description || '',
        recommended_at: new Date().toISOString(),
        calories: data.calories,
        proteins: data.proteins,
        carbs: data.carbs,
        fats: data.fats
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return newSuggestion as NutritionSuggestion;
    } catch (error) {
      console.error('Error creating nutrition suggestion:', error);
      throw error;
    }
  },

  // Delete nutrition suggestion
  deleteNutritionSuggestion: async (id: string): Promise<void> => {
    try {
      // In production, this would be a fetch to the backend
      // await api.delete(`/api/v1/nutrition/suggestions/${id}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // No return value needed
    } catch (error) {
      console.error('Error deleting nutrition suggestion:', error);
      throw error;
    }
  }
};

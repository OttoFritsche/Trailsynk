
export interface NutritionProfile {
  id: string;
  user_id: string;
  weight: number | null;
  height: number | null;
  age: number | null;
  activity_level: 'sedentário' | 'leve' | 'moderado' | 'ativo' | 'muito ativo' | null;
  goals: string[];
  dietary_restrictions: string[];
  other_restrictions: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface NutritionSuggestion {
  id: string;
  user_id: string;
  activity_id?: string;
  type: 'pre_treino' | 'durante_treino' | 'pos_treino' | 'diario';
  description: string;
  recommended_at: string;
  calories?: number;
  proteins?: number;
  carbs?: number;
  fats?: number;
  created_at?: string;
}

export type ActivityLevel = 'sedentário' | 'leve' | 'moderado' | 'ativo' | 'muito ativo';
export type NutritionGoal = 'perder_peso' | 'ganhar_massa' | 'melhorar_performance' | 'saúde_geral';
export type DietaryRestriction = 'vegetariano' | 'vegano' | 'sem_gluten' | 'sem_lactose' | 'outro';
export type MealType = 'pre_treino' | 'durante_treino' | 'pos_treino' | 'diario';

export interface NutritionFormValues {
  weight: number | null;
  height: number | null;
  age: number | null;
  activity_level: ActivityLevel | null;
  goals: NutritionGoal[];
  dietary_restrictions: DietaryRestriction[];
  other_restrictions: string | null;
}

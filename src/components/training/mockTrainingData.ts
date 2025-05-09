
// Mock data for activity feed and training analytics

export interface Activity {
  id: string;
  title: string;
  date: string;
  distance: number; // in km
  duration: number; // in minutes
  elevation: number; // in meters
  type: 'ride' | 'run' | 'hike' | 'other';
  aiInsight?: string;
  intensity: 'low' | 'medium' | 'high';
  imageUrl?: string;
}

export interface MonthSummary {
  month: string;
  distance: number;
  duration: number;
  activities: number;
  elevation: number;
}

export interface WeeklySummary {
  week: string;
  distance: number;
  duration: number;
  activities: number;
  elevation: number;
  daysActive: number[];
  intensityByDay: ('none' | 'low' | 'medium' | 'high')[];
}

export interface PowerCurve {
  timeInSeconds: number;
  power: number;
}

export interface TrainingMetrics {
  trainingLoad: number;
  recovery: number;
  readiness: 'low' | 'medium' | 'high';
  trend: 'increasing' | 'decreasing' | 'stable';
}

// Mock activities - expanded with more variety
export const mockActivities: Activity[] = [
  {
    id: '1',
    title: 'Pedal no Parque',
    date: '10 Mai 2024',
    distance: 25.3,
    duration: 95,
    elevation: 320,
    type: 'ride',
    intensity: 'medium',
    aiInsight: 'Bom ritmo constante. Seu tempo em subidas melhorou 5% em comparação com atividades similares.',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Subida da Montanha',
    date: '08 Mai 2024',
    distance: 18.7,
    duration: 120,
    elevation: 650,
    type: 'ride',
    intensity: 'high',
    aiInsight: 'Esforço intenso! Esta atividade contribuiu significativamente para sua carga de treinamento semanal.'
  },
  {
    id: '3',
    title: 'Volta na Lagoa',
    date: '05 Mai 2024',
    distance: 15.2,
    duration: 45,
    elevation: 80,
    type: 'ride',
    intensity: 'low',
    aiInsight: 'Bom treino de recuperação. Seu ritmo cardíaco se manteve na zona ideal para recuperação ativa.'
  },
  {
    id: '4',
    title: 'Trilha da Cachoeira',
    date: '01 Mai 2024',
    distance: 22.5,
    duration: 115,
    elevation: 480,
    type: 'ride',
    intensity: 'medium',
    aiInsight: 'Você obteve um PR neste segmento! Sua técnica em descidas está melhorando.',
    imageUrl: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Corrida no Parque',
    date: '28 Abr 2024',
    distance: 8.2,
    duration: 45,
    elevation: 120,
    type: 'run',
    intensity: 'medium',
    aiInsight: 'Bom cross-training. A variação de esportes está contribuindo para seu condicionamento geral.'
  },
  {
    id: '6',
    title: 'Grande Travessia',
    date: '25 Abr 2024',
    distance: 65.3,
    duration: 240,
    elevation: 920,
    type: 'ride',
    intensity: 'high',
    aiInsight: 'Recorde pessoal de distância! Seu ritmo se manteve consistente mesmo nas últimas horas.',
    imageUrl: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=800&h=300&fit=crop'
  },
  {
    id: '7',
    title: 'Trilha do Sol',
    date: '20 Abr 2024',
    distance: 18.5,
    duration: 95,
    elevation: 350,
    type: 'ride',
    intensity: 'medium'
  },
  {
    id: '8',
    title: 'Caminhada na Montanha',
    date: '18 Abr 2024',
    distance: 12.3,
    duration: 180,
    elevation: 750,
    type: 'hike',
    intensity: 'medium',
    aiInsight: 'Bom treino complementar para fortalecer os músculos estabilizadores.',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=300&fit=crop'
  },
  // Adicionando mais 10 atividades
  {
    id: '9',
    title: 'Circuito Urbano',
    date: '15 Abr 2024',
    distance: 32.5,
    duration: 110,
    elevation: 280,
    type: 'ride',
    intensity: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=300&fit=crop'
  },
  {
    id: '10',
    title: 'Treino Intervalado',
    date: '12 Abr 2024',
    distance: 15.8,
    duration: 60,
    elevation: 150,
    type: 'ride',
    intensity: 'high',
    aiInsight: 'Seus intervalos de alta intensidade estão melhorando. Sua potência máxima aumentou 3% desde o último treino.'
  },
  {
    id: '11',
    title: 'Corrida Matinal',
    date: '10 Abr 2024',
    distance: 10.5,
    duration: 55,
    elevation: 90,
    type: 'run',
    intensity: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=300&fit=crop'
  },
  {
    id: '12',
    title: 'Trilha do Vale',
    date: '08 Abr 2024',
    distance: 28.3,
    duration: 150,
    elevation: 520,
    type: 'ride',
    intensity: 'medium',
    aiInsight: 'Sua cadência nas seções técnicas melhorou significativamente comparado às trilhas anteriores.'
  },
  {
    id: '13',
    title: 'Caminhada Exploratória',
    date: '05 Abr 2024',
    distance: 14.8,
    duration: 210,
    elevation: 430,
    type: 'hike',
    intensity: 'low',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=300&fit=crop'
  },
  {
    id: '14',
    title: 'Pedal Noturno',
    date: '03 Abr 2024',
    distance: 22.7,
    duration: 80,
    elevation: 130,
    type: 'ride',
    intensity: 'medium',
    aiInsight: 'Bom ritmo para um pedal noturno. Lembre-se de ajustar o selim para melhorar sua postura durante longos períodos.'
  },
  {
    id: '15',
    title: 'Circuito de Obstáculos',
    date: '01 Abr 2024',
    distance: 5.2,
    duration: 40,
    elevation: 80,
    type: 'other',
    intensity: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1526804823857-3f6cfe00c3e5?w=800&h=300&fit=crop'
  },
  {
    id: '16',
    title: 'Maratona de Mountain Bike',
    date: '28 Mar 2024',
    distance: 58.7,
    duration: 285,
    elevation: 1250,
    type: 'ride',
    intensity: 'high',
    aiInsight: 'Excelente desempenho! Você manteve boa hidratação e nutrição durante todo o percurso.',
    imageUrl: 'https://images.unsplash.com/photo-1553007830-89e37b527205?w=800&h=300&fit=crop'
  },
  {
    id: '17',
    title: 'Corrida na Praia',
    date: '25 Mar 2024',
    distance: 7.5,
    duration: 40,
    elevation: 20,
    type: 'run',
    intensity: 'medium'
  },
  {
    id: '18',
    title: 'Pedal Beneficente',
    date: '23 Mar 2024',
    distance: 45.2,
    duration: 180,
    elevation: 380,
    type: 'ride',
    intensity: 'medium',
    aiInsight: 'Você manteve um ritmo social constante, ideal para eventos em grupo.',
    imageUrl: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=800&h=300&fit=crop'
  }
];

// Mock monthly summaries
export const mockMonthlySummaries: MonthSummary[] = [
  { month: 'Janeiro', distance: 320, duration: 1200, activities: 12, elevation: 4500 },
  { month: 'Fevereiro', distance: 280, duration: 1050, activities: 10, elevation: 3800 },
  { month: 'Março', distance: 410, duration: 1450, activities: 15, elevation: 5200 },
  { month: 'Abril', distance: 380, duration: 1350, activities: 14, elevation: 4900 },
  { month: 'Maio', distance: 120, duration: 450, activities: 5, elevation: 1800 },
];

// Mock yearly summary
export const mockYearlySummary = {
  totalDistance: 1510,
  totalDuration: 5500,
  totalActivities: 56,
  totalElevation: 20200,
};

// Mock weekly summaries
export const mockWeeklySummaries: WeeklySummary[] = [
  {
    week: '1-7 Mai',
    distance: 81.7,
    duration: 375,
    activities: 4,
    elevation: 1530,
    daysActive: [1, 3, 5, 6],
    intensityByDay: ['medium', 'none', 'high', 'none', 'low', 'medium', 'none']
  },
  {
    week: '24-30 Abr',
    distance: 92.3,
    duration: 390,
    activities: 3,
    elevation: 1250,
    daysActive: [0, 3, 6],
    intensityByDay: ['high', 'none', 'none', 'medium', 'none', 'none', 'low']
  },
  {
    week: '17-23 Abr',
    distance: 68.5,
    duration: 320,
    activities: 4,
    elevation: 1450,
    daysActive: [0, 2, 4, 5],
    intensityByDay: ['medium', 'none', 'medium', 'none', 'high', 'low', 'none']
  },
  {
    week: '10-16 Abr',
    distance: 74.2,
    duration: 345,
    activities: 5,
    elevation: 1380,
    daysActive: [1, 2, 4, 5, 6],
    intensityByDay: ['none', 'medium', 'high', 'none', 'low', 'medium', 'low']
  },
  {
    week: '3-9 Abr',
    distance: 58.9,
    duration: 290,
    activities: 3,
    elevation: 1120,
    daysActive: [0, 3, 5],
    intensityByDay: ['medium', 'none', 'none', 'high', 'none', 'low', 'none']
  }
];

// Mock power curve data
export const mockPowerCurve: PowerCurve[] = [
  { timeInSeconds: 5, power: 1050 },
  { timeInSeconds: 10, power: 950 },
  { timeInSeconds: 30, power: 780 },
  { timeInSeconds: 60, power: 650 },
  { timeInSeconds: 120, power: 520 },
  { timeInSeconds: 300, power: 380 },
  { timeInSeconds: 600, power: 320 },
  { timeInSeconds: 1200, power: 280 },
  { timeInSeconds: 1800, power: 250 },
  { timeInSeconds: 3600, power: 220 }
];

// Mock training metrics
export const mockTrainingMetrics: TrainingMetrics = {
  trainingLoad: 85,
  recovery: 70,
  readiness: 'medium',
  trend: 'increasing'
};

// Mock training metrics history
export const mockTrainingMetricsHistory = [
  { date: '01 Abr', load: 45, recovery: 90, readiness: 'high' },
  { date: '08 Abr', load: 65, recovery: 75, readiness: 'medium' },
  { date: '15 Abr', load: 80, recovery: 60, readiness: 'medium' },
  { date: '22 Abr', load: 70, recovery: 80, readiness: 'high' },
  { date: '29 Abr', load: 90, recovery: 65, readiness: 'medium' },
  { date: '06 Mai', load: 85, recovery: 70, readiness: 'medium' },
  { date: '13 Mai', load: 75, recovery: 85, readiness: 'high' },
  { date: '20 Mai', load: 95, recovery: 60, readiness: 'low' },
];

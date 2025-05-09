
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
  // Adicionando mais atividades
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
  },
  {
    id: '19',
    title: 'Volta ao Lago',
    date: '18 Mar 2024',
    distance: 36.7,
    duration: 145,
    elevation: 290,
    type: 'ride',
    intensity: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1475666675596-cca2035b3d79?w=800&h=300&fit=crop'
  },
  {
    id: '20',
    title: 'Trilha da Serra Escura',
    date: '15 Mar 2024',
    distance: 25.3,
    duration: 160,
    elevation: 830,
    type: 'ride',
    intensity: 'high',
    aiInsight: 'Sua habilidade técnica em descidas está melhorando, mas mantenha o foco na postura para evitar fadiga.'
  },
  {
    id: '21',
    title: 'Treino de Recuperação',
    date: '12 Mar 2024',
    distance: 12.5,
    duration: 55,
    elevation: 85,
    type: 'ride',
    intensity: 'low',
    aiInsight: 'Excelente treino de recuperação após a competição. Sua frequência cardíaca se manteve controlada.'
  },
  {
    id: '22',
    title: 'Competição Regional MTB',
    date: '10 Mar 2024',
    distance: 42.8,
    duration: 185,
    elevation: 980,
    type: 'ride',
    intensity: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&h=300&fit=crop'
  },
  {
    id: '23',
    title: 'Hiking com Amigos',
    date: '05 Mar 2024',
    distance: 18.2,
    duration: 240,
    elevation: 580,
    type: 'hike',
    intensity: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=300&fit=crop'
  },
  {
    id: '24',
    title: 'Treino de Sprints',
    date: '02 Mar 2024',
    distance: 8.5,
    duration: 45,
    elevation: 60,
    type: 'ride',
    intensity: 'high',
    aiInsight: 'Seus sprints estão mais potentes! A potência média aumentou 8% comparada ao último treino similar.'
  },
  {
    id: '25',
    title: 'Percurso Costeiro',
    date: '28 Fev 2024',
    distance: 42.3,
    duration: 150,
    elevation: 260,
    type: 'ride',
    intensity: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&h=300&fit=crop'
  },
  {
    id: '26',
    title: 'Corrida Intervalar',
    date: '25 Fev 2024',
    distance: 7.2,
    duration: 40,
    elevation: 45,
    type: 'run',
    intensity: 'high',
    aiInsight: 'Excelente progresso no treino de corrida. Seu ritmo em intervalos curtos melhorou 5% desde o mês passado.'
  },
  {
    id: '27',
    title: 'Pedal Rural',
    date: '22 Fev 2024',
    distance: 53.7,
    duration: 205,
    elevation: 440,
    type: 'ride',
    intensity: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1505672678657-cc7037095e60?w=800&h=300&fit=crop'
  },
  {
    id: '28',
    title: 'Caminhada Urbana',
    date: '18 Fev 2024',
    distance: 6.3,
    duration: 80,
    elevation: 90,
    type: 'hike',
    intensity: 'low'
  }
];

// Mock monthly summaries for 2023 and 2024
export const mockMonthlySummaries: MonthSummary[] = [
  // 2024
  { month: 'Janeiro 2024', distance: 450, duration: 1650, activities: 16, elevation: 6200 },
  { month: 'Fevereiro 2024', distance: 420, duration: 1580, activities: 14, elevation: 5800 },
  { month: 'Março 2024', distance: 520, duration: 1850, activities: 18, elevation: 7100 },
  { month: 'Abril 2024', distance: 480, duration: 1720, activities: 16, elevation: 6500 },
  { month: 'Maio 2024', distance: 180, duration: 650, activities: 6, elevation: 2400 },
  { month: 'Junho 2024', distance: 0, duration: 0, activities: 0, elevation: 0 },
  { month: 'Julho 2024', distance: 0, duration: 0, activities: 0, elevation: 0 },
  { month: 'Agosto 2024', distance: 0, duration: 0, activities: 0, elevation: 0 },
  { month: 'Setembro 2024', distance: 0, duration: 0, activities: 0, elevation: 0 },
  { month: 'Outubro 2024', distance: 0, duration: 0, activities: 0, elevation: 0 },
  { month: 'Novembro 2024', distance: 0, duration: 0, activities: 0, elevation: 0 },
  { month: 'Dezembro 2024', distance: 0, duration: 0, activities: 0, elevation: 0 },
  
  // 2023
  { month: 'Janeiro 2023', distance: 320, duration: 1200, activities: 12, elevation: 4500 },
  { month: 'Fevereiro 2023', distance: 280, duration: 1050, activities: 10, elevation: 3800 },
  { month: 'Março 2023', distance: 410, duration: 1450, activities: 15, elevation: 5200 },
  { month: 'Abril 2023', distance: 380, duration: 1350, activities: 14, elevation: 4900 },
  { month: 'Maio 2023', distance: 440, duration: 1550, activities: 16, elevation: 5700 },
  { month: 'Junho 2023', distance: 460, duration: 1650, activities: 15, elevation: 6200 },
  { month: 'Julho 2023', distance: 520, duration: 1850, activities: 18, elevation: 7300 },
  { month: 'Agosto 2023', distance: 490, duration: 1750, activities: 17, elevation: 6800 },
  { month: 'Setembro 2023', distance: 430, duration: 1550, activities: 15, elevation: 5900 },
  { month: 'Outubro 2023', distance: 390, duration: 1400, activities: 14, elevation: 5300 },
  { month: 'Novembro 2023', distance: 360, duration: 1300, activities: 13, elevation: 4800 },
  { month: 'Dezembro 2023', distance: 400, duration: 1450, activities: 14, elevation: 5500 }
];

// Mock yearly summary
export const mockYearlySummary = {
  totalDistance: 2050,
  totalDuration: 7450,
  totalActivities: 70,
  totalElevation: 28000,
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
  },
  {
    week: '26 Mar-2 Abr',
    distance: 64.5,
    duration: 320,
    activities: 4,
    elevation: 1350,
    daysActive: [0, 2, 5, 6],
    intensityByDay: ['medium', 'none', 'high', 'none', 'none', 'low', 'medium']
  },
  {
    week: '19-25 Mar',
    distance: 89.2,
    duration: 365,
    activities: 5,
    elevation: 1680,
    daysActive: [1, 2, 3, 5, 6],
    intensityByDay: ['none', 'medium', 'high', 'medium', 'none', 'low', 'high']
  },
  {
    week: '12-18 Mar',
    distance: 80.3,
    duration: 400,
    activities: 4,
    elevation: 1890,
    daysActive: [0, 2, 4, 6],
    intensityByDay: ['high', 'none', 'medium', 'none', 'high', 'none', 'medium']
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
  { date: '01 Jan', load: 35, recovery: 95, readiness: 'high' },
  { date: '15 Jan', load: 45, recovery: 90, readiness: 'high' },
  { date: '01 Fev', load: 60, recovery: 85, readiness: 'high' },
  { date: '15 Fev', load: 70, recovery: 75, readiness: 'medium' },
  { date: '01 Mar', load: 75, recovery: 70, readiness: 'medium' },
  { date: '15 Mar', load: 80, recovery: 65, readiness: 'medium' },
  { date: '01 Abr', load: 85, recovery: 60, readiness: 'medium' },
  { date: '15 Abr', load: 90, recovery: 55, readiness: 'low' },
  { date: '01 Mai', load: 85, recovery: 70, readiness: 'medium' },
  { date: '15 Mai', load: 75, recovery: 85, readiness: 'high' },
];

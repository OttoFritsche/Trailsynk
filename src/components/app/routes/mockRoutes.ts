
export interface Route {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  type: string;
  favorite: boolean;
  imageUrl?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  estimatedTime?: number; // in minutes
  createdAt?: string;
}

export const mockRoutes: Route[] = [
  {
    id: '1',
    name: 'Circuito da Lagoa',
    distance: 15.8,
    elevation: 125,
    type: 'road',
    favorite: true,
    imageUrl: 'https://images.unsplash.com/photo-1528184039930-9f35e50bbf05?w=800&h=400&fit=crop',
    difficulty: 'easy',
    estimatedTime: 60,
    createdAt: '2024-04-10'
  },
  {
    id: '2',
    name: 'Trilha da Serra',
    distance: 22.3,
    elevation: 450,
    type: 'mountain',
    favorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=800&h=400&fit=crop',
    difficulty: 'hard',
    estimatedTime: 120,
    createdAt: '2024-03-22'
  },
  {
    id: '3',
    name: 'Volta ao Parque',
    distance: 8.5,
    elevation: 65,
    type: 'urban',
    favorite: true,
    imageUrl: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&h=400&fit=crop',
    difficulty: 'easy',
    estimatedTime: 35,
    createdAt: '2024-04-28'
  },
  {
    id: '4',
    name: 'Travessia Litoral',
    distance: 35.2,
    elevation: 210,
    type: 'road',
    favorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=400&fit=crop',
    difficulty: 'medium',
    estimatedTime: 150,
    createdAt: '2024-03-12'
  },
  {
    id: '5',
    name: 'Circuito das Cachoeiras',
    distance: 18.7,
    elevation: 520,
    type: 'mountain',
    favorite: true,
    imageUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=400&fit=crop',
    difficulty: 'hard',
    estimatedTime: 110,
    createdAt: '2024-02-15'
  },
  // Adicionando mais rotas com variedade
  {
    id: '6',
    name: 'Circuito Urbano Centro',
    distance: 12.4,
    elevation: 85,
    type: 'urban',
    favorite: false,
    difficulty: 'easy',
    estimatedTime: 45,
    createdAt: '2024-04-05'
  },
  {
    id: '7',
    name: 'Grande Travessia da Serra',
    distance: 48.5,
    elevation: 1250,
    type: 'mountain',
    favorite: true,
    imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=400&fit=crop',
    difficulty: 'hard',
    estimatedTime: 240,
    createdAt: '2023-12-10'
  },
  {
    id: '8',
    name: 'Beira-Mar Sul',
    distance: 22.8,
    elevation: 45,
    type: 'road',
    favorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=400&fit=crop',
    difficulty: 'easy',
    estimatedTime: 75,
    createdAt: '2024-01-20'
  },
  {
    id: '9',
    name: 'Trilha dos Picos',
    distance: 15.7,
    elevation: 680,
    type: 'mountain',
    favorite: true,
    difficulty: 'hard',
    estimatedTime: 105,
    createdAt: '2024-03-08'
  },
  {
    id: '10',
    name: 'Contorno da Represa',
    distance: 28.3,
    elevation: 210,
    type: 'road',
    favorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=400&fit=crop',
    difficulty: 'medium',
    estimatedTime: 120,
    createdAt: '2024-02-28'
  },
  {
    id: '11',
    name: 'Ciclovia Norte-Sul',
    distance: 18.2,
    elevation: 130,
    type: 'urban',
    favorite: true,
    difficulty: 'easy',
    estimatedTime: 70,
    createdAt: '2024-04-15'
  },
  {
    id: '12',
    name: 'Trilha das Bromélias',
    distance: 12.5,
    elevation: 420,
    type: 'mountain',
    favorite: false,
    imageUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=400&fit=crop',
    difficulty: 'medium',
    estimatedTime: 80,
    createdAt: '2024-03-17'
  }
];

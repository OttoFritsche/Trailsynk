
import React from 'react';
import ActivityFeedItem, { Activity } from '@/components/app/ActivityFeedItem';
import { Helmet } from 'react-helmet';

// Dados fictícios para o feed inicial
const mockActivities: Activity[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    type: 'pedal',
    title: 'Pedal matinal na orla',
    description: 'Ótimo dia para pedalar! Consegui completar o percurso em menos tempo que o esperado.',
    metrics: {
      distance: 15.2,
      duration: 45,
      elevation: 120,
    },
    imageUrl: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    createdAt: new Date('2023-05-15T08:30:00'),
    likes: 12,
    comments: 3,
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Ana Costa',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    type: 'trilha',
    title: 'Trilha no Parque da Serra',
    description: 'Descobri uma nova trilha incrível! Muito técnica mas vale cada segundo.',
    metrics: {
      distance: 8.7,
      duration: 120,
      elevation: 560,
    },
    imageUrl: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    createdAt: new Date('2023-05-14T16:20:00'),
    likes: 24,
    comments: 8,
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Pedro Almeida',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    type: 'treino',
    title: 'Treino de sprint',
    description: 'Focando em melhorar minha velocidade. Precisava de muito café depois desse!',
    metrics: {
      distance: 5.3,
      duration: 30,
      elevation: 50,
    },
    createdAt: new Date('2023-05-14T06:45:00'),
    likes: 8,
    comments: 2,
  },
];

const AppHome: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Feed de Atividades | TrailSynk</title>
      </Helmet>

      <div>
        <h1 className="text-2xl font-bold mb-6">Feed de Atividades</h1>
        
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <ActivityFeedItem key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AppHome;

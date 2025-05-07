import React, { useState } from 'react';
import ActivityFeedItem, { Activity } from '@/components/app/ActivityFeedItem';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import AIInsightCard from '@/components/app/AIInsightCard';

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
    hasLiked: true,
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
  {
    id: '4',
    user: {
      id: 'user4',
      name: 'Mariana Souza',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    type: 'trilha',
    title: 'Aventura na Serra do Mar',
    description: 'Trilha desafiadora com vistas incríveis. O esforço valeu muito a pena!',
    metrics: {
      distance: 12.4,
      duration: 180,
      elevation: 780,
    },
    imageUrl: 'https://images.unsplash.com/photo-1553007830-89e37b527205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    createdAt: new Date('2023-05-13T11:15:00'),
    likes: 17,
    comments: 5,
  },
  {
    id: '5',
    user: {
      id: 'user5',
      name: 'Rafael Mendes',
      avatar: 'https://i.pravatar.cc/150?img=15',
    },
    type: 'pedal',
    title: 'Pedal de fim de semana',
    description: 'Aproveitando o dia ensolarado para explorar novas rotas. Vista incrível no topo da colina!',
    metrics: {
      distance: 24.7,
      duration: 95,
      elevation: 350,
    },
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    createdAt: new Date('2023-05-12T10:30:00'),
    likes: 31,
    comments: 7,
  },
];

// Sugestões de trails (ciclistas para seguir)
const suggestedTrails = [
  {
    id: 'trail1',
    name: 'Carlos Lima',
    avatar: 'https://i.pravatar.cc/150?img=20',
    bio: 'Ciclista urbano e de montanha',
  },
  {
    id: 'trail2',
    name: 'Fernanda Santos',
    avatar: 'https://i.pravatar.cc/150?img=29',
    bio: 'Competidora MTB - 3x campeã estadual',
  },
  {
    id: 'trail3',
    name: 'Grupo Pedal Noturno',
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Grupo oficial de pedais noturnos na cidade',
  }
];

// Mock de insights de IA para demonstração
const mockAIInsights = [
  {
    id: 'insight1',
    type: 'performance' as const,
    title: 'Sua velocidade média aumentou!',
    description: 'Sua velocidade média em subidas aumentou 5% nesta semana comparado com a semana anterior. Continue assim!',
    actionLabel: 'Ver Análise Completa',
    onAction: () => toast.info('Análise completa será implementada em breve')
  },
  {
    id: 'insight2',
    type: 'route' as const,
    title: 'Rota Recomendada Para Hoje',
    description: 'Com base no seu histórico e nas condições climáticas, recomendamos a Trilha da Serra (15km, nível médio).',
    actionLabel: 'Ver Rota',
    onAction: () => toast.info('Visualização de rota será implementada em breve')
  },
  {
    id: 'insight3',
    type: 'maintenance' as const,
    title: 'Lembrete de Manutenção',
    description: 'Sua corrente atingiu 500km desde a última lubrificação registrada. Considere fazer a manutenção em breve.',
    actionLabel: 'Marcar como Feito',
    onAction: () => toast.success('Manutenção registrada!')
  }
];

const AppHome: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const { user } = useAuth();
  
  // Estado de exemplo para simular conexão com Strava
  const [isConnectedToStrava, setIsConnectedToStrava] = useState(false);
  
  // Escolhe um insight aleatório para mostrar
  const [currentInsight] = useState(mockAIInsights[Math.floor(Math.random() * mockAIInsights.length)]);
  
  const handleConnectStrava = () => {
    // Simulação de conexão com Strava
    console.log("Solicitando conexão com Strava...");
    toast.info("Função de conexão com Strava será implementada no backend");
    setIsConnectedToStrava(true);
  };
  
  const handleLike = (activityId: string) => {
    setActivities(prevActivities => 
      prevActivities.map(activity => {
        if (activity.id === activityId) {
          const hasLiked = !activity.hasLiked;
          const likeDelta = hasLiked ? 1 : -1;
          return {
            ...activity,
            hasLiked,
            likes: activity.likes + likeDelta
          };
        }
        return activity;
      })
    );
  };
  
  const handleComment = (activityId: string) => {
    toast.info("Função de comentários será implementada em breve");
  };

  const handleFollowTrail = (trailId: string) => {
    toast.success("Trail adicionado! Esta função será implementada com integração backend.");
  };
  
  // Função para intercalar o insight da IA no feed
  const getInterleavedFeed = () => {
    if (activities.length < 2) {
      return [...activities];
    }
    
    // Coloca o insight da IA após o primeiro ou segundo item
    const position = Math.min(1, activities.length - 1);
    const feed = [...activities];
    
    // Retornamos um array com os elementos originais e o insight intercalado
    return feed;
  };
  
  const feedItems = getInterleavedFeed();
  
  return (
    <>
      <Helmet>
        <title>TrailSynk | Feed</title>
      </Helmet>

      <div className="space-y-6">
        {!isConnectedToStrava && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-yellow-800">Conecte-se ao Strava</h3>
                <p className="text-yellow-700 text-sm">Conecte sua conta ao Strava para sincronizar suas atividades e rotas.</p>
              </div>
              <Button onClick={handleConnectStrava} className="bg-[#FC4C02] hover:bg-[#FB5B1F] text-white border-0">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" 
                        fill="currentColor"/>
                </svg>
                Conectar Strava
              </Button>
            </CardContent>
          </Card>
        )}
        
        <h1 className="text-2xl font-bold">Feed de Atividades</h1>
        
        {/* Seção de IA - posicionada antes do feed para destaque */}
        <AIInsightCard
          type={currentInsight.type}
          title={currentInsight.title}
          description={currentInsight.description}
          actionLabel={currentInsight.actionLabel}
          onAction={currentInsight.onAction}
        />
        
        {/* Feed Principal */}
        <div className="space-y-6">
          {feedItems.map((activity) => (
            <ActivityFeedItem 
              key={activity.id} 
              activity={activity} 
              onLike={handleLike}
              onComment={handleComment}
            />
          ))}
        </div>

        {/* Card Sugestões Trails - Este card normalmente estaria na sidebar direita,
            mas adicionamos aqui para visualização na versão mobile quando as sidebars
            se tornam responsivas */}
        <Card className="md:hidden mt-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Sugestões de Trails</h4>
              <Button variant="link" className="text-xs text-primary p-0 h-auto">Ver todos</Button>
            </div>
            
            <div className="space-y-3">
              {suggestedTrails.map(trail => (
                <div key={trail.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img 
                        src={trail.avatar} 
                        alt={trail.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{trail.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{trail.bio}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 text-xs"
                    onClick={() => handleFollowTrail(trail.id)}
                  >
                    Seguir
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AppHome;


import React, { useState } from 'react';
import ActivityFeedItem, { Activity } from '@/components/app/ActivityFeedItem';
import RouteMap from '@/components/app/RouteMap';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

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

// Rotas de exemplo para a demonstração
const exampleRoutes = [
  {
    id: 'route-1',
    title: 'Circuito da Lagoa',
    distance: 15.8,
    elevation: 125,
    type: 'Asfalto'
  },
  {
    id: 'route-2',
    title: 'Trilha da Serra',
    distance: 8.4,
    elevation: 450,
    type: 'Mountain Bike'
  },
  {
    id: 'route-3',
    title: 'Vuelta da Cidade',
    distance: 22.3,
    elevation: 210,
    type: 'Urbano'
  }
];

const AppHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [selectedRouteId, setSelectedRouteId] = useState<string | undefined>();
  const { user } = useAuth();
  
  // Estado de exemplo para simular conexão com Strava
  const [isConnectedToStrava, setIsConnectedToStrava] = useState(false);
  
  const handleConnectStrava = () => {
    // Simulação de conexão com Strava
    console.log("Solicitando conexão com Strava...");
    alert("Função de conexão com Strava será implementada no backend");
    setIsConnectedToStrava(true);
  };
  
  return (
    <>
      <Helmet>
        <title>TrailSynk | Início</title>
      </Helmet>

      <div className="space-y-6">
        {!isConnectedToStrava && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between mb-4">
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
          </div>
        )}
        
        <Tabs defaultValue="feed" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="routes">Rotas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed" className="space-y-6">
            <h1 className="text-2xl font-bold">Feed de Atividades</h1>
            
            <div className="space-y-4">
              {mockActivities.map((activity) => (
                <ActivityFeedItem key={activity.id} activity={activity} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="routes" className="space-y-6">
            <h1 className="text-2xl font-bold">Rotas</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RouteMap routeId={selectedRouteId} className="h-full" />
              </div>
              
              <div className="space-y-2">
                {exampleRoutes.map(route => (
                  <div 
                    key={route.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedRouteId === route.id ? 'bg-primary/10 border-primary' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedRouteId(route.id)}
                  >
                    <h3 className="font-medium">{route.title}</h3>
                    <div className="text-sm text-gray-600 flex space-x-3">
                      <span>{route.distance} km</span>
                      <span>•</span>
                      <span>{route.elevation} m</span>
                      <span>•</span>
                      <span>{route.type}</span>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Nova Rota
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AppHome;

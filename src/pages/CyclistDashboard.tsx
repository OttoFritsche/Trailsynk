
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Bike, Route, Calendar, Activity, Heart, Map, Users, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ActivitySummary {
  distance: number;
  duration: number;
  elevation: number;
  count: number;
}

interface RecentRoute {
  id: string;
  name: string;
  distance: number;
  date: string;
}

const CyclistDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activitySummary, setActivitySummary] = useState<ActivitySummary>({
    distance: 0,
    duration: 0,
    elevation: 0,
    count: 0
  });
  const [recentRoutes, setRecentRoutes] = useState<RecentRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento de dados
    const timer = setTimeout(() => {
      // Dados fictícios para demonstração
      setActivitySummary({
        distance: 157.8,
        duration: 8.5,
        elevation: 1250,
        count: 5
      });

      setRecentRoutes([
        { id: '1', name: 'Circuito do Parque', distance: 15.2, date: '2023-05-15' },
        { id: '2', name: 'Trilha da Serra', distance: 22.3, date: '2023-05-10' },
        { id: '3', name: 'Volta da Lagoa', distance: 8.5, date: '2023-05-08' }
      ]);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const goToRoute = (routeId: string) => {
    navigate(`/app/routes/${routeId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <>
      <Helmet>
        <title>Dashboard do Ciclista | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Bem-vindo, {user?.user_metadata?.full_name || 'Ciclista'}</h1>
          <Button 
            variant="outline"
            onClick={() => navigate('/app/routes/new')}
            className="flex items-center"
          >
            <Route className="mr-2 h-4 w-4" />
            Nova Rota
          </Button>
        </div>

        {/* Resumo de Atividades */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Bike className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Este mês</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Total de Pedaladas</p>
                <p className="text-2xl font-bold">{activitySummary.count}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Map className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Este mês</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Distância Total</p>
                <p className="text-2xl font-bold">{activitySummary.distance} km</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Este mês</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Elevação Total</p>
                <p className="text-2xl font-bold">{activitySummary.elevation} m</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">Este mês</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Tempo em Movimento</p>
                <p className="text-2xl font-bold">{activitySummary.duration} h</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rotas Recentes e Sugeridas */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Minhas Rotas</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="recent">
                  <TabsList className="mb-4">
                    <TabsTrigger value="recent">Recentes</TabsTrigger>
                    <TabsTrigger value="suggested">Sugeridas</TabsTrigger>
                    <TabsTrigger value="favorites">Favoritas</TabsTrigger>
                  </TabsList>
                  <TabsContent value="recent">
                    <div className="space-y-2">
                      {loading ? (
                        <p className="text-sm text-center text-muted-foreground py-4">Carregando rotas...</p>
                      ) : recentRoutes.length > 0 ? (
                        recentRoutes.map(route => (
                          <div 
                            key={route.id}
                            className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                            onClick={() => goToRoute(route.id)}
                          >
                            <div className="flex items-center">
                              <div className="p-2 bg-primary/10 rounded-md mr-3">
                                <Route className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{route.name}</p>
                                <p className="text-sm text-muted-foreground">{formatDate(route.date)} • {route.distance} km</p>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-center text-muted-foreground py-4">Nenhuma rota recente encontrada</p>
                      )}
                      <div className="text-center pt-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-primary"
                          onClick={() => navigate('/app/routes')}
                        >
                          Ver todas as rotas
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="suggested">
                    <div className="text-center py-6 space-y-4">
                      <div className="p-4 bg-primary/5 inline-flex rounded-full">
                        <Map className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium">Deixe a IA sugerir rotas para você</h3>
                        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                          Com base em seus interesses e histórico de pedaladas, nossa IA pode sugerir novas rotas para você explorar.
                        </p>
                      </div>
                      <Button 
                        onClick={() => navigate('/app/assistant')}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Obter Sugestões de IA
                      </Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="favorites">
                    <div className="text-center py-8 text-muted-foreground">
                      <Heart className="h-10 w-10 mx-auto mb-2 opacity-30" />
                      <p>Favorite algumas rotas para vê-las aqui</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Comunidade e Conexões */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Comunidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary/10 rounded-md mr-3">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <span>Grupos de Pedal</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/app/groups')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary/10 rounded-md mr-3">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <span>Eventos Próximos</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/app/events')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary/10 rounded-md mr-3">
                      <Bike className="h-4 w-4 text-primary" />
                    </div>
                    <span>Encontrar Ciclistas</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/app/find-cyclists')}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CyclistDashboard;

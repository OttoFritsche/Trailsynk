import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Calendar, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  Heart, 
  Zap, 
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Dumbbell,
  Flame
} from 'lucide-react';
import { 
  mockActivities, 
  mockWeeklySummaries, 
  mockTrainingMetrics, 
  mockTrainingMetricsHistory,
  mockPowerCurve
} from '@/components/training/mockTrainingData';
import AIInsightCard from '@/components/training/AIInsightCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const PerformanceReadiness = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  // Mock data for the page
  const data = {
    trainingLoad: 85,
    recovery: 70,
    readiness: 'medium',
    trend: 'increasing',
    weeklyActivities: 4,
    weeklyDistance: 81.7,
    weeklyElevation: 1530,
    weeklyDuration: 375,
    recentActivities: mockActivities.slice(0, 5),
    weeklySummaries: mockWeeklySummaries,
    trainingMetricsHistory: mockTrainingMetricsHistory,
    powerCurve: mockPowerCurve
  };
  
  // Format minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Get color based on readiness level
  const getReadinessColor = (readiness: string) => {
    switch (readiness) {
      case 'high':
        return 'text-green-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  
  // Get background color based on readiness level
  const getReadinessBg = (readiness: string) => {
    switch (readiness) {
      case 'high':
        return 'bg-green-50';
      case 'medium':
        return 'bg-amber-50';
      case 'low':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };
  
  // Get text for readiness level
  const getReadinessText = (readiness: string) => {
    switch (readiness) {
      case 'high':
        return 'Ótima';
      case 'medium':
        return 'Moderada';
      case 'low':
        return 'Baixa';
      default:
        return 'Desconhecida';
    }
  };
  
  // Get icon for readiness level
  const getReadinessIcon = (readiness: string) => {
    switch (readiness) {
      case 'high':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'low':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Format date for x-axis
  const formatDate = (date: string) => {
    return date.split(' ')[0];
  };
  
  // Format power for tooltip
  const formatPower = (value: number) => {
    return `${value}W`;
  };
  
  // Format time for x-axis
  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds}s`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}m`;
    } else {
      return `${Math.floor(seconds / 3600)}h`;
    }
  };
  
  return (
    <>
      <Helmet>
        <title>Performance e Prontidão | TrailSynk</title>
      </Helmet>
      
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Performance e Prontidão</h1>
            <p className="text-muted-foreground">
              Acompanhe sua carga de treino, recuperação e prontidão para atividades
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedPeriod('week')}>
              Semana
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedPeriod('month')}>
              Mês
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedPeriod('year')}>
              Ano
            </Button>
          </div>
        </div>
        
        {/* AI Insight Card */}
        <AIInsightCard 
          type="info"
          title="Sugestão de recuperação"
          description="Sua carga de treino está alta e seu tempo de recuperação ainda não está completo. Considere um treino leve hoje ou um dia de descanso ativo."
          actionLabel="Ver detalhes"
          onAction={() => console.log("Mostrar detalhes de recuperação")}
          metric={{
            value: data.recovery,
            label: "Recuperação",
            unit: "%",
            trend: "up"
          }}
        />
        
        {/* Main Tabs */}
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="training-load">Carga de Treino</TabsTrigger>
            <TabsTrigger value="recovery">Recuperação</TabsTrigger>
            <TabsTrigger value="power">Curva de Potência</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Training Load Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Carga de Treino
                  </CardTitle>
                  <Flame className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <div className="text-2xl font-bold">{data.trainingLoad}</div>
                    <div className="text-xs text-muted-foreground">/ 100</div>
                  </div>
                  <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${data.trainingLoad}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {data.trend === 'increasing' ? 'Aumentando' : 
                     data.trend === 'decreasing' ? 'Diminuindo' : 'Estável'}
                  </p>
                </CardContent>
              </Card>
              
              {/* Recovery Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Recuperação
                  </CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <div className="text-2xl font-bold">{data.recovery}%</div>
                  </div>
                  <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${data.recovery}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Recuperação em andamento
                  </p>
                </CardContent>
              </Card>
              
              {/* Readiness Card */}
              <Card className={getReadinessBg(data.readiness)}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Prontidão para Treino
                  </CardTitle>
                  {getReadinessIcon(data.readiness)}
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <div className={`text-2xl font-bold ${getReadinessColor(data.readiness)}`}>
                      {getReadinessText(data.readiness)}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Baseado na sua carga de treino e recuperação
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Weekly Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo da Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground">Atividades</span>
                    <span className="text-2xl font-bold">{data.weeklyActivities}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground">Distância</span>
                    <span className="text-2xl font-bold">{data.weeklyDistance} km</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground">Elevação</span>
                    <span className="text-2xl font-bold">{data.weeklyElevation} m</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-muted-foreground">Tempo</span>
                    <span className="text-2xl font-bold">{formatDuration(data.weeklyDuration)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-4">Intensidade por Dia</h4>
                  <div className="flex items-center justify-between">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <span className="text-xs text-muted-foreground mb-2">{day}</span>
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center
                            ${data.weeklySummaries[0].intensityByDay[i] === 'high' ? 'bg-red-100 text-red-600' : 
                              data.weeklySummaries[0].intensityByDay[i] === 'medium' ? 'bg-amber-100 text-amber-600' : 
                              data.weeklySummaries[0].intensityByDay[i] === 'low' ? 'bg-green-100 text-green-600' : 
                              'bg-gray-100 text-gray-400'}`}
                        >
                          {data.weeklySummaries[0].intensityByDay[i] !== 'none' ? (
                            <Activity className="h-4 w-4" />
                          ) : (
                            <span className="text-xs">-</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Atividades Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center
                          ${activity.intensity === 'high' ? 'bg-red-100' : 
                            activity.intensity === 'medium' ? 'bg-amber-100' : 
                            'bg-green-100'}`}
                        >
                          {activity.type === 'ride' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="5.5" cy="17.5" r="3.5"/>
                              <circle cx="18.5" cy="17.5" r="3.5"/>
                              <path d="M15 6a1 1 0 100-2 1 1 0 000 2z"/>
                              <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
                            </svg>
                          ) : activity.type === 'run' ? (
                            <Activity className="h-5 w-5" />
                          ) : (
                            <TrendingUp className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="hidden md:flex flex-col items-end">
                          <span className="font-medium">{activity.distance} km</span>
                          <span className="text-xs text-muted-foreground">Distância</span>
                        </div>
                        <div className="hidden md:flex flex-col items-end">
                          <span className="font-medium">{activity.duration} min</span>
                          <span className="text-xs text-muted-foreground">Tempo</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium">{activity.elevation} m</span>
                          <span className="text-xs text-muted-foreground">Elevação</span>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Training Load Tab */}
          <TabsContent value="training-load" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Carga de Treino</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.trainingMetricsHistory}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={formatDate}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        domain={[0, 100]}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="load" 
                        name="Carga de Treino"
                        stroke="#3b82f6" 
                        fillOpacity={1} 
                        fill="url(#colorLoad)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-medium">Fatores que Afetam sua Carga de Treino</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Dumbbell className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Intensidade</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Treinos de alta intensidade contribuem mais para sua carga de treino do que treinos de baixa intensidade.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Duração</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Treinos mais longos aumentam sua carga de treino, mesmo que sejam de baixa intensidade.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Elevação</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Subidas e terrenos acidentados aumentam a carga de treino devido ao esforço adicional.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Frequência</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Treinos frequentes sem recuperação adequada podem levar a uma carga de treino excessiva.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <AIInsightCard 
              type="warning"
              title="Alerta de manutenção"
              description="Sua bicicleta principal está próxima do período recomendado para revisão. Já se passaram 780km desde a última manutenção."
              actionLabel="Agendar revisão"
              onAction={() => console.log("Abrir modal de manutenção")}
              imageUrl="https://images.unsplash.com/photo-1565965313194-e3b3126be97c?w=400&auto=format"
            />
          </TabsContent>
          
          {/* Recovery Tab */}
          <TabsContent value="recovery" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Recuperação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.trainingMetricsHistory}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={formatDate}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        domain={[0, 100]}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="recovery" 
                        name="Recuperação"
                        stroke="#22c55e" 
                        fillOpacity={1} 
                        fill="url(#colorRecovery)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h4 className="text-sm font-medium">Fatores que Afetam sua Recuperação</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <Clock className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Sono</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Sono de qualidade é essencial para a recuperação muscular e mental.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <Activity className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Nutrição</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Alimentação adequada fornece os nutrientes necessários para reparar os músculos.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <Heart className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Estresse</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Níveis elevados de estresse podem prejudicar sua recuperação física.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-green-100 p-2">
                        <Zap className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium text-sm">Hidratação</h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          Manter-se bem hidratado ajuda na recuperação e no desempenho geral.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <AIInsightCard 
              type="recovery"
              title="Dica de recuperação"
              description="Seus dados indicam que você pode se beneficiar de uma sessão de alongamento e mobilidade hoje. Isso ajudará na recuperação muscular."
              actionLabel="Ver exercícios recomendados"
              onAction={() => console.log("Mostrar exercícios de recuperação")}
              metric={{
                value: "30",
                label: "Minutos recomendados",
                unit: "min"
              }}
            />
          </TabsContent>
          
          {/* Power Curve Tab */}
          <TabsContent value="power" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Curva de Potência</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data.powerCurve}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="timeInSeconds" 
                        scale="log"
                        domain={['auto', 'auto']}
                        tickFormatter={formatTime}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip 
                        formatter={formatPower}
                        labelFormatter={formatTime}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="power" 
                        name="Potência"
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-4">Análise de Potência</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-muted-foreground">5s</span>
                      <span className="text-xl font-bold">1050W</span>
                      <span className="text-xs text-green-600">+50W</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-muted-foreground">1min</span>
                      <span className="text-xl font-bold">650W</span>
                      <span className="text-xs text-green-600">+25W</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-muted-foreground">5min</span>
                      <span className="text-xl font-bold">380W</span>
                      <span className="text-xs text-green-600">+15W</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs text-muted-foreground">20min</span>
                      <span className="text-xl font-bold">280W</span>
                      <span className="text-xs text-green-600">+10W</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <AIInsightCard 
              type="performance"
              title="Análise de potência"
              description="Sua potência de 5 minutos melhorou 15W desde o mês passado. Continue com os treinos intervalados para melhorar ainda mais."
              actionLabel="Ver treinos recomendados"
              onAction={() => console.log("Mostrar treinos recomendados")}
              metric={{
                value: "+15W",
                label: "Melhoria em 5min",
                trend: "up"
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default PerformanceReadiness;

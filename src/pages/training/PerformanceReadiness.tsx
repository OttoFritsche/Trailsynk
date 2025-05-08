
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AIInsightCard from '@/components/training/AIInsightCard';
import { mockTrainingMetrics, mockTrainingMetricsHistory } from '@/components/training/mockTrainingData';
import { HelpCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const PerformanceReadiness = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Get readiness status color and label
  const getReadinessStatus = () => {
    switch (mockTrainingMetrics.readiness) {
      case 'high':
        return {
          color: 'text-green-500',
          bgColor: 'bg-green-100',
          bgGradient: 'from-green-50 to-green-200',
          label: 'Alta',
          description: 'Seu corpo está bem recuperado e pronto para treinos intensos',
          recommendation: 'Ideal para sessões de alta intensidade ou treinos longos'
        };
      case 'low':
        return {
          color: 'text-red-500',
          bgColor: 'bg-red-100',
          bgGradient: 'from-red-50 to-red-200',
          label: 'Baixa',
          description: 'Sinais de fadiga acumulada detectados',
          recommendation: 'Recomendado descanso ativo ou treino leve de recuperação'
        };
      default:
        return {
          color: 'text-amber-500',
          bgColor: 'bg-amber-100',
          bgGradient: 'from-amber-50 to-amber-200',
          label: 'Média',
          description: 'Recuperação parcial detectada',
          recommendation: 'Indicado para treinos de intensidade moderada'
        };
    }
  };

  const readinessStatus = getReadinessStatus();

  // Generate mock weekly readiness data for the graph
  const readinessHistory = [
    { day: 'Seg', readiness: 65, carga: 70 },
    { day: 'Ter', readiness: 70, carga: 60 },
    { day: 'Qua', readiness: 60, carga: 85 },
    { day: 'Qui', readiness: 50, carga: 50 },
    { day: 'Sex', readiness: 55, carga: 30 },
    { day: 'Sáb', readiness: 75, carga: 60 },
    { day: 'Dom', readiness: 85, carga: 20 },
  ];

  return (
    <div className="space-y-10 pb-10 px-4 md:px-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance e Prontidão</h1>
        <p className="text-muted-foreground">
          Análise avançada de sua performance e estado de recuperação
        </p>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="power">Curva de Potência</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8 mt-6">
          {/* Readiness Cards - Improved with visual meter and recommendations */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  Prontidão para Treinar
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          A prontidão é calculada com base na sua carga de treinamento recente, 
                          métricas de recuperação e padrões de sono (quando disponíveis).
                        </p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </CardTitle>
                <span className="text-sm text-muted-foreground">Atualizado hoje, 08:30</span>
              </div>
              <CardDescription>Estado atual do seu corpo para o treino de hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex flex-col items-center justify-center">
                  {/* Readiness meter visualization */}
                  <div className={`w-40 h-40 ${readinessStatus.bgColor} rounded-full flex items-center justify-center bg-gradient-to-br ${readinessStatus.bgGradient} shadow-inner border`}>
                    <div className="text-center">
                      <span className={`text-3xl font-bold ${readinessStatus.color} block`}>{readinessStatus.label}</span>
                      <span className={`text-sm ${readinessStatus.color}`}>{mockTrainingMetrics.recovery}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Status</h3>
                      <p className="text-sm text-muted-foreground">{readinessStatus.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-1">Recomendação para hoje</h3>
                      <p className="text-sm text-muted-foreground">{readinessStatus.recommendation}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Carga de Treino</div>
                        <div className="font-medium text-lg">{mockTrainingMetrics.trainingLoad}%</div>
                        <div className="w-full bg-slate-200 h-2 rounded-full mt-1">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${mockTrainingMetrics.trainingLoad}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Recuperação</div>
                        <div className="font-medium text-lg">{mockTrainingMetrics.recovery}%</div>
                        <div className="w-full bg-slate-200 h-2 rounded-full mt-1">
                          <div 
                            className={`h-2 rounded-full ${mockTrainingMetrics.recovery > 70 ? 'bg-green-500' : mockTrainingMetrics.recovery > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${mockTrainingMetrics.recovery}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Interpretation for Overview */}
          <AIInsightCard 
            title="Interpretação da IA sobre sua Prontidão"
            content="Com base na análise dos últimos 7 dias, você está respondendo bem aos estímulos de treino. Sua recuperação está acima da média para seu perfil, e a tendência é positiva. Para maximizar seu progresso, recomendamos manter o ciclo de treino atual por mais uma semana, seguido de uma semana de recuperação ativa com redução de 20% no volume total."
            type="info"
            icon={
              <div className="rounded-full p-2 bg-blue-100 text-blue-500">
                <Info className="h-5 w-5" />
              </div>
            }
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">Recomendações Personalizadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="rounded-full bg-green-100 p-1.5 text-green-600">
                    <Info className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Zonas de Frequência Cardíaca</h4>
                    <p className="text-xs text-muted-foreground">
                      Suas zonas foram recalculadas com base nos últimos treinos
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="rounded-full bg-amber-100 p-1.5 text-amber-600">
                    <Info className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Foco em Cadência</h4>
                    <p className="text-xs text-muted-foreground">
                      Detectamos oportunidade de melhoria na sua cadência em subidas
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="rounded-full bg-blue-100 p-1.5 text-blue-600">
                    <Info className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Intervalo de Recuperação</h4>
                    <p className="text-xs text-muted-foreground">
                      Considere adicionar um dia extra de recuperação após treinos intensos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Progresso de Performance</CardTitle>
                <CardDescription>Análise das últimas 4 semanas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Potência Média</p>
                    <p className="text-xl font-bold text-blue-600">+4.3%</p>
                    <p className="text-xs">vs. mês anterior</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Frequência Cardíaca</p>
                    <p className="text-xl font-bold text-green-600">-2.1%</p>
                    <p className="text-xs">para mesma potência</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-1">Cadência</p>
                    <p className="text-xl font-bold text-amber-600">+3.8%</p>
                    <p className="text-xs">revolução/min</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-sm font-medium mb-2">Ações para melhoria contínua</p>
                  <ul className="text-xs text-muted-foreground space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="rounded-full h-4 w-4 bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] mt-0.5">1</span>
                      <span>Adicione treinos de intervalo (6x3min) para melhorar seu VO2 máx</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="rounded-full h-4 w-4 bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] mt-0.5">2</span>
                      <span>Pratique cadência específica (90-100rpm) em terreno plano</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="rounded-full h-4 w-4 bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] mt-0.5">3</span>
                      <span>Trabalhe sua economia de pedalada com treinos de força específicos</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Power Curve Tab */}
        <TabsContent value="power" className="mt-6">
          <Card className="overflow-hidden">
            <CardHeader>
              <div>
                <CardTitle>Curva de Potência</CardTitle>
                <CardDescription>Análise da sua produção de potência máxima por duração</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-8">
                <h3 className="text-base font-medium mb-4">Zonas de Potência</h3>
                {/* Power zones indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded-lg bg-red-50 p-3 border border-red-100">
                    <h4 className="text-xs text-red-400 font-medium mb-1">Neuromuscular</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-red-700">845W</span>
                      <span className="text-xs text-red-400">10s</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-3 border border-amber-100">
                    <h4 className="text-xs text-amber-400 font-medium mb-1">Anaeróbico</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-amber-700">520W</span>
                      <span className="text-xs text-amber-400">1min</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-green-50 p-3 border border-green-100">
                    <h4 className="text-xs text-green-400 font-medium mb-1">VO2 Máx</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-700">370W</span>
                      <span className="text-xs text-green-400">5min</span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-3 border border-blue-100">
                    <h4 className="text-xs text-blue-400 font-medium mb-1">Limiar</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-700">290W</span>
                      <span className="text-xs text-blue-400">20min</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <p>Consulte seus dados de potência no aplicativo Strava ou na página de estatísticas para uma análise completa.</p>
                  <Button variant="outline" className="mt-4">Ver estatísticas detalhadas</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis on Power Curve - Added better spacing */}
          <AIInsightCard 
            title="Interpretação da IA sobre sua Curva de Potência"
            content="Seu perfil de potência indica que você tem boa capacidade de sprint e capacidade aeróbica, mas há oportunidades de melhoria nas durações entre 5 e 20 minutos. Recomendamos adicionar treinos com intervalos específicos de 6-8 minutos em intensidade de limiar para melhorar sua curva nessa faixa. Sua potência máxima está dentro dos 15% superiores para seu grupo de idade e peso."
            type="info"
          />
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Carga e Recuperação</CardTitle>
              <CardDescription>Evolução dos seus índices de treinamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-4">Resumo de Tendências</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
                      <h4 className="text-sm font-medium text-blue-700 mb-2">Carga de Treinamento</h4>
                      <p className="text-sm text-slate-600">
                        Sua carga de treinamento aumentou 12% nas últimas 3 semanas, indicando uma progressão consistente.
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-blue-100 h-2 rounded-full">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <span className="text-xs font-medium text-blue-700 ml-2">75%</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border border-green-100">
                      <h4 className="text-sm font-medium text-green-700 mb-2">Recuperação</h4>
                      <p className="text-sm text-slate-600">
                        Sua capacidade de recuperação está boa, mas mostrando sinais de fadiga acumulada na última semana.
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-green-100 h-2 rounded-full">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <span className="text-xs font-medium text-green-700 ml-2">65%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Added beneficial training zones section */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-base font-medium mb-4">Zonas de Treino Recomendadas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Por Frequência Cardíaca (bpm)</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Zona 1 - Recuperação:</span>
                          <span className="font-medium">120-130</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Zona 2 - Resistência:</span>
                          <span className="font-medium">130-145</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Zona 3 - Ritmo:</span>
                          <span className="font-medium">145-160</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Zona 4 - Limiar:</span>
                          <span className="font-medium">160-170</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Zona 5 - VO2max:</span>
                          <span className="font-medium">170-185</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Por Potência (watts)</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Zona 1 - Recuperação:</span>
                          <span className="font-medium">até 160W</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Zona 2 - Resistência:</span>
                          <span className="font-medium">160-200W</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Zona 3 - Ritmo:</span>
                          <span className="font-medium">200-240W</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Zona 4 - Limiar:</span>
                          <span className="font-medium">240-270W</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Zona 5 - VO2max:</span>
                          <span className="font-medium">270-310W</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Interpretation - Better spacing */}
          <AIInsightCard 
            title="Interpretação da IA sobre sua Carga e Recuperação"
            content="Estamos observando um padrão de aumento gradual da sua carga de treinamento nas últimas 3 semanas, enquanto seus níveis de recuperação apresentam uma tendência de queda. Seu corpo está respondendo ao estímulo aumentado, mas está se aproximando do limite ideal de treinamento. Recomendamos uma semana mais leve (redução de 20-30% no volume) para permitir uma recuperação completa antes de iniciar o próximo bloco de treino. Isso ajudará a prevenir overtraining e potencializar seus ganhos de performance."
            type="warning"
            icon={
              <div className="rounded-full p-2 bg-amber-100 text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceReadiness;

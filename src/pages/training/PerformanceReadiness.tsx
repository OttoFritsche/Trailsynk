
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AIInsightCard from '@/components/training/AIInsightCard';
import { mockPowerCurve, mockTrainingMetrics, mockTrainingMetricsHistory } from '@/components/training/mockTrainingData';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const PerformanceReadiness = () => {
  const [powerCurvePeriod, setPowerCurvePeriod] = useState('lastMonth');

  // Format the power curve data for the chart
  const powerCurveFormatted = mockPowerCurve.map(point => {
    let timeLabel;
    if (point.timeInSeconds < 60) {
      timeLabel = `${point.timeInSeconds}s`;
    } else if (point.timeInSeconds < 3600) {
      timeLabel = `${Math.floor(point.timeInSeconds / 60)}min`;
    } else {
      timeLabel = `${Math.floor(point.timeInSeconds / 3600)}h`;
    }
    return {
      time: timeLabel,
      power: point.power,
    };
  });

  // Get readiness status color and label
  const getReadinessStatus = () => {
    switch (mockTrainingMetrics.readiness) {
      case 'high':
        return {
          color: 'text-green-500',
          bgColor: 'bg-green-100',
          label: 'Alta'
        };
      case 'low':
        return {
          color: 'text-red-500',
          bgColor: 'bg-red-100',
          label: 'Baixa'
        };
      default:
        return {
          color: 'text-amber-500',
          bgColor: 'bg-amber-100',
          label: 'Média'
        };
    }
  };

  const readinessStatus = getReadinessStatus();

  return (
    <div className="space-y-6 pb-10 px-4 md:px-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Performance e Prontidão</h1>
        <p className="text-muted-foreground">
          Análise avançada de sua performance e estado de recuperação
        </p>
      </div>

      {/* Readiness Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Prontidão para Treinar</CardTitle>
            <CardDescription>Seu estado atual de recuperação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className={`w-32 h-32 ${readinessStatus.bgColor} rounded-full flex items-center justify-center`}>
                <span className={`text-3xl font-bold ${readinessStatus.color}`}>{readinessStatus.label}</span>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Baseado na sua carga de treinamento recente e dados de recuperação
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Carga de Treino</div>
                    <div className="font-medium">{mockTrainingMetrics.trainingLoad}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Recuperação</div>
                    <div className="font-medium">{mockTrainingMetrics.recovery}%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Power Curve Card - Improved layout */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>Curva de Potência</CardTitle>
              <CardDescription>Análise da sua produção de potência máxima por duração</CardDescription>
            </div>
            <Select
              value={powerCurvePeriod}
              onValueChange={setPowerCurvePeriod}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastWeek">Última semana</SelectItem>
                <SelectItem value="lastMonth">Último mês</SelectItem>
                <SelectItem value="lastYear">Último ano</SelectItem>
                <SelectItem value="allTime">Todo o histórico</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer
                config={{
                  power: {
                    label: "Potência (watts)",
                    color: "#9b87f5"
                  }
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={powerCurveFormatted}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12 }}
                      height={50}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      width={50}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip 
                      contentStyle={{ fontSize: '12px' }}
                      itemStyle={{ padding: '2px 0' }}
                    />
                    <Legend 
                      verticalAlign="top" 
                      height={36}
                      wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="power" 
                      stroke="var(--color-power)" 
                      name="Potência (watts)"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis on Power Curve */}
      <AIInsightCard 
        title="Interpretação da IA sobre sua Curva de Potência"
        content="Seu perfil de potência indica que você tem boa capacidade de sprint e capacidade aeróbica, mas há oportunidades de melhoria nas durações entre 5 e 20 minutos. Recomendamos adicionar treinos com intervalos específicos de 6-8 minutos em intensidade de limiar para melhorar sua curva nessa faixa. Sua potência máxima está dentro dos 15% superiores para seu grupo de idade e peso."
        type="info"
      />

      {/* Metrics Trends - Improved layout */}
      <Card>
        <CardHeader>
          <CardTitle>Tendência de Carga e Recuperação</CardTitle>
          <CardDescription>Evolução dos seus índices de treinamento ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer
              config={{
                load: {
                  label: "Carga de Treinamento",
                  color: "#D946EF"
                },
                recovery: {
                  label: "Recuperação",
                  color: "#0EA5E9"
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={mockTrainingMetricsHistory}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    height={50}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    width={50}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ fontSize: '12px' }}
                    itemStyle={{ padding: '2px 0' }}
                  />
                  <Legend 
                    verticalAlign="top" 
                    height={36}
                    wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="load" 
                    stroke="var(--color-load)" 
                    name="Carga de Treinamento"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="recovery" 
                    stroke="var(--color-recovery)" 
                    name="Recuperação"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* AI Interpretation */}
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
    </div>
  );
};

export default PerformanceReadiness;

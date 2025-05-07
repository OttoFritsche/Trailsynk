
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AIInsightCard from '@/components/training/AIInsightCard';
import { mockMonthlySummaries, mockYearlySummary } from '@/components/training/mockTrainingData';
import { ChartContainer } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TrainingCalendar = () => {
  const [year, setYear] = useState(2024);
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  // Monthly chart data based on mock data
  const chartData = mockMonthlySummaries.map(month => ({
    name: month.month.substring(0, 3),
    distância: month.distance,
    atividades: month.activities,
    elevação: month.elevation / 100, // Scaled down for better visualization
  }));

  return (
    <div className="space-y-8 pb-16 pt-6 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendário de Treinamento</h1>
          <p className="text-muted-foreground">
            Visualize e analise seu treinamento por período
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setYear(year - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            {year - 1}
          </Button>
          <Button variant="outline" size="sm" className="font-medium">
            {year}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setYear(year + 1)}>
            {year + 1}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Yearly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de</CardDescription>
            <CardTitle className="text-2xl">{mockYearlySummary.totalDistance} km</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Distância percorrida</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de</CardDescription>
            <CardTitle className="text-2xl">{Math.round(mockYearlySummary.totalDuration / 60)} horas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Tempo de atividade</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de</CardDescription>
            <CardTitle className="text-2xl">{mockYearlySummary.totalActivities}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Atividades registradas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de</CardDescription>
            <CardTitle className="text-2xl">{mockYearlySummary.totalElevation.toLocaleString()} m</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Elevação acumulada</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insight Card */}
      <AIInsightCard 
        title="Análise Anual da IA"
        content="Seu volume de treino aumentou 15% nos últimos 3 meses comparado com o início do ano. A consistência melhorou, com aumento na frequência semanal de treinos. Continue aumentando gradualmente o volume para atingir seus objetivos de performance."
        type="success"
        icon={
          <div className="rounded-full p-2 bg-green-100 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
        }
      />

      {/* Yearly Chart */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Volume de Treinamento ({year})</CardTitle>
          <CardDescription>Distribuição mensal de distância e atividades</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-80 w-full">
            <ChartContainer
              config={{
                distance: {
                  label: "Distância (km)",
                  color: "#9b87f5"
                },
                activities: {
                  label: "Atividades",
                  color: "#7E69AB"
                },
                elevation: {
                  label: "Elevação (x100m)",
                  color: "#6E59A5"
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="distância" fill="var(--color-distance)" name="Distância (km)" />
                  <Bar dataKey="atividades" fill="var(--color-activities)" name="Atividades" />
                  <Bar dataKey="elevação" fill="var(--color-elevation)" name="Elevação (x100m)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Summary Cards */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-6">Resumo Mensal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockMonthlySummaries.map((month) => (
            <Card key={month.month}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{month.month}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Distância:</span>
                    <span className="font-medium">{month.distance} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tempo:</span>
                    <span className="font-medium">{Math.round(month.duration / 60)} h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Atividades:</span>
                    <span className="font-medium">{month.activities}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Elevação:</span>
                    <span className="font-medium">{month.elevation} m</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingCalendar;

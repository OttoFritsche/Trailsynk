
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AIInsightCard from '@/components/training/AIInsightCard';
import { mockMonthlySummaries, mockYearlySummary } from '@/components/training/mockTrainingData';
import TrainingFormModal from '@/components/training/TrainingFormModal';

const TrainingCalendar = () => {
  const [year, setYear] = useState(2024);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  return (
    <div className="space-y-8 pb-16 pt-6 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendário de Treinamento</h1>
          <p className="text-muted-foreground">
            Visualize e analise seu treinamento por período
          </p>
        </div>
        
        <div className="flex items-center gap-4">
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
          
          <Button 
            variant="default"
            onClick={() => setIsTrainingModalOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Registrar Treino Manual
          </Button>
        </div>
      </div>

      {/* Yearly Summary Cards - Responsive grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        type="performance"
        title="Análise Anual da IA"
        description="Seu volume de treino aumentou 15% nos últimos 3 meses comparado com o início do ano. A consistência melhorou, com aumento na frequência semanal de treinos. Continue aumentando gradualmente o volume para atingir seus objetivos de performance."
        actionLabel="Ver detalhes"
        onAction={() => {}}
      />

      {/* Monthly Summary Cards - Better spacing and clear separation */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold mb-6">Resumo Mensal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockMonthlySummaries.map((month) => (
            <Card key={month.month} className="h-full">
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

      {/* Training Form Modal */}
      <TrainingFormModal 
        open={isTrainingModalOpen}
        onOpenChange={setIsTrainingModalOpen}
      />
    </div>
  );
};

export default TrainingCalendar;

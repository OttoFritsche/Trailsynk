import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AIInsightCard from '@/components/training/AIInsightCard';
import { mockWeeklySummaries } from '@/components/training/mockTrainingData';

const WeeklyControl = () => {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const currentWeek = mockWeeklySummaries[currentWeekIndex];
  
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  const handlePreviousWeek = () => {
    setCurrentWeekIndex((prev) => (prev < mockWeeklySummaries.length - 1 ? prev + 1 : prev));
  };
  
  const handleNextWeek = () => {
    setCurrentWeekIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  
  // Function to get intensity color
  const getIntensityColor = (intensity: 'none' | 'low' | 'medium' | 'high') => {
    switch (intensity) {
      case 'low': return 'bg-blue-100';
      case 'medium': return 'bg-amber-100';
      case 'high': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };
  
  // Function to get intensity text
  const getIntensityText = (intensity: 'none' | 'low' | 'medium' | 'high') => {
    switch (intensity) {
      case 'low': return 'Leve';
      case 'medium': return 'Moderado';
      case 'high': return 'Intenso';
      default: return 'Descanso';
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Controle Semanal de Treinamento</h1>
        <p className="text-muted-foreground">
          Visualize e analise sua semana de treinamento
        </p>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline"
          onClick={handlePreviousWeek}
          disabled={currentWeekIndex >= mockWeeklySummaries.length - 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Semana Anterior
        </Button>
        
        <div className="font-medium text-lg">
          {currentWeek.week}
        </div>
        
        <Button 
          variant="outline"
          onClick={handleNextWeek}
          disabled={currentWeekIndex <= 0}
        >
          Próxima Semana <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Weekly Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Visão Semanal</CardTitle>
          <CardDescription>Atividades e intensidade por dia da semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div key={day} className="flex flex-col items-center">
                <div className="text-sm font-medium mb-2">{day}</div>
                <div 
                  className={`rounded-full w-16 h-16 flex items-center justify-center ${getIntensityColor(currentWeek.intensityByDay[index])}`}
                >
                  {currentWeek.intensityByDay[index] !== 'none' && (
                    <div className="text-sm font-medium">
                      {currentWeek.daysActive.includes(index) ? '✓' : ''}
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-center">
                  {getIntensityText(currentWeek.intensityByDay[index])}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Distância Total</CardDescription>
            <CardTitle className="text-2xl">{currentWeek.distance} km</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">na semana</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tempo Total</CardDescription>
            <CardTitle className="text-2xl">{Math.round(currentWeek.duration / 60)} h</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">de atividade</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Atividades</CardDescription>
            <CardTitle className="text-2xl">{currentWeek.activities}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">registradas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Elevação</CardDescription>
            <CardTitle className="text-2xl">{currentWeek.elevation} m</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">acumulada</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Weekly Insight */}
      <AIInsightCard
        type="performance"
        title="Análise da IA sobre sua Semana"
        description="Boa semana de treinamento com equilíbrio entre intensidades! Você teve dias ativos, realizando atividades. O volume total está 12% acima da sua média mensal, indicando bom progresso. Baseado na sua consistência, recomendamos um treino leve de recuperação no próximo domingo, seguido de um treino mais intenso na terça-feira para maximizar seus ganhos."
        actionLabel="Ver recomendações"
        onAction={() => {}}
      />
      
      {/* Weekly Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Comparação com Semana Anterior</CardTitle>
          <CardDescription>Evolução das métricas principais</CardDescription>
        </CardHeader>
        <CardContent>
          {currentWeekIndex < mockWeeklySummaries.length - 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Distância</h3>
                  <div className="flex items-center">
                    <span className="text-lg font-medium">{currentWeek.distance} km</span>
                    {currentWeek.distance > mockWeeklySummaries[currentWeekIndex + 1].distance ? (
                      <span className="ml-2 text-sm text-green-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="18 15 12 9 6 15"/>
                        </svg>
                        {Math.round((currentWeek.distance - mockWeeklySummaries[currentWeekIndex + 1].distance) / mockWeeklySummaries[currentWeekIndex + 1].distance * 100)}%
                      </span>
                    ) : (
                      <span className="ml-2 text-sm text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                        {Math.round((mockWeeklySummaries[currentWeekIndex + 1].distance - currentWeek.distance) / mockWeeklySummaries[currentWeekIndex + 1].distance * 100)}%
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Tempo</h3>
                  <div className="flex items-center">
                    <span className="text-lg font-medium">{Math.round(currentWeek.duration / 60)} h</span>
                    {currentWeek.duration > mockWeeklySummaries[currentWeekIndex + 1].duration ? (
                      <span className="ml-2 text-sm text-green-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="18 15 12 9 6 15"/>
                        </svg>
                        {Math.round((currentWeek.duration - mockWeeklySummaries[currentWeekIndex + 1].duration) / mockWeeklySummaries[currentWeekIndex + 1].duration * 100)}%
                      </span>
                    ) : (
                      <span className="ml-2 text-sm text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                        {Math.round((mockWeeklySummaries[currentWeekIndex + 1].duration - currentWeek.duration) / mockWeeklySummaries[currentWeekIndex + 1].duration * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Atividades</h3>
                  <div className="flex items-center">
                    <span className="text-lg font-medium">{currentWeek.activities}</span>
                    {currentWeek.activities > mockWeeklySummaries[currentWeekIndex + 1].activities ? (
                      <span className="ml-2 text-sm text-green-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="18 15 12 9 6 15"/>
                        </svg>
                        +{currentWeek.activities - mockWeeklySummaries[currentWeekIndex + 1].activities}
                      </span>
                    ) : currentWeek.activities < mockWeeklySummaries[currentWeekIndex + 1].activities ? (
                      <span className="ml-2 text-sm text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                        -{mockWeeklySummaries[currentWeekIndex + 1].activities - currentWeek.activities}
                      </span>
                    ) : (
                      <span className="ml-2 text-sm text-gray-500">Igual</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Elevação</h3>
                  <div className="flex items-center">
                    <span className="text-lg font-medium">{currentWeek.elevation} m</span>
                    {currentWeek.elevation > mockWeeklySummaries[currentWeekIndex + 1].elevation ? (
                      <span className="ml-2 text-sm text-green-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="18 15 12 9 6 15"/>
                        </svg>
                        {Math.round((currentWeek.elevation - mockWeeklySummaries[currentWeekIndex + 1].elevation) / mockWeeklySummaries[currentWeekIndex + 1].elevation * 100)}%
                      </span>
                    ) : (
                      <span className="ml-2 text-sm text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                        {Math.round((mockWeeklySummaries[currentWeekIndex + 1].elevation - currentWeek.elevation) / mockWeeklySummaries[currentWeekIndex + 1].elevation * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">Não há dados da semana anterior para comparação.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyControl;

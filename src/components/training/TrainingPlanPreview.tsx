
import React from 'react';
import { Calendar, Clock, ZapOff, Zap, BarChart2, Bike } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TrainingDay {
  id: string;
  day: string;
  type: 'rest' | 'interval' | 'endurance' | 'recovery' | 'strength';
  title: string;
  description: string;
  duration: number; // in minutes
  intensity: 'low' | 'medium' | 'high';
}

interface TrainingPlanPreviewProps {
  weeklyPlan: TrainingDay[];
  onGenerateNewPlan?: () => void;
  onViewFullPlan?: () => void;
}

const TrainingPlanPreview: React.FC<TrainingPlanPreviewProps> = ({
  weeklyPlan,
  onGenerateNewPlan = () => console.log("Generate new plan clicked"),
  onViewFullPlan = () => console.log("View full plan clicked"),
}) => {
  const getActivityIcon = (type: TrainingDay['type'], intensity: TrainingDay['intensity']) => {
    switch (type) {
      case 'rest':
        return <ZapOff className="h-5 w-5 text-gray-400" />;
      case 'interval':
        return <BarChart2 className="h-5 w-5 text-red-500" />;
      case 'endurance':
        return <Bike className="h-5 w-5 text-blue-500" />;
      case 'recovery':
        return <Zap className="h-5 w-5 text-green-500" />;
      case 'strength':
        return <Zap className="h-5 w-5 text-purple-500" />;
      default:
        return <Calendar className="h-5 w-5 text-primary" />;
    }
  };

  const getIntensityColor = (intensity: TrainingDay['intensity']) => {
    switch (intensity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            <span>Plano de Treino da Semana (IA)</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {weeklyPlan.map((day) => (
          <div key={day.id} className="flex items-center p-3 border rounded-lg bg-gray-50">
            <div className="flex-shrink-0 w-12 text-sm font-medium text-gray-700">
              {day.day}
            </div>
            <div className="flex-grow mx-2">
              <div className="flex items-center">
                {getActivityIcon(day.type, day.intensity)}
                <span className="ml-2 font-medium text-sm">{day.title}</span>
                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getIntensityColor(day.intensity)}`}>
                  {day.intensity === 'low' ? 'Leve' : day.intensity === 'medium' ? 'Moderado' : 'Intenso'}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{day.description}</p>
            </div>
            <div className="flex-shrink-0 flex items-center text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              {day.duration}min
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" onClick={onGenerateNewPlan}>
          Gerar Novo Plano
        </Button>
        <Button onClick={onViewFullPlan}>
          Ver Plano Completo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainingPlanPreview;

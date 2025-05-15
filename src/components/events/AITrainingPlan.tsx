
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Bike, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  BarChart4
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface TrainingPlanProps {
  eventName: string;
  distance: number;
  elevation: number;
  eventId?: string;
  eventDate?: string;
  eventType?: string;
}

interface TrainingDay {
  day: number;
  date: string;
  type: string;
  title: string;
  description: string;
  duration: number;
  intensity: 'recovery' | 'low' | 'medium' | 'high' | 'rest';
}

// Example of a mock training plan generator
const generateMockPlan = (days: number, eventType: string): TrainingDay[] => {
  const today = new Date();
  const plan: TrainingDay[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    let type = 'rest';
    let title = 'Descanso';
    let description = 'Dia de recuperação para garantir progresso constante.';
    let intensity: TrainingDay['intensity'] = 'rest';
    let duration = 0;
    
    if (i % 7 === 1) {
      type = 'endurance';
      title = 'Pedal de Longa Duração';
      description = 'Foco em resistência e ritmo constante.';
      intensity = 'medium';
      duration = 90;
    } else if (i % 7 === 3) {
      type = 'interval';
      title = 'Treino Intervalado';
      description = 'Intervalos de alta intensidade para melhorar potência.';
      intensity = 'high';
      duration = 60;
    } else if (i % 7 === 5) {
      type = 'technique';
      title = 'Técnica e Cadência';
      description = 'Foco em melhorar cadência e técnica de pedalada.';
      intensity = 'low';
      duration = 45;
    } else if (i % 7 === 0) {
      type = 'recovery';
      title = 'Pedal de Recuperação';
      description = 'Pedal leve para acelerar a recuperação.';
      intensity = 'recovery';
      duration = 30;
    }
    
    plan.push({
      day: i + 1,
      date: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`,
      type,
      title,
      description,
      duration,
      intensity
    });
  }
  
  return plan;
};

const AITrainingPlan: React.FC<TrainingPlanProps> = ({
  eventName,
  distance,
  elevation,
  eventId = '',
  eventDate = 'Em breve',
  eventType = 'Grupo'
}) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TrainingDay[] | null>(null);
  
  const handleGeneratePlan = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockPlan = generateMockPlan(14, eventType);
      setPlan(mockPlan);
      setLoading(false);
    }, 2000);
  };
  
  const getIntensityColor = (intensity: TrainingDay['intensity']) => {
    switch(intensity) {
      case 'recovery': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-amber-100 text-amber-800';
      case 'high': return 'bg-red-100 text-red-800';
      case 'rest': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-primary/10 p-4">
        <div className="flex items-center">
          <BarChart4 className="h-6 w-6 text-primary mr-3" />
          <h3 className="font-medium text-lg">Prepare-se com a IA do TrailSynk</h3>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Gere um plano de treino personalizado com base neste evento, suas estatísticas e preferências.
        </p>
      </div>
      
      {!plan && !loading && (
        <div className="p-4">
          <div className="space-y-3 mb-5">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-2" />
              <span>Evento em: <strong>{eventDate}</strong></span>
            </div>
            <div className="flex items-center">
              <Bike className="h-4 w-4 text-gray-500 mr-2" />
              <span>Tipo: <strong>{eventType}</strong></span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span>Distância: <strong>{distance} km</strong></span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
              <span>Plano: <strong>14 dias</strong> (sugerido)</span>
            </div>
          </div>
          
          <Button 
            onClick={handleGeneratePlan}
            className="w-full"
          >
            Gerar Meu Plano de Treino (IA)
          </Button>
        </div>
      )}
      
      {loading && (
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4 p-3 border rounded-md">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {plan && (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Seu Plano de 14 dias para {eventName}</h4>
            <Button variant="outline" size="sm" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" /> Adicionar ao Calendário
            </Button>
          </div>
          
          <div className="space-y-3">
            {plan.map((day, index) => (
              <div key={index} className={`p-3 border rounded-md ${day.intensity === 'rest' ? 'bg-gray-50' : 'bg-white'}`}>
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">D{day.day}</span>
                    </div>
                    <div>
                      <h5 className="font-medium">{day.title}</h5>
                      <span className="text-xs text-gray-500">{day.date}</span>
                    </div>
                  </div>
                  
                  <Badge className={getIntensityColor(day.intensity)}>
                    {day.intensity === 'rest' ? 'Descanso' : 
                     day.intensity === 'recovery' ? 'Recuperação' :
                     day.intensity === 'low' ? 'Leve' :
                     day.intensity === 'medium' ? 'Moderado' : 'Intenso'}
                  </Badge>
                </div>
                
                {day.intensity !== 'rest' && (
                  <>
                    <p className="text-sm text-gray-600 mt-1">{day.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        <Clock className="inline-block h-3 w-3 mr-1" /> {day.duration} min
                      </span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          <Button variant="link" className="mt-4 w-full" onClick={() => setPlan(null)}>
            Gerar Plano Diferente <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default AITrainingPlan;

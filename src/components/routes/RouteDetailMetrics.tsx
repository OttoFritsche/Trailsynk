
import React from 'react';
import { TrendingUp, MapPin, Clock } from 'lucide-react';

interface RouteDetailMetricsProps {
  distance: number;
  elevation: number;
  type: string;
}

export const RouteDetailMetrics: React.FC<RouteDetailMetricsProps> = ({
  distance,
  elevation,
  type
}) => {
  // Estima o tempo baseado na distância e tipo (velocidade média)
  const estimatedTime = () => {
    // Velocidades médias por tipo em km/h
    const avgSpeeds: Record<string, number> = {
      'estrada': 22,
      'mountain': 12,
      'gravel': 18,
      'urbano': 15
    };
    
    const speed = avgSpeeds[type] || 15; // velocidade padrão se tipo não encontrado
    const hours = distance / speed;
    
    const totalMinutes = Math.round(hours * 60);
    const displayHours = Math.floor(totalMinutes / 60);
    const displayMinutes = totalMinutes % 60;
    
    if (displayHours === 0) {
      return `${displayMinutes}min`;
    } else {
      return `${displayHours}h ${displayMinutes}min`;
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
        <MapPin className="h-5 w-5 text-primary mb-1" />
        <div className="text-lg font-semibold">{distance} km</div>
        <div className="text-xs text-muted-foreground">Distância</div>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
        <TrendingUp className="h-5 w-5 text-primary mb-1" />
        <div className="text-lg font-semibold">{elevation} m</div>
        <div className="text-xs text-muted-foreground">Elevação</div>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
        <Clock className="h-5 w-5 text-primary mb-1" />
        <div className="text-lg font-semibold">{estimatedTime()}</div>
        <div className="text-xs text-muted-foreground">Tempo Est.</div>
      </div>
    </div>
  );
};


import React from 'react';
import { Clock, MapPin, TrendingUp, Zap, Heart, Activity } from 'lucide-react';

interface ActivityDetailMetricsProps {
  duration: number; // em segundos
  distance: number;
  elevation: number;
  metrics: {
    avgSpeed: number;
    maxSpeed: number;
    avgCadence?: number;
    avgHeartRate?: number;
    calories?: number;
  };
}

export const ActivityDetailMetrics: React.FC<ActivityDetailMetricsProps> = ({
  duration,
  distance,
  elevation,
  metrics
}) => {
  // Formata o tempo de duração
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Métricas principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
          <Clock className="h-5 w-5 text-primary mb-1" />
          <div className="text-lg font-semibold">{formatDuration(duration)}</div>
          <div className="text-xs text-muted-foreground">Tempo Total</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
          <MapPin className="h-5 w-5 text-primary mb-1" />
          <div className="text-lg font-semibold">{distance.toFixed(1)} km</div>
          <div className="text-xs text-muted-foreground">Distância</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
          <TrendingUp className="h-5 w-5 text-primary mb-1" />
          <div className="text-lg font-semibold">{elevation} m</div>
          <div className="text-xs text-muted-foreground">Elevação</div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center justify-center">
          <Activity className="h-5 w-5 text-primary mb-1" />
          <div className="text-lg font-semibold">{metrics.avgSpeed.toFixed(1)} km/h</div>
          <div className="text-xs text-muted-foreground">Vel. Média</div>
        </div>
      </div>
      
      {/* Métricas detalhadas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded-xl shadow-sm">
          <div className="text-xs text-muted-foreground">Vel. Máxima</div>
          <div className="font-semibold">{metrics.maxSpeed.toFixed(1)} km/h</div>
        </div>
        
        {metrics.avgCadence && (
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <div className="text-xs text-muted-foreground">Cadência Média</div>
            <div className="font-semibold">{metrics.avgCadence} rpm</div>
          </div>
        )}
        
        {metrics.avgHeartRate && (
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <div className="text-xs text-muted-foreground">FC Média</div>
            <div className="font-semibold">{metrics.avgHeartRate} bpm</div>
          </div>
        )}
        
        {metrics.calories && (
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <div className="text-xs text-muted-foreground">Calorias</div>
            <div className="font-semibold">{metrics.calories} kcal</div>
          </div>
        )}
      </div>
    </>
  );
};

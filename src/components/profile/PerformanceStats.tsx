
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, TrendingUp, Zap, Mountain } from 'lucide-react';

export interface PerformanceStatsProps {
  stats: {
    weeklyDistance: number;
    totalElevation: number;
    avgSpeed: number;
    favoriteType: string;
  };
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Estatísticas de Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Distância Semanal</p>
              <p className="font-medium">{stats.weeklyDistance} km</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Elevação Total</p>
              <p className="font-medium">{stats.totalElevation} m</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Velocidade Média</p>
              <p className="font-medium">{stats.avgSpeed} km/h</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              <Mountain className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tipo Favorito</p>
              <p className="font-medium">{stats.favoriteType}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceStats;

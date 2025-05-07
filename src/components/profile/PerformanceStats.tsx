
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserStats } from '@/types/profile';

interface PerformanceStatsProps {
  userStats: UserStats;
  formatDuration: (minutes: number) => string;
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({ userStats, formatDuration }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Estatísticas de Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Distância Total</p>
            <p className="text-xl font-bold">{userStats.totalDistance} km</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Tempo Total</p>
            <p className="text-xl font-bold">{formatDuration(userStats.totalDuration)}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Maior Elevação</p>
            <p className="text-xl font-bold">{userStats.highestElevation}m</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Total de Pedais</p>
            <p className="text-xl font-bold">{userStats.totalRides}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Visualize dados detalhados de performance, gráficos e análises na página de estatísticas.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full flex justify-between">
          <Link to="/app/statistics">
            Ver Estatísticas Completas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PerformanceStats;

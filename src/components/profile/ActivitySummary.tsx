
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bike, Mountain, Route } from 'lucide-react';
import { UserStats } from '@/types/profile';

interface ActivitySummaryProps {
  userStats: UserStats;
  formatDuration: (minutes: number) => string;
  recentActivitiesCount?: number;
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ 
  userStats, 
  formatDuration,
  recentActivitiesCount = 23
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Summary card */}
      <Card className="md:col-span-4">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3">Resumo de Atividades</h3>
          <div className="text-3xl font-bold mb-2">{recentActivitiesCount}</div>
          <p className="text-muted-foreground text-sm">Atividades nas últimas 4 semanas</p>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Total de Pedais</div>
              <div className="font-medium">{userStats.totalRides}</div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm text-muted-foreground">Distância Total</div>
              <div className="font-medium">{userStats.totalDistance} km</div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm text-muted-foreground">Tempo Total</div>
              <div className="font-medium">{formatDuration(userStats.totalDuration)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Activity type distribution */}
      <Card className="md:col-span-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Horas por Tipo de Atividade (Última Semana)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-3 bg-blue-100 rounded-full mb-2">
                <Bike className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-lg font-bold">3h 20m</span>
              <span className="text-sm text-muted-foreground">Ciclismo urbano</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-3 bg-green-100 rounded-full mb-2">
                <Mountain className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-lg font-bold">5h 45m</span>
              <span className="text-sm text-muted-foreground">Mountain bike</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
              <div className="p-3 bg-purple-100 rounded-full mb-2">
                <Route className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-lg font-bold">1h 10m</span>
              <span className="text-sm text-muted-foreground">Trilhas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivitySummary;

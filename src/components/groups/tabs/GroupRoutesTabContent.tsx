
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Route } from 'lucide-react';

interface GroupRoutesTabContentProps {
  routes: Array<{
    id: string;
    name: string;
    distance: number;
    elevation: number;
  }>;
  onAddRouteClick?: () => void;
}

export const GroupRoutesTabContent: React.FC<GroupRoutesTabContentProps> = ({
  routes,
  onAddRouteClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {routes.map((route) => (
        <Card key={route.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col h-full">
              <div className="h-32 bg-gray-200 relative">
                {/* Placeholder para o traçado da rota */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <Route className="h-8 w-8" />
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-medium">{route.name}</h4>
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <span>{route.distance} km</span>
                  <span>↑ {route.elevation} m</span>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="overflow-hidden h-full">
        <CardContent className="p-0 h-full">
          <div 
            className="flex flex-col justify-center items-center h-full p-8 text-center cursor-pointer hover:bg-gray-50"
            onClick={onAddRouteClick}
          >
            <Plus className="h-12 w-12 text-gray-400 mb-2" />
            <h4 className="font-medium">Criar Nova Rota para o Grupo</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Compartilhe suas trilhas favoritas com o grupo
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bike, PlusCircle, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RouteInfoOverlayProps {
  routeId: string;
  routeName: string;
  routeType: string;
  distance: number;
  elevation: number;
  difficulty?: 'easy' | 'moderate' | 'hard';
  className?: string;
}

const RouteInfoOverlay: React.FC<RouteInfoOverlayProps> = ({
  routeId,
  routeName,
  routeType,
  distance,
  elevation,
  difficulty = 'moderate',
  className
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRouteTypeIcon = () => {
    switch (routeType) {
      case 'mountain':
        return <Mountain size={16} className="text-green-500" />;
      case 'road':
        return <Bike size={16} className="text-blue-500" />;
      default:
        return <Bike size={16} className="text-gray-500" />;
    }
  };

  const getRouteDifficultyText = () => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'moderate': return 'Moderada';
      case 'hard': return 'Difícil';
      default: return 'Moderada';
    }
  };

  return (
    <Card className={cn(
      "bg-white/95 shadow-lg border rounded-lg overflow-hidden transition-all",
      className
    )}>
      <CardContent className="p-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-base">{routeName}</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
              <PlusCircle className="h-3 w-3 mr-1" />
              Salvar
            </Button>
            <Button size="sm" className="h-7 px-2 text-xs bg-[#2ECC71] hover:bg-[#27ae60]">
              <Bike className="h-3 w-3 mr-1" />
              Pedalar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-xs text-gray-500">Tipo:</span>
            <div className="font-medium flex items-center mt-1">
              {getRouteTypeIcon()}
              <span className="ml-1">
                {routeType === 'mountain' ? 'Mountain Bike' : 'Estrada'}
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500">Distância:</span>
            <p className="font-medium mt-1">{distance} km</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Elevação:</span>
            <p className="font-medium mt-1">{elevation} m</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Dificuldade:</span>
            <div className="flex items-center mt-1">
              <span className={cn(
                "w-2 h-2 rounded-full mr-1",
                getDifficultyColor()
              )}></span>
              <span className="font-medium">{getRouteDifficultyText()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteInfoOverlay;

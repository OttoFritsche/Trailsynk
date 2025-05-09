
import React from 'react';
import EnhancedMapPlaceholder from './EnhancedMapPlaceholder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Route, Map, Navigation, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RouteMapPlaceholderProps {
  routeName?: string;
  routeType?: 'road' | 'mountain' | 'urban' | 'gravel';
  routeDistance?: number;
  routeElevation?: number;
  showControls?: boolean;
  height?: string;
  className?: string;
  onViewDetails?: () => void;
}

const RouteMapPlaceholder: React.FC<RouteMapPlaceholderProps> = ({
  routeName = 'Nova Rota',
  routeType = 'road',
  routeDistance,
  routeElevation,
  showControls = true,
  height = 'h-[400px]',
  className,
  onViewDetails
}) => {
  // Get appropriate image based on route type
  const getRouteImage = () => {
    switch (routeType) {
      case 'road':
        return 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop&q=60';
      case 'mountain':
        return 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop&q=60';
      case 'urban':
        return 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&auto=format&fit=crop&q=60';
      case 'gravel':
        return 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60';
      default:
        return '';
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Route className="h-5 w-5 text-primary" />
            {routeName}
          </CardTitle>
          {routeType && (
            <div className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {routeType.charAt(0).toUpperCase() + routeType.slice(1)}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <EnhancedMapPlaceholder
          type="route"
          height={height}
          title={routeName}
          description={
            routeDistance && routeElevation 
              ? `${routeDistance} km - ${routeElevation}m de elevação` 
              : undefined
          }
          imageSrc={getRouteImage()}
        />
        
        {showControls && (
          <div className="p-4 flex justify-between items-center">
            <div className="space-y-1">
              {routeDistance && (
                <div className="flex items-center text-sm">
                  <Navigation className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{routeDistance} km</span>
                </div>
              )}
              {routeElevation && (
                <div className="flex items-center text-sm">
                  <Map className="h-4 w-4 text-gray-500 mr-2" />
                  <span>{routeElevation}m elev.</span>
                </div>
              )}
            </div>
            
            {onViewDetails && (
              <Button size="sm" onClick={onViewDetails}>
                Ver Detalhes
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteMapPlaceholder;

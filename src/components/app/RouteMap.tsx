
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import RouteMapControls from './RouteMapControls';
import RouteMapOverlay from './RouteMapOverlay';
import RouteMapRenderer from './RouteMapRenderer';
import { mockRoutes } from './routes/mockRoutes';

interface RouteMapProps {
  routeId?: string;
  className?: string;
  isEditing?: boolean;
  onPointAdded?: (lat: number, lng: number) => void;
}

const RouteMap: React.FC<RouteMapProps> = ({ 
  routeId, 
  className, 
  isEditing = false,
  onPointAdded 
}) => {
  const [zoom, setZoom] = useState(13);
  const maxZoom = 18;
  const minZoom = 8;
  
  const handleZoomIn = () => {
    if (zoom < maxZoom) {
      setZoom(prev => prev + 1);
    }
  };
  
  const handleZoomOut = () => {
    if (zoom > minZoom) {
      setZoom(prev => prev - 1);
    }
  };
  
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEditing || !onPointAdded) return;
    
    // This is a simplified simulation of map coordinates
    // In a real implementation, we'd use the actual map library's methods
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert click position to simulated latitude/longitude
    // These are arbitrary calculations just for demonstration
    // In a real app, we would use the map library's methods
    const simulatedLat = 90 - (y / rect.height * 180);
    const simulatedLng = (x / rect.width * 360) - 180;
    
    onPointAdded(simulatedLat, simulatedLng);
  };
  
  return (
    <Card className={`overflow-hidden ${className || ''}`}>
      <CardContent className="p-0">
        <div 
          className="relative w-full h-64" 
          style={{ minHeight: '250px' }}
          onClick={handleMapClick}
        >
          <RouteMapRenderer 
            routeId={routeId} 
            zoom={zoom}
            isEditing={isEditing}
            points={isEditing ? [] : undefined}
          />
          <RouteMapControls 
            zoom={zoom}
            maxZoom={maxZoom}
            minZoom={minZoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
          {routeId && !isEditing && (
            <RouteMapOverlay routeId={routeId} routes={mockRoutes} />
          )}
          {isEditing && (
            <div className="absolute bottom-0 left-0 right-0 bg-white/75 p-2 text-xs text-center text-gray-600">
              Clique no mapa para adicionar pontos à rota
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteMap;

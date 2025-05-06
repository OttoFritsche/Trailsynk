
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import RouteMapControls from './RouteMapControls';
import RouteMapOverlay from './RouteMapOverlay';
import RouteMapRenderer from './RouteMapRenderer';
import { mockRoutes } from './routes/mockRoutes';

interface RouteMapProps {
  routeId?: string;
  className?: string;
}

const RouteMap: React.FC<RouteMapProps> = ({ routeId, className }) => {
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
  
  return (
    <Card className={`overflow-hidden ${className || ''}`}>
      <CardContent className="p-0">
        <div className="relative w-full h-64" style={{ minHeight: '250px' }}>
          <RouteMapRenderer routeId={routeId} zoom={zoom} />
          <RouteMapControls 
            zoom={zoom}
            maxZoom={maxZoom}
            minZoom={minZoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
          <RouteMapOverlay routeId={routeId} routes={mockRoutes} />
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteMap;

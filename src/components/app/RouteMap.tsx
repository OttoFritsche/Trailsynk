
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import RouteMapControls from './RouteMapControls';
import RouteMapOverlay from './RouteMapOverlay';
import RouteMapRenderer from './RouteMapRenderer';
import { mockRoutes } from './routes/mockRoutes';
import RouteDrawingTools from '../routes/RouteDrawingTools';
import { toast } from 'sonner';

interface RoutePoint {
  lat: number;
  lng: number;
  elevation?: number;
}

interface RouteMapProps {
  routeId?: string;
  className?: string;
  isEditing?: boolean;
  onPointAdded?: (point: RoutePoint) => void;
  onPointsChanged?: (points: RoutePoint[]) => void;
}

const RouteMap: React.FC<RouteMapProps> = ({ 
  routeId, 
  className, 
  isEditing = false,
  onPointAdded,
  onPointsChanged
}) => {
  const [zoom, setZoom] = useState(13);
  const maxZoom = 18;
  const minZoom = 8;
  const [points, setPoints] = useState<RoutePoint[]>([]);
  const [undoStack, setUndoStack] = useState<RoutePoint[][]>([]);
  const [redoStack, setRedoStack] = useState<RoutePoint[][]>([]);
  const [drawMode, setDrawMode] = useState<'manual' | 'snap' | 'quick'>('manual');
  const [isQuickDrawing, setIsQuickDrawing] = useState(false);
  const [quickDrawPoints, setQuickDrawPoints] = useState<RoutePoint[]>([]);
  
  // Reset points when switching to editing mode
  useEffect(() => {
    if (isEditing) {
      setPoints([]);
      setUndoStack([]);
      setRedoStack([]);
    }
  }, [isEditing]);
  
  // Notify parent component when points change
  useEffect(() => {
    if (onPointsChanged && points.length > 0) {
      onPointsChanged(points);
    }
  }, [points, onPointsChanged]);
  
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
    if (!isEditing) return;
    
    // Get map dimensions for coordinate calculation
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert click position to simulated latitude/longitude
    // These are arbitrary calculations just for demonstration
    const simulatedLat = 90 - (y / rect.height * 180);
    const simulatedLng = (x / rect.width * 360) - 180;
    
    // Simulate elevation data (would come from API in real implementation)
    const randomElevation = Math.floor(Math.random() * 200) + 800; // Random elevation between 800-1000m
    
    const newPoint: RoutePoint = { 
      lat: simulatedLat, 
      lng: simulatedLng,
      elevation: randomElevation
    };
    
    if (drawMode === 'quick') {
      handleQuickDrawClick(newPoint);
      return;
    }
    
    // For manual and snap modes, add the point directly
    addPoint(newPoint);
  };
  
  const handleQuickDrawClick = (point: RoutePoint) => {
    if (quickDrawPoints.length === 0) {
      // First point (start)
      setQuickDrawPoints([point]);
      toast.info("Clique para definir o ponto final da rota");
    } else if (quickDrawPoints.length === 1) {
      // Second point (end) - generate a route
      const start = quickDrawPoints[0];
      const end = point;
      
      // In a real implementation, we'd call an API to generate a route
      // For now, let's simulate a route with some intermediary points
      generateSimulatedRoute(start, end);
      
      // Reset quick draw state
      setQuickDrawPoints([]);
      setIsQuickDrawing(false);
    }
  };
  
  const generateSimulatedRoute = (start: RoutePoint, end: RoutePoint) => {
    // Generate some points between start and end
    const numPoints = 6; // Generate 6 intermediary points
    const newPoints = [start];
    
    for (let i = 1; i <= numPoints; i++) {
      const fraction = i / (numPoints + 1);
      const lat = start.lat + (end.lat - start.lat) * fraction;
      const lng = start.lng + (end.lng - start.lng) * fraction;
      
      // Add some randomness
      const latOffset = (Math.random() - 0.5) * 0.01;
      const lngOffset = (Math.random() - 0.5) * 0.01;
      
      // Generate elevation with a hill in the middle
      let elevFactor = Math.sin(fraction * Math.PI);
      const elevation = start.elevation! + 
        (end.elevation! - start.elevation!) * fraction + 
        elevFactor * 100; // Add a hill
      
      newPoints.push({
        lat: lat + latOffset,
        lng: lng + lngOffset,
        elevation: Math.round(elevation)
      });
    }
    
    newPoints.push(end);
    
    // Save current state to undo stack
    setUndoStack(prev => [...prev, [...points]]);
    
    // Update points
    setPoints(newPoints);
    setRedoStack([]);
    
    toast.success("Rota gerada com sucesso!");
  };
  
  const addPoint = (point: RoutePoint) => {
    // Save current state to undo stack
    setUndoStack(prev => [...prev, [...points]]);
    
    // Add new point
    setPoints(prev => [...prev, point]);
    
    // Clear redo stack since we're adding a new point
    setRedoStack([]);
    
    if (onPointAdded) {
      onPointAdded(point);
    }
    
    // Display tooltip for first few points
    if (points.length === 0) {
      toast.info("Clique para adicionar mais pontos à rota");
    }
  };
  
  const handleUndo = () => {
    if (undoStack.length === 0) return;
    
    // Get the last state from the undo stack
    const prevPoints = undoStack[undoStack.length - 1];
    
    // Save current state to redo stack
    setRedoStack(prev => [...prev, [...points]]);
    
    // Update points to the previous state
    setPoints(prevPoints);
    
    // Remove the last state from the undo stack
    setUndoStack(prev => prev.slice(0, prev.length - 1));
  };
  
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    
    // Get the last state from the redo stack
    const nextPoints = redoStack[redoStack.length - 1];
    
    // Save current state to undo stack
    setUndoStack(prev => [...prev, [...points]]);
    
    // Update points to the next state
    setPoints(nextPoints);
    
    // Remove the last state from the redo stack
    setRedoStack(prev => prev.slice(0, prev.length - 1));
  };
  
  const handleToggleDrawMode = (mode: 'manual' | 'snap' | 'quick') => {
    if (mode === 'quick' && drawMode !== 'quick') {
      // Entering quick draw mode
      setIsQuickDrawing(true);
      setQuickDrawPoints([]);
      toast.info("Clique para definir o ponto inicial da rota");
    } else if (mode === 'snap' && drawMode !== 'snap') {
      toast.info("Modo 'Snap to Trails' ativado");
    }
    
    setDrawMode(mode);
  };
  
  return (
    <Card className={`overflow-hidden ${className || ''}`}>
      <CardContent className="p-0">
        <div 
          className="relative w-full h-64" 
          style={{ minHeight: '350px' }}
          onClick={handleMapClick}
        >
          <RouteMapRenderer 
            routeId={routeId} 
            zoom={zoom}
            isEditing={isEditing}
            points={isEditing ? points.map(p => [p.lat, p.lng]) : undefined}
          />
          
          <RouteMapControls 
            zoom={zoom}
            maxZoom={maxZoom}
            minZoom={minZoom}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
          
          {isEditing && (
            <RouteDrawingTools 
              onUndo={handleUndo}
              onRedo={handleRedo}
              onToggleDrawMode={handleToggleDrawMode}
              activeDrawMode={drawMode}
              canUndo={undoStack.length > 0}
              canRedo={redoStack.length > 0}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
            />
          )}
          
          {routeId && !isEditing && (
            <RouteMapOverlay routeId={routeId} routes={mockRoutes} />
          )}
          
          {isEditing && drawMode === 'quick' && (
            <div className="absolute bottom-0 left-0 right-0 bg-white/75 p-2 text-xs text-center text-gray-600">
              {quickDrawPoints.length === 0 ? 
                "Clique para definir o ponto inicial da rota" :
                "Clique para definir o ponto final da rota"}
            </div>
          )}
          
          {isEditing && drawMode !== 'quick' && (
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


import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Layers, ZoomIn, ZoomOut, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventMapMarker from '@/components/events/EventMapMarker';

interface EventLocation {
  id: string;
  name: string;
  type: 'Grupo' | 'Competição' | 'Aberto' | string;
  lat: number;
  lng: number;
  participants?: number;
  maxParticipants?: number | null;
}

interface EventMapProps {
  locations: EventLocation[];
  activeId?: string;
  onMarkerClick?: (id: string) => void;
  className?: string;
  height?: string;
}

const EventMap: React.FC<EventMapProps> = ({
  locations = [],
  activeId,
  onMarkerClick,
  className = '',
  height = 'h-[400px]'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(13);
  const [showMapbox, setShowMapbox] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  
  // Initialize the map (this is a simplified mock implementation)
  useEffect(() => {
    if (mapRef.current && locations.length > 0) {
      // In a real implementation, initialize the map library here (Mapbox, Leaflet, etc.)
      // For now, we just render markers on a placeholder
      
      // Check if we have a stored Mapbox token
      const storedToken = localStorage.getItem('mapbox_token');
      if (storedToken) {
        setMapboxToken(storedToken);
        setShowMapbox(true);
      }
    }
  }, [locations]);
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 1, 18));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 1, 1));
  };
  
  const handleMapTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const token = new FormData(form).get('mapbox_token') as string;
    
    if (token) {
      localStorage.setItem('mapbox_token', token);
      setMapboxToken(token);
      setShowMapbox(true);
    }
  };
  
  const getVariantForType = (type: string): 'default' | 'group' | 'competition' | 'open' => {
    switch (type) {
      case 'Grupo':
        return 'group';
      case 'Competição':
        return 'competition';
      case 'Aberto':
        return 'open';
      default:
        return 'default';
    }
  };
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className={`relative ${height}`} ref={mapRef}>
          {showMapbox && mapboxToken ? (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Mapa Mapbox carregaria aqui com o token: {mapboxToken.substring(0, 10)}...</p>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-100 overflow-hidden">
              {/* Map placeholder with grid lines */}
              <div className="w-full h-full relative" style={{
                backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
                backgroundSize: `${20 * zoom}px ${20 * zoom}px`
              }}>
                {/* Render event markers */}
                <div className="absolute inset-0 p-4 flex items-center justify-center">
                  <div className="w-full h-full max-w-lg max-h-lg relative">
                    {locations.map((location) => {
                      // Calculate position (simplified for example)
                      // In a real map, this would use proper geo coordinates
                      const left = (((location.lng + 180) % 360) / 360) * 100;
                      const top = ((90 - location.lat) / 180) * 100;
                      
                      return (
                        <div
                          key={location.id}
                          style={{
                            position: 'absolute',
                            left: `${left}%`,
                            top: `${top}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                          onClick={() => onMarkerClick && onMarkerClick(location.id)}
                        >
                          <EventMapMarker 
                            active={location.id === activeId}
                            variant={getVariantForType(location.type)}
                          >
                            <div className="text-xs font-medium">{location.name}</div>
                            {location.participants !== undefined && (
                              <div className="text-xs text-gray-500">
                                {location.participants} {location.maxParticipants ? `/ ${location.maxParticipants}` : ''} participantes
                              </div>
                            )}
                          </EventMapMarker>
                        </div>
                      );
                    })}
                    
                    {/* Center indicator */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-gray-400 bg-white/50"></div>
                  </div>
                </div>
                
                {/* Mapbox token input */}
                {!showMapbox && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                      <div className="flex items-center mb-4">
                        <MapIcon className="h-6 w-6 text-primary mr-2" />
                        <h3 className="text-lg font-semibold">Mapbox API Token</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Para usar o mapa interativo, insira seu token público do Mapbox. 
                        Você pode obter um gratuitamente em <a href="https://www.mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
                      </p>
                      
                      <form onSubmit={handleMapTokenSubmit} className="space-y-4">
                        <input
                          type="text"
                          name="mapbox_token"
                          placeholder="pk.eyJ1Ijoie3VzZXJuYW1lfSIsImEi..."
                          className="w-full px-3 py-2 border rounded-md"
                          required
                        />
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => setShowMapbox(true)}>
                            Pular
                          </Button>
                          <Button type="submit" className="bg-primary hover:bg-primary-dark">
                            Salvar Token
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Map controls */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white shadow-md hover:bg-gray-100"
              onClick={handleZoomIn}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white shadow-md hover:bg-gray-100"
              onClick={handleZoomOut}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 bg-white shadow-md hover:bg-gray-100"
            >
              <Layers className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-md shadow-md text-xs">
            <div className="font-medium mb-1">Tipos de evento:</div>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>Grupo</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span>Competição</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Aberto</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventMap;

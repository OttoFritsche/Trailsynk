import React, { useState } from 'react';
import { Bike, Mountain, PlusCircle, Map, Zap, Layers, Maximize, Minimize, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RouteMap from '@/components/app/RouteMap';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChevronDown } from '@/components/routes/ChevronDown';
import { ChevronUp } from '@/components/routes/ChevronUp';
import RouteInfoOverlay from '@/components/routes/RouteInfoOverlay';
import MapStyleSelector from '@/components/routes/MapStyleSelector';
import FullscreenButton from '@/components/routes/FullscreenButton';

// Mock data for route examples
const mockRoutes = [
  {
    id: '1',
    name: 'Circuito da Lagoa',
    distance: 15.8,
    elevation: 125,
    type: 'road',
    favorite: true
  },
  {
    id: '2',
    name: 'Trilha da Serra',
    distance: 22.3,
    elevation: 450,
    type: 'mountain',
    favorite: false
  },
  {
    id: '3',
    name: 'Volta ao Parque',
    distance: 8.5,
    elevation: 65,
    type: 'urban',
    favorite: true
  },
  {
    id: '4',
    name: 'Travessia Litoral',
    distance: 35.2,
    elevation: 210,
    type: 'road',
    favorite: false
  },
  {
    id: '5',
    name: 'Circuito das Cachoeiras',
    distance: 18.7,
    elevation: 520,
    type: 'mountain',
    favorite: true
  }
];

const Routes: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [selectedRouteId, setSelectedRouteId] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPanelCollapsed, setIsPanelCollapsed] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [mapControlsVisible, setMapControlsVisible] = useState<boolean>(true);
  const [mapStyle, setMapStyle] = useState<'outdoors' | 'streets' | 'satellite'>('outdoors');
  
  const handleRouteSelection = (routeId: string) => {
    setSelectedRouteId(routeId);
  };
  
  const getRouteTypeIcon = (type: string) => {
    switch (type) {
      case 'road':
        return <Bike size={16} className="text-blue-500" />;
      case 'mountain':
        return <Mountain size={16} className="text-green-500" />;
      default:
        return <Bike size={16} className="text-gray-500" />;
    }
  };
  
  const handleNewRoute = () => {
    navigate('/app/routes/new');
  };

  const filteredRoutes = mockRoutes.filter(route => 
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleMapControls = () => {
    setMapControlsVisible(!mapControlsVisible);
  };

  const changeMapStyle = (style: 'outdoors' | 'streets' | 'satellite') => {
    setMapStyle(style);
  };
  
  const selectedRoute = selectedRouteId 
    ? filteredRoutes.find(r => r.id === selectedRouteId) 
    : undefined;
  
  return (
    <div className={cn(
      "h-[calc(100vh-4rem)]",
      isFullscreen && "fixed inset-0 z-50 h-screen"
    )}>
      {!isFullscreen && (
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Rotas Sugeridas e Exploradas</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              size="sm"
              className="hidden md:flex"
              onClick={() => changeMapStyle(mapStyle === 'outdoors' ? 'satellite' : 'outdoors')}
            >
              <Layers className="h-4 w-4 mr-2" />
              {mapStyle === 'outdoors' ? 'Satélite' : 'Terreno'}
            </Button>
            <Button 
              className="bg-[#2ECC71] hover:bg-[#27ae60]"
              onClick={handleNewRoute}
              size="sm"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Nova Rota
            </Button>
          </div>
        </div>
      )}

      <div className={cn(
        "rounded-lg overflow-hidden border border-border bg-card",
        isFullscreen ? "h-full" : "h-[calc(100%-3rem)]"
      )}>
        {isMobile ? (
          // Mobile layout with stacked components
          <div className="flex flex-col h-full">
            <div className="relative flex-1">
              <RouteMap
                routeId={selectedRouteId}
                className="w-full h-full"
                mapStyle={mapStyle}
              />
              
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <FullscreenButton onToggle={toggleFullscreen} />
                
                {mapControlsVisible && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/90"
                    onClick={() => changeMapStyle(mapStyle === 'outdoors' ? 'satellite' : 'outdoors')}
                  >
                    <Layers className="h-4 w-4" />
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/90"
                  onClick={toggleMapControls}
                >
                  {mapControlsVisible ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
              </div>

              {!isPanelCollapsed ? (
                <div className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-gray-200">
                  <div className="p-2">
                    <Input
                      placeholder="Buscar rotas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="mb-2"
                    />
                    <ScrollArea className="h-36 mb-2">
                      <div className="space-y-2">
                        {filteredRoutes.map(route => (
                          <div
                            key={route.id}
                            onClick={() => handleRouteSelection(route.id)}
                            className={`p-3 rounded-md cursor-pointer transition-colors ${
                              selectedRouteId === route.id
                                ? 'bg-primary/10 border border-primary/20'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">{route.name}</h4>
                              {getRouteTypeIcon(route.type)}
                            </div>
                            <div className="flex mt-2 text-xs text-gray-600 space-x-4">
                              <div className="flex items-center">
                                <span className="font-medium">{route.distance}</span>
                                <span className="ml-1">km</span>
                              </div>
                              <div className="flex items-center">
                                <span className="font-medium">{route.elevation}</span>
                                <span className="ml-1">m</span>
                                <span className="ml-1">↑</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="flex justify-between items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsPanelCollapsed(true)}
                        className="text-xs"
                      >
                        <ChevronDown className="h-3 w-3 mr-1" />
                        Ocultar Lista
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => navigate('/app/routes/new')}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Sugerir Rota com IA
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                selectedRoute ? (
                  <div className="absolute bottom-4 left-4 right-4">
                    <RouteInfoOverlay
                      routeId={selectedRoute.id}
                      routeName={selectedRoute.name}
                      routeType={selectedRoute.type}
                      distance={selectedRoute.distance}
                      elevation={selectedRoute.elevation}
                      difficulty={selectedRoute.elevation > 400 ? 'hard' : selectedRoute.elevation > 200 ? 'moderate' : 'easy'}
                    />
                  </div>
                ) : (
                  <div className="absolute bottom-4 left-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/90"
                      onClick={() => setIsPanelCollapsed(false)}
                    >
                      <ChevronUp className="h-4 w-4 mr-2" />
                      Mostrar Rotas
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          // Desktop layout with resizable panels
          <ResizablePanelGroup 
            direction="horizontal" 
            className="h-full"
          >
            {!isPanelCollapsed && (
              <>
                <ResizablePanel 
                  defaultSize={20} 
                  minSize={15} 
                  maxSize={30}
                  className="bg-white"
                >
                  <div className="p-4 border-b">
                    <Input
                      placeholder="Buscar rotas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between items-center px-4 py-2 border-b">
                    <span className="text-sm font-medium">Rotas Disponíveis</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => setIsPanelCollapsed(true)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  </div>

                  <ScrollArea className="h-[calc(100%-6rem)]">
                    <div className="p-2 space-y-2">
                      {filteredRoutes.map(route => (
                        <div
                          key={route.id}
                          onClick={() => handleRouteSelection(route.id)}
                          className={`p-3 rounded-md cursor-pointer transition-colors ${
                            selectedRouteId === route.id
                              ? 'bg-primary/10 border border-primary/20'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">{route.name}</h4>
                            {getRouteTypeIcon(route.type)}
                          </div>
                          <div className="flex mt-2 text-xs text-gray-600 space-x-4">
                            <div className="flex items-center">
                              <span className="font-medium">{route.distance}</span>
                              <span className="ml-1">km</span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium">{route.elevation}</span>
                              <span className="ml-1">m</span>
                              <span className="ml-1">↑</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t">
                    <Button variant="outline" size="sm" className="w-full">
                      <Zap className="h-4 w-4 mr-2" />
                      Sugerir Rota com IA
                    </Button>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />
              </>
            )}

            <ResizablePanel defaultSize={isPanelCollapsed ? 100 : 80}>
              <div className="relative w-full h-full">
                <RouteMap
                  routeId={selectedRouteId}
                  className="w-full h-full"
                  mapStyle={mapStyle}
                />
                
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <FullscreenButton onToggle={toggleFullscreen} />
                  
                  {mapControlsVisible && (
                    <MapStyleSelector
                      currentStyle={mapStyle}
                      onChange={changeMapStyle}
                    />
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/90"
                    onClick={toggleMapControls}
                  >
                    {mapControlsVisible ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  </Button>
                </div>

                {isPanelCollapsed && (
                  <div className="absolute top-4 left-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/90"
                      onClick={() => setIsPanelCollapsed(false)}
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Mostrar Lista
                    </Button>
                  </div>
                )}

                {selectedRoute && (
                  <div className="absolute left-4 right-20 bottom-4">
                    <RouteInfoOverlay
                      routeId={selectedRoute.id}
                      routeName={selectedRoute.name}
                      routeType={selectedRoute.type}
                      distance={selectedRoute.distance}
                      elevation={selectedRoute.elevation}
                      difficulty={selectedRoute.elevation > 400 ? 'hard' : selectedRoute.elevation > 200 ? 'moderate' : 'easy'}
                    />
                  </div>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};

export default Routes;

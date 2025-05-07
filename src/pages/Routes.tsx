
import React, { useState } from 'react';
import { Bike, Mountain, PlusCircle, Map, Zap, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RouteMap from '@/components/app/RouteMap';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Input } from '@/components/ui/input';

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
  
  return (
    <div className="h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Rotas Sugeridas e Exploradas</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            size="sm"
            className="hidden md:flex"
          >
            <Layers className="h-4 w-4 mr-2" />
            Heatmap
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

      <div className="h-[calc(100%-3rem)] rounded-lg overflow-hidden border border-border bg-card">
        {isMobile ? (
          // Mobile layout with stacked components
          <div className="flex flex-col h-full">
            {!isPanelCollapsed && (
              <div className="p-2 border-b">
                <Input
                  placeholder="Buscar rotas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-2"
                />
                <ScrollArea className="h-48">
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
                <div className="flex justify-center mt-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsPanelCollapsed(true)}>
                    Ocultar Lista
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex-1 relative">
              <RouteMap
                routeId={selectedRouteId}
                className="w-full h-full"
              />
              
              {isPanelCollapsed && (
                <div className="absolute top-4 left-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white"
                    onClick={() => setIsPanelCollapsed(false)}
                  >
                    Mostrar Lista
                  </Button>
                </div>
              )}

              <div className="absolute bottom-4 left-4 space-y-2">
                <Button size="sm" variant="outline" className="bg-white/90 w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Sugerir Rota com IA
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Desktop layout with resizable panels
          <ResizablePanelGroup 
            direction="horizontal" 
            className="h-full"
          >
            <ResizablePanel 
              defaultSize={25} 
              minSize={20} 
              maxSize={40}
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
                <span className="text-xs text-muted-foreground">{filteredRoutes.length} rotas</span>
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

            <ResizablePanel defaultSize={75}>
              <div className="relative w-full h-full">
                <RouteMap
                  routeId={selectedRouteId}
                  className="w-full h-full"
                />
                
                <div className="absolute top-4 right-4 space-x-2">
                  <Button variant="outline" size="sm" className="bg-white/90">
                    <Layers className="h-4 w-4 mr-2" />
                    Heatmap
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/90">
                    <Map className="h-4 w-4 mr-2" />
                    Segmentos
                  </Button>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};

export default Routes;

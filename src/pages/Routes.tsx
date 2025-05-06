
import React from 'react';
import { Bike, Mountain, PlusCircle } from 'lucide-react';
import RouteMap from '@/components/app/RouteMap';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { useMediaQuery } from '@/hooks/use-mobile';

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
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedRouteId, setSelectedRouteId] = React.useState<string | undefined>(undefined);
  
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
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">Rotas Sugeridas e Exploradas</h1>
          <Button className="bg-primary hover:bg-primary-dark">
            <PlusCircle className="h-4 w-4 mr-2" />
            Nova Rota
          </Button>
        </div>
        <p className="text-muted-foreground">
          Visualize, explore e crie suas rotas de ciclismo personalizadas.
        </p>
      </div>
      
      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-3 gap-6'}`}>
        {/* Map area - takes 2/3 of space on desktop */}
        <div className={isMobile ? '' : 'col-span-2'}>
          <RouteMap 
            routeId={selectedRouteId} 
            className="w-full h-[350px] md:h-[500px]" 
          />
        </div>
        
        {/* Routes list - takes 1/3 of space on desktop */}
        <div>
          <Card className="overflow-hidden">
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="font-medium">Rotas Disponíveis</h3>
              <span className="text-xs text-muted-foreground">{mockRoutes.length} rotas</span>
            </div>
            
            <ScrollArea className="h-[300px] md:h-[450px]">
              <div className="p-2">
                {mockRoutes.map(route => (
                  <div
                    key={route.id}
                    onClick={() => handleRouteSelection(route.id)}
                    className={`p-3 rounded-md mb-2 cursor-pointer transition-colors ${
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Routes;


import React, { useState } from 'react';
import RoutesGrid from '@/components/profile/RoutesGrid';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { PlusCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Route {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  imageUrl?: string;
}

interface RoutesTabProps {
  routes: Route[];
}

const RoutesTab: React.FC<RoutesTabProps> = ({ routes }) => {
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Minhas Rotas</h3>
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grade
          </Button>
          <Button 
            variant={viewMode === 'map' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('map')}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Mapa
          </Button>
          <Link to="/app/routes">
            <Button 
              className="bg-[#2ECC71] hover:bg-[#27ae60]"
              size="sm"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Nova Rota
            </Button>
          </Link>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <RoutesGrid routes={routes} />
      ) : (
        <div className="bg-gray-100 rounded-lg p-4 text-center h-[400px] flex items-center justify-center">
          <div>
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Visualização de mapa será implementada em breve!</p>
            <p className="text-gray-500 text-sm mt-2">
              Veja todas as suas rotas no mapa na página completa de rotas
            </p>
            <Link to="/app/routes">
              <Button className="mt-4">
                Ver no Mapa
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutesTab;

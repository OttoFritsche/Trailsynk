
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface Route {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  imageUrl?: string;
}

interface RoutesGridProps {
  routes: Route[];
}

const RoutesGrid: React.FC<RoutesGridProps> = ({ routes }) => {
  if (!routes || routes.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Nenhuma rota encontrada.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {routes.map(route => (
        <Link key={route.id} to={`/app/routes/${route.id}`}>
          <Card className="overflow-hidden h-full transition-all hover:shadow-md">
            <div className="h-32 relative">
              {route.imageUrl ? (
                <img 
                  src={route.imageUrl} 
                  alt={route.name}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Sem imagem</span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm">
                <ArrowUpRight className="h-4 w-4 text-primary" />
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium mb-1 line-clamp-1">{route.name}</h3>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{route.distance} km</span>
                <span>{route.elevation} m elevação</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default RoutesGrid;


import React from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Route {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
}

interface GroupRoutesListProps {
  groupId: string;
  limit?: number;
}

// Dados de exemplo para fins de demonstração
const mockRoutes: Route[] = [
  {
    id: '1',
    name: 'Orla de Salvador',
    distance: 30,
    elevation: 150,
    difficulty: 'easy',
    imageUrl: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Serra da Jiboia',
    distance: 45,
    elevation: 800,
    difficulty: 'hard',
    imageUrl: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Parque da Cidade',
    distance: 15,
    elevation: 250,
    difficulty: 'medium',
    imageUrl: '/placeholder.svg',
  },
];

// Mapeia dificuldade para cores
const difficultyColors = {
  easy: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard: 'bg-red-100 text-red-800',
};

// Mapeia dificuldade para texto em português
const difficultyText = {
  easy: 'Fácil',
  medium: 'Moderada',
  hard: 'Difícil',
};

export const GroupRoutesList: React.FC<GroupRoutesListProps> = ({ groupId, limit }) => {
  // Na implementação real, buscaríamos as rotas do grupo do Supabase
  // baseado no groupId fornecido
  const routes = limit ? mockRoutes.slice(0, limit) : mockRoutes;

  return (
    <div className="space-y-4">
      {routes.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">Nenhuma rota encontrada</p>
      ) : (
        routes.map((route) => (
          <Card key={route.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 h-32 md:h-auto bg-gray-200">
                  <img 
                    src={route.imageUrl || '/placeholder.svg'} 
                    alt={route.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="p-4 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{route.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[route.difficulty]}`}>
                        {difficultyText[route.difficulty]}
                      </span>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        <span>{route.distance} km</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        <span>{route.elevation} m</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">Ver Rota</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

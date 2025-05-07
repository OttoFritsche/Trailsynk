
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

interface TrailSuggestion {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

const TrailSuggestions: React.FC = () => {
  // Mock data for trail suggestions
  const suggestedTrails: TrailSuggestion[] = [
    {
      id: 'trail1',
      name: 'Carlos Lima',
      avatar: 'https://i.pravatar.cc/150?img=20',
      bio: 'Ciclista urbano e de montanha',
    },
    {
      id: 'trail2',
      name: 'Fernanda Santos',
      avatar: 'https://i.pravatar.cc/150?img=29',
      bio: 'Competidora MTB - 3x campeã estadual',
    },
    {
      id: 'trail3',
      name: 'Grupo Pedal Noturno',
      avatar: 'https://i.pravatar.cc/150?img=33',
      bio: 'Grupo oficial de pedais noturnos na cidade',
    }
  ];

  const handleFollowTrail = (trailId: string) => {
    toast.success("Trail adicionado! Esta função será implementada com integração backend.");
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium flex items-center">
            <UserPlus className="mr-2 h-4 w-4 text-primary" />
            Sugestões de Trails
          </h4>
          <Link to="/app/trails" className="text-xs text-primary hover:underline">
            Ver todos
          </Link>
        </div>
        
        <div className="space-y-3">
          {suggestedTrails.map(trail => (
            <div key={trail.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={trail.avatar} 
                    alt={trail.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{trail.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{trail.bio}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2 text-xs"
                onClick={() => handleFollowTrail(trail.id)}
              >
                Seguir
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrailSuggestions;

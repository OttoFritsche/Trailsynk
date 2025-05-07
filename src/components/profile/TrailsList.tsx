
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface Trail {
  id: string;
  name: string;
  avatar: string;
  mutualFriends?: number;
}

interface TrailsListProps {
  trails: Trail[];
  showFollowButton?: boolean;
}

const TrailsList: React.FC<TrailsListProps> = ({ trails, showFollowButton = false }) => {
  if (!trails || trails.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Nenhum trail encontrado.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {trails.map(trail => (
        <Card key={trail.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img 
                    src={trail.avatar} 
                    alt={trail.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <h3 className="font-medium mb-1">{trail.name}</h3>
              {trail.mutualFriends && (
                <p className="text-xs text-muted-foreground mb-3 flex items-center justify-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{trail.mutualFriends} amigos em comum</span>
                </p>
              )}
              
              {showFollowButton && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full mt-2"
                >
                  Seguir
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TrailsList;


import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface Cyclist {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  isFollowing?: boolean;
  location?: string;
  bikeType?: string;
}

interface CyclistSearchResultsProps {
  results: Cyclist[];
  searchQuery: string;
  onConnectClick: (cyclist: Cyclist) => void;
}

export const CyclistSearchResults: React.FC<CyclistSearchResultsProps> = ({
  results,
  searchQuery,
  onConnectClick
}) => {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
        <p className="text-muted-foreground">
          Nenhum ciclista encontrado para "{searchQuery}".
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Resultados da busca</h3>
      
      <div className="space-y-2">
        {results.map((cyclist) => (
          <div 
            key={cyclist.id} 
            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-3">
                <AvatarImage src={cyclist.avatar} alt={cyclist.name} />
                <AvatarFallback>{cyclist.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{cyclist.name}</div>
                <div className="text-sm text-muted-foreground">@{cyclist.username}</div>
                {(cyclist.location || cyclist.bikeType) && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {cyclist.location && <span>{cyclist.location}</span>}
                    {cyclist.location && cyclist.bikeType && <span> • </span>}
                    {cyclist.bikeType && <span>{cyclist.bikeType}</span>}
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              size="sm" 
              variant="outline"
              className="whitespace-nowrap"
              onClick={() => onConnectClick(cyclist)}
            >
              <UserPlus className="mr-1 h-4 w-4" />
              Conectar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};


import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';

interface Cyclist {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  isFollowing?: boolean;
  mutualFriends?: number;
  location?: string;
  bikeType?: string;
}

interface SuggestedCyclistsProps {
  cyclists: Cyclist[];
  onConnectClick: (cyclist: Cyclist) => void;
}

export const SuggestedCyclists: React.FC<SuggestedCyclistsProps> = ({
  cyclists,
  onConnectClick
}) => {
  if (cyclists.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
        <p className="text-muted-foreground">
          Nenhuma sugestão de ciclista no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cyclists.map((cyclist) => (
        <div 
          key={cyclist.id} 
          className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white p-4 rounded-xl shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start mb-3 md:mb-0">
            <Avatar className="h-16 w-16 md:mr-3 mb-2 md:mb-0">
              <AvatarImage src={cyclist.avatar} alt={cyclist.name} />
              <AvatarFallback>{cyclist.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <div className="font-medium">{cyclist.name}</div>
              <div className="text-sm text-muted-foreground">@{cyclist.username}</div>
              
              {cyclist.mutualFriends && cyclist.mutualFriends > 0 && (
                <div className="text-xs flex items-center justify-center md:justify-start mt-1 text-muted-foreground">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{cyclist.mutualFriends} conexões em comum</span>
                </div>
              )}
              
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
            className="whitespace-nowrap"
            onClick={() => onConnectClick(cyclist)}
          >
            <UserPlus className="mr-1 h-4 w-4" />
            Adicionar Trail
          </Button>
        </div>
      ))}
    </div>
  );
};


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface RouteDetailCreatorProps {
  creatorName: string;
  creatorAvatar?: string;
  creatorId: string;
}

export const RouteDetailCreator: React.FC<RouteDetailCreatorProps> = ({
  creatorName,
  creatorAvatar,
  creatorId
}) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    // Navegar para o perfil do criador (implementação futura)
    // navigate(`/app/profile/${creatorId}`);
  };
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={creatorAvatar} alt={creatorName} />
          <AvatarFallback>{creatorName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">Criado por</p>
          <p className="text-sm text-muted-foreground">{creatorName}</p>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleViewProfile}
      >
        Ver Perfil
      </Button>
    </div>
  );
};

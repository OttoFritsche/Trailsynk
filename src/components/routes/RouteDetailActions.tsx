
import React from 'react';
import { Share2, Heart, Save, Route as RouteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RouteDetailActionsProps {
  onRideClick: () => void;
  onSaveClick: () => void;
  onShareClick: () => void;
  isFavorite: boolean;
}

export const RouteDetailActions: React.FC<RouteDetailActionsProps> = ({
  onRideClick,
  onSaveClick,
  onShareClick,
  isFavorite
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button 
        className="flex-1 bg-primary hover:bg-primary/90" 
        onClick={onRideClick}
      >
        <RouteIcon className="mr-2 h-4 w-4" />
        Pedalar Esta Rota
      </Button>
      
      <Button 
        className="flex-1" 
        variant={isFavorite ? "default" : "outline"}
        onClick={onSaveClick}
      >
        <Heart className={`mr-2 h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        {isFavorite ? 'Salvo' : 'Salvar'}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={onShareClick}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

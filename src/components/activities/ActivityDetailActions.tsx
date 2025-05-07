
import React from 'react';
import { Share2, Heart, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ActivityDetailActionsProps {
  onLikeClick: () => void;
  onShareClick: () => void;
  onViewRouteClick: () => void;
  isLiked: boolean;
  hasOriginalRoute: boolean;
}

export const ActivityDetailActions: React.FC<ActivityDetailActionsProps> = ({
  onLikeClick,
  onShareClick,
  onViewRouteClick,
  isLiked,
  hasOriginalRoute
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button 
        className={cn(
          "flex-1", 
          isLiked ? "bg-rose-500 hover:bg-rose-600" : "variant-outline"
        )} 
        variant={isLiked ? "default" : "outline"}
        onClick={onLikeClick}
      >
        <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
        {isLiked ? 'Curtido' : 'Curtir'}
      </Button>
      
      {hasOriginalRoute && (
        <Button 
          className="flex-1" 
          variant="outline"
          onClick={onViewRouteClick}
        >
          <Route className="mr-2 h-4 w-4" />
          Ver Rota Original
        </Button>
      )}
      
      <Button 
        variant="outline" 
        onClick={onShareClick}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

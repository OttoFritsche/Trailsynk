
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageSquare, Bike, Clock, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface Activity {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  type: 'pedal' | 'treino' | 'trilha';
  title: string;
  description?: string;
  metrics: {
    distance: number; // in km
    duration: number; // in minutes
    elevation?: number; // in meters
  };
  imageUrl?: string;
  createdAt: Date;
  likes: number;
  comments: number;
  hasLiked?: boolean;
}

interface ActivityFeedItemProps {
  activity: Activity;
  onLike?: (activityId: string) => void;
  onComment?: (activityId: string) => void;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ 
  activity, 
  onLike, 
  onComment 
}) => {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours ? `${hours}h ` : ''}${mins}min`;
  };
  
  const typeLabels = {
    pedal: 'Pedal',
    treino: 'Treino',
    trilha: 'Trilha',
  };
  
  const typeColors = {
    pedal: 'bg-blue-100 text-blue-800',
    treino: 'bg-orange-100 text-orange-800',
    trilha: 'bg-green-100 text-green-800',
  };
  
  const handleLikeClick = () => {
    if (onLike) onLike(activity.id);
  };
  
  const handleCommentClick = () => {
    if (onComment) onComment(activity.id);
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar className="border-2 border-white shadow-sm">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {activity.user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{activity.user.name}</div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(activity.createdAt, { addSuffix: true, locale: ptBR })}
              </div>
            </div>
          </div>
          <Badge variant="outline" className={typeColors[activity.type]}>
            {typeLabels[activity.type]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pt-2">
        <h3 className="font-semibold text-base">{activity.title}</h3>
        {activity.description && (
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{activity.description}</p>
        )}
        
        <div className="grid grid-cols-3 gap-2 my-3">
          <div className="bg-gray-50 p-2 rounded-lg flex flex-col items-center">
            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <Bike className="h-3 w-3 mr-1" />
              <span>Distância</span>
            </div>
            <div className="text-sm font-medium">{activity.metrics.distance} km</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg flex flex-col items-center">
            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>Duração</span>
            </div>
            <div className="text-sm font-medium">{formatDuration(activity.metrics.duration)}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg flex flex-col items-center">
            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>Elevação</span>
            </div>
            <div className="text-sm font-medium">
              {activity.metrics.elevation ? `${activity.metrics.elevation}m` : 'N/A'}
            </div>
          </div>
        </div>
        
        {activity.imageUrl && (
          <div className="mt-3 rounded-lg overflow-hidden h-48 bg-gray-100">
            <img 
              src={activity.imageUrl} 
              alt={activity.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t flex justify-between">
        <button 
          className={`flex items-center text-sm ${activity.hasLiked ? 'text-primary font-medium' : 'text-muted-foreground'} hover:text-primary transition-colors`}
          onClick={handleLikeClick}
        >
          <Heart className={`h-4 w-4 mr-1 ${activity.hasLiked ? 'fill-primary' : ''}`} />
          <span>{activity.likes}</span>
        </button>
        <button 
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          onClick={handleCommentClick}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{activity.comments}</span>
        </button>
      </CardFooter>
    </Card>
  );
};

export default ActivityFeedItem;

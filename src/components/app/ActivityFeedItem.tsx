
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageSquare, Bike, TrendingUp, TrendingDown } from 'lucide-react';
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
}

interface ActivityFeedItemProps {
  activity: Activity;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ activity }) => {
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
  
  return (
    <Card className="mb-4 overflow-hidden">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>
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
          <p className="text-muted-foreground text-sm mt-1">{activity.description}</p>
        )}
        
        <div className="grid grid-cols-3 gap-2 my-3">
          <div className="bg-gray-50 p-2 rounded flex flex-col items-center">
            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <Bike className="h-3 w-3 mr-1" />
              <span>Distância</span>
            </div>
            <div className="text-sm font-medium">{activity.metrics.distance} km</div>
          </div>
          <div className="bg-gray-50 p-2 rounded flex flex-col items-center">
            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>Duração</span>
            </div>
            <div className="text-sm font-medium">{formatDuration(activity.metrics.duration)}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded flex flex-col items-center">
            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>Elevação</span>
            </div>
            <div className="text-sm font-medium">
              {activity.metrics.elevation ? `${activity.metrics.elevation}m` : 'N/A'}
            </div>
          </div>
        </div>
        
        {activity.imageUrl && (
          <div className="mt-3 rounded-md overflow-hidden h-48 bg-gray-200">
            <img 
              src={activity.imageUrl} 
              alt={activity.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t flex justify-between">
        <button className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <Heart className="h-4 w-4 mr-1" />
          <span>{activity.likes}</span>
        </button>
        <button className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>{activity.comments}</span>
        </button>
      </CardFooter>
    </Card>
  );
};

export default ActivityFeedItem;

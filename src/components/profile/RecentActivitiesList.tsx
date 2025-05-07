
import React from 'react';
import { Activity } from '@/components/app/ActivityFeedItem';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentActivitiesListProps {
  activities: Activity[];
  onLike?: (activityId: string) => void;
  onComment?: (activityId: string) => void;
}

const RecentActivitiesList: React.FC<RecentActivitiesListProps> = ({ 
  activities,
  onLike,
  onComment
}) => {
  if (!activities || activities.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Nenhuma atividade recente encontrada.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Formato de data para exibição
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <Card key={activity.id} className="overflow-hidden">
          <CardContent className="p-0">
            <Link to={`/app/activity/${activity.id}`}>
              {activity.imageUrl && (
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={activity.imageUrl} 
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={activity.user.avatar} 
                      alt={activity.user.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{activity.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{formatDate(activity.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Salvador, BA</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {activity.description && (
                  <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                )}
                
                <div className="grid grid-cols-3 gap-2 text-center py-2 border-y">
                  <div>
                    <div className="text-sm font-medium">Distância</div>
                    <div className="text-lg">{activity.metrics?.distance} km</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Duração</div>
                    <div className="text-lg">{activity.metrics?.duration} min</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Elevação</div>
                    <div className="text-lg">{activity.metrics?.elevation} m</div>
                  </div>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecentActivitiesList;

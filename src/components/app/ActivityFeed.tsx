
import React from 'react';
import ActivityFeedItem, { Activity } from './ActivityFeedItem';

interface ActivityFeedProps {
  activities: Activity[];
  onLike: (activityId: string) => void;
  onComment: (activityId: string) => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, onLike, onComment }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhuma atividade recente.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityFeedItem 
          key={activity.id} 
          activity={activity} 
          onLike={onLike}
          onComment={onComment}
        />
      ))}
    </div>
  );
};

export default ActivityFeed;

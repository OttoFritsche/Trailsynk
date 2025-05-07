
import React from 'react';
import RecentActivitiesList from '@/components/profile/RecentActivitiesList';
import { Activity } from '@/components/app/ActivityFeedItem';

interface ActivitiesTabProps {
  activities: Activity[];
  onLike: (activityId: string) => void;
  onComment: (activityId: string) => void;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({
  activities,
  onLike,
  onComment
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-4">Minhas Atividades</h3>
      <RecentActivitiesList 
        activities={activities}
        onLike={onLike}
        onComment={onComment}
      />
    </div>
  );
};

export default ActivitiesTab;

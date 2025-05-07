
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StravaConnection from '@/components/profile/StravaConnection';
import HeatmapPlaceholder from '@/components/profile/HeatmapPlaceholder';
import AchievementsPlaceholder from '@/components/profile/AchievementsPlaceholder';
import RecentActivitiesList from '@/components/profile/RecentActivitiesList';
import { Activity } from '@/components/app/ActivityFeedItem';

interface OverviewTabProps {
  isConnectedToStrava: boolean;
  handleStravaConnect: () => void;
  recentActivities: Activity[];
  onLike: (activityId: string) => void;
  onComment: (activityId: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  isConnectedToStrava,
  handleStravaConnect,
  recentActivities,
  onLike,
  onComment
}) => {
  return (
    <div className="space-y-6 m-0">
      <StravaConnection 
        isConnectedToStrava={isConnectedToStrava}
        handleStravaConnect={handleStravaConnect}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HeatmapPlaceholder />
        <AchievementsPlaceholder />
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Atividades Recentes</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/app/activity">
              Ver todas
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <RecentActivitiesList 
          activities={recentActivities.slice(0, 1)}
          onLike={onLike}
          onComment={onComment}
        />
      </div>
    </div>
  );
};

export default OverviewTab;

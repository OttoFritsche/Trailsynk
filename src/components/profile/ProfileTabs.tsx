
import React from 'react';
import { Activity } from '@/components/app/ActivityFeedItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewTab from './tabs/OverviewTab';
import ActivitiesTab from './tabs/ActivitiesTab';
import RoutesTab from './tabs/RoutesTab';
import TrailsTab from './tabs/TrailsTab';
import StatsTab from './tabs/StatsTab';
import BadgesTab from './tabs/BadgesTab';
import GroupsTab from './tabs/GroupsTab';

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isConnectedToStrava: boolean;
  handleStravaConnect: () => void;
  recentActivities: Activity[];
  savedRoutes: Array<{
    id: string;
    name: string;
    distance: number;
    elevation: number;
    imageUrl?: string;
  }>;
  trails: Array<{
    id: string;
    name: string;
    avatar: string;
    mutualFriends?: number;
  }>;
  groups: Array<{
    id: string;
    name: string;
    members: number;
    imageUrl?: string;
  }>;
  onLike: (activityId: string) => void;
  onComment: (activityId: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  setActiveTab,
  isConnectedToStrava,
  handleStravaConnect,
  recentActivities,
  savedRoutes,
  trails,
  groups,
  onLike,
  onComment
}) => {
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="border-b">
        <div className="px-4 md:px-8">
          <TabsList className="bg-transparent grid grid-cols-7 md:w-auto w-full">
            <TabsTrigger value="overview" className="text-sm">Visão Geral</TabsTrigger>
            <TabsTrigger value="activities" className="text-sm">Atividades</TabsTrigger>
            <TabsTrigger value="routes" className="text-sm">Rotas</TabsTrigger>
            <TabsTrigger value="trails" className="text-sm">Trails</TabsTrigger>
            <TabsTrigger value="stats" className="text-sm">Estatísticas</TabsTrigger>
            <TabsTrigger value="badges" className="text-sm">Badges</TabsTrigger>
            <TabsTrigger value="groups" className="text-sm">Grupos</TabsTrigger>
          </TabsList>
        </div>
      </div>
      
      <div className="p-4 md:p-8">
        <TabsContent value="overview">
          <OverviewTab 
            isConnectedToStrava={isConnectedToStrava}
            handleStravaConnect={handleStravaConnect}
            recentActivities={recentActivities}
            onLike={onLike}
            onComment={onComment}
          />
        </TabsContent>
        
        <TabsContent value="activities">
          <ActivitiesTab 
            activities={recentActivities}
            onLike={onLike}
            onComment={onComment}
          />
        </TabsContent>
        
        <TabsContent value="routes">
          <RoutesTab routes={savedRoutes} />
        </TabsContent>
        
        <TabsContent value="trails">
          <TrailsTab trails={trails} />
        </TabsContent>
        
        <TabsContent value="stats">
          <StatsTab />
        </TabsContent>
        
        <TabsContent value="badges">
          <BadgesTab />
        </TabsContent>
        
        <TabsContent value="groups">
          <GroupsTab groups={groups} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;

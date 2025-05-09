
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import OverviewTab from './tabs/OverviewTab';
import ActivitiesTab from './tabs/ActivitiesTab';
import RoutesTab from './tabs/RoutesTab';
import TrailsTab from './tabs/TrailsTab';
import GroupsTab from './tabs/GroupsTab';
import AlbumsTab from './tabs/AlbumsTab';
import StatsTab from './tabs/StatsTab';
import BadgesTab from './tabs/BadgesTab';
import BikesTab from './tabs/BikesTab';
import { UserBadge, PhotoAlbum, ProfilePhoto } from '@/types/profile';
import { Activity } from '@/components/app/ActivityFeedItem';
import { Bicycle } from './BikeDisplay';

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isConnectedToStrava: boolean;
  handleStravaConnect: () => void;
  recentActivities: Activity[];
  savedRoutes: any[];
  trails: any[];
  groups: any[];
  onLike: (activityId: string) => void;
  onComment: (activityId: string) => void;
  albums?: PhotoAlbum[];
  photos?: ProfilePhoto[];
  onAddAlbum?: (album: PhotoAlbum) => string;
  onUpdateAlbum?: (albumId: string, updates: Partial<PhotoAlbum>) => void;
  onDeleteAlbum?: (albumId: string) => void;
  onDeletePhoto?: (photoId: string) => void;
  onAssignPhotoToAlbum?: (photoId: string, albumId: string | undefined) => void;
  onSetAlbumCover?: (albumId: string, photoId: string) => void;
  getAlbumPhotos?: (albumId: string) => ProfilePhoto[];
  badges?: UserBadge[];
  bicycles?: Bicycle[];
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
  onComment,
  albums = [],
  photos = [],
  onAddAlbum,
  onUpdateAlbum,
  onDeleteAlbum,
  onDeletePhoto,
  onAssignPhotoToAlbum,
  onSetAlbumCover,
  getAlbumPhotos,
  badges = [],
  bicycles = []
}) => {
  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 md:grid-cols-8 bg-gray-100">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="activities">Atividades</TabsTrigger>
        <TabsTrigger value="routes">Rotas</TabsTrigger>
        <TabsTrigger value="trails">Trails</TabsTrigger>
        <TabsTrigger value="groups">Grupos</TabsTrigger>
        <TabsTrigger value="albums">Álbuns</TabsTrigger>
        <TabsTrigger value="stats">Estatísticas</TabsTrigger>
        <TabsTrigger value="bikes">Bicicletas</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="pt-4">
        <OverviewTab
          isConnectedToStrava={isConnectedToStrava}
          handleStravaConnect={handleStravaConnect}
          recentActivities={recentActivities}
          onLike={onLike}
          onComment={onComment}
        />
      </TabsContent>

      <TabsContent value="activities" className="pt-4">
        <ActivitiesTab 
          activities={recentActivities} 
          onLike={onLike} 
          onComment={onComment} 
        />
      </TabsContent>

      <TabsContent value="routes" className="pt-4">
        <RoutesTab routes={savedRoutes} />
      </TabsContent>

      <TabsContent value="trails" className="pt-4">
        <TrailsTab trails={trails} />
      </TabsContent>

      <TabsContent value="groups" className="pt-4">
        <GroupsTab groups={groups} />
      </TabsContent>

      <TabsContent value="albums" className="pt-4">
        <AlbumsTab 
          albums={albums}
          photos={photos}
          onAddAlbum={onAddAlbum}
          onUpdateAlbum={onUpdateAlbum}
          onDeleteAlbum={onDeleteAlbum}
          onDeletePhoto={onDeletePhoto}
          onAssignPhotoToAlbum={onAssignPhotoToAlbum}
          onSetAlbumCover={onSetAlbumCover}
          getAlbumPhotos={getAlbumPhotos}
        />
      </TabsContent>

      <TabsContent value="stats" className="pt-4">
        <StatsTab />
      </TabsContent>

      <TabsContent value="badges" className="pt-4">
        <BadgesTab badges={badges} />
      </TabsContent>
      
      <TabsContent value="bikes" className="pt-4">
        <BikesTab bicycles={bicycles} />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;

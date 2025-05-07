import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProfileData } from '@/hooks/useProfileData';
import { formatDate, formatDuration, handleStravaConnect } from '@/utils/profileUtils';
import LoadingState from '@/components/profile/LoadingState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { Activity } from '@/components/app/ActivityFeedItem';

// Importando os componentes recém-criados
import ProfilePhotoCarousel from '@/components/profile/ProfilePhotoCarousel';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ActivitySummary from '@/components/profile/ActivitySummary';
import StravaConnection from '@/components/profile/StravaConnection';
import HeatmapPlaceholder from '@/components/profile/HeatmapPlaceholder';
import AchievementsPlaceholder from '@/components/profile/AchievementsPlaceholder';
import RecentActivitiesList from '@/components/profile/RecentActivitiesList';
import RoutesGrid from '@/components/profile/RoutesGrid';
import TrailsList from '@/components/profile/TrailsList';
import GroupsGrid from '@/components/profile/GroupsGrid';

// Mock data para o carrossel de fotos
const recentPhotos = [
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=800&h=300&fit=crop',
  'https://images.unsplash.com/photo-1553007830-89e37b527205?w=800&h=300&fit=crop'
];

// Mock data para atividades recentes
const recentActivities: Activity[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    type: 'pedal',
    title: 'Pedal matinal na orla',
    description: 'Ótimo dia para pedalar! Consegui completar o percurso em menos tempo que o esperado.',
    metrics: {
      distance: 15.2,
      duration: 45,
      elevation: 120,
    },
    imageUrl: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=800&auto=format&fit=crop',
    createdAt: new Date('2023-05-15T08:30:00'),
    likes: 12,
    comments: 3,
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    type: 'trilha',
    title: 'Trilha no Parque da Serra',
    description: 'Descobri uma nova trilha incrível! Muito técnica mas vale cada segundo.',
    metrics: {
      distance: 8.7,
      duration: 120,
      elevation: 560,
    },
    imageUrl: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&auto=format&fit=crop',
    createdAt: new Date('2023-05-14T16:20:00'),
    likes: 24,
    comments: 8,
    hasLiked: true,
  },
];

// Mock data para rotas salvas
const savedRoutes = [
  {
    id: 'route1',
    name: 'Circuito da Praia',
    distance: 12.5,
    elevation: 150,
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=200&fit=crop'
  },
  {
    id: 'route2',
    name: 'Trilha da Serra',
    distance: 8.3,
    elevation: 560,
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=200&fit=crop'
  },
  {
    id: 'route3',
    name: 'Percurso Urbano',
    distance: 15.7,
    elevation: 220,
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=200&fit=crop'
  }
];

// Mock data para trails (amigos)
const trails = [
  {
    id: 'friend1',
    name: 'Carlos Lima',
    avatar: 'https://i.pravatar.cc/150?img=20',
    mutualFriends: 5
  },
  {
    id: 'friend2',
    name: 'Fernanda Santos',
    avatar: 'https://i.pravatar.cc/150?img=29',
    mutualFriends: 3
  },
  {
    id: 'friend3',
    name: 'Ricardo Oliveira',
    avatar: 'https://i.pravatar.cc/150?img=33',
    mutualFriends: 12
  },
  {
    id: 'friend4',
    name: 'Ana Sousa',
    avatar: 'https://i.pravatar.cc/150?img=44',
    mutualFriends: 2
  }
];

// Mock data para grupos
const groups = [
  {
    id: 'group1',
    name: 'MTB Salvador',
    members: 24,
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop'
  },
  {
    id: 'group2',
    name: 'Ciclistas do Parque',
    members: 12,
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=200&h=200&fit=crop'
  },
  {
    id: 'group3',
    name: 'Pedalada Noturna',
    members: 18,
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop'
  }
];

const Profile = () => {
  const { user } = useAuth();
  const { profileData, loading, userStats, highlightedBadges, isConnectedToStrava } = useProfileData(user);
  const [activeTab, setActiveTab] = useState("overview");

  const handleLike = (activityId: string) => {
    toast.info("Função de curtir será implementada em breve");
  };
  
  const handleComment = (activityId: string) => {
    toast.info("Função de comentários será implementada em breve");
  };

  if (loading) {
    return <LoadingState />;
  }

  const joinDate = profileData.created_at 
    ? formatDate(profileData.created_at)
    : 'Data desconhecida';

  const displayName = profileData.full_name || profileData.username || user?.email?.split('@')[0] || 'Ciclista';
  
  return (
    <>
      <Helmet>
        <title>{displayName} | TrailSynk</title>
      </Helmet>

      <div className="space-y-6 pb-12">
        {/* Banner de Fotos */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-xl">
          <ProfilePhotoCarousel photos={recentPhotos} />
        </div>
        
        {/* Container com fundo branco para o cabeçalho do perfil e abas */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Cabeçalho do perfil */}
          <ProfileHeader 
            profileData={profileData}
            displayName={displayName}
            joinDate={joinDate}
            isPro={true}
            location="Salvador, BA"
          />
          
          {/* Resumo de atividades */}
          <div className="px-4 md:px-8 pb-6">
            <ActivitySummary 
              userStats={userStats}
              formatDuration={formatDuration}
              recentActivitiesCount={23}
            />
          </div>
          
          {/* Navegação por abas */}
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
              <TabsContent value="overview" className="space-y-6 m-0">
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
                    onLike={handleLike}
                    onComment={handleComment}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="activities" className="m-0">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-4">Minhas Atividades</h3>
                  <RecentActivitiesList 
                    activities={recentActivities}
                    onLike={handleLike}
                    onComment={handleComment}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="routes" className="m-0">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-4">Minhas Rotas</h3>
                  <RoutesGrid routes={savedRoutes} />
                </div>
              </TabsContent>
              
              <TabsContent value="trails" className="m-0">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-4">Meus Trails</h3>
                  <TrailsList trails={trails} />
                </div>
              </TabsContent>
              
              <TabsContent value="stats" className="m-0 text-center">
                <div className="py-12">
                  <Button asChild>
                    <Link to="/app/statistics">
                      Ver Estatísticas Completas
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="badges" className="m-0 text-center">
                <div className="py-12">
                  <Button asChild>
                    <Link to="/app/badges">
                      Ver Todos os Badges
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="groups" className="m-0">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-4">Meus Grupos</h3>
                  <GroupsGrid groups={groups} />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Profile;

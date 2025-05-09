import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/hooks/useAuth';
import { useProfileData } from '@/hooks/useProfileData';
import { formatDate, formatDuration, handleStravaConnect } from '@/utils/profileUtils';
import LoadingState from '@/components/profile/LoadingState';
import { toast } from 'sonner';
import { Activity } from '@/components/app/ActivityFeedItem';
import EnhancedPhotoCarousel from '@/components/profile/EnhancedPhotoCarousel';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ActivitySummary from '@/components/profile/ActivitySummary';
import ProfileTabs from '@/components/profile/ProfileTabs';
import EditProfileButton from '@/components/profile/EditProfileButton';
import AddPhotoModal from '@/components/profile/AddPhotoModal';
import { v4 as uuidv4 } from 'uuid';
import { ProfilePhoto } from '@/types/profile';
import BadgesPreview from '@/components/profile/BadgesPreview';
import PerformanceStats from '@/components/profile/PerformanceStats';

// Mock data for recent activities
const recentActivities: Activity[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'João Silva',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
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
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
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
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'João Silva',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    type: 'treino',
    title: 'Treino de Sprint',
    description: 'Foco em melhorar velocidade em trechos planos. Sensação de progresso!',
    metrics: {
      distance: 12.4,
      duration: 40,
      elevation: 85,
    },
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop',
    createdAt: new Date('2023-05-12T07:45:00'),
    likes: 15,
    comments: 2,
  }
];

// Mock data for saved routes
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
  },
  {
    id: 'route4',
    name: 'Trilha das Cachoeiras',
    distance: 22.3,
    elevation: 650,
    imageUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=200&fit=crop'
  }
];

// Mock data for trails (amigos)
const trails = [
  {
    id: 'friend1',
    name: 'Carlos Lima',
    avatar: 'https://randomuser.me/api/portraits/men/20.jpg',
    mutualFriends: 5
  },
  {
    id: 'friend2',
    name: 'Fernanda Santos',
    avatar: 'https://randomuser.me/api/portraits/women/29.jpg',
    mutualFriends: 3
  },
  {
    id: 'friend3',
    name: 'Ricardo Oliveira',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    mutualFriends: 12
  },
  {
    id: 'friend4',
    name: 'Ana Sousa',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    mutualFriends: 2
  },
  {
    id: 'friend5',
    name: 'Paulo Mendes',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    mutualFriends: 7
  }
];

// Mock data for grupos
const groups = [
  {
    id: 'group1',
    name: 'MTB Salvador',
    members: 24,
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&h=200&fit=crop'
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
    imageUrl: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=200&h=200&fit=crop'
  },
  {
    id: 'group4',
    name: 'Gravel Brasil',
    members: 45,
    imageUrl: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=200&h=200&fit=crop'
  }
];

const Profile = () => {
  const { user } = useAuth();
  const { 
    profileData, 
    loading, 
    userStats, 
    highlightedBadges, 
    isConnectedToStrava, 
    bicycles,
    refreshProfileData,
    photos,
    addPhoto,
    deletePhoto,
    reorderPhotos,
    albums,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    assignPhotoToAlbum,
    setAlbumCover,
    getAlbumPhotos,
    getAlbumById
  } = useProfileData(user);
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);

  const handleLike = (activityId: string) => {
    toast.info("Função de curtir será implementada em breve");
  };
  
  const handleComment = (activityId: string) => {
    toast.info("Função de comentários será implementada em breve");
  };

  // Function to add new photo
  const handleAddPhoto = useCallback((photoUrl: string, caption?: string) => {
    const newPhoto: ProfilePhoto = { 
      id: uuidv4(),
      url: photoUrl,
      caption: caption,
      date: new Date()
    };
    addPhoto(newPhoto);
  }, [addPhoto]);

  // Function to open the edit profile modal
  const handleEditProfileClick = useCallback(() => {
    setIsProfileEditModalOpen(true);
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  const joinDate = profileData.created_at 
    ? formatDate(profileData.created_at)
    : 'Data desconhecida';

  const displayName = profileData.full_name || profileData.username || user?.email?.split('@')[0] || 'Ciclista';
  
  // Filter photos that represent user activities for the banner carousel
  // In a real app, these would come from the backend filtered appropriately
  const activityPhotos = photos.slice(0, 5); // Using first 5 photos as activity photos for demo
  
  return (
    <>
      <Helmet>
        <title>{displayName} | TrailSynk</title>
      </Helmet>

      <div className="space-y-6 pb-12">
        {/* Profile Header Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Banner Photo Carousel */}
          <div className="w-full">
            <EnhancedPhotoCarousel 
              photos={activityPhotos}
              autoPlayInterval={6000}
              className="rounded-t-xl"
            />
          </div>
          
          {/* Profile Header */}
          <ProfileHeader 
            profileData={profileData}
            displayName={displayName}
            joinDate={joinDate}
            isPro={true}
            location="Salvador, BA"
            onEditProfile={handleEditProfileClick}
          />
          
          {/* Activity Summary */}
          <div className="px-4 md:px-8 pb-6">
            <ActivitySummary 
              userStats={userStats}
              formatDuration={formatDuration}
              recentActivitiesCount={23}
            />

            {/* Key Statistics and Badges Preview */}
            {activeTab === "overview" && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <PerformanceStats 
                  weeklyDistance={userStats.weeklyAverage || 0}
                  totalElevation={userStats.totalElevationGain || 0}
                  avgSpeed={userStats.avgSpeed || 0}
                  favoriteType={userStats.favoriteRouteType || 'Montanha'}
                />
                <BadgesPreview badges={highlightedBadges.slice(0, 3)} />
              </div>
            )}
          </div>
          
          {/* Profile Tabs */}
          <ProfileTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isConnectedToStrava={isConnectedToStrava}
            handleStravaConnect={handleStravaConnect}
            recentActivities={recentActivities}
            savedRoutes={savedRoutes}
            trails={trails}
            groups={groups}
            onLike={handleLike}
            onComment={handleComment}
            albums={albums}
            photos={photos}
            onAddAlbum={addAlbum}
            onUpdateAlbum={updateAlbum}
            onDeleteAlbum={deleteAlbum}
            onDeletePhoto={deletePhoto}
            onAssignPhotoToAlbum={assignPhotoToAlbum}
            onSetAlbumCover={setAlbumCover}
            getAlbumPhotos={getAlbumPhotos}
            badges={highlightedBadges}
            bicycles={bicycles}
          />
        </div>
      </div>

      {/* Modal for adding photos */}
      <AddPhotoModal 
        open={isAddPhotoModalOpen}
        onOpenChange={setIsAddPhotoModalOpen}
        onPhotoAdded={handleAddPhoto}
      />
      
      {/* Edit Profile Modal */}
      <EditProfileButton 
        profileData={profileData} 
        onProfileUpdate={refreshProfileData}
        isModalOpen={isProfileEditModalOpen}
        setIsModalOpen={setIsProfileEditModalOpen}
      />
    </>
  );
};

export default Profile;


import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/hooks/useAuth';
import { useProfileData } from '@/hooks/useProfileData';
import { formatDate, formatDuration, handleStravaConnect } from '@/utils/profileUtils';
import ProfileHeader from '@/components/profile/ProfileHeader';
import StravaConnection from '@/components/profile/StravaConnection';
import PerformanceStats from '@/components/profile/PerformanceStats';
import BadgesPreview from '@/components/profile/BadgesPreview';
import LoadingState from '@/components/profile/LoadingState';

const Profile = () => {
  const { user } = useAuth();
  const { profileData, loading, userStats, highlightedBadges, isConnectedToStrava } = useProfileData(user);

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
        <title>Meu Perfil | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        {/* Profile Header */}
        <ProfileHeader 
          profileData={profileData}
          displayName={displayName}
          joinDate={joinDate}
          loading={loading}
        />

        {/* Strava Connection */}
        <StravaConnection 
          isConnectedToStrava={isConnectedToStrava}
          handleStravaConnect={handleStravaConnect}
        />

        {/* Performance Stats Preview */}
        <PerformanceStats 
          userStats={userStats}
          formatDuration={formatDuration}
        />

        {/* Badges Preview */}
        <BadgesPreview 
          badges={highlightedBadges}
        />
      </div>
    </>
  );
};

export default Profile;

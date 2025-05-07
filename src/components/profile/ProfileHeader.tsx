
import React from 'react';
import { CalendarClock } from 'lucide-react';
import { ProfileData } from '@/types/profile';

interface ProfileHeaderProps {
  profileData: ProfileData;
  displayName: string;
  joinDate: string;
  loading: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profileData, 
  displayName, 
  joinDate,
  loading
}) => {
  if (loading) return null;
  
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-xl shadow-sm p-6">
      <div className="relative">
        {profileData.avatar_url ? (
          <img 
            src={profileData.avatar_url} 
            alt={displayName}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg" 
          />
        ) : (
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl text-primary font-bold border-4 border-white shadow-lg">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      <div className="text-center md:text-left flex-1">
        <h1 className="text-2xl font-bold mb-1">{displayName}</h1>
        {profileData.username && (
          <p className="text-muted-foreground">@{profileData.username}</p>
        )}
        <div className="flex items-center justify-center md:justify-start mt-2 gap-2 text-sm text-muted-foreground">
          <CalendarClock className="h-4 w-4" />
          <span>Membro desde {joinDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

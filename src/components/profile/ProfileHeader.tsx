
import React from 'react';
import { MapPin, Award } from 'lucide-react';
import { ProfileData } from '@/types/profile';
import { Badge } from '@/components/ui/badge';

interface ProfileHeaderProps {
  profileData: ProfileData;
  displayName: string;
  joinDate: string;
  isPro?: boolean;
  location?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profileData, 
  displayName, 
  joinDate,
  isPro = false,
  location = "Salvador, BA"
}) => {
  return (
    <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 px-4 md:px-8 pb-6">
      {/* Avatar */}
      <div className="relative">
        {profileData.avatar_url ? (
          <img 
            src={profileData.avatar_url} 
            alt={displayName}
            className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-white shadow-lg" 
          />
        ) : (
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary/10 flex items-center justify-center text-4xl text-primary font-bold border-4 border-white shadow-lg">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      
      {/* User Info */}
      <div className="text-center md:text-left flex-1 -mt-4 md:mt-0 md:pb-2">
        <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{displayName}</h1>
            {profileData.username && (
              <p className="text-muted-foreground">@{profileData.username}</p>
            )}
          </div>
          
          {isPro && (
            <Badge className="self-center md:self-start bg-gradient-to-r from-primary to-purple-600">
              PRO
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start mt-2 gap-4 text-sm text-muted-foreground">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>Membro desde {joinDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

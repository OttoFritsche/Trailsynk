
import React from 'react';
import { MapPin, Award } from 'lucide-react';
import { ProfileData } from '@/types/profile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import EditProfileButton from './EditProfileButton';

interface ProfileHeaderProps {
  profileData: ProfileData;
  displayName: string;
  joinDate: string;
  isPro?: boolean;
  location?: string;
  onEditProfile?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profileData, 
  displayName, 
  joinDate,
  isPro = false,
  location = "Salvador, BA",
  onEditProfile
}) => {
  return (
    <div className="flex flex-col w-full">
      {/* User Info Container - Now positioned below the banner in parent component */}
      <div className="px-4 md:px-8 py-6 flex flex-col md:flex-row items-center md:items-start gap-6">
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
        <div className="text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
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
        
        {/* Edit Profile Button - Now part of the header for better visibility */}
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={onEditProfile} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            Editar Perfil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

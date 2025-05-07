
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User as UserIcon } from 'lucide-react';
import { ProfileData } from '@/types/profile';

interface ProfileCompletionButtonProps {
  profileData: ProfileData;
}

export const ProfileCompletionButton: React.FC<ProfileCompletionButtonProps> = ({ profileData }) => {
  if (profileData.is_profile_complete !== false) {
    return null;
  }

  return (
    <Link to="/app/profile/complete">
      <Button size="sm" variant="outline" className="gap-2 text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100">
        <UserIcon className="h-3 w-3" />
        <span className="hidden sm:inline">Complete seu perfil</span>
        <span className="sm:hidden">Perfil</span>
      </Button>
    </Link>
  );
};

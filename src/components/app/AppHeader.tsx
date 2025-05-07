
import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';
import { AppLogo } from './AppLogo';
import AppNavigation from './AppNavigation'; // Changed from named import to default import
import { UserProfileMenu } from './UserProfileMenu';
import { ProfileCompletionButton } from './ProfileCompletionButton';

interface AppHeaderProps {
  user: User | null;
}

const AppHeader: React.FC<AppHeaderProps> = ({ user }) => {
  const [profileData, setProfileData] = useState<ProfileData>({});
  
  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('username, full_name, avatar_url, is_profile_complete')
            .eq('id', user.id)
            .single();
            
          if (error) {
            console.error('Error fetching profile data:', error);
            return;
          }
          
          if (data) {
            // Make sure we're handling the returned data as a ProfileData object
            setProfileData(data as ProfileData);
          }
        } catch (error) {
          console.error('Error in profile data fetch:', error);
        }
      }
    };
    
    fetchProfileData();
  }, [user]);
  
  return (
    <header className="sticky top-0 border-b bg-white/95 backdrop-blur z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <AppLogo />
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Desktop Navigation */}
          <AppNavigation />
          
          {/* Mobile Navigation */}
          <AppNavigation isMobile={true} />
          
          {/* Profile Completion Button */}
          <ProfileCompletionButton profileData={profileData} />
          
          {/* User Profile Menu */}
          {user && <UserProfileMenu user={user} profileData={profileData} />}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

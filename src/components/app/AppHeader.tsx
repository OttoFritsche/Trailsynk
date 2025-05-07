
import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';
import { AppLogo } from './AppLogo';
import { UserProfileMenu } from './UserProfileMenu';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Bell, Plus } from 'lucide-react';
import AppNavigation from './AppNavigation';

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
          {/* Main Navigation Component */}
          <AppNavigation />
          
          {/* Notifications Link */}
          <Link 
            to="/app/notifications"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>
          
          {/* User Profile Menu - Enhanced */}
          {user && <UserProfileMenu user={user} profileData={profileData} />}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;


import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';
import { AppLogo } from './AppLogo';
import { UserProfileMenu } from './UserProfileMenu';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageCircle, Plus } from 'lucide-react';

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
          {/* Main Navigation Links - Simplified */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/app"
              className="px-3 py-1.5 border-b-2 transition-colors flex items-center text-sm border-primary text-primary"
            >
              Feed
            </Link>
            <Link 
              to="/app/routes"
              className="px-3 py-1.5 border-b-2 transition-colors flex items-center text-sm text-muted-foreground border-transparent hover:text-foreground hover:border-gray-300"
            >
              Rotas
            </Link>
          </nav>
          
          {/* Messages Link */}
          <Link 
            to="/app/messages"
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            aria-label="Messages"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </Link>
          
          {/* Main Action Button - Subscription or Quick Create */}
          <Button 
            variant="default" 
            size="sm"
            asChild
          >
            <Link to="/app/subscription">
              Assinar Pro
            </Link>
          </Button>
          
          {/* User Profile Menu - Enhanced */}
          {user && <UserProfileMenu user={user} profileData={profileData} />}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

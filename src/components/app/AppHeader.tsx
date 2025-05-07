
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { supabase } from '@/integrations/supabase/client';
import { Home, Map, User as UserIcon, BarChart3, Award, Users } from 'lucide-react';
import { ProfileData } from '@/types/profile';

interface AppHeaderProps {
  user: User | null;
}

const AppHeader: React.FC<AppHeaderProps> = ({ user }) => {
  const { signOut } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({});
  const location = useLocation();
  
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
  
  const displayName = profileData.username || profileData.full_name || user?.email?.split('@')[0] || 'TS';
  const avatarUrl = profileData.avatar_url || user?.user_metadata?.avatar_url;
  
  // Navigation items - Updated with Groups page
  const navItems = [
    { name: 'Feed', path: '/app', icon: Home },
    { name: 'Rotas', path: '/app/routes', icon: Map },
    { name: 'Estatísticas', path: '/app/statistics', icon: BarChart3 },
    { name: 'Badges', path: '/app/badges', icon: Award },
    { name: 'Trails', path: '/app/trails', icon: Users },
    { name: 'Grupos', path: '/app/groups', icon: Users },
    { name: 'Perfil', path: '/app/profile', icon: UserIcon }
  ];
  
  // Check if path is active
  const isActive = (path: string) => {
    if (path === '/app' && location.pathname === '/app') {
      return true;
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  return (
    <header className="sticky top-0 border-b bg-white/95 backdrop-blur z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-3xl">
        <Link to="/app" className="flex items-center">
          <img 
            src="/lovable-uploads/c6ac0b91-7542-4299-8422-3007983a958b.png" 
            alt="TrailSynk" 
            className="h-10"
          />
        </Link>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-secondary/70 hover:text-secondary hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`p-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-secondary/70 hover:bg-gray-100'
                }`}
                aria-label={item.name}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
          
          {/* Botão de perfil incompleto, se aplicável */}
          {profileData.is_profile_complete === false && (
            <Link to="/app/profile/complete">
              <Button size="sm" variant="outline" className="gap-2 text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100">
                <UserIcon className="h-3 w-3" />
                <span className="hidden sm:inline">Complete seu perfil</span>
                <span className="sm:hidden">Perfil</span>
              </Button>
            </Link>
          )}
          
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-9 w-9 rounded-full" aria-label="Menu de perfil">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>
                      {displayName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  {profileData.username && (
                    <div className="text-sm font-normal text-muted-foreground">@{profileData.username}</div>
                  )}
                  <div>{profileData.full_name || displayName}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/app/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/statistics">Estatísticas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/badges">Badges</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/routes">Minhas Rotas</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/trails">Meus Trails</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/groups">Meus Grupos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/assistant">Assessor IA</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/profile" className="flex items-center">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" 
                            fill="#FC4C02"/>
                    </svg>
                    Conectar ao Strava
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

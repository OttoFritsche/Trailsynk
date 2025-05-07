
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { ProfileData } from '@/types/profile';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User as UserIcon, 
  BarChart2, 
  Medal, 
  Users, 
  Bot, 
  BadgeDollarSign, 
  Settings,
  MapPin,
  LogOut
} from 'lucide-react';

interface UserProfileMenuProps {
  user: User | null;
  profileData: ProfileData;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ user, profileData }) => {
  const { signOut } = useAuth();
  
  if (!user) return null;
  
  const displayName = profileData.username || profileData.full_name || user?.email?.split('@')[0] || 'TS';
  const avatarUrl = profileData.avatar_url || user?.user_metadata?.avatar_url;
  
  return (
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
        
        {/* Main user-related links */}
        <DropdownMenuItem asChild>
          <Link to="/app/profile" className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            Meu Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/statistics" className="flex items-center">
            <BarChart2 className="mr-2 h-4 w-4" />
            Estatísticas
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/badges" className="flex items-center">
            <Medal className="mr-2 h-4 w-4" />
            Badges
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/trails" className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            Trails
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/groups" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Grupos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/assistant" className="flex items-center">
            <Bot className="mr-2 h-4 w-4" />
            Assessor IA
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/subscription" className="flex items-center">
            <BadgeDollarSign className="mr-2 h-4 w-4" />
            Planos
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/app/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Link>
        </DropdownMenuItem>
        
        {/* Strava integration */}
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
        
        {/* Logout option */}
        <DropdownMenuItem onClick={() => signOut()} className="flex items-center text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          Sair da Conta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

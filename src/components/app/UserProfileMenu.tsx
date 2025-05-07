
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
  );
};

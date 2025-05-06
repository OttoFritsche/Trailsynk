
import React from 'react';
import { Link } from 'react-router-dom';
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

interface AppHeaderProps {
  user: User | null;
}

const AppHeader: React.FC<AppHeaderProps> = ({ user }) => {
  const { signOut } = useAuth();
  
  // Estado de exemplo para simular conexão com Strava
  // Num app real, isso viria de uma API ou contexto
  const isConnectedToStrava = false;
  
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
        
        <div className="flex items-center space-x-4">
          {isConnectedToStrava && (
            <Badge variant="outline" className="bg-[#FC4C02]/10 text-[#FC4C02] border-[#FC4C02]/20">
              <svg className="mr-1 h-3 w-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" 
                      fill="currentColor"/>
              </svg>
              Strava
            </Badge>
          )}
          
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-9 w-9 rounded-full" aria-label="Menu de perfil">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback>
                      {user?.email?.substring(0, 2).toUpperCase() || 'TS'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/app/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/routes">Minhas Rotas</Link>
                </DropdownMenuItem>
                {!isConnectedToStrava && (
                  <DropdownMenuItem>
                    <span className="flex items-center">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" 
                              fill="#FC4C02"/>
                      </svg>
                      Conectar ao Strava
                    </span>
                  </DropdownMenuItem>
                )}
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

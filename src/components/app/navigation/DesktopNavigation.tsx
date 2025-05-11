import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react';
import NavLogo from '@/components/navigation/NavLogo';
import NavItem from '@/components/navigation/NavItem';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { Home, Route, Map, UserCircle, Bell, Users, MessageSquare, ShoppingBag, CalendarDays, Apple } from 'lucide-react';

const navItems = [
  { name: "Home", href: "/app", icon: Home },
  { name: "Rotas", href: "/app/routes", icon: Route },
  { name: "Trilhas", href: "/app/trails", icon: Map },
  { name: "Grupos", href: "/app/groups", icon: Users },
  { name: "Social", href: "/app/find-cyclists", icon: UserCircle },
  { name: "Mensagens", href: "/app/messages", icon: MessageSquare },
  { name: "Eventos", href: "/app/events", icon: CalendarDays },
  { name: "Marketplace", href: "/app/marketplace", icon: ShoppingBag },
  { name: "Nutrição", href: "/app/nutrition", icon: Apple },
  { name: "Notificações", href: "/app/notifications", icon: Bell },
];

const DesktopNavigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <header className="bg-background sticky top-0 z-40 border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <NavLogo />
        <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
          <nav className="flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <NavItem
                key={item.name}
                name={item.name}
                href={item.href}
                active={location.pathname.startsWith(item.href)}
              />
            ))}
          </nav>
          <ModeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name} />
                    <AvatarFallback>{user?.user_metadata?.full_name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/app/profile">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/settings">Configurações</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/app/subscription">Assinatura</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Sair</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default DesktopNavigation;

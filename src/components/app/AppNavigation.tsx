
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Route, 
  BarChart2, 
  Medal, 
  Users, 
  Bell, 
  MapPin,
  UserPlus,
  Settings as SettingsIcon,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppNavigationProps {
  isMobile?: boolean;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ isMobile }) => {
  const location = useLocation();
  const [unreadNotifications, setUnreadNotifications] = useState(3); // Exemplo de contador de notificações
  const isDeviceMobile = useIsMobile();
  
  // Use the prop if provided, otherwise use the hook
  const showMobileNav = isMobile !== undefined ? isMobile : isDeviceMobile;

  const navItems = [
    { to: '/app', icon: Home, label: 'Início', activePath: '/app' },
    { to: '/app/routes', icon: Route, label: 'Rotas', activePath: '/app/routes' },
    { to: '/app/statistics', icon: BarChart2, label: 'Estatísticas', activePath: '/app/statistics' },
    { to: '/app/badges', icon: Medal, label: 'Conquistas', activePath: '/app/badges' },
    { to: '/app/groups', icon: Users, label: 'Grupos', activePath: '/app/groups' },
    { to: '/app/trails', icon: MapPin, label: 'Trails', activePath: '/app/trails' },
    { to: '/app/find-cyclists', icon: UserPlus, label: 'Encontrar', activePath: '/app/find-cyclists' },
    { to: '/app/settings', icon: SettingsIcon, label: 'Configurações', activePath: '/app/settings' },
    { to: '/app/assistant', icon: Bot, label: 'Assessor IA', activePath: '/app/assistant' },
  ];

  const isActive = (path: string) => {
    if (path === '/app') {
      return location.pathname === '/app';
    }
    return location.pathname.startsWith(path);
  };

  const getActiveStyles = (active: boolean) => {
    return active 
      ? "text-primary border-primary" 
      : "text-muted-foreground border-transparent hover:text-foreground hover:border-gray-300";
  }

  if (showMobileNav) {
    // Mobile Navigation
    return (
      <div className="flex md:hidden justify-between w-full">
        {navItems.slice(0, 5).map((item) => (
          <Link 
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col items-center justify-center px-2",
              isActive(item.activePath) ? "text-primary" : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    );
  }

  // Desktop Navigation
  return (
    <nav className="hidden md:flex space-x-1">
      {navItems.map((item) => (
        <Link 
          key={item.to}
          to={item.to}
          className={cn(
            "px-3 py-1.5 border-b-2 transition-colors flex items-center text-sm",
            getActiveStyles(isActive(item.activePath))
          )}
        >
          <item.icon className="h-4 w-4 mr-1.5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default AppNavigation;

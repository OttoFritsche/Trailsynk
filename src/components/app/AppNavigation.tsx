
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
  Settings,
  Bot,
  MessageCircle,
  BadgeDollarSign,
  MoreHorizontal,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppNavigationProps {
  isMobile?: boolean;
}

const AppNavigation: React.FC<AppNavigationProps> = ({ isMobile }) => {
  const location = useLocation();
  const isDeviceMobile = useIsMobile();
  
  // Use the prop if provided, otherwise use the hook
  const showMobileNav = isMobile !== undefined ? isMobile : isDeviceMobile;

  // Essential nav items that will always be shown in desktop view
  const essentialNavItems = [
    { to: '/app', icon: Home, label: 'Início', activePath: '/app' },
    { to: '/app/routes', icon: Route, label: 'Rotas', activePath: '/app/routes' },
  ];

  // Nav items that will be available in the "More" dropdown menu
  const moreNavItems = [
    { to: '/app/statistics', icon: BarChart2, label: 'Estatísticas', activePath: '/app/statistics' },
    { to: '/app/badges', icon: Medal, label: 'Conquistas', activePath: '/app/badges' },
    { to: '/app/groups', icon: Users, label: 'Grupos', activePath: '/app/groups' },
    { to: '/app/trails', icon: MapPin, label: 'Trails', activePath: '/app/trails' },
    { to: '/app/find-cyclists', icon: UserPlus, label: 'Encontrar', activePath: '/app/find-cyclists' },
    { to: '/app/messages', icon: MessageCircle, label: 'Mensagens', activePath: '/app/messages' },
    { to: '/app/ai-assistant', icon: Bot, label: 'Assessor IA', activePath: '/app/ai-assistant' },
    { to: '/app/subscription', icon: BadgeDollarSign, label: 'Planos', activePath: '/app/subscription' },
    { to: '/app/settings', icon: Settings, label: 'Configurações', activePath: '/app/settings' },
  ];

  // Action button that brings attention to creating new content
  const actionButton = { to: '/app/routes/new', icon: Plus, label: 'Nova Rota', activePath: '/app/routes/new' };

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
    // Mobile Navigation - Simplified bottom bar with most essential items
    return (
      <div className="flex md:hidden justify-between w-full px-1">
        {essentialNavItems.map((item) => (
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
        
        {/* Action Button (e.g. New Route) */}
        <Link
          to={actionButton.to}
          className="flex flex-col items-center justify-center px-2 text-primary"
        >
          <div className="bg-primary text-white rounded-full p-1">
            <actionButton.icon className="h-5 w-5" />
          </div>
          <span className="text-xs mt-1">{actionButton.label}</span>
        </Link>
        
        {/* Messages Button */}
        <Link 
          to="/app/messages" 
          className={cn(
            "flex flex-col items-center justify-center px-2",
            isActive('/app/messages') ? "text-primary" : "text-muted-foreground"
          )}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs mt-1">Mensagens</span>
        </Link>
        
        {/* More Menu Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-col items-center justify-center px-2 text-muted-foreground">
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-xs mt-1">Mais</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {moreNavItems.map((item) => (
              <DropdownMenuItem key={item.to} asChild>
                <Link to={item.to} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Desktop Navigation - Clean design with primary links and dropdown
  return (
    <nav className="hidden md:flex items-center space-x-1">
      {/* Essential navigation items */}
      {essentialNavItems.map((item) => (
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
      
      {/* Action Button */}
      <Link 
        to={actionButton.to}
        className={cn(
          "px-3 py-1.5 border-b-2 transition-colors flex items-center text-sm bg-primary/10 rounded-md mx-1",
          getActiveStyles(isActive(actionButton.activePath))
        )}
      >
        <actionButton.icon className="h-4 w-4 mr-1.5" />
        {actionButton.label}
      </Link>
      
      {/* More dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="px-3 py-1.5 h-auto">
            <MoreHorizontal className="h-4 w-4 mr-1.5" />
            Mais
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {moreNavItems.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <Link 
                to={item.to} 
                className={cn(
                  "flex items-center gap-2",
                  isActive(item.activePath) ? "text-primary font-medium" : ""
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default AppNavigation;


import React from 'react';
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
  Plus,
  Calendar,
  Activity,
  LineChart,
  ShoppingBag,
  CalendarCheck
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
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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
    { to: '/app/marketplace', icon: ShoppingBag, label: 'Marketplace', activePath: '/app/marketplace' },
    { to: '/app/events', icon: CalendarCheck, label: 'Eventos', activePath: '/app/events' },
  ];

  // Training submenu items
  const trainingItems = [
    { to: '/app/training/calendar', icon: Calendar, label: 'Calendário', activePath: '/app/training/calendar' },
    { to: '/app/training/activities', icon: Activity, label: 'Minhas Atividades', activePath: '/app/training/activities' },
    { to: '/app/training/weekly', icon: BarChart2, label: 'Controle Semanal', activePath: '/app/training/weekly' },
    { to: '/app/training/performance', icon: LineChart, label: 'Performance e Prontidão', activePath: '/app/training/performance' },
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
        {/* Keep just the first 3 essential items for mobile to avoid overcrowding */}
        {essentialNavItems.slice(0, 3).map((item) => (
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
        
        {/* Training Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn(
              "flex flex-col items-center justify-center px-2",
              isActive('/app/training') ? "text-primary" : "text-muted-foreground"
            )}>
              <BarChart2 className="h-5 w-5" />
              <span className="text-xs mt-1">Treinamento</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
            <DropdownMenuLabel>Treinamento</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {trainingItems.map((item) => (
              <DropdownMenuItem key={item.to} asChild>
                <Link to={item.to} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
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
            {/* Add Events item to the dropdown */}
            <DropdownMenuItem asChild>
              <Link to="/app/events" className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" />
                Eventos
              </Link>
            </DropdownMenuItem>
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
      
      {/* Training Dropdown */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={cn(
                "px-3 py-1.5 border-b-2 transition-colors flex items-center text-sm h-auto",
                getActiveStyles(isActive('/app/training'))
              )}
            >
              <BarChart2 className="h-4 w-4 mr-1.5" />
              Treinamento
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 p-2">
                {trainingItems.map((item) => (
                  <li key={item.to}>
                    <NavigationMenuLink asChild>
                      <Link 
                        to={item.to} 
                        className={cn(
                          "flex items-center gap-2 p-2 hover:bg-accent rounded-md",
                          isActive(item.activePath) ? "text-primary font-medium" : ""
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
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

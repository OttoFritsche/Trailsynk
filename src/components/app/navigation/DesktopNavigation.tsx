
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Route, 
  ShoppingBag,
  CalendarCheck,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import TrainingMenu from './TrainingMenu';

interface DesktopNavigationProps {
  currentPath: string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ currentPath }) => {
  // Essential nav items that will always be shown in desktop view
  const essentialNavItems = [
    { to: '/app', icon: Home, label: 'Início', activePath: '/app' },
    { to: '/app/routes', icon: Route, label: 'Rotas', activePath: '/app/routes' },
    { to: '/app/marketplace', icon: ShoppingBag, label: 'Marketplace', activePath: '/app/marketplace' },
    { to: '/app/events', icon: CalendarCheck, label: 'Eventos', activePath: '/app/events' },
  ];

  // Action button that brings attention to creating new content
  const actionButton = { to: '/app/routes/new', icon: Plus, label: 'Nova Rota', activePath: '/app/routes/new' };

  const isActive = (path: string) => {
    if (path === '/app') {
      return currentPath === '/app';
    }
    return currentPath.startsWith(path);
  };

  const getActiveStyles = (active: boolean) => {
    return active 
      ? "text-primary border-primary" 
      : "text-muted-foreground border-transparent hover:text-foreground hover:border-gray-300";
  };

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
      
      {/* Training Menu */}
      <TrainingMenu isActive={isActive('/app/training')} />
      
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
    </nav>
  );
};

export default DesktopNavigation;

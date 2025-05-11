
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Route, 
  ShoppingBag, 
  MessageCircle,
  Plus,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileTrainingMenu from './MobileTrainingMenu';

interface MobileNavigationProps {
  currentPath: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentPath }) => {
  // Essential nav items for mobile view (limited to prevent overcrowding)
  const essentialNavItems = [
    { to: '/app', icon: Home, label: 'Início', activePath: '/app' },
    { to: '/app/routes', icon: Route, label: 'Rotas', activePath: '/app/routes' },
    { to: '/app/marketplace', icon: ShoppingBag, label: 'Marketplace', activePath: '/app/marketplace' },
  ];

  // Action button
  const actionButton = { to: '/app/routes/new', icon: Plus, label: 'Nova Rota', activePath: '/app/routes/new' };
  
  const isActive = (path: string) => {
    if (path === '/app') {
      return currentPath === '/app';
    }
    return currentPath.startsWith(path);
  };
  
  return (
    <div className="flex md:hidden justify-between w-full px-1">
      {/* Limited essential items for mobile */}
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
      
      {/* Training Button */}
      <MobileTrainingMenu isActive={isActive('/app/training')} />
      
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
      
      {/* Profile Link - Direct link to profile instead of "More" dropdown */}
      <Link 
        to="/app/profile" 
        className={cn(
          "flex flex-col items-center justify-center px-2",
          isActive('/app/profile') ? "text-primary" : "text-muted-foreground"
        )}
      >
        <User className="h-5 w-5" />
        <span className="text-xs mt-1">Perfil</span>
      </Link>
    </div>
  );
};

export default MobileNavigation;


import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, User, BarChart3, Award, Users } from 'lucide-react';

interface NavigationItem {
  name: string;
  path: string;
  icon: React.FC<{ className?: string }>;
}

interface AppNavigationProps {
  isMobile?: boolean;
}

export const navItems: NavigationItem[] = [
  { name: 'Feed', path: '/app', icon: Home },
  { name: 'Rotas', path: '/app/routes', icon: Map },
  { name: 'Estatísticas', path: '/app/statistics', icon: BarChart3 },
  { name: 'Badges', path: '/app/badges', icon: Award },
  { name: 'Trails', path: '/app/trails', icon: Users },
  { name: 'Grupos', path: '/app/groups', icon: Users },
  { name: 'Perfil', path: '/app/profile', icon: User }
];

export const AppNavigation: React.FC<AppNavigationProps> = ({ isMobile = false }) => {
  const location = useLocation();
  
  // Check if path is active
  const isActive = (path: string) => {
    if (path === '/app' && location.pathname === '/app') {
      return true;
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  if (isMobile) {
    return (
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
    );
  }
  
  return (
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
  );
};

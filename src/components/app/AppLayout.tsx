
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import { useAuth } from '@/hooks/useAuth';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { useLocation } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Check if we're on a page that should use the single-column layout
  const isSingleColumnPage = [
    '/app/assistant', 
    '/app/ai-assistant', 
    '/app/messages',
    '/app/subscription',
    '/app/subscription-success',
    '/app/profile',
    '/app/routes',
    '/app/routes/new',
    '/app/activity',
    '/app/statistics',
    '/app/badges',
    '/app/trails',
    '/app/groups',
    '/app/find-cyclists',
    '/app/notifications',
    '/app/settings'
  ].some(path => location.pathname.startsWith(path));
  
  // Only the main feed page will have the 3-column layout
  const isThreeColumnPage = location.pathname === '/app' || location.pathname === '/app/';

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} />
      <div className={`container mx-auto px-4 py-4 ${isSingleColumnPage ? 'max-w-4xl' : 'max-w-7xl'}`}>
        {isThreeColumnPage ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="hidden md:block md:col-span-3">
              <LeftSidebar user={user} />
            </div>
            <main className="col-span-12 md:col-span-6">
              <Outlet />
            </main>
            <div className="hidden md:block md:col-span-3">
              <RightSidebar />
            </div>
          </div>
        ) : (
          <main>
            <Outlet />
          </main>
        )}
      </div>
    </div>
  );
};

export default AppLayout;


import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import { useAuth } from '@/hooks/useAuth';

const AppLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} />
      <main className="container mx-auto px-4 py-4 max-w-3xl">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

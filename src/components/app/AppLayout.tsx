
import React, { Suspense, useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import { useAuth } from '@/hooks/useAuth';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Componente de carregamento para Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[70vh]">
    <div className="space-y-4 w-full max-w-md">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-32 w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  </div>
);

const AppLayout: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  // Determina se a página atual deve ter layout de 3 colunas
  const isThreeColumnPage = location.pathname === '/app' || location.pathname === '/app/';

  // Handle route transitions with a shorter loading time
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 250); // Reduced from 300ms
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Make sure user is authenticated, else redirect
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  // Se ainda estiver carregando a autenticação, mostra um indicador de carregamento
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // If no user after auth loading is done, don't render anything (will be redirected)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader user={user} />
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        {isThreeColumnPage ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="hidden md:block md:col-span-3">
              <LeftSidebar user={user} />
            </div>
            <main className="col-span-12 md:col-span-6">
              <Suspense fallback={<LoadingFallback />}>
                {isLoading ? <LoadingFallback /> : <Outlet />}
              </Suspense>
            </main>
            <div className="hidden md:block md:col-span-3">
              <RightSidebar />
            </div>
          </div>
        ) : (
          <main>
            <Suspense fallback={<LoadingFallback />}>
              {isLoading ? <LoadingFallback /> : <Outlet />}
            </Suspense>
          </main>
        )}
      </div>
    </div>
  );
};

export default AppLayout;

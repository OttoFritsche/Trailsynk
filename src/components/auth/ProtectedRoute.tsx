
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // For debugging
  useEffect(() => {
    console.log("ProtectedRoute state:", { user, loading, currentPath: location.pathname });
  }, [user, loading, location.pathname]);
  
  // While checking authentication status
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-primary font-medium">Verificando autenticação...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to auth page
  if (!user) {
    console.log("User not authenticated, redirecting to /auth");
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // If authenticated, render the protected content
  console.log("User authenticated, rendering content");
  return <>{children}</>;
};

export default ProtectedRoute;

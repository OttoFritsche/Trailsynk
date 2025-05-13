
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  // Enhanced authentication check with retry mechanism
  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log("ProtectedRoute: User is authenticated, allowing access");
        setIsChecking(false);
      } else {
        console.log("ProtectedRoute: User is not authenticated, redirecting to /auth");
        navigate('/auth', { state: { from: location }, replace: true });
      }
    }
  }, [user, loading, navigate, location]);
  
  // Show loading state while checking authentication
  if (loading || isChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-primary font-medium">Verificando autenticação...</p>
        </div>
      </div>
    );
  }
  
  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;

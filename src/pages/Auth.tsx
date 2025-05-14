
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Helmet } from 'react-helmet';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';

type AuthView = 'login' | 'register';

const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialView = searchParams.get('mode') === 'signup' ? 'register' : 'login';
  const [view, setView] = useState<AuthView>(initialView);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Update view based on URL params when they change
    const mode = searchParams.get('mode');
    if (mode === 'signup' && view !== 'register') {
      setView('register');
    } else if (mode === 'login' && view !== 'login') {
      setView('login');
    }
  }, [searchParams, view]);
  
  // If already authenticated, redirect to app
  useEffect(() => {
    if (user && !loading) {
      console.log("Auth component: User is authenticated, redirecting to /app");
      navigate('/app', { replace: true });
    }
  }, [user, loading, navigate]);
  
  const toggleView = () => {
    const newView = view === 'login' ? 'register' : 'login';
    setView(newView);
    // Update URL params
    const newMode = newView === 'login' ? 'login' : 'signup';
    navigate(`/auth?mode=${newMode}`, { replace: true });
  };

  const handleSuccessfulRegister = () => {
    setView('login');
  };

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-primary font-medium">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{view === 'login' ? 'Login' : 'Cadastro'} | TrailSynk</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        {/* Left section with app branding and background image */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          {/* Background image with overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/50 z-10"></div>
          <img 
            src="/lovable-uploads/0914dcfd-c9c1-48b0-9b33-330443d07021.png" 
            alt="Trilha na montanha" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          
          {/* Content overlay */}
          <div className="relative z-20 h-full flex flex-col justify-center items-center p-8">
            <img 
              src="/lovable-uploads/c6ac0b91-7542-4299-8422-3007983a958b.png" 
              alt="TrailSynk Logo" 
              className="h-32 mb-8" 
            />
            <h2 className="text-4xl font-bold text-white mb-4 text-center">
              Seu Assessor Ciclista Inteligente
            </h2>
            <p className="text-xl text-white/90 text-center max-w-md">
              Encontre rotas seguras, obtenha insights de performance e conecte-se com outros ciclistas.
            </p>
          </div>
        </div>

        {/* Right section with auth forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative bg-gray-50">
          <Card className="w-full max-w-md shadow-xl border-0">
            <CardHeader className="space-y-2 px-8 pt-8">
              <div className="flex flex-col items-center mb-4 lg:hidden">
                <img 
                  src="/lovable-uploads/c6ac0b91-7542-4299-8422-3007983a958b.png" 
                  alt="TrailSynk Logo" 
                  className="h-20 mb-2" 
                />
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                {view === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
              </CardTitle>
              <CardDescription className="text-center">
                {view === 'login' 
                  ? 'Faça login na sua conta do TrailSynk' 
                  : 'Registre-se para começar a explorar rotas'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="transition-all duration-300 ease-in-out">
                {view === 'login' ? (
                  <LoginForm onToggleView={toggleView} />
                ) : (
                  <RegisterForm onToggleView={toggleView} onSuccessfulRegister={handleSuccessfulRegister} />
                )}
              </div>
              
              <SocialAuthButtons loading={loading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;

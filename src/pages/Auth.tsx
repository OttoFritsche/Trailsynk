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
  const {
    user,
    loading
  } = useAuth();
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
      navigate('/app', {
        replace: true
      });
    }
  }, [user, loading, navigate]);
  const toggleView = () => {
    const newView = view === 'login' ? 'register' : 'login';
    setView(newView);

    // Atualizar a URL sem redirecionar a página inteira
    const newMode = newView === 'login' ? 'login' : 'signup';
    const url = new URL(window.location.href);
    url.searchParams.set('mode', newMode);
    window.history.pushState({}, '', url.toString());
  };
  const handleSuccessfulRegister = () => {
    setView('login');
  };

  // Show loading state while checking auth
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-primary font-medium">Verificando autenticação...</p>
        </div>
      </div>;
  }
  return <>
      <Helmet>
        <title>{view === 'login' ? 'Login' : 'Cadastro'} | TrailSynk</title>
      </Helmet>
      
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: 'url("/lovable-uploads/eb6e1fb2-1256-4576-b410-258dd72242e9.png")'
      }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content area */}
        <div className="relative z-10 w-full max-w-md px-4 py-8">
          {/* Logo above the form (only visible on smaller screens) */}
          <div className="flex flex-col items-center mb-6">
            <img alt="TrailSynk Logo" src="/lovable-uploads/6273448b-6711-4015-bab3-731ece8ac240.png" className="h-24 mb-4" />
            
            
          </div>
          
          {/* Auth Card */}
          <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-2 px-8 pt-8">
              <CardTitle className="text-2xl font-bold text-center">
                {view === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
              </CardTitle>
              <CardDescription className="text-center">
                {view === 'login' ? 'Faça login na sua conta do TrailSynk' : 'Registre-se para começar a explorar rotas'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <div className="transition-all duration-300 ease-in-out">
                {view === 'login' ? <LoginForm onToggleView={toggleView} /> : <RegisterForm onToggleView={toggleView} onSuccessfulRegister={handleSuccessfulRegister} />}
              </div>
              
              <SocialAuthButtons loading={loading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>;
};
export default Auth;
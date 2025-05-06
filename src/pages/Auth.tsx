
import React, { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { Helmet } from 'react-helmet';
import LoginForm, { LoginFormValues } from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';

type AuthView = 'login' | 'register';

const Auth: React.FC = () => {
  const [view, setView] = useState<AuthView>('login');
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  
  // If already authenticated, redirect to app
  if (user) {
    return <Navigate to="/app" replace />;
  }
  
  const toggleView = () => {
    setView(view === 'login' ? 'register' : 'login');
  };

  const handleSuccessfulRegister = (username: string) => {
    setView('login');
    // Pre-fill the login form with the registered username
  };

  return (
    <>
      <Helmet>
        <title>{view === 'login' ? 'Login' : 'Cadastro'} | TrailSynk</title>
      </Helmet>
      
      <div className="flex min-h-screen bg-gray-50">
        {/* Left section with app branding */}
        <div className="hidden w-1/2 bg-primary/10 lg:flex flex-col justify-center items-center">
          <div className="p-8 max-w-md text-center">
            <img 
              src="/lovable-uploads/c6ac0b91-7542-4299-8422-3007983a958b.png" 
              alt="TrailSynk Logo" 
              className="h-32 mx-auto mb-6" 
            />
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Seu Assessor Ciclista Inteligente
            </h2>
            <p className="text-lg text-secondary/80">
              Encontre rotas seguras, obtenha insights de performance e conecte-se com outros ciclistas.
            </p>
          </div>
        </div>

        {/* Right section with auth forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex flex-col items-center mb-4 lg:hidden">
                <img 
                  src="/lovable-uploads/c6ac0b91-7542-4299-8422-3007983a958b.png" 
                  alt="TrailSynk Logo" 
                  className="h-20 mb-2" 
                />
              </div>
              <CardTitle className="text-2xl">
                {view === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta'}
              </CardTitle>
              <CardDescription>
                {view === 'login' 
                  ? 'Faça login na sua conta do TrailSynk' 
                  : 'Registre-se para começar a explorar rotas'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {view === 'login' ? (
                <LoginForm onToggleView={toggleView} />
              ) : (
                <RegisterForm onToggleView={toggleView} onSuccessfulRegister={handleSuccessfulRegister} />
              )}
              
              <SocialAuthButtons loading={loading} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;


import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Helmet } from 'react-helmet';

type AuthView = 'login' | 'register';

const Auth: React.FC = () => {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, signIn, signUp } = useAuth();
  
  // If already authenticated, redirect to app
  if (user) {
    return <Navigate to="/app" replace />;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (view === 'login') {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleView = () => {
    setView(view === 'login' ? 'register' : 'login');
    setEmail('');
    setPassword('');
  };

  const handleStravaLogin = () => {
    // Placeholder for Strava OAuth flow
    // This would typically redirect to a backend endpoint like /auth/strava
    console.log("Iniciando fluxo de autenticação do Strava");
    // Exemplo de redirecionamento para um endpoint backend (comentado)
    // window.location.href = "/api/auth/strava";
    alert("Função de login com Strava será implementada no backend");
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={view === 'login' ? 'Sua senha' : 'Crie uma senha forte'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading 
                    ? 'Processando...'
                    : view === 'login' ? 'Entrar' : 'Cadastrar'}
                </Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">ou continue com</span>
                </div>
              </div>
              
              {/* Social login buttons */}
              <div className="grid gap-2">
                <Button 
                  variant="outline" 
                  className="w-full bg-[#FC4C02] hover:bg-[#FB5B1F] text-white hover:text-white border-0"
                  onClick={handleStravaLogin}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" 
                          fill="currentColor"/>
                  </svg>
                  Login com Strava
                </Button>
                <Button variant="outline" className="w-full" disabled>
                  <Mail className="mr-2 h-4 w-4" />
                  Login com Google
                </Button>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center w-full">
                {view === 'login' ? (
                  <p>
                    Não tem conta?{" "}
                    <button onClick={toggleView} className="text-primary hover:underline">
                      Registre-se
                    </button>
                  </p>
                ) : (
                  <p>
                    Já tem uma conta?{" "}
                    <button onClick={toggleView} className="text-primary hover:underline">
                      Faça Login
                    </button>
                  </p>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;

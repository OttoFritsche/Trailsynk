
import React, { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Mail, User, Phone, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Helmet } from 'react-helmet';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type AuthView = 'login' | 'register';

// Schema for form validation
const registerSchema = z.object({
  fullName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  username: z.string()
    .min(3, "Nome de usuário deve ter pelo menos 3 caracteres")
    .max(20, "Nome de usuário deve ter no máximo 20 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Nome de usuário deve conter apenas letras, números e underscore"),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(/^(\+\d{1,3})?\s?\(?\d{2}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/, "Telefone inválido"),
  password: z.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "Senha deve conter pelo menos um caractere especial"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Digite seu nome de usuário ou email"),
  password: z.string().min(1, "Digite sua senha"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;

const Auth: React.FC = () => {
  const [view, setView] = useState<AuthView>('login');
  const [loading, setLoading] = useState(false);
  
  const { user, signIn, signUp } = useAuth();
  
  // If already authenticated, redirect to app
  if (user) {
    return <Navigate to="/app" replace />;
  }
  
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  const handleRegister = useCallback(async (data: RegisterFormValues) => {
    setLoading(true);
    
    try {
      const { fullName, username, email, phone, password } = data;
      
      const result = await signUp(
        email, 
        password, 
        {
          full_name: fullName,
          username,
          phone,
        }
      );
      
      if (!result.success) {
        throw new Error(result.error?.message || "Erro ao criar conta");
      }
      
      toast.success('Cadastro realizado! Você já pode fazer login.');
      setView('login');
      loginForm.setValue('usernameOrEmail', username);
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }, [signUp]);

  const handleLogin = useCallback(async (data: LoginFormValues) => {
    setLoading(true);
    
    try {
      const { usernameOrEmail, password } = data;
      // Determine if the input is an email or username
      const isEmail = usernameOrEmail.includes('@');
      
      const result = await signIn(
        isEmail ? usernameOrEmail : '', 
        password, 
        isEmail ? undefined : usernameOrEmail
      );
      
      if (!result.success) {
        throw new Error(result.error?.message || "Erro ao fazer login");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  }, [signIn]);
  
  const toggleView = () => {
    setView(view === 'login' ? 'register' : 'login');
    // Reset form states
    registerForm.reset();
    loginForm.reset();
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
              {view === 'login' ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="usernameOrEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome de usuário ou Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="seu_usuario ou seu@email.com"
                              autoComplete="username"
                              disabled={loading}
                              className="flex h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Sua senha"
                              autoComplete="current-password"
                              disabled={loading}
                              className="flex h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? 'Processando...' : 'Entrar'}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Seu nome completo"
                              autoComplete="name"
                              disabled={loading}
                              className="flex h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome de usuário</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="seu_usuario"
                              autoComplete="username"
                              disabled={loading}
                              className="flex h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="seu@email.com"
                              autoComplete="email"
                              disabled={loading}
                              className="flex h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              placeholder="(99) 99999-9999"
                              autoComplete="tel"
                              disabled={loading}
                              className="flex h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Crie uma senha forte"
                              autoComplete="new-password"
                              disabled={loading}
                              className="flex h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar senha</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Confirme sua senha"
                              autoComplete="new-password"
                              disabled={loading}
                              className="flex h-10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? 'Processando...' : 'Cadastrar'}
                    </Button>
                  </form>
                </Form>
              )}
              
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

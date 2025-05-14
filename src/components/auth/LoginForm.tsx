
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Mail, KeyRound } from 'lucide-react';

// Schema for login form validation
const loginSchema = z.object({
  usernameOrEmail: z.string().min(1, "Digite seu nome de usuário ou email"),
  password: z.string().min(1, "Digite sua senha"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onToggleView: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleView }) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
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
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
          <FormField
            control={form.control}
            name="usernameOrEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Nome de usuário ou Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      {...field}
                      placeholder="seu_usuario ou seu@email.com"
                      autoComplete="username"
                      disabled={loading}
                      className="pl-10 h-11 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-medium text-red-500" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      autoComplete="current-password"
                      disabled={loading}
                      className="pl-10 h-11 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    />
                    <button 
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-medium text-red-500" />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full h-11 font-medium shadow-md hover:shadow-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Entrar'}
          </Button>
        </form>
      </Form>
      
      <div className="text-sm text-center w-full mt-5">
        <p>
          Não tem conta?{" "}
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleView();
            }} 
            className="text-primary font-medium hover:text-primary-dark hover:underline transition-colors duration-200"
          >
            Registre-se
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;

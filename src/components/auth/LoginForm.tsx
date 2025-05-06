
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          <FormField
            control={form.control}
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
            control={form.control}
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
      
      <div className="text-sm text-center w-full mt-4">
        <p>
          Não tem conta?{" "}
          <button onClick={onToggleView} className="text-primary hover:underline">
            Registre-se
          </button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Schema for form validation with simplified rules
const registerSchema = z.object({
  fullName: z.string().min(1, "Nome obrigatório"),
  username: z.string().min(1, "Nome de usuário obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onToggleView: () => void;
  onSuccessfulRegister: (username: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleView, onSuccessfulRegister }) => {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onSubmit',
  });

  const handleRegister = async (data: RegisterFormValues) => {
    setLoading(true);
    
    try {
      const { fullName, username, email, phone, password } = data;
      
      console.log("Registering with data:", { fullName, username, email, phone });
      
      const result = await signUp(
        email, 
        password, 
        {
          full_name: fullName,
          username,
          phone: phone || undefined,
        }
      );
      
      if (!result.success) {
        throw new Error(result.error?.message || "Erro ao criar conta");
      }
      
      toast.success('Cadastro realizado! Você já pode fazer login.');
      onSuccessfulRegister(username);
      
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Nome completo</Label>
            <Input
              id="fullName"
              placeholder="Seu nome completo"
              autoComplete="name"
              disabled={loading}
              {...form.register("fullName")}
            />
            {form.formState.errors.fullName && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="username">Nome de usuário</Label>
            <Input
              id="username"
              placeholder="seu_usuario"
              autoComplete="username"
              disabled={loading}
              {...form.register("username")}
            />
            {form.formState.errors.username && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              disabled={loading}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone (opcional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(99) 99999-9999"
              autoComplete="tel"
              disabled={loading}
              {...form.register("phone")}
            />
            {form.formState.errors.phone && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Crie uma senha forte"
              autoComplete="new-password"
              disabled={loading}
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              autoComplete="new-password"
              disabled={loading}
              {...form.register("confirmPassword")}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Cadastrar'}
        </Button>
      </form>
      
      <div className="text-sm text-center w-full mt-4">
        <p>
          Já tem uma conta?{" "}
          <button onClick={onToggleView} className="text-primary hover:underline">
            Faça Login
          </button>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;

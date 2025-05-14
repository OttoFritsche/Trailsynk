
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { User, Mail, Phone, KeyRound } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName" className="text-sm font-medium">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="fullName"
                placeholder="Seu nome completo"
                autoComplete="name"
                disabled={loading}
                className="pl-10 h-11 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                {...form.register("fullName")}
              />
            </div>
            {form.formState.errors.fullName && (
              <p className="text-xs font-medium text-red-500">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="username" className="text-sm font-medium">Nome de usuário</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="username"
                placeholder="seu_usuario"
                autoComplete="username"
                disabled={loading}
                className="pl-10 h-11 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                {...form.register("username")}
              />
            </div>
            {form.formState.errors.username && (
              <p className="text-xs font-medium text-red-500">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                autoComplete="email"
                disabled={loading}
                className="pl-10 h-11 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                {...form.register("email")}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-xs font-medium text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="phone" className="text-sm font-medium">Telefone (opcional)</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="phone"
                type="tel"
                placeholder="(99) 99999-9999"
                autoComplete="tel"
                disabled={loading}
                className="pl-10 h-11 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                {...form.register("phone")}
              />
            </div>
            {form.formState.errors.phone && (
              <p className="text-xs font-medium text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Crie uma senha forte"
                autoComplete="new-password"
                disabled={loading}
                className="pl-10 h-11 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                {...form.register("password")}
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
            {form.formState.errors.password && (
              <p className="text-xs font-medium text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirmar senha</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                autoComplete="new-password"
                disabled={loading}
                className="pl-10 h-11 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                {...form.register("confirmPassword")}
              />
              <button 
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? (
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
            {form.formState.errors.confirmPassword && (
              <p className="text-xs font-medium text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full h-11 font-medium shadow-md hover:shadow-lg transition-all duration-300 mt-2"
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Cadastrar'}
        </Button>
      </form>
      
      <div className="text-sm text-center w-full mt-5">
        <p>
          Já tem uma conta?{" "}
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleView();
            }} 
            className="text-primary font-medium hover:text-primary-dark hover:underline transition-colors duration-200"
          >
            Faça Login
          </button>
        </p>
      </div>
    </>
  );
};

export default RegisterForm;

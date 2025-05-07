
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader2, Mail, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const location = useLocation();
  const email = location.state?.email || 'seu email';

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Email enviado!",
        description: "Um novo email de verificação foi enviado para sua caixa de entrada.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar o email",
        description: error.message || "Não foi possível enviar o email de verificação. Tente novamente mais tarde.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Verifique Seu Email</h1>
          <p className="mt-2 text-center text-gray-600">
            Um email de verificação foi enviado para <strong>{email}</strong>. Por favor, clique no link no email para ativar sua conta.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Button 
            onClick={handleResendVerification}
            disabled={isResending}
            className="w-full"
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Reenviar Email de Verificação"
            )}
          </Button>
          
          <div className="text-center">
            <Link to="/auth" className="text-primary hover:underline inline-flex items-center">
              <CheckCircle className="mr-1 h-4 w-4" />
              Já verifiquei, ir para o login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

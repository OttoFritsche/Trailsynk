
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, ArrowLeft } from 'lucide-react';
import { requestPasswordReset } from '@/services/authService';

// Schema for request password reset form validation
const requestResetSchema = z.object({
  email: z.string().email("Digite um email válido"),
});

type RequestResetFormValues = z.infer<typeof requestResetSchema>;

const RequestPasswordReset: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const form = useForm<RequestResetFormValues>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: RequestResetFormValues) => {
    setLoading(true);
    
    try {
      const result = await requestPasswordReset(data.email);
      
      if (result.success) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Error requesting password reset:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Recuperar Senha | TrailSynk</title>
      </Helmet>
      
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url("/lovable-uploads/eb6e1fb2-1256-4576-b410-258dd72242e9.png")' }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content area */}
        <div className="relative z-10 w-full max-w-md px-4 py-8">
          {/* Logo above the form */}
          <div className="flex flex-col items-center mb-6">
            <img 
              src="/lovable-uploads/c6ac0b91-7542-4299-8422-3007983a958b.png" 
              alt="TrailSynk Logo" 
              className="h-24 mb-4" 
            />
            <h2 className="text-2xl font-bold text-white mb-1 text-center">
              TrailSynk
            </h2>
            <p className="text-white/80 text-center max-w-xs">
              Seu Assessor Ciclista Inteligente
            </p>
          </div>
          
          {/* Card */}
          <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-2 px-8 pt-8">
              <CardTitle className="text-2xl font-bold text-center">
                Recuperar Senha
              </CardTitle>
              <CardDescription className="text-center">
                {!emailSent ? 
                  "Digite seu email para receber um link de recuperação de senha" : 
                  "Link de recuperação enviado!"
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              {!emailSent ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                {...field}
                                placeholder="seu@email.com"
                                type="email"
                                autoComplete="email"
                                disabled={loading}
                                className="pl-10 h-11 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                              />
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
                      {loading ? 'Processando...' : 'Enviar link de recuperação'}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 text-center">
                    <p className="text-green-800">
                      Enviamos um link de recuperação para seu email. 
                      Por favor, verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                    </p>
                  </div>
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="w-full h-11 font-medium"
                  >
                    Voltar para Login
                  </Button>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <Link 
                  to="/auth" 
                  className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RequestPasswordReset;

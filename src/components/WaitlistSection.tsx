
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Bike, Route, Navigation, Activity } from 'lucide-react';

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um endereço de email válido.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from("waitlist_leads")
        .insert([{ email, created_at: new Date().toISOString() }]);

      if (error) throw error;

      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você será notificado quando o TrailSynk for lançado.",
        variant: "default",
      });
      
      setSubmitted(true);
      setEmail('');
    } catch (error: any) {
      console.error("Erro ao registrar no waitlist:", error);
      
      toast({
        title: "Erro ao registrar",
        description: error.message === "duplicate key value violates unique constraint" 
          ? "Este email já está registrado na nossa lista de espera." 
          : "Ocorreu um erro ao registrar seu email. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        
        {/* Decorative bike routes */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,30 Q20,40 40,20 T80,30 T100,20" stroke="#2ECC71" strokeWidth="0.5" fill="none" />
          <path d="M0,70 Q20,60 40,80 T80,70 T100,80" stroke="#2ECC71" strokeWidth="0.5" fill="none" />
          <path d="M0,50 Q30,60 50,40 T100,50" stroke="#1A1F2C" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Top green accent */}
            <div className="h-2 bg-primary"></div>
            
            <div className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Bike className="w-8 h-8" />
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                  Junte-se à Revolução TrailSynk!
                </h2>
                <p className="text-lg text-secondary/70">
                  Seja dos primeiros a experimentar o futuro do ciclismo inteligente
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-6 animate-fade-in">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-2">Parabéns, você está na lista!</h3>
                  <p className="text-secondary/70">Seu lugar está garantido. Você receberá notificações exclusivas sobre o lançamento e recursos antecipados.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Seu melhor email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow py-6 px-4 text-lg"
                      required
                    />
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary-dark text-white py-6 px-6 text-lg relative overflow-hidden group"
                      disabled={loading}
                    >
                      <span className="relative z-10">
                        {loading ? "Processando..." : "Quero Acesso Antecipado!"}
                      </span>
                      <span className="absolute inset-0 bg-primary-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </Button>
                  </div>

                  {/* Incentives */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <div className="bg-primary/10 rounded-full p-2 mr-3">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Acesso Antecipado</span>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <div className="bg-primary/10 rounded-full p-2 mr-3">
                        <Route className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Rotas Premium Grátis</span>
                    </div>
                    <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <div className="bg-primary/10 rounded-full p-2 mr-3">
                        <Navigation className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">Convites para Amigos</span>
                    </div>
                  </div>
                </form>
              )}

              <p className="text-xs text-center mt-6 text-secondary/60">
                Sua jornada para um pedal mais inteligente e seguro começa aqui. Zero spam, apenas novidades incríveis do TrailSynk.
              </p>
            </div>
          </div>
          
          {/* Social proof counter */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-md border border-gray-100">
              <div className="flex -space-x-2 mr-3">
                <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                <div className="w-6 h-6 rounded-full bg-green-500"></div>
                <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">+</div>
              </div>
              <span className="text-sm font-medium">980+ ciclistas já se inscreveram</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;

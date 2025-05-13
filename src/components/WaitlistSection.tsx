
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Bike } from 'lucide-react';

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
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
    <section id="waitlist" className="py-20 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/711ca6c8-0729-44dd-aaa8-e5bb774f13c6.png" 
          alt="Vista panorâmica de montanhas" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20">
            <div className="p-8 sm:p-12">
              <div className="flex justify-center mb-8">
                <div className="bg-primary p-4 rounded-full shadow-lg">
                  <Bike className="h-10 w-10 text-white" />
                </div>
              </div>
              
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Seja o Primeiro a Ter o Futuro do Ciclismo nas Mãos!
                </h2>
                <p className="text-lg text-white/80">
                  Inscreva-se no TrailSynk e receba novidades exclusivas.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Seu melhor email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow py-6 px-4 text-lg bg-white/20 border-white/40 text-white placeholder:text-white/60"
                    required
                  />
                  <Button 
                    type="submit" 
                    className="bg-primary hover:bg-primary-dark text-white py-6 px-6 text-lg"
                    disabled={loading}
                  >
                    {loading ? "Processando..." : "Notifique-me do Lançamento!"}
                  </Button>
                </div>
              </form>

              <p className="text-sm text-center mt-6 text-white/60">
                Sua jornada para um pedal mais inteligente e seguro começa aqui. Zero spam, apenas novidades incríveis do TrailSynk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;

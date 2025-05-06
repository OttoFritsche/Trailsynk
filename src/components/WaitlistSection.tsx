
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSupabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const WaitlistSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = useSupabase();
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
      if (!supabase) {
        throw new Error("Conexão com Supabase não disponível");
      }
      
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
    <section id="waitlist" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-primary p-1">
            <div className="bg-white p-8 sm:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                  Seja o Primeiro a Ter o Futuro do Ciclismo nas Mãos!
                </h2>
                <p className="text-lg text-secondary/70">
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
                    className="flex-grow py-6 px-4 text-lg"
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

              <p className="text-xs text-center mt-4 text-secondary/60">
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


import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { CircleCheck, BadgeDollarSign, Zap, Award, CreditCard, Circle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const Subscription: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para assinar um plano.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Esta função invocará a edge function do Supabase para criar uma sessão do Checkout do Stripe
      // Nota: Esta é uma implementação placeholder, a função 'create-checkout' deve ser criada no Supabase
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          plan: 'pro',
          successUrl: window.location.origin + '/subscription-success',
          cancelUrl: window.location.origin + '/subscription'
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Redireciona para a página de checkout do Stripe
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout não encontrada na resposta");
      }
    } catch (error) {
      console.error("Erro ao processar a assinatura:", error);
      toast({
        title: "Falha no processamento",
        description: "Não foi possível iniciar o processo de pagamento. Tente novamente mais tarde.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para renderizar features com ícones de check
  const renderFeature = (text: string, included: boolean, isPro: boolean) => (
    <div className="flex items-center mb-3">
      {included ? 
        <CircleCheck className={`mr-2 h-5 w-5 ${isPro ? 'text-primary' : 'text-gray-600'}`} /> : 
        <Circle className="mr-2 h-5 w-5 text-gray-300" />
      }
      <span className={!included ? 'text-gray-400' : ''}>{text}</span>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Planos de Assinatura | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        {/* Cabeçalho da página */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Desbloqueie o TrailSynk Pro</h1>
          <p className="text-gray-600 mb-8">
            Aproveite ao máximo sua experiência de ciclismo com recursos premium e análises avançadas.
          </p>
        </div>
        
        {/* Seção de comparação de planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plano Gratuito */}
          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg font-semibold">Plano Gratuito</CardTitle>
              <p className="text-4xl font-bold mt-2">R$ 0<span className="text-lg text-gray-500 font-normal">/mês</span></p>
            </CardHeader>
            <CardContent className="pt-6">
              {renderFeature("Planejamento básico de rotas", true, false)}
              {renderFeature("Estatísticas básicas de performance", true, false)}
              {renderFeature("Até 5 rotas salvas", true, false)}
              {renderFeature("Acesso limitado ao Assessor IA", true, false)}
              {renderFeature("Participação em grupos", true, false)}
              {renderFeature("Análises avançadas de desempenho", false, false)}
              {renderFeature("Sugestões personalizadas ilimitadas", false, false)}
              {renderFeature("Rastreamento avançado de manutenção", false, false)}
              {renderFeature("Rotas personalizadas ilimitadas", false, false)}
              {renderFeature("Sem anúncios", false, false)}
            </CardContent>
            <CardFooter className="pt-2 pb-6 flex justify-center">
              <Button variant="outline" disabled className="w-full">
                Plano Atual
              </Button>
            </CardFooter>
          </Card>

          {/* Plano Pro */}
          <Card className="border-2 border-primary bg-primary/5">
            <CardHeader className="text-center pb-2">
              <div className="bg-primary text-white text-xs font-medium py-1 px-3 rounded-full mx-auto mb-2 w-fit">
                Recomendado
              </div>
              <CardTitle className="text-lg font-semibold">TrailSynk Pro</CardTitle>
              <p className="text-4xl font-bold mt-2">R$ 29,90<span className="text-lg text-gray-500 font-normal">/mês</span></p>
            </CardHeader>
            <CardContent className="pt-6">
              {renderFeature("Planejamento básico de rotas", true, true)}
              {renderFeature("Estatísticas básicas de performance", true, true)}
              {renderFeature("Rotas salvas ilimitadas", true, true)}
              {renderFeature("Acesso completo ao Assessor IA", true, true)}
              {renderFeature("Participação em grupos", true, true)}
              {renderFeature("Análises avançadas de desempenho", true, true)}
              {renderFeature("Sugestões personalizadas ilimitadas", true, true)}
              {renderFeature("Rastreamento avançado de manutenção", true, true)}
              {renderFeature("Rotas personalizadas ilimitadas", true, true)}
              {renderFeature("Sem anúncios", true, true)}
            </CardContent>
            <CardFooter className="pt-2 pb-6 flex justify-center">
              <Button 
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleSubscribe}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </span>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Assinar Pro
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Benefícios do Pro */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Por que escolher o TrailSynk Pro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-green-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Assessor IA Avançado</h3>
              <p className="text-gray-600 text-sm">Receba insights personalizados e coaching baseado no seu estilo de pedalada e objetivos.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-green-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Análises Premium</h3>
              <p className="text-gray-600 text-sm">Acompanhe seu progresso com métricas avançadas e visualizações detalhadas do seu desempenho.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-green-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4">
                <BadgeDollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Suporte a Ciclistas</h3>
              <p className="text-gray-600 text-sm">Sua assinatura ajuda a manter o TrailSynk e a desenvolver novos recursos exclusivos.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2">Como funciona o cancelamento?</h3>
              <p className="text-gray-600">Você pode cancelar sua assinatura a qualquer momento diretamente pela sua conta. Após o cancelamento, você continuará tendo acesso aos recursos Pro até o final do período pago.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2">Existe um período de teste?</h3>
              <p className="text-gray-600">Oferecemos 7 dias de teste gratuito para novos assinantes Pro. Você pode cancelar a qualquer momento durante este período sem ser cobrado.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold mb-2">Quais métodos de pagamento são aceitos?</h3>
              <p className="text-gray-600">Aceitamos todos os principais cartões de crédito e débito, incluindo Visa, Mastercard, American Express e outros.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;

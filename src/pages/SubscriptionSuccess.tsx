
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { CircleCheck, BadgeDollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const SubscriptionSuccess: React.FC = () => {
  const navigate = useNavigate();

  // Adicionar esta rota ao App.tsx
  useEffect(() => {
    // Aqui você poderia verificar o status da assinatura 
    // ou atualizar o estado global do usuário para refletir a nova assinatura
  }, []);

  return (
    <>
      <Helmet>
        <title>Assinatura Confirmada | TrailSynk</title>
      </Helmet>

      <div className="max-w-xl mx-auto my-12 text-center">
        <div className="bg-green-100 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
          <CircleCheck className="h-12 w-12 text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Assinatura Confirmada!</h1>
        <p className="text-gray-600 mb-8">
          Bem-vindo(a) ao TrailSynk Pro! Sua conta foi atualizada com sucesso 
          e agora você tem acesso a todos os recursos premium.
        </p>
        
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="py-6">
            <BadgeDollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-semibold mb-2">O que está incluído no seu plano:</h2>
            <ul className="text-left space-y-2 mb-4 mx-auto max-w-sm">
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-primary mr-2" />
                <span>Assessor IA avançado e personalizado</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-primary mr-2" />
                <span>Análises detalhadas de performance</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-primary mr-2" />
                <span>Rotas e sugestões personalizadas ilimitadas</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-primary mr-2" />
                <span>Rastreamento avançado de manutenção</span>
              </li>
              <li className="flex items-center">
                <CircleCheck className="h-5 w-5 text-primary mr-2" />
                <span>Experiência sem anúncios</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <div className="space-y-3">
          <Button 
            className="bg-primary hover:bg-primary/90"
            onClick={() => navigate('/app/ai-assistant')}
          >
            Explorar o Assessor IA Avançado
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <div>
            <Button 
              variant="ghost" 
              className="text-gray-600"
              onClick={() => navigate('/app')}
            >
              Ir para o painel inicial
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionSuccess;

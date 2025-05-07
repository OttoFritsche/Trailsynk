
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, MessageCircle, Zap, Route, Settings, Award, BadgeDollarSign } from 'lucide-react';
import AIChat from '@/components/app/AIChat';
import { Link } from 'react-router-dom';

const suggestedQuestions = [
  "Qual rota você recomenda para hoje?",
  "Como posso melhorar em subidas?",
  "Quando devo fazer manutenção na minha bike?",
  "Qual treinamento é ideal para aumentar resistência?"
];

const recentSuggestions = [
  {
    id: 1,
    title: "Sugestão de Rota: Trilha da Serra",
    description: "Esta rota de 18km combina com seu histórico recente",
    icon: Route,
    type: "route"
  },
  {
    id: 2,
    title: "Lembrete de Manutenção",
    description: "É hora de verificar a pressão dos pneus e lubrificar a corrente",
    icon: Settings,
    type: "maintenance"
  },
  {
    id: 3,
    title: "Dica: Foco em Cadência",
    description: "Mantenha entre 80-90 RPM para melhorar sua eficiência em subidas",
    icon: Award,
    type: "performance"
  }
];

const AIAssistant: React.FC = () => {
  const [isPremium, setIsPremium] = useState(false);
  
  // Simular verificação de assinatura premium
  // Em uma implementação real, isso viria do contexto de autenticação ou de uma chamada API
  useEffect(() => {
    // Mock: 30% de chance do usuário ser premium
    setIsPremium(Math.random() > 0.7);
  }, []);

  const handleSuggestionClick = (suggestion: typeof recentSuggestions[0]) => {
    // Implementação futura: navegar para a página correspondente ao tipo da sugestão
    console.log(`Navegando para sugestão: ${suggestion.title}, tipo: ${suggestion.type}`);
  };

  const handleQuestionClick = (question: string) => {
    // Implementação futura: enviar a pergunta para o chat AI
    console.log(`Enviando pergunta: ${question}`);
  };

  return (
    <>
      <Helmet>
        <title>Assessor IA | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Seu Assessor Inteligente TrailSynk</h1>
          <p className="text-muted-foreground">
            Converse com seu assistente pessoal de ciclismo e obtenha dicas, sugestões de rotas e muito mais.
          </p>
        </div>

        {/* Container principal com layout responsivo refinado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna principal - Chat AI */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="overflow-hidden border shadow-sm">
              <CardContent className="p-0">
                <AIChat />
              </CardContent>
            </Card>

            {/* Seção de perguntas sugeridas */}
            <Card className="border shadow-sm">
              <CardContent className="p-4">
                <h3 className="font-medium text-sm mb-3 text-gray-500 flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Experimente perguntar
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="justify-start text-left h-auto py-2 px-3"
                      onClick={() => handleQuestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna lateral - Sugestões e upgrade */}
          <div className="space-y-4">
            {/* Sugestões recentes */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-primary" />
                  Sugestões Recentes da IA
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {recentSuggestions.map((suggestion) => (
                    <div 
                      key={suggestion.id}
                      className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors flex"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="mr-3 mt-1">
                        <suggestion.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <p className="text-xs text-gray-600">{suggestion.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão "Ver mais sugestões" */}
                <Button variant="ghost" className="w-full mt-3" size="sm">
                  Ver mais sugestões
                </Button>
              </CardContent>
            </Card>

            {/* Banner de upgrade - somente para usuários não premium */}
            {!isPremium && (
              <Card className="border-primary/30 bg-primary/5 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <BadgeDollarSign className="h-6 w-6 mr-2 text-primary" />
                    <h3 className="font-semibold">TrailSynk Pro</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Desbloqueie insights ilimitados, sugestões personalizadas e análises avançadas com o TrailSynk Pro.
                  </p>
                  <Button className="w-full bg-primary hover:bg-primary/90" size="sm" asChild>
                    <Link to="/app/subscription">
                      Conhecer Planos Pro
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Card de dicas de uso */}
            <Card className="border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Como aproveitar seu Assessor IA</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-sm text-gray-600 space-y-3">
                  <li className="flex items-start">
                    <Bot className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <span>Pergunte sobre treinamentos específicos para seus objetivos</span>
                  </li>
                  <li className="flex items-start">
                    <Bot className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <span>Peça recomendações de rotas baseadas em sua localização</span>
                  </li>
                  <li className="flex items-start">
                    <Bot className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                    <span>Solicite dicas de manutenção preventiva</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistant;

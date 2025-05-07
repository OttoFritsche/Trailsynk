
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Calendar,
  Clock,
  MapPin, 
  Users,
  Route,
  Share,
  AlertCircle,
  CheckCircle,
  User,
  MessageCircle,
  CreditCard,
  Zap,
  ListChecks
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import RouteMap from '@/components/app/RouteMap';
import AIInsightCard from '@/components/training/AIInsightCard';

// Mock data for event details
const mockEventDetails = {
  id: '1',
  name: 'Pedal na Serra da Cantareira',
  date: '2023-10-15',
  time: '07:00',
  type: 'Grupo',
  location: 'Ponto de Encontro: Portaria do Parque da Cantareira, São Paulo',
  description: 'Pedal em grupo pelos melhores trilhos da Serra da Cantareira. Percurso de dificuldade média com algumas seções técnicas. Ideal para mountain bikers intermediários. Teremos parada para café e fotografia no mirante com vista para São Paulo.\n\nTragam água, lanche, câmara reserva e capacete. O ritmo será moderado e vamos aguardar todos os participantes nos pontos de reagrupamento.\n\nAPÓS O PEDAL: Almoço opcional em restaurante próximo (não incluso no evento).',
  organizer: {
    id: 'group1',
    name: 'Grupo MTB SP',
    imageUrl: 'https://images.unsplash.com/photo-1564510182933-8e1916774471?auto=format&fit=crop&q=80',
  },
  routeId: 'route123',
  participants: [
    {id: 'user1', name: 'João Silva', imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80'},
    {id: 'user2', name: 'Ana Costa', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80'},
    {id: 'user3', name: 'Carlos Eduardo', imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80'},
    {id: 'user4', name: 'Marina Santos', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80'},
    {id: 'user5', name: 'Pedro Almeida', imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80'}
  ],
  participantsCount: 15,
  maxParticipants: 25,
  distance: 35,
  elevation: 850,
  recommendedBike: 'Mountain Bike',
  difficulty: 'Intermediário',
  image: 'https://images.unsplash.com/photo-1596547309471-4eae4c97e535?auto=format&fit=crop&q=80',
  isUserRegistered: false,
  // New fields for registration
  registrationStatus: 'open', // 'open', 'closed', 'registered'
  registrationPrice: 49.90,
  registrationEndDate: '2023-10-10',
  isCompetition: true
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

const EventDetail = () => {
  const { eventId } = useParams();
  const [isRegistered, setIsRegistered] = useState(mockEventDetails.isUserRegistered);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [trainingPlan, setTrainingPlan] = useState<null | any>(null);
  
  // In a real app, you would fetch the event details using the eventId
  const event = mockEventDetails;

  if (!event) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Evento não encontrado</p>
        <Link to="/app/events" className="text-primary hover:underline">
          Voltar para os Eventos
        </Link>
      </div>
    );
  }

  const handleRegister = () => {
    if (event.registrationStatus === 'open') {
      // In a real app, this would call an API to start the Stripe checkout process
      console.log(`Starting registration process for event ${eventId}`);
      toast({
        title: "Processando sua inscrição",
        description: "Você será redirecionado para a página de pagamento.",
      });
      // Simulate success for demo purposes
      setTimeout(() => {
        setIsRegistered(true);
        toast({
          title: "Inscrição confirmada!",
          description: "Você está oficialmente inscrito neste evento.",
          // Changed from variant: "success" to use default variant with different styling
          variant: "default",
        });
      }, 2000);
    }
  };

  const handleGenerateTrainingPlan = () => {
    setIsGeneratingPlan(true);
    // In a real app, this would call an API to generate a training plan
    console.log(`Generating training plan for event ${eventId}`);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsGeneratingPlan(false);
      setTrainingPlan({
        summary: "Plano de treino personalizado para Serra da Cantareira",
        weeks: [
          {
            week: 1,
            focus: "Construção de base aeróbica",
            workouts: [
              { day: "Segunda", description: "Descanso ativo ou yoga" },
              { day: "Terça", description: "50 min de pedalada em Z2 (plano)" },
              { day: "Quarta", description: "Treino de força - core e pernas" },
              { day: "Quinta", description: "60 min de pedalada com 3 x 10 min subidas" },
              { day: "Sexta", description: "Descanso" },
              { day: "Sábado", description: "90 min pedalada longa em Z2" },
              { day: "Domingo", description: "60 min recuperação leve" }
            ]
          },
          {
            week: 2,
            focus: "Desenvolvimento técnico e subidas",
            workouts: [
              { day: "Segunda", description: "Descanso ativo" },
              { day: "Terça", description: "60 min com drills técnicos" },
              { day: "Quarta", description: "Treino de força e mobilidade" },
              { day: "Quinta", description: "75 min com intervalos 5 x 5 min em subida" },
              { day: "Sexta", description: "Descanso" },
              { day: "Sábado", description: "120 min simulação de percurso similar" },
              { day: "Domingo", description: "60 min recuperação ativa" }
            ]
          }
        ]
      });
      
      toast({
        title: "Plano de treino gerado",
        description: "A IA criou um plano personalizado para este evento baseado no seu perfil.",
        // Changed from variant: "success" to use default variant
        variant: "default",
      });
    }, 3000);
  };

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case 'Grupo':
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Grupo</Badge>;
      case 'Competição':
        return <Badge variant="outline" className="border-red-500 text-red-700">Competição</Badge>;
      case 'Aberto':
        return <Badge variant="outline" className="border-green-500 text-green-700">Aberto</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getRegistrationStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="outline" className="border-green-500 text-green-700">Inscrições Abertas</Badge>;
      case 'closed':
        return <Badge variant="outline" className="border-red-500 text-red-700">Inscrições Encerradas</Badge>;
      case 'registered':
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Inscrito</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Link to="/app/events" className="inline-flex items-center text-gray-600 hover:text-primary mb-4">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar para os Eventos
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Event details */}
        <div className="lg:col-span-2">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-md mb-6">
            <img 
              src={event.image} 
              alt={event.name} 
              className="h-full w-full object-cover" 
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              {getEventTypeBadge(event.type)}
              {event.isCompetition && (
                <Badge className="bg-amber-500">Competição Oficial</Badge>
              )}
            </div>
          </div>

          <Card className="mb-6 p-6">
            <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
            
            <div className="flex flex-wrap gap-y-3 gap-x-6 text-gray-700 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                {formatDate(event.date)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                {event.time}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                {event.participantsCount} / {event.maxParticipants} participantes
              </div>
              <div>
                {getRegistrationStatusBadge(isRegistered ? 'registered' : event.registrationStatus)}
              </div>
            </div>
            
            <div className="flex items-start mb-4">
              <MapPin className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0 mt-0.5" />
              <span>{event.location}</span>
            </div>
            
            <Separator className="my-4" />
            
            <h2 className="font-semibold text-lg mb-2">Descrição do Evento</h2>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </Card>

          {/* Registration section */}
          {event.isCompetition && (
            <Card className="mb-6 p-6 border-green-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-primary" />
                    Inscrição para o Evento
                  </h2>
                  
                  <div className="mt-3 text-gray-700">
                    <p>Preço: <span className="font-semibold text-lg">R$ {event.registrationPrice.toFixed(2)}</span></p>
                    <p className="text-sm mt-1">Inscrições até: {formatDate(event.registrationEndDate)}</p>
                  </div>
                </div>
                
                <Button
                  className={`${isRegistered ? 'bg-green-600' : 'bg-primary'} hover:opacity-90`}
                  size="lg"
                  disabled={event.registrationStatus === 'closed' || isRegistered}
                  onClick={handleRegister}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Inscrito
                    </>
                  ) : (
                    event.registrationStatus === 'open' ? "Inscrever-se Agora" : "Inscrições Encerradas"
                  )}
                </Button>
              </div>
              
              {event.registrationStatus === 'open' && !isRegistered && (
                <div className="mt-4 text-xs text-gray-500 flex items-center justify-end">
                  <span>Pagamento seguro via</span>
                  <div className="ml-1 bg-gray-100 px-2 py-1 rounded">Stripe</div>
                </div>
              )}
            </Card>
          )}

          {/* AI Training Plan section */}
          <Card className="mb-6 p-6 border-blue-200">
            <h2 className="font-semibold text-lg flex items-center mb-2">
              <Zap className="mr-2 h-5 w-5 text-blue-500" />
              Prepare-se com a IA do TrailSynk
            </h2>
            
            <p className="text-gray-700 mb-4">
              Receba um plano de treino otimizado pela nossa IA para este evento, 
              baseado no seu perfil e histórico de atividades.
            </p>
            
            {!trainingPlan ? (
              <Button 
                variant="outline" 
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
                onClick={handleGenerateTrainingPlan}
                disabled={isGeneratingPlan}
              >
                {isGeneratingPlan ? (
                  <>
                    <span className="animate-spin mr-2">◌</span>
                    Gerando Plano...
                  </>
                ) : (
                  <>
                    <ListChecks className="mr-2 h-4 w-4" />
                    Gerar Meu Plano de Treino (IA)
                  </>
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <AIInsightCard 
                  title="Plano de Treino Personalizado"
                  content={trainingPlan.summary}
                  type="info"
                />
                
                {trainingPlan.weeks.map((week: any, index: number) => (
                  <div key={index} className="bg-white border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Semana {week.week}: {week.focus}</h3>
                    <div className="space-y-2">
                      {week.workouts.map((workout: any, idx: number) => (
                        <div key={idx} className="flex">
                          <span className="font-medium w-20">{workout.day}:</span>
                          <span className="text-gray-700">{workout.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-end">
                  <Button variant="link" className="text-blue-600">
                    Ver plano completo
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <Card className="mb-6 p-6">
            <h2 className="font-semibold text-lg mb-4">Rota do Evento</h2>
            <div className="h-[300px] rounded-md overflow-hidden border">
              <RouteMap
                routeId={event.routeId}
                className="w-full h-full"
              />
            </div>
            <div className="mt-4 flex justify-between text-gray-700">
              <div className="flex items-center">
                <Route className="h-4 w-4 mr-1 text-gray-500" />
                <span>{event.distance} km</span>
              </div>
              <div className="flex items-center">
                <span>{event.elevation} m</span>
                <span className="ml-1">↑</span>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline">
                Ver Detalhes da Rota
              </Button>
            </div>
          </Card>

          <Card className="mb-6 p-6">
            <h2 className="font-semibold text-lg mb-4">Participantes ({event.participantsCount})</h2>
            <div className="flex flex-wrap gap-4">
              {event.participants.map((participant) => (
                <div 
                  key={participant.id}
                  className="flex flex-col items-center w-16"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden mb-1">
                    <img 
                      src={participant.imageUrl} 
                      alt={participant.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-xs text-center truncate w-full">{participant.name}</span>
                </div>
              ))}
              {event.participantsCount > event.participants.length && (
                <div className="flex flex-col items-center justify-center w-16">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                    +{event.participantsCount - event.participants.length}
                  </div>
                </div>
              )}
            </div>
            {event.participantsCount > 8 && (
              <div className="mt-4 text-center">
                <Button variant="link" className="text-primary">
                  Ver todos os participantes
                </Button>
              </div>
            )}
          </Card>
        </div>
        
        {/* Right column - Action sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              {!event.isCompetition && (
                <Button
                  className="w-full"
                  variant={isRegistered ? "outline" : "default"}
                  onClick={handleRegister}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Você está inscrito
                    </>
                  ) : (
                    "Confirmar Presença"
                  )}
                </Button>
              )}
              
              <Button variant="outline" className="w-full">
                <Share className="mr-2 h-4 w-4" />
                Compartilhar Evento
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block">Distância</span>
                <span className="font-medium">{event.distance} km</span>
              </div>
              <div>
                <span className="text-gray-500 block">Elevação</span>
                <span className="font-medium">{event.elevation} m</span>
              </div>
              <div>
                <span className="text-gray-500 block">Bike Recomendada</span>
                <span className="font-medium">{event.recommendedBike}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Dificuldade</span>
                <span className="font-medium">{event.difficulty}</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                <img 
                  src={event.organizer.imageUrl} 
                  alt={event.organizer.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h3 className="font-semibold">{event.organizer.name}</h3>
                <span className="text-sm text-gray-500">Organizador</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                <User className="mr-2 h-4 w-4" />
                Ver Perfil
              </Button>
              <Button variant="outline" className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contatar Organizador
              </Button>
            </div>
          </Card>
          
          <Card className="p-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">Lembrete de Segurança</h3>
                <ul className="mt-2 text-sm space-y-1 text-yellow-800">
                  <li>• Use capacete e equipamentos de segurança</li>
                  <li>• Leve água e alimentação suficientes</li>
                  <li>• Verifique sua bike antes do evento</li>
                  <li>• Siga as instruções do organizador</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

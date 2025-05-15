
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, MapPin, Users, ChevronLeft, UserPlus, Share2, ArrowUpRight, Activity } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ParticipantsList from '@/components/events/ParticipantsList';
import EventMapPlaceholder from '@/components/maps/EventMapPlaceholder';
import AITrainingPlan from '@/components/events/AITrainingPlan';
import { Link } from 'react-router-dom';

// Mock data for the event
const mockEvent = {
  id: '1',
  name: 'Pedal na Serra da Cantareira',
  date: new Date('2023-10-15'),
  time: '07:00',
  type: 'Grupo',
  description: 'Uma aventura incrível pela Serra da Cantareira, com trilhas desafiadoras e paisagens deslumbrantes. Traga sua bike de montanha e prepare-se para um dia de adrenalina e diversão em meio à natureza.',
  location: 'Parque da Cantareira, São Paulo',
  organizer: 'Grupo MTB SP',
  organizerId: 'group1',
  participants: [
    { id: '1', name: 'João Silva', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Maria Oliveira', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    { id: '3', name: 'Carlos Santos', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'Ana Costa', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
    { id: '5', name: 'Pedro Souza', avatarUrl: 'https://i.pravatar.cc/150?img=7' },
    { id: '6', name: 'Fernanda Lima', avatarUrl: 'https://i.pravatar.cc/150?img=6' },
    { id: '7', name: 'Rafael Mendes', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
    { id: '8', name: 'Juliana Castro', avatarUrl: 'https://i.pravatar.cc/150?img=8' },
    { id: '9', name: 'Lucas Ferreira', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
    { id: '10', name: 'Mariana Alves', avatarUrl: 'https://i.pravatar.cc/150?img=10' },
    { id: '11', name: 'Bruno Martins', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
    { id: '12', name: 'Camila Nunes', avatarUrl: 'https://i.pravatar.cc/150?img=13' },
    { id: '13', name: 'Diego Rocha', avatarUrl: 'https://i.pravatar.cc/150?img=15' },
    { id: '14', name: 'Bianca Pereira', avatarUrl: 'https://i.pravatar.cc/150?img=14' },
    { id: '15', name: 'Gustavo Moreira', avatarUrl: 'https://i.pravatar.cc/150?img=16' }
  ],
  maxParticipants: 25,
  distance: 35,
  elevation: 850,
  difficulty: 'Moderado',
  terrain: 'Trilha',
  pace: 'Intermediário',
  biketype: 'Mountain Bike',
  requirements: [
    'Capacete obrigatório',
    'Levar 2L de água',
    'Levar lanche',
    'Kit de primeiros socorros básico',
    'Bateria de celular carregada'
  ],
  mainImage: 'https://images.unsplash.com/photo-1596547309471-4eae4c97e535?auto=format&fit=crop&q=80',
  extraImages: [
    'https://images.unsplash.com/photo-1583225214464-9296029427aa?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1605188076503-946344fa4ca7?auto=format&fit=crop&q=80'
  ],
  weather: {
    forecast: 'Parcialmente nublado',
    temperature: '22°C',
    wind: '12 km/h',
    precipitation: '10%'
  }
};

const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [isParticipating, setIsParticipating] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  // In a real implementation, we would fetch the event data based on the eventId
  // For now, we're using mock data
  const event = mockEvent;
  
  const formatDate = (date: Date) => {
    return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };
  
  const handleJoin = () => {
    setIsParticipating(!isParticipating);
    // In a real implementation, we would call an API to join/leave the event
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

  return (
    <>
      <Helmet>
        <title>{event.name} | Eventos | TrailSynk</title>
      </Helmet>
      
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="mb-6">
          <Link 
            to="/app/events" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para Eventos
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{event.name}</h1>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(event.date)}</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4 mr-1" />
                <span>{event.time}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9"
                onClick={() => alert('Compartilhar evento')}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
              
              <Button 
                className={isParticipating ? "bg-red-500 hover:bg-red-600 h-9" : "bg-primary hover:bg-primary-dark h-9"}
                onClick={handleJoin}
              >
                {isParticipating ? (
                  <>
                    <Users className="h-4 w-4 mr-2" />
                    Cancelar Participação
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Participar
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 lg:h-96 w-full rounded-xl overflow-hidden mb-6">
          <img 
            src={event.mainImage} 
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 m-4">
            {getEventTypeBadge(event.type)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="details" className="w-full" onValueChange={tab => setActiveTab(tab)}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="details">Detalhes</TabsTrigger>
                <TabsTrigger value="participants">Participantes</TabsTrigger>
                <TabsTrigger value="training">Plano de Treino</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Sobre o Evento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-gray-700">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mt-6">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-2">Detalhes da Rota</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Distância:</span>
                            <span className="font-medium">{event.distance} km</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Elevação:</span>
                            <span className="font-medium">{event.elevation} m</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Dificuldade:</span>
                            <span className="font-medium">{event.difficulty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Terreno:</span>
                            <span className="font-medium">{event.terrain}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mb-2">Detalhes do Grupo</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Ritmo:</span>
                            <span className="font-medium">{event.pace}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Tipo de Bike:</span>
                            <span className="font-medium">{event.biketype}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Participantes:</span>
                            <span className="font-medium">{event.participants.length}/{event.maxParticipants}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Organizador:</span>
                            <span className="font-medium">{event.organizer}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wider mt-6 mb-2">Requisitos</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {event.requirements.map((req, idx) => (
                        <li key={idx} className="text-sm text-gray-700">{req}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <EventMapPlaceholder 
                  eventLocation={event.location}
                  eventName={event.name}
                  eventDate={formatDate(event.date)}
                  eventTime={event.time}
                  participantsCount={event.participants.length}
                  height="h-[350px]"
                />
                
                {event.extraImages.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ArrowUpRight className="h-5 w-5 text-primary" />
                        Imagens da Rota
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {event.extraImages.map((img, idx) => (
                          <div key={idx} className="rounded-md overflow-hidden h-40">
                            <img 
                              src={img} 
                              alt={`Rota ${idx + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="participants">
                <ParticipantsList participants={event.participants} />
              </TabsContent>
              
              <TabsContent value="training">
                <AITrainingPlan eventName={event.name} distance={event.distance} elevation={event.elevation} />
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Local do Evento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-md h-40 mb-4">
                  {/* A placeholder for a real map component */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
                    <MapPin className="h-8 w-8 text-gray-400" />
                  </div>
                </div>
                <h3 className="font-semibold">{event.location}</h3>
                <p className="text-sm text-gray-600 mt-1">Clique para ver no mapa ou obter direções.</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h3 className="font-semibold mb-2">Previsão do Tempo</h3>
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="text-sm">Condição:</div>
                    <div className="text-sm font-medium">{event.weather.forecast}</div>
                    <div className="text-sm">Temperatura:</div>
                    <div className="text-sm font-medium">{event.weather.temperature}</div>
                    <div className="text-sm">Vento:</div>
                    <div className="text-sm font-medium">{event.weather.wind}</div>
                    <div className="text-sm">Precipitação:</div>
                    <div className="text-sm font-medium">{event.weather.precipitation}</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h3 className="font-semibold mb-2">Organizado por</h3>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=20" />
                      <AvatarFallback>GR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{event.organizer}</p>
                      <p className="text-xs text-gray-500">Grupo de Ciclismo</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Ver Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Participantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2 overflow-hidden mb-3">
                  {event.participants.slice(0, 8).map((participant, idx) => (
                    <Avatar key={idx} className="border-2 border-background">
                      <AvatarImage src={participant.avatarUrl} />
                      <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ))}
                  {event.participants.length > 8 && (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 border-2 border-background text-xs font-medium">
                      +{event.participants.length - 8}
                    </div>
                  )}
                </div>
                <p className="text-sm">
                  {event.participants.length} de {event.maxParticipants} participantes
                </p>
                {activeTab !== 'participants' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => setActiveTab('participants')}
                  >
                    Ver Todos
                  </Button>
                )}
              </CardContent>
            </Card>
            
            {!isParticipating && (
              <Button 
                className="w-full bg-primary hover:bg-primary-dark"
                onClick={handleJoin}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Participar
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetail;

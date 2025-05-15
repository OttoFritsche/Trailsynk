
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, Clock, MapPin, Users, PlusCircle, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    name: 'Pedal na Serra da Cantareira',
    date: '2023-10-15',
    time: '07:00',
    type: 'Grupo',
    location: 'Parque da Cantareira, São Paulo',
    organizer: 'Grupo MTB SP',
    organizerId: 'group1',
    participants: 15,
    maxParticipants: 25,
    distance: 35,
    elevation: 850,
    image: 'https://images.unsplash.com/photo-1596547309471-4eae4c97e535?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    name: 'Circuito Estrada Velha de Santos',
    date: '2023-10-20',
    time: '06:30',
    type: 'Competição',
    location: 'Estrada Velha de Santos, SP',
    organizer: 'Ciclismo Paulista',
    organizerId: 'group2',
    participants: 42,
    maxParticipants: 50,
    distance: 65,
    elevation: 1200,
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    name: 'Pedal Noturno na Marginal Pinheiros',
    date: '2023-10-12',
    time: '19:00',
    type: 'Aberto',
    location: 'Ciclovia da Marginal Pinheiros, São Paulo',
    organizer: 'Ciclistas Urbanos',
    organizerId: 'group3',
    participants: 28,
    maxParticipants: null,
    distance: 22,
    elevation: 120,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80'
  },
  {
    id: '4',
    name: 'Desafio Serra do Mar',
    date: '2023-11-05',
    time: '06:00',
    type: 'Competição',
    location: 'Paranapiacaba, SP',
    organizer: 'MTB Challenge',
    organizerId: 'group4',
    participants: 18,
    maxParticipants: 30,
    distance: 45,
    elevation: 1500,
    image: 'https://images.unsplash.com/photo-1605188076503-946344fa4ca7?auto=format&fit=crop&q=80'
  },
  {
    id: '5',
    name: 'Passeio Ciclístico Familiar',
    date: '2023-10-29',
    time: '09:00',
    type: 'Aberto',
    location: 'Parque Ibirapuera, São Paulo',
    organizer: 'Bike Family',
    organizerId: 'group5',
    participants: 54,
    maxParticipants: 100,
    distance: 15,
    elevation: 50,
    image: 'https://images.unsplash.com/photo-1626249200366-213a6a72061a?auto=format&fit=crop&q=80'
  }
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

interface EventCardProps {
  id: string;
  name: string;
  date: string;
  time: string;
  type: string;
  location: string;
  organizer: string;
  participants: number;
  maxParticipants: number | null;
  distance: number;
  elevation: number;
  image: string;
  loading?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ 
  id, 
  name, 
  date, 
  time, 
  type, 
  location, 
  organizer, 
  participants, 
  maxParticipants, 
  distance, 
  elevation, 
  image,
  loading = false 
}) => {
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

  if (loading) {
    return (
      <Card className="overflow-hidden group">
        <div className="h-48">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-3" />
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-4 w-full mb-3" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Link to={`/app/events/${id}`}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-300">
        <div className="relative h-48">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
            loading="lazy"
          />
          <div className="absolute top-0 right-0 m-2">
            {getEventTypeBadge(type)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{name}</h3>
          
          <div className="flex flex-wrap items-center text-gray-600 mb-2">
            <div className="flex items-center mr-3">
              <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{formatDate(date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{time}</span>
            </div>
          </div>
          
          <div className="flex items-start mb-3">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600 line-clamp-1">{location}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-gray-600" />
              <span className="text-sm text-gray-600">
                {participants} {maxParticipants ? `/ ${maxParticipants}` : ''} participantes
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-primary transform group-hover:translate-x-1 transition-transform" />
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
            <span className="truncate max-w-[60%]">Organizado por: {organizer}</span>
            <div className="flex space-x-3">
              <span>{distance} km</span>
              <span>{elevation} m↑</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventType, setEventType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading data from an API
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simple filtering based on search term and event type
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = eventType === 'all' || event.type === eventType;
    return matchesSearch && matchesType;
  });

  const handleCreateEvent = () => {
    // In a production app, this would navigate to create event page
    toast.info("Funcionalidade em desenvolvimento");
  };

  // Loading placeholders
  const loadingCards = Array(6).fill(0).map((_, index) => (
    <EventCard
      key={`loading-${index}`}
      id=""
      name=""
      date=""
      time=""
      type=""
      location=""
      organizer=""
      participants={0}
      maxParticipants={0}
      distance={0}
      elevation={0}
      image=""
      loading={true}
    />
  ));

  return (
    <div className="container mx-auto p-4 max-w-7xl animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4 md:mb-0">Próximos Pedais e Eventos</h1>
        <Link to="/app/events/new">
          <Button 
            className="bg-primary hover:bg-primary-dark transition-colors"
            onClick={handleCreateEvent}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Evento
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar eventos por nome ou local..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center w-full md:w-auto">
              <Filter className="h-4 w-4 text-gray-500 mr-2" />
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Tipo de Evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="Grupo">Grupo</SelectItem>
                  <SelectItem value="Competição">Competição</SelectItem>
                  <SelectItem value="Aberto">Aberto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)}>
              <ToggleGroupItem value="grid" aria-label="Visualizar em grade">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="Visualizar em lista">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? loadingCards : (
            filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  name={event.name}
                  date={event.date}
                  time={event.time}
                  type={event.type}
                  location={event.location}
                  organizer={event.organizer}
                  participants={event.participants}
                  maxParticipants={event.maxParticipants}
                  distance={event.distance}
                  elevation={event.elevation}
                  image={event.image}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <Calendar className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Nenhum evento encontrado</h3>
                <p className="text-gray-500 text-center mt-2">
                  Tente ajustar seus filtros ou crie um novo evento
                </p>
                <Button 
                  className="mt-6 bg-primary hover:bg-primary-dark"
                  onClick={handleCreateEvent}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Criar Evento
                </Button>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-16 w-24 rounded" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            filteredEvents.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredEvents.map((event) => (
                  <Link to={`/app/events/${event.id}`} key={event.id} className="block hover:bg-gray-50 transition-colors">
                    <div className="flex items-center p-4 gap-4">
                      <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={event.image} 
                          alt={event.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-base truncate">{event.name}</h3>
                          {getEventTypeBadge(event.type)}
                        </div>
                        <div className="text-sm text-gray-500 flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(event.date)} {event.time}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {event.participants} {event.maxParticipants ? `/ ${event.maxParticipants}` : ''}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <Calendar className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700">Nenhum evento encontrado</h3>
                <p className="text-gray-500 text-center mt-2">
                  Tente ajustar seus filtros ou crie um novo evento
                </p>
                <Button 
                  className="mt-6 bg-primary hover:bg-primary-dark"
                  onClick={handleCreateEvent}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Criar Evento
                </Button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Events;

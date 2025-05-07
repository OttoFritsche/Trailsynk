
import React, { useState } from 'react';
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

const EventCard: React.FC<{
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
}> = ({ id, name, date, time, type, location, organizer, participants, maxParticipants, distance, elevation, image }) => {
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
    <Link to={`/app/events/${id}`}>
      <Card className="overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
        <div className="relative h-48">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-transform group-hover:scale-105" 
          />
          <div className="absolute top-0 right-0 m-2">
            {getEventTypeBadge(type)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          
          <div className="flex items-center text-gray-600 mb-2">
            <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm">{formatDate(date)}</span>
            <span className="text-sm mx-2">|</span>
            <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm">{time}</span>
          </div>
          
          <div className="flex items-start mb-3">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600">{location}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-gray-600" />
              <span className="text-sm text-gray-600">
                {participants} {maxParticipants ? `/ ${maxParticipants}` : ''} participantes
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-primary" />
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
            <span>Organizado por: {organizer}</span>
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
  
  // Simple filtering based on search term and event type
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = eventType === 'all' || event.type === eventType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4 md:mb-0">Próximos Pedais e Eventos</h1>
        <Button className="bg-primary hover:bg-primary-dark">
          <PlusCircle className="mr-2 h-4 w-4" />
          Criar Evento
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar eventos..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-[180px]">
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
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
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
        ))}
        
        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Nenhum evento encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;

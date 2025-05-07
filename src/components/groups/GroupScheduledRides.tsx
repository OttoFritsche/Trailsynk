
import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ScheduledRide {
  id: string;
  title: string;
  date: Date;
  location: string;
  distance?: number;
  participantsCount: number;
  participants: { id: string; username: string; avatar_url?: string }[];
}

interface GroupScheduledRidesProps {
  groupId: string;
  limit?: number;
}

// Dados de exemplo para fins de demonstração
const mockRides: ScheduledRide[] = [
  {
    id: '1',
    title: 'Pedal na Orla',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 dias a partir de agora
    location: 'Praia do Flamengo, Salvador',
    distance: 30,
    participantsCount: 5,
    participants: [
      { id: '1', username: 'maria_silva', avatar_url: '/placeholder.svg' },
      { id: '2', username: 'joao_ciclista', avatar_url: '/placeholder.svg' },
      { id: '3', username: 'pedro.mtb', avatar_url: '/placeholder.svg' },
      { id: '4', username: 'ana_bike', avatar_url: '/placeholder.svg' },
      { id: '5', username: 'carlos.roads', avatar_url: '/placeholder.svg' },
    ]
  },
  {
    id: '2',
    title: 'Subida da Serra',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias a partir de agora
    location: 'Estrada do Côco, Lauro de Freitas',
    distance: 45,
    participantsCount: 3,
    participants: [
      { id: '1', username: 'maria_silva', avatar_url: '/placeholder.svg' },
      { id: '2', username: 'joao_ciclista', avatar_url: '/placeholder.svg' },
      { id: '6', username: 'julia_cyclist', avatar_url: '/placeholder.svg' },
    ]
  },
  {
    id: '3',
    title: 'Trilha Noturna',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 dias a partir de agora
    location: 'Parque da Cidade, Salvador',
    distance: 20,
    participantsCount: 4,
    participants: [
      { id: '3', username: 'pedro.mtb', avatar_url: '/placeholder.svg' },
      { id: '4', username: 'ana_bike', avatar_url: '/placeholder.svg' },
      { id: '7', username: 'roberto_pedal', avatar_url: '/placeholder.svg' },
      { id: '8', username: 'amanda_speed', avatar_url: '/placeholder.svg' },
    ]
  },
];

// Função para formatar a data de maneira amigável
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const GroupScheduledRides: React.FC<GroupScheduledRidesProps> = ({ groupId, limit }) => {
  // Na implementação real, buscaríamos os pedais agendados do grupo do Supabase
  // baseado no groupId fornecido
  const rides = limit ? mockRides.slice(0, limit) : mockRides;

  return (
    <div className="space-y-4">
      {rides.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">Nenhum pedal agendado</p>
      ) : (
        rides.map((ride) => (
          <Card key={ride.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{ride.title}</h3>
                  <Badge className="bg-primary/10 text-primary border-0">
                    {ride.distance} km
                  </Badge>
                </div>

                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(ride.date)}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{ride.location}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    <span>Participantes ({ride.participantsCount})</span>
                  </div>
                  <div className="flex -space-x-2">
                    {ride.participants.slice(0, 5).map((participant) => (
                      <Avatar key={participant.id} className="h-8 w-8 border-2 border-white">
                        <AvatarImage src={participant.avatar_url} alt={participant.username} />
                        <AvatarFallback>{participant.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    ))}
                    {ride.participants.length > 5 && (
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs border-2 border-white">
                        +{ride.participants.length - 5}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm">Detalhes</Button>
                  <Button size="sm">Participar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};


import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar, Map, Route, Check, Users, Plus, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { ScheduleRideDialog } from './ScheduleRideDialog';

// Mock data para demonstração
const mockMembers = [
  { id: '1', name: 'Ana Silva', username: 'anasilva', avatar: '' },
  { id: '2', name: 'Carlos Oliveira', username: 'carlos_mtb', avatar: '' },
  { id: '3', name: 'Marina Costa', username: 'marina_bike', avatar: '' },
  { id: '4', name: 'Roberto Almeida', username: 'robertoalm', avatar: '' },
  { id: '5', name: 'Julia Santos', username: 'julias', avatar: '' }
];

const mockUpcomingRides = [
  { 
    id: '1', 
    name: 'Trilha do Mirante', 
    date: new Date(Date.now() + 86400000 * 2), 
    location: 'Parque da Cidade', 
    description: 'Pedal matinal com café no mirante',
    meetingPoint: { lat: -12.9777, lng: -38.5016 }
  },
  { 
    id: '2', 
    name: 'Rota Litoral Norte', 
    date: new Date(Date.now() + 86400000 * 5), 
    location: 'Praia do Forte', 
    description: 'Percurso pela orla com parada para almoço',
    meetingPoint: { lat: -12.5800, lng: -38.0200 }
  }
];

const mockGroupRoutes = [
  { id: '1', name: 'Circuito Lagoa', distance: 25, elevation: 150 },
  { id: '2', name: 'Subida da Serra', distance: 18, elevation: 450 },
  { id: '3', name: 'Volta da Represa', distance: 40, elevation: 200 }
];

const mockChecklist = [
  { id: '1', name: 'Capacete', checked: true },
  { id: '2', name: 'Luvas', checked: true },
  { id: '3', name: 'Garrafinha de água', checked: false },
  { id: '4', name: 'Kit de reparo', checked: false },
  { id: '5', name: 'Lanterna', checked: false }
];

interface GroupDetailsProps {
  group: any; // Tipo do grupo passado como prop
}

export const GroupDetails: React.FC<GroupDetailsProps> = ({ group }) => {
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
  const [selectedRide, setSelectedRide] = useState<any | null>(null);
  const [checklist, setChecklist] = useState(mockChecklist);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const toggleChecklistItem = (id: string) => {
    setChecklist(current => 
      current.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const openRideMapDialog = (ride: any) => {
    setSelectedRide(ride);
    setIsMapDialogOpen(true);
  };

  return (
    <div className="space-y-6 py-4">
      {/* Cabeçalho do Grupo */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 lg:w-1/4 aspect-video md:aspect-square rounded-md bg-gray-200 overflow-hidden">
          <img 
            src={group.image || '/placeholder.svg'} 
            alt={group.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{group.name}</h2>
          <p className="text-muted-foreground mt-2">{group.description}</p>
          
          <div className="flex items-center mt-4 text-sm space-x-4">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{group.memberCount} membros</span>
            </div>
            
            {group.nextRideDate && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>Próximo pedal: {formatDate(group.nextRideDate)}</span>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex flex-wrap gap-2">
            <Button>Convidar Amigos</Button>
            {group.isAdmin && (
              <Button variant="outline">Editar Grupo</Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Abas para diferentes seções */}
      <Tabs defaultValue="agenda" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="members">Membros</TabsTrigger>
          <TabsTrigger value="routes">Rotas</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>
        
        {/* Aba: Agenda de Pedais */}
        <TabsContent value="agenda" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Próximos Pedais</h3>
            <Button 
              onClick={() => setIsScheduleDialogOpen(true)}
              size="sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agendar Pedal
            </Button>
          </div>
          
          <div className="space-y-3">
            {mockUpcomingRides.map((ride) => (
              <Card key={ride.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{ride.name}</h4>
                        <Badge className="bg-primary/80">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          {formatDate(ride.date)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{ride.description}</p>
                      <div className="mt-3 flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{ride.location}</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openRideMapDialog(ride)}
                        >
                          <Map className="mr-2 h-4 w-4" />
                          Ver no Mapa
                        </Button>
                        <Button size="sm">Confirmar Presença</Button>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 bg-gray-100 min-h-[120px] relative hidden md:block">
                      {/* Placeholder para o mapa */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Map className="h-8 w-8" />
                      </div>
                      <div className="absolute bottom-2 right-2 z-10">
                        <Badge variant="outline" className="bg-white">
                          Ponto de Encontro
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {mockUpcomingRides.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-md">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Nenhum pedal agendado</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Seja o primeiro a agendar um pedal para este grupo!
                </p>
                <Button 
                  onClick={() => setIsScheduleDialogOpen(true)} 
                  className="mt-4"
                >
                  Agendar Pedal
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* Aba: Membros */}
        <TabsContent value="members" className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mockMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-muted-foreground">@{member.username}</div>
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-center h-full aspect-square rounded-md border-2 border-dashed border-gray-300 p-4 hover:bg-gray-50 cursor-pointer">
              <div className="text-center">
                <Plus className="h-8 w-8 mx-auto text-gray-400" />
                <span className="text-sm text-muted-foreground mt-1 block">Convidar</span>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Aba: Rotas */}
        <TabsContent value="routes" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Rotas do Grupo</h3>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nova Rota
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockGroupRoutes.map((route) => (
              <Card key={route.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col h-full">
                    <div className="h-32 bg-gray-200 relative">
                      {/* Placeholder para o traçado da rota */}
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Route className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium">{route.name}</h4>
                      <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                        <span>{route.distance} km</span>
                        <span>↑ {route.elevation} m</span>
                      </div>
                      <Button variant="outline" className="w-full mt-3">
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                <div className="flex flex-col justify-center items-center h-full p-8 text-center cursor-pointer hover:bg-gray-50">
                  <Plus className="h-12 w-12 text-gray-400 mb-2" />
                  <h4 className="font-medium">Criar Nova Rota para o Grupo</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Compartilhe suas trilhas favoritas com o grupo
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Aba: Checklist */}
        <TabsContent value="checklist" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Checklist para Pedal</h3>
            <Button size="sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Item
            </Button>
          </div>
          
          <Card>
            <CardContent className="divide-y">
              {checklist.map((item) => (
                <div key={item.id} className="flex items-center py-3">
                  <Checkbox 
                    id={`item-${item.id}`} 
                    checked={item.checked}
                    onCheckedChange={() => toggleChecklistItem(item.id)}
                    className="mr-3"
                  />
                  <label 
                    htmlFor={`item-${item.id}`}
                    className={`flex-1 ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {item.name}
                  </label>
                  {item.checked && <Check className="h-4 w-4 text-green-500" />}
                </div>
              ))}
            </CardContent>
          </Card>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-6">
            <h4 className="text-blue-800 font-medium flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Localização em Tempo Real
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              Durante pedais agendados, você poderá ver a localização dos membros do grupo em tempo real nesta área.
              <br />
              <span className="italic">(Funcionalidade em desenvolvimento)</span>
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Dialog para exibir o mapa de um pedal */}
      <Dialog open={isMapDialogOpen} onOpenChange={setIsMapDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRide?.name} - Ponto de Encontro</DialogTitle>
            <DialogDescription>
              {selectedRide?.location} • {selectedRide && formatDate(selectedRide.date)}
            </DialogDescription>
          </DialogHeader>
          <div className="h-[300px] bg-gray-200 rounded-md relative">
            {/* Placeholder para o mapa real */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto" />
                <p className="mt-2 text-sm">Ponto de Encontro</p>
                <p className="text-xs">{selectedRide?.location}</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para agendar um novo pedal */}
      <ScheduleRideDialog 
        open={isScheduleDialogOpen} 
        onOpenChange={setIsScheduleDialogOpen} 
        groupId={group.id}
      />
    </div>
  );
};


import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { GroupAgendaTab } from './tabs/GroupAgendaTab';
import { GroupMembersTabContent } from './tabs/GroupMembersTabContent';
import { GroupRoutesTabContent } from './tabs/GroupRoutesTabContent';
import { GroupChecklistTab } from './tabs/GroupChecklistTab';
import { RideMapDialog } from './RideMapDialog';
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
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
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
        <TabsContent value="agenda">
          <GroupAgendaTab 
            upcomingRides={mockUpcomingRides} 
            formatDate={formatDate}
            openRideMapDialog={openRideMapDialog}
            onScheduleClick={() => setIsScheduleDialogOpen(true)}
          />
        </TabsContent>
        
        {/* Aba: Membros */}
        <TabsContent value="members" className="pt-4">
          <GroupMembersTabContent members={mockMembers} />
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
          
          <GroupRoutesTabContent routes={mockGroupRoutes} />
        </TabsContent>
        
        {/* Aba: Checklist */}
        <TabsContent value="checklist">
          <GroupChecklistTab 
            checklist={checklist}
            toggleChecklistItem={toggleChecklistItem}
          />
        </TabsContent>
      </Tabs>
      
      {/* Dialog para exibir o mapa de um pedal */}
      <RideMapDialog 
        open={isMapDialogOpen}
        onOpenChange={setIsMapDialogOpen}
        ride={selectedRide}
        formatDate={formatDate}
      />

      {/* Dialog para agendar um novo pedal */}
      <ScheduleRideDialog 
        open={isScheduleDialogOpen} 
        onOpenChange={setIsScheduleDialogOpen} 
        groupId={group.id}
      />
    </div>
  );
};

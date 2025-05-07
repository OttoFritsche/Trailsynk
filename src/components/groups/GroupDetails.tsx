
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
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

  // Main tabs
  return (
    <div className="space-y-6 py-4">
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

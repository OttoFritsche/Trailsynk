
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateGroupDialog } from '@/components/groups/CreateGroupDialog';
import { GroupsHeader } from '@/components/groups/GroupsHeader';
import { GroupSearch } from '@/components/groups/GroupSearch';
import { MyGroupsTab } from '@/components/groups/MyGroupsTab';
import { DiscoverTab } from '@/components/groups/DiscoverTab';

// Dados mocados para demonstração
const mockGroups = [
  {
    id: '1',
    name: 'MTB Salvador',
    description: 'Grupo de Mountain Bike de Salvador',
    memberCount: 24,
    nextRideDate: new Date(Date.now() + 86400000 * 2), // 2 dias a partir de agora
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Ciclistas do Litoral',
    description: 'Pedalando pelas praias do litoral baiano',
    memberCount: 15,
    nextRideDate: new Date(Date.now() + 86400000 * 5), // 5 dias a partir de agora
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Pedal Noturno',
    description: 'Explorando a cidade à noite',
    memberCount: 8,
    nextRideDate: new Date(Date.now() + 86400000 * 1), // 1 dia a partir de agora
    image: '/placeholder.svg'
  }
];

const mockSuggestions = [
  {
    id: '4',
    name: 'Speed Bahia',
    description: 'Ciclistas de estrada da Bahia',
    memberCount: 42,
    image: '/placeholder.svg'
  },
  {
    id: '5',
    name: 'Pedalada Solidária',
    description: 'Grupo que organiza eventos beneficentes',
    memberCount: 67,
    image: '/placeholder.svg'
  }
];

const Groups: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleGroupClick = (groupId: string) => {
    navigate(`/app/groups/${groupId}`);
  };

  return (
    <>
      <Helmet>
        <title>Grupos de Pedal | TrailSynk</title>
      </Helmet>

      <div className="space-y-4">
        {/* Cabeçalho */}
        <GroupsHeader onCreateClick={() => setIsCreateDialogOpen(true)} />

        {/* Barra de pesquisa */}
        <GroupSearch 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />

        {/* Abas de navegação */}
        <Tabs defaultValue="my-groups" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-xs">
            <TabsTrigger value="my-groups">Meus Grupos</TabsTrigger>
            <TabsTrigger value="discover">Descobrir</TabsTrigger>
          </TabsList>
          
          {/* Tab: Meus Grupos */}
          <TabsContent value="my-groups">
            <MyGroupsTab 
              groups={mockGroups}
              searchQuery={searchQuery}
              onGroupClick={handleGroupClick}
              onCreateClick={() => setIsCreateDialogOpen(true)}
            />
          </TabsContent>
          
          {/* Tab: Descobrir */}
          <TabsContent value="discover">
            <DiscoverTab 
              suggestedGroups={mockSuggestions}
              onGroupClick={handleGroupClick}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog para criar novo grupo */}
      <CreateGroupDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </>
  );
};

export default Groups;

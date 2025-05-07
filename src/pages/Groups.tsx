
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CreateGroupDialog } from '@/components/groups/CreateGroupDialog';
import { Search, Users, Plus, Calendar } from 'lucide-react';

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

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const Groups: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredGroups = mockGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Grupos de Pedal</h1>
            <p className="text-muted-foreground">
              Conecte-se com outros ciclistas e organize pedais em grupo
            </p>
          </div>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Criar Novo Grupo
          </Button>
        </div>

        {/* Barra de pesquisa */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar grupos..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Abas de navegação */}
        <Tabs defaultValue="my-groups" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-xs">
            <TabsTrigger value="my-groups">Meus Grupos</TabsTrigger>
            <TabsTrigger value="discover">Descobrir</TabsTrigger>
          </TabsList>
          
          {/* Tab: Meus Grupos */}
          <TabsContent value="my-groups">
            {filteredGroups.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-md">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">Nenhum grupo encontrado</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchQuery ? 'Tente uma busca diferente ou crie um novo grupo' : 'Você ainda não participa de nenhum grupo. Crie ou entre em um grupo para começar!'}
                </p>
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)} 
                  variant="outline" 
                  className="mt-4"
                >
                  Criar Novo Grupo
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {filteredGroups.map((group) => (
                  <Card 
                    key={group.id} 
                    className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleGroupClick(group.id)}
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col h-full">
                        <div className="h-32 bg-gray-200 relative">
                          <img 
                            src={group.image} 
                            alt={group.name} 
                            className="w-full h-full object-cover" 
                          />
                          {group.nextRideDate && (
                            <Badge className="absolute top-2 right-2 bg-primary">
                              <Calendar className="mr-1 h-3 w-3" />
                              {formatDate(group.nextRideDate)}
                            </Badge>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-lg">{group.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {group.description}
                          </p>
                          <div className="flex items-center mt-3 text-xs text-muted-foreground">
                            <Users className="h-3 w-3 mr-1" />
                            {group.memberCount} {group.memberCount === 1 ? 'membro' : 'membros'}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Tab: Descobrir */}
          <TabsContent value="discover">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {mockSuggestions.map((group) => (
                <Card 
                  key={group.id} 
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleGroupClick(group.id)}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col h-full">
                      <div className="h-32 bg-gray-200">
                        <img 
                          src={group.image} 
                          alt={group.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg">{group.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {group.description}
                        </p>
                        <div className="flex items-center mt-3 text-xs text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          {group.memberCount} {group.memberCount === 1 ? 'membro' : 'membros'}
                        </div>
                        <Button variant="outline" className="w-full mt-3">
                          Solicitar Entrada
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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

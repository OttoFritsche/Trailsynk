import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronLeft, Users, Calendar, Map, List, Edit, LogOut, UserPlus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { fetchGroupDetails } from '@/utils/groupUtils';
import { GroupMembersList } from '@/components/groups/GroupMembersList';
import { GroupScheduledRides } from '@/components/groups/GroupScheduledRides';
import { GroupRoutesList } from '@/components/groups/GroupRoutesList';
import { GroupChecklist } from '@/components/groups/GroupChecklist';
import { LocationMap } from '@/components/groups/LocationMap';
import { ScheduleRideDialog } from '@/components/groups/ScheduleRideDialog';

// Tipo para os detalhes do grupo
interface GroupDetails {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: number;
  isAdmin?: boolean;
  createdAt?: Date;
}

const GroupDetail = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isScheduleRideOpen, setIsScheduleRideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const loadGroupDetails = async () => {
      if (!groupId) return;

      setLoading(true);
      try {
        // Na implementação real, isso buscaria dados do Supabase
        const details = await fetchGroupDetails(groupId);
        setGroupDetails(details);
      } catch (error) {
        console.error('Erro ao carregar detalhes do grupo:', error);
        toast.error('Não foi possível carregar os detalhes do grupo');
      } finally {
        setLoading(false);
      }
    };

    loadGroupDetails();
  }, [groupId]);

  const handleBack = () => {
    navigate('/app/groups');
  };

  const handleLeaveGroup = () => {
    toast.info('Funcionalidade para sair do grupo será implementada em breve');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!groupDetails) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-2">Grupo não encontrado</h2>
        <p className="text-muted-foreground mb-4">O grupo solicitado não existe ou foi removido.</p>
        <Button onClick={handleBack}>Voltar para Grupos</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{groupDetails.name} | TrailSynk</title>
      </Helmet>

      {/* Botão de voltar */}
      <Button 
        variant="ghost" 
        onClick={handleBack} 
        className="mb-4"
        size="sm"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Grupos
      </Button>

      {/* Cabeçalho do grupo */}
      <div className="mb-6">
        <div className="h-40 relative rounded-lg overflow-hidden mb-4">
          <img 
            src={groupDetails.image || '/placeholder.svg'}
            alt={groupDetails.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end">
            <div className="p-4 text-white">
              <h1 className="text-3xl font-bold">{groupDetails.name}</h1>
              <div className="flex items-center mt-1">
                <Users className="h-4 w-4 mr-1" />
                <span>{groupDetails.memberCount} {groupDetails.memberCount === 1 ? 'membro' : 'membros'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <div>
            <p className="text-muted-foreground">{groupDetails.description}</p>
          </div>
          <div className="flex space-x-2">
            {groupDetails.isAdmin && (
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" /> Editar Grupo
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleLeaveGroup}>
              <LogOut className="mr-2 h-4 w-4" /> Sair do Grupo
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs para as diferentes seções */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:grid-cols-4 md:w-fit">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="members">Membros</TabsTrigger>
          <TabsTrigger value="rides">Pedais</TabsTrigger>
          <TabsTrigger value="routes">Rotas</TabsTrigger>
        </TabsList>
        
        {/* Tab: Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          {/* Localização em tempo real */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">
                  <Map className="inline-block mr-2 h-5 w-5" /> Localização do Grupo
                </CardTitle>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                  Próximo Pedal: Em 2 dias
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <LocationMap />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white text-center p-4 rounded-md">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Localização em Tempo Real</h3>
                    <p className="text-sm">
                      A localização dos membros aparecerá aqui durante pedais agendados
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button onClick={() => setIsScheduleRideOpen(true)}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar Novo Pedal
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Próximos pedais e Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Calendar className="mr-2 h-5 w-5" /> Próximos Pedais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GroupScheduledRides groupId={groupId || ''} limit={3} />
                <div className="mt-4">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('rides')}>
                    Ver Todos os Pedais
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium flex items-center">
                  <List className="mr-2 h-5 w-5" /> Checklist do Grupo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GroupChecklist groupId={groupId || ''} />
                <Button variant="outline" size="sm" className="mt-4">
                  Gerenciar Checklist
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Membros do grupo */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Users className="mr-2 h-5 w-5" /> Membros do Grupo
                </CardTitle>
                <Button size="sm" variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Convidar Amigos
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <GroupMembersList groupId={groupId || ''} limit={6} />
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setActiveTab('members')}>
                Ver Todos os Membros
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Membros */}
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium">Membros do Grupo</CardTitle>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Convidar Amigos
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <GroupMembersList groupId={groupId || ''} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Pedais */}
        <TabsContent value="rides" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium">Pedais Agendados</CardTitle>
                <Button onClick={() => setIsScheduleRideOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Agendar Novo Pedal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <GroupScheduledRides groupId={groupId || ''} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Rotas */}
        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-medium">Rotas do Grupo</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Rota
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <GroupRoutesList groupId={groupId || ''} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de agendar pedal */}
      <ScheduleRideDialog 
        open={isScheduleRideOpen} 
        onOpenChange={setIsScheduleRideOpen}
        groupId={groupId || ''}
        groupName={groupDetails.name}
      />
    </>
  );
};

export default GroupDetail;

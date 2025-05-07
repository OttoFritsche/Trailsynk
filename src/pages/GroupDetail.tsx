
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { fetchGroupDetails } from '@/utils/groupUtils';
import { GroupDetailHeader } from '@/components/groups/GroupDetailHeader';
import { GroupOverviewTab } from '@/components/groups/GroupOverviewTab';
import { GroupMembersTab } from '@/components/groups/GroupMembersTab';
import { GroupRidesTab } from '@/components/groups/GroupRidesTab';
import { GroupRoutesTab } from '@/components/groups/GroupRoutesTab';
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
      <GroupDetailHeader group={groupDetails} />

      {/* Tabs para as diferentes seções */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:grid-cols-4 md:w-fit">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="members">Membros</TabsTrigger>
          <TabsTrigger value="rides">Pedais</TabsTrigger>
          <TabsTrigger value="routes">Rotas</TabsTrigger>
        </TabsList>
        
        {/* Tab: Visão Geral */}
        <TabsContent value="overview">
          <GroupOverviewTab 
            groupId={groupId || ''} 
            onScheduleRideClick={() => setIsScheduleRideOpen(true)}
            onTabChange={setActiveTab}
          />
        </TabsContent>

        {/* Tab: Membros */}
        <TabsContent value="members">
          <GroupMembersTab groupId={groupId || ''} />
        </TabsContent>

        {/* Tab: Pedais */}
        <TabsContent value="rides">
          <GroupRidesTab 
            groupId={groupId || ''} 
            onScheduleRideClick={() => setIsScheduleRideOpen(true)}
          />
        </TabsContent>

        {/* Tab: Rotas */}
        <TabsContent value="routes">
          <GroupRoutesTab groupId={groupId || ''} />
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

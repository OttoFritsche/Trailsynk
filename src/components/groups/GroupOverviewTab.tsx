
import React from 'react';
import { Calendar, List, Map, Users, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GroupMembersList } from './GroupMembersList';
import { GroupScheduledRides } from './GroupScheduledRides';
import GroupChecklist from './GroupChecklist';
import { LocationMap } from './LocationMap';

interface GroupOverviewTabProps {
  groupId: string;
  onScheduleRideClick: () => void;
  onTabChange: (tab: string) => void;
}

export const GroupOverviewTab: React.FC<GroupOverviewTabProps> = ({ 
  groupId, 
  onScheduleRideClick,
  onTabChange 
}) => {
  return (
    <div className="space-y-6">
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
            <Button onClick={onScheduleRideClick}>
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
            <GroupScheduledRides groupId={groupId} limit={3} />
            <div className="mt-4">
              <Button variant="outline" size="sm" onClick={() => onTabChange('rides')}>
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
            <GroupChecklist groupId={groupId} />
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
          <GroupMembersList groupId={groupId} limit={6} />
          <Button variant="outline" size="sm" className="mt-4" onClick={() => onTabChange('members')}>
            Ver Todos os Membros
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

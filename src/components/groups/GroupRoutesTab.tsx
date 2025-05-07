
import React from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GroupRoutesList } from './GroupRoutesList';

interface GroupRoutesTabProps {
  groupId: string;
}

export const GroupRoutesTab: React.FC<GroupRoutesTabProps> = ({ groupId }) => {
  return (
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
        <GroupRoutesList groupId={groupId} />
      </CardContent>
    </Card>
  );
};

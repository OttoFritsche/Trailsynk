
import React from 'react';
import { UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GroupMembersList } from './GroupMembersList';

interface GroupMembersTabProps {
  groupId: string;
}

export const GroupMembersTab: React.FC<GroupMembersTabProps> = ({ groupId }) => {
  return (
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
        <GroupMembersList groupId={groupId} />
      </CardContent>
    </Card>
  );
};

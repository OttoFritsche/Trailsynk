
import React from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GroupScheduledRides } from './GroupScheduledRides';

interface GroupRidesTabProps {
  groupId: string;
  onScheduleRideClick: () => void;
}

export const GroupRidesTab: React.FC<GroupRidesTabProps> = ({ 
  groupId, 
  onScheduleRideClick 
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">Pedais Agendados</CardTitle>
          <Button onClick={onScheduleRideClick}>
            <Plus className="mr-2 h-4 w-4" />
            Agendar Novo Pedal
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <GroupScheduledRides groupId={groupId} />
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, LogOut, Users } from 'lucide-react';
import { toast } from 'sonner';

interface GroupDetailHeaderProps {
  group: {
    name: string;
    description: string;
    image: string;
    memberCount: number;
    isAdmin?: boolean;
  };
}

export const GroupDetailHeader: React.FC<GroupDetailHeaderProps> = ({ group }) => {
  const handleLeaveGroup = () => {
    toast.info('Funcionalidade para sair do grupo será implementada em breve');
  };

  return (
    <div className="mb-6">
      <div className="h-40 relative rounded-lg overflow-hidden mb-4">
        <img 
          src={group.image || '/placeholder.svg'}
          alt={group.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-end">
          <div className="p-4 text-white">
            <h1 className="text-3xl font-bold">{group.name}</h1>
            <div className="flex items-center mt-1">
              <Users className="h-4 w-4 mr-1" />
              <span>{group.memberCount} {group.memberCount === 1 ? 'membro' : 'membros'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <p className="text-muted-foreground">{group.description}</p>
        </div>
        <div className="flex space-x-2">
          {group.isAdmin && (
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
  );
};

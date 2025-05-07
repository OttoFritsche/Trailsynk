
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface GroupsHeaderProps {
  onCreateClick: () => void;
}

export const GroupsHeader: React.FC<GroupsHeaderProps> = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Grupos de Pedal</h1>
        <p className="text-muted-foreground">
          Conecte-se com outros ciclistas e organize pedais em grupo
        </p>
      </div>
      <Button 
        onClick={onCreateClick}
        className="bg-primary hover:bg-primary/90"
      >
        <Plus className="mr-2 h-4 w-4" />
        Criar Novo Grupo
      </Button>
    </div>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

interface EmptyGroupStateProps {
  searchQuery: string;
  onCreateClick: () => void;
}

export const EmptyGroupState: React.FC<EmptyGroupStateProps> = ({ 
  searchQuery, 
  onCreateClick 
}) => {
  return (
    <div className="text-center py-12 bg-gray-50 rounded-md">
      <Users className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium">Nenhum grupo encontrado</h3>
      <p className="mt-1 text-sm text-gray-500">
        {searchQuery 
          ? 'Tente uma busca diferente ou crie um novo grupo' 
          : 'Você ainda não participa de nenhum grupo. Crie ou entre em um grupo para começar!'
        }
      </p>
      <Button 
        onClick={onCreateClick} 
        variant="outline" 
        className="mt-4"
      >
        Criar Novo Grupo
      </Button>
    </div>
  );
};

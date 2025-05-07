
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ChecklistItem {
  id: string;
  name: string;
  checked: boolean;
}

interface GroupChecklistTabProps {
  checklist: ChecklistItem[];
  toggleChecklistItem: (id: string) => void;
  onAddItemClick?: () => void;
}

export const GroupChecklistTab: React.FC<GroupChecklistTabProps> = ({ 
  checklist, 
  toggleChecklistItem,
  onAddItemClick
}) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Checklist para Pedal</h3>
        <Button size="sm" variant="outline" onClick={onAddItemClick}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Item
        </Button>
      </div>
      
      <Card>
        <CardContent className="divide-y">
          {checklist.map((item) => (
            <div key={item.id} className="flex items-center py-3">
              <Checkbox 
                id={`item-${item.id}`} 
                checked={item.checked}
                onCheckedChange={() => toggleChecklistItem(item.id)}
                className="mr-3"
              />
              <label 
                htmlFor={`item-${item.id}`}
                className={`flex-1 ${item.checked ? 'line-through text-muted-foreground' : ''}`}
              >
                {item.name}
              </label>
              {item.checked && <Check className="h-4 w-4 text-green-500" />}
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200 mt-6">
        <h4 className="text-blue-800 font-medium flex items-center">
          <Users className="mr-2 h-4 w-4" />
          Localização em Tempo Real
        </h4>
        <p className="text-sm text-blue-700 mt-1">
          Durante pedais agendados, você poderá ver a localização dos membros do grupo em tempo real nesta área.
          <br />
          <span className="italic">(Funcionalidade em desenvolvimento)</span>
        </p>
      </div>
    </div>
  );
};

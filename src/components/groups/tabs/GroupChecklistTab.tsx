
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Plus, Check } from 'lucide-react';

export interface GroupChecklistTabProps {
  checklist: {
    id: string;
    name: string;
    checked: boolean;
  }[];
  toggleChecklistItem: (id: string) => void;
}

const GroupChecklistTab: React.FC<GroupChecklistTabProps> = ({ checklist, toggleChecklistItem }) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Checklist para Pedal</h2>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Item
        </Button>
      </div>
      
      <div className="space-y-3">
        {checklist.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-3 rounded-lg bg-background border"
          >
            <Checkbox
              id={`item-${item.id}`}
              checked={item.checked}
              onCheckedChange={() => toggleChecklistItem(item.id)}
              className="mr-3"
            />
            <label
              htmlFor={`item-${item.id}`}
              className={`flex-grow ${item.checked ? 'line-through text-muted-foreground' : ''}`}
            >
              {item.name}
            </label>
            {item.checked && <Check className="h-4 w-4 text-green-500" />}
          </div>
        ))}
        
        {checklist.length === 0 && (
          <div className="text-center p-6 text-muted-foreground">
            Nenhum item na checklist. Adicione itens para seu próximo pedal!
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupChecklistTab;

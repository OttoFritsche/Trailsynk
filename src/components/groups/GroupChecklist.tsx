
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface GroupChecklistProps {
  groupId: string;
}

// Dados de exemplo para fins de demonstração
const mockChecklistItems: ChecklistItem[] = [
  { id: '1', label: 'Kit reparo de pneus', checked: true },
  { id: '2', label: 'Bomba de ar', checked: true },
  { id: '3', label: 'Câmara de ar reserva', checked: false },
  { id: '4', label: 'Água (min. 1L)', checked: true },
  { id: '5', label: 'Lanches energéticos', checked: false },
  { id: '6', label: 'Capacete', checked: true },
  { id: '7', label: 'Luzes (dianteira e traseira)', checked: false },
  { id: '8', label: 'Luvas', checked: false },
];

export const GroupChecklist: React.FC<GroupChecklistProps> = ({ groupId }) => {
  // Na implementação real, buscaríamos os itens de checklist do grupo do Supabase
  // baseado no groupId fornecido
  const [items, setItems] = useState<ChecklistItem[]>(mockChecklistItems);

  const handleItemChange = (itemId: string, checked: boolean) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, checked } : item
    ));
    
    // Na implementação real, atualizaríamos o estado no Supabase
  };

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">Nenhum item na checklist</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`checklist-${item.id}`} 
              checked={item.checked} 
              onCheckedChange={(checked) => handleItemChange(item.id, checked === true)}
            />
            <Label 
              htmlFor={`checklist-${item.id}`}
              className={`text-sm cursor-pointer ${item.checked ? 'line-through text-muted-foreground' : ''}`}
            >
              {item.label}
            </Label>
          </div>
        ))
      )}
    </div>
  );
};

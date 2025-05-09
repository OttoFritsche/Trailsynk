import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bike, Wrench, Coffee, Droplet, Plus, Save, Share, X } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  category: 'bike' | 'accessory' | 'personal' | 'other';
}

interface GroupChecklistProps {
  groupId: string;
}

const GroupChecklist: React.FC<GroupChecklistProps> = ({ groupId }) => {
  const defaultItems: ChecklistItem[] = [
    { id: '1', text: 'Bicicleta revisada', checked: false, category: 'bike' },
    { id: '2', text: 'Pneus calibrados', checked: false, category: 'bike' },
    { id: '3', text: 'Capacete', checked: false, category: 'accessory' },
    { id: '4', text: 'Luvas', checked: false, category: 'accessory' },
    { id: '5', text: 'Garrafa de água', checked: false, category: 'personal' },
    { id: '6', text: 'Óculos de sol', checked: false, category: 'accessory' },
    { id: '7', text: 'Câmara reserva', checked: false, category: 'bike' },
    { id: '8', text: 'Bomba de ar portátil', checked: false, category: 'accessory' },
    { id: '9', text: 'Lanterna (para pedais noturnos)', checked: false, category: 'accessory' },
    { id: '10', text: 'Protetor solar', checked: false, category: 'personal' },
    { id: '11', text: 'Documento de identificação', checked: false, category: 'personal' },
    { id: '12', text: 'Dinheiro/cartão para emergências', checked: false, category: 'personal' },
  ];

  const [items, setItems] = useState<ChecklistItem[]>(defaultItems);
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ChecklistItem['category']>('other');
  const [isAdding, setIsAdding] = useState(false);

  const handleToggle = (id: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    
    const newItem: ChecklistItem = {
      id: `${Date.now()}`,
      text: newItemText.trim(),
      checked: false,
      category: newItemCategory
    };
    
    setItems([...items, newItem]);
    setNewItemText('');
    setIsAdding(false);
  };

  const handleDeleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bike':
        return <Bike className="h-4 w-4" />;
      case 'accessory':
        return <Wrench className="h-4 w-4" />;
      case 'personal':
        return <Coffee className="h-4 w-4" />;
      default:
        return <Droplet className="h-4 w-4" />;
    }
  };

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'bike':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'accessory':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'personal':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate completion percentage
  const checkedCount = items.filter(item => item.checked).length;
  const completionPercentage = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0;

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Checklist para Pedal</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="text-xs">
            <Save className="h-4 w-4 mr-1" />
            Salvar
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Share className="h-4 w-4 mr-1" />
            Compartilhar
          </Button>
        </div>
      </div>
      
      <div className="mb-4 bg-gray-50 rounded-md p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Progresso:</span>
          <span className="text-sm">{completionPercentage}% completo</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-primary h-2 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between py-2 px-3 border rounded-md hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Checkbox 
                id={`check-${item.id}`}
                checked={item.checked}
                onCheckedChange={() => handleToggle(item.id)}
              />
              <label 
                htmlFor={`check-${item.id}`}
                className={`cursor-pointer ${item.checked ? 'line-through text-gray-400' : ''}`}
              >
                {item.text}
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`flex items-center gap-1 ${getBadgeStyle(item.category)}`}>
                {getCategoryIcon(item.category)}
                <span className="text-xs capitalize">{item.category}</span>
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 rounded-full"
                onClick={() => handleDeleteItem(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {isAdding ? (
        <div className="bg-gray-50 p-3 rounded-md mb-3">
          <div className="flex gap-2 mb-2">
            <Input 
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Digite o item a adicionar..."
              className="flex-1"
              autoFocus
            />
            <select 
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value as ChecklistItem['category'])}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="bike">Bike</option>
              <option value="accessory">Acessório</option>
              <option value="personal">Pessoal</option>
              <option value="other">Outro</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAddItem}>Adicionar</Button>
            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancelar</Button>
          </div>
        </div>
      ) : (
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-1"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="h-4 w-4" /> Adicionar Item
        </Button>
      )}
    </div>
  );
};

export default GroupChecklist;

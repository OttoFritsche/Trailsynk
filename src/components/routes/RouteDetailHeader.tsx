
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface RouteDetailHeaderProps {
  name: string;
  type: 'estrada' | 'mountain' | 'gravel' | 'urbano';
  createdAt: Date;
}

export const RouteDetailHeader: React.FC<RouteDetailHeaderProps> = ({
  name,
  type,
  createdAt
}) => {
  // Função para formatar a data de criação
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // Mapeamento de tipos para emojis ou ícones (texto)
  const typeEmoji = {
    'estrada': '🛣️',
    'mountain': '⛰️',
    'gravel': '🌄',
    'urbano': '🏙️'
  };

  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold flex items-center">
        {name} 
        <span className="ml-2 text-xl" aria-label={`Tipo: ${type}`}>
          {typeEmoji[type]}
        </span>
      </h1>
      <div className="flex items-center text-sm text-muted-foreground">
        <Calendar className="h-4 w-4 mr-1" />
        <span>Criado em {formatDate(createdAt)}</span>
      </div>
    </div>
  );
};


import React from 'react';
import { Calendar } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ActivityDetailHeaderProps {
  name: string;
  date: Date;
  userName: string;
  userAvatar?: string;
}

export const ActivityDetailHeader: React.FC<ActivityDetailHeaderProps> = ({
  name,
  date,
  userName,
  userAvatar
}) => {
  // Função para formatar a data
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Avatar className="h-12 w-12 mr-3">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-bold">{name}</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <p className="font-medium mr-2">{userName}</p>
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

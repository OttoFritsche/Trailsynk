
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Calendar } from 'lucide-react';

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    nextRideDate?: Date;
    image: string;
  };
  onClick: (groupId: string) => void;
  showJoinButton?: boolean;
}

export const GroupCard: React.FC<GroupCardProps> = ({ 
  group, 
  onClick,
  showJoinButton = false
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(group.id)}
    >
      <CardContent className="p-0">
        <div className="flex flex-col h-full">
          <div className="h-32 bg-gray-200 relative">
            <img 
              src={group.image} 
              alt={group.name} 
              className="w-full h-full object-cover" 
            />
            {group.nextRideDate && (
              <Badge className="absolute top-2 right-2 bg-primary">
                <Calendar className="mr-1 h-3 w-3" />
                {formatDate(group.nextRideDate)}
              </Badge>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium text-lg">{group.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {group.description}
            </p>
            <div className="flex items-center mt-3 text-xs text-muted-foreground">
              <Users className="h-3 w-3 mr-1" />
              {group.memberCount} {group.memberCount === 1 ? 'membro' : 'membros'}
            </div>
            
            {showJoinButton && (
              <Button variant="outline" className="w-full mt-3" onClick={(e) => {
                e.stopPropagation();
                // Join group logic would go here
              }}>
                Solicitar Entrada
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

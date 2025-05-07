
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  members: number;
  imageUrl?: string;
}

interface GroupsGridProps {
  groups: Group[];
}

const GroupsGrid: React.FC<GroupsGridProps> = ({ groups }) => {
  if (!groups || groups.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Nenhum grupo encontrado.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {groups.map(group => (
        <Link key={group.id} to={`/app/groups/${group.id}`}>
          <Card className="overflow-hidden h-full hover:shadow-md transition-all">
            <div className="h-36 relative">
              {group.imageUrl ? (
                <img 
                  src={group.imageUrl} 
                  alt={group.name}
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <Users className="h-8 w-8 text-gray-300" />
                </div>
              )}
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium mb-1">{group.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <Users className="h-3 w-3 mr-1" />
                <span>{group.members} membros</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default GroupsGrid;

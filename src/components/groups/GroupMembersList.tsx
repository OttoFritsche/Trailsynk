
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Member {
  id: string;
  username: string;
  avatar_url: string | null;
  isAdmin?: boolean;
}

interface GroupMembersListProps {
  groupId: string;
  limit?: number;
}

// Dados de exemplo para fins de demonstração
const mockMembers: Member[] = [
  { id: '1', username: 'maria_silva', avatar_url: '/placeholder.svg', isAdmin: true },
  { id: '2', username: 'joao_ciclista', avatar_url: '/placeholder.svg' },
  { id: '3', username: 'pedro.mtb', avatar_url: '/placeholder.svg' },
  { id: '4', username: 'ana_bike', avatar_url: '/placeholder.svg' },
  { id: '5', username: 'carlos.roads', avatar_url: '/placeholder.svg' },
  { id: '6', username: 'julia_cyclist', avatar_url: '/placeholder.svg' },
  { id: '7', username: 'roberto_pedal', avatar_url: '/placeholder.svg' },
  { id: '8', username: 'amanda_speed', avatar_url: '/placeholder.svg' },
];

export const GroupMembersList: React.FC<GroupMembersListProps> = ({ groupId, limit }) => {
  // Na implementação real, buscaríamos os membros do grupo do Supabase
  // baseado no groupId fornecido
  const members = limit ? mockMembers.slice(0, limit) : mockMembers;

  return (
    <div className="space-y-4">
      {members.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">Nenhum membro encontrado</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50">
              <Avatar>
                <AvatarImage src={member.avatar_url || ''} alt={member.username} />
                <AvatarFallback>{member.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{member.username}</span>
                {member.isAdmin && (
                  <span className="text-xs text-primary">Administrador</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

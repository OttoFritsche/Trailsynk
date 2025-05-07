
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';

interface GroupMembersTabContentProps {
  members: any[];
  onInviteClick?: () => void;
}

export const GroupMembersTabContent: React.FC<GroupMembersTabContentProps> = ({
  members,
  onInviteClick
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {members.map((member) => (
        <div key={member.id} className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50">
          <Avatar className="h-10 w-10">
            <AvatarImage src={member.avatar} />
            <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{member.name}</div>
            <div className="text-sm text-muted-foreground">@{member.username}</div>
          </div>
        </div>
      ))}
      
      <div className="flex items-center justify-center h-full aspect-square rounded-md border-2 border-dashed border-gray-300 p-4 hover:bg-gray-50 cursor-pointer" onClick={onInviteClick}>
        <div className="text-center">
          <Plus className="h-8 w-8 mx-auto text-gray-400" />
          <span className="text-sm text-muted-foreground mt-1 block">Convidar</span>
        </div>
      </div>
    </div>
  );
};

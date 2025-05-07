
import React from 'react';
import { GroupCard } from './GroupCard';

interface DiscoverTabProps {
  suggestedGroups: Array<{
    id: string;
    name: string;
    description: string;
    memberCount: number;
    image: string;
  }>;
  onGroupClick: (groupId: string) => void;
}

export const DiscoverTab: React.FC<DiscoverTabProps> = ({ 
  suggestedGroups, 
  onGroupClick 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {suggestedGroups.map((group) => (
        <GroupCard 
          key={group.id} 
          group={group} 
          onClick={onGroupClick}
          showJoinButton={true}
        />
      ))}
    </div>
  );
};

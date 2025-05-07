
import React from 'react';
import { GroupCard } from './GroupCard';
import { EmptyGroupState } from './EmptyGroupState';

interface MyGroupsTabProps {
  groups: Array<{
    id: string;
    name: string;
    description: string;
    memberCount: number;
    nextRideDate?: Date;
    image: string;
  }>;
  searchQuery: string;
  onGroupClick: (groupId: string) => void;
  onCreateClick: () => void;
}

export const MyGroupsTab: React.FC<MyGroupsTabProps> = ({ 
  groups, 
  searchQuery, 
  onGroupClick,
  onCreateClick
}) => {
  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {filteredGroups.length === 0 ? (
        <EmptyGroupState searchQuery={searchQuery} onCreateClick={onCreateClick} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {filteredGroups.map((group) => (
            <GroupCard 
              key={group.id} 
              group={group} 
              onClick={onGroupClick} 
            />
          ))}
        </div>
      )}
    </>
  );
};

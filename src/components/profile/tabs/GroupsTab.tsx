
import React from 'react';
import GroupsGrid from '@/components/profile/GroupsGrid';

interface Group {
  id: string;
  name: string;
  members: number;
  imageUrl?: string;
}

interface GroupsTabProps {
  groups: Group[];
}

const GroupsTab: React.FC<GroupsTabProps> = ({ groups }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-4">Meus Grupos</h3>
      <GroupsGrid groups={groups} />
    </div>
  );
};

export default GroupsTab;

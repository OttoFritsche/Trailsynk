
import React from 'react';
import GroupChecklist from '../GroupChecklist';

interface GroupChecklistTabProps {
  groupId: string;
}

const GroupChecklistTab: React.FC<GroupChecklistTabProps> = ({ groupId }) => {
  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Prepare-se para pedalar com seu grupo! Use esta checklist para garantir que você tenha tudo 
        o que precisa antes de cada passeio.
      </p>
      
      <GroupChecklist groupId={groupId} />
    </div>
  );
};

export default GroupChecklistTab;

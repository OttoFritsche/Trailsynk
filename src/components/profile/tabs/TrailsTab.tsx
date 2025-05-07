
import React from 'react';
import TrailsList from '@/components/profile/TrailsList';

interface Trail {
  id: string;
  name: string;
  avatar: string;
  mutualFriends?: number;
}

interface TrailsTabProps {
  trails: Trail[];
}

const TrailsTab: React.FC<TrailsTabProps> = ({ trails }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-4">Meus Trails</h3>
      <TrailsList trails={trails} />
    </div>
  );
};

export default TrailsTab;

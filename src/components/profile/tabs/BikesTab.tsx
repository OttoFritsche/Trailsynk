
import React from 'react';
import BikeDisplay from '@/components/profile/BikeDisplay';
import { Bicycle } from '@/components/profile/BikeDisplay';

interface BikesTabProps {
  bicycles: Bicycle[];
}

const BikesTab: React.FC<BikesTabProps> = ({ bicycles }) => {
  return (
    <div>
      <BikeDisplay bikes={bicycles} />
    </div>
  );
};

export default BikesTab;

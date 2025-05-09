
import React from 'react';
import BikeDisplay from '@/components/profile/BikeDisplay';
import { Bicycle } from '@/types/profile';
import { Grid } from '@/components/ui/grid';

interface BikesTabProps {
  bicycles: Bicycle[];
}

const BikesTab: React.FC<BikesTabProps> = ({ bicycles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bicycles.map(bicycle => (
        <BikeDisplay
          key={bicycle.id}
          bicycle={bicycle}
          onEdit={() => console.log('Edit bicycle', bicycle.id)}
          onMaintenanceLog={() => console.log('Maintenance log', bicycle.id)}
        />
      ))}
      
      {bicycles.length === 0 && (
        <div className="col-span-3 text-center py-8">
          <p className="text-muted-foreground">Você ainda não adicionou nenhuma bicicleta.</p>
        </div>
      )}
    </div>
  );
};

export default BikesTab;

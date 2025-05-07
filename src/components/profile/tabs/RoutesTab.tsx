
import React from 'react';
import RoutesGrid from '@/components/profile/RoutesGrid';

interface Route {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  imageUrl?: string;
}

interface RoutesTabProps {
  routes: Route[];
}

const RoutesTab: React.FC<RoutesTabProps> = ({ routes }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-4">Minhas Rotas</h3>
      <RoutesGrid routes={routes} />
    </div>
  );
};

export default RoutesTab;

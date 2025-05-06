
import React from 'react';

interface Route {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  type: string;
  favorite: boolean;
}

interface RouteMapOverlayProps {
  routeId?: string;
  routes: Route[];
}

const RouteMapOverlay: React.FC<RouteMapOverlayProps> = ({ routeId, routes }) => {
  if (!routeId) return null;
  
  const selectedRoute = routes.find(route => route.id === routeId);
  
  if (!selectedRoute) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-3 z-10 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">
            {selectedRoute.name}
          </div>
          <div className="text-sm text-gray-500">
            {selectedRoute.distance} km • {selectedRoute.elevation} m de elevação
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="bg-primary/10 text-primary p-2 rounded-full hover:bg-primary/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </button>
          <button className="bg-primary/10 text-primary p-2 rounded-full hover:bg-primary/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteMapOverlay;

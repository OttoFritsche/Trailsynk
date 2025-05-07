
import React from 'react';

export const LocationMap: React.FC = () => {
  return (
    <div className="w-full h-[300px] bg-gray-200 rounded-md overflow-hidden">
      {/* Na implementação real, este seria um componente Mapbox ou similar */}
      <img 
        src="/placeholder.svg" 
        alt="Mapa de localização" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

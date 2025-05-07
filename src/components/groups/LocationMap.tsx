
import React from 'react';
import { Map } from 'lucide-react';

interface LocationMapProps {
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  centerLat,
  centerLng,
  zoom
}) => {
  // In a real implementation, this would use Mapbox or a similar mapping service
  // with the provided coordinates and zoom level
  
  return (
    <div className="w-full h-[300px] bg-gray-200 rounded-md overflow-hidden relative">
      {/* This is a placeholder for the actual map implementation */}
      <img 
        src="/placeholder.svg" 
        alt="Mapa de localização" 
        className="w-full h-full object-cover"
      />
      
      {/* Placeholder center marker */}
      {(centerLat && centerLng) && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Map className="h-8 w-8 text-primary" />
        </div>
      )}
    </div>
  );
};

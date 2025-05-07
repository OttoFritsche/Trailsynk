
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Note: In a production environment, you should use environment variables
// This is a placeholder access token that should be replaced with a proper one
const MAPBOX_TOKEN = 'pk.your_mapbox_token_here'; 

interface EventMapProps {
  onMapClick?: (coordinates: [number, number]) => void;
  selectedPoint: [number, number] | null;
}

export const EventMap: React.FC<EventMapProps> = ({ 
  onMapClick,
  selectedPoint
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  
  // Default center is São Paulo
  const [center] = useState<[number, number]>([-46.633, -23.55]);
  const [zoom] = useState(11);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize map
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Handle click on map
    map.current.on('click', (e) => {
      const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
      
      // Remove existing marker if any
      if (marker.current) {
        marker.current.remove();
      }
      
      // Create new marker
      marker.current = new mapboxgl.Marker({ color: '#9b87f5' })
        .setLngLat(coordinates)
        .addTo(map.current!);
        
      if (onMapClick) {
        onMapClick(coordinates);
      }
    });

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [center, zoom, onMapClick]);

  // Update marker if selectedPoint changes externally
  useEffect(() => {
    if (map.current && selectedPoint) {
      if (marker.current) {
        marker.current.remove();
      }
      
      marker.current = new mapboxgl.Marker({ color: '#9b87f5' })
        .setLngLat(selectedPoint)
        .addTo(map.current);
        
      map.current.flyTo({
        center: selectedPoint,
        zoom: 14
      });
    }
  }, [selectedPoint]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      {!MAPBOX_TOKEN || MAPBOX_TOKEN === 'pk.your_mapbox_token_here' && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <p className="font-medium text-gray-700">Mapa Placeholder</p>
            <p className="text-sm text-gray-500 max-w-sm mt-2">
              Para visualizar o mapa real, configure o token do Mapbox
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

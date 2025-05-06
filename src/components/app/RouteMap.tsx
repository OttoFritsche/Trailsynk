
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ZoomIn, ZoomOut, Map as MapIcon } from 'lucide-react';
import { config } from '@/config/env';

interface RouteMapProps {
  routeId?: string;
  className?: string;
}

const RouteMap: React.FC<RouteMapProps> = ({ routeId, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(13);
  const maxZoom = 18;
  const minZoom = 8;
  
  const handleZoomIn = () => {
    if (zoom < maxZoom) {
      setZoom(prev => prev + 1);
    }
  };
  
  const handleZoomOut = () => {
    if (zoom > minZoom) {
      setZoom(prev => prev - 1);
    }
  };
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Placeholder para inicialização do mapa
    const mapContainer = mapRef.current;
    
    // Limpar o container para evitar elementos duplicados
    while (mapContainer.firstChild) {
      mapContainer.removeChild(mapContainer.firstChild);
    }
    
    // Create background with placeholder or real map
    const mapBackground = document.createElement('div');
    mapBackground.style.position = 'absolute';
    mapBackground.style.top = '0';
    mapBackground.style.left = '0';
    mapBackground.style.width = '100%';
    mapBackground.style.height = '100%';
    mapBackground.style.backgroundSize = 'cover';
    mapBackground.style.opacity = '1';
    mapBackground.style.borderRadius = 'inherit';
    
    // Use different style based on zoom level
    const zoomParam = zoom.toString();
    const mapboxToken = config.mapboxToken || 'pk.placeholder';
    mapBackground.style.backgroundImage = `url("https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/0,0,${zoomParam},0,0/800x500?access_token=${mapboxToken}")`;
    
    // Add route path with SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    
    // Path style changes based on selected route
    if (routeId) {
      // Create a more complex path if route is selected
      const routeType = routeId === '2' || routeId === '5' ? 'mountain' : 'road';
      const pathColor = routeType === 'mountain' ? '#2ECC71' : '#3498DB';
      
      // Different path patterns for different routes
      let pathData;
      switch (routeId) {
        case '1': // Circuito da Lagoa
          pathData = 'M100,100 C150,80 200,150 250,120 S300,80 350,120 S400,160 450,120';
          break;
        case '2': // Trilha da Serra - more jagged pattern for mountain
          pathData = 'M100,150 L140,100 L180,170 L220,90 L260,180 L300,110 L340,160 L380,120 L420,150';
          break;
        case '3': // Volta ao Parque - small circuit
          pathData = 'M150,150 C180,120 220,120 250,150 S280,180 250,210 S220,180 190,210 S160,180 150,150';
          break;
        case '4': // Travessia Litoral - long straight path
          pathData = 'M50,150 C100,145 200,155 300,145 S400,155 500,145 S600,155 700,150';
          break;
        case '5': // Circuito das Cachoeiras - complex mountain path
          pathData = 'M100,200 L140,150 L170,190 L210,130 L240,180 L270,120 L300,170 L330,110 L360,160 L390,100 L420,150';
          break;
        default:
          pathData = 'M50,150 C150,100 250,200 350,150 S450,100 550,150';
      }
      
      // Create path and style according to route type
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('stroke', pathColor);
      path.setAttribute('stroke-width', '4');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(path);
      
      // Add start marker
      const startPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const startX = pathData.split(' ')[0].replace('M', '').split(',')[0];
      const startY = pathData.split(' ')[0].replace('M', '').split(',')[1];
      startPoint.setAttribute('cx', startX);
      startPoint.setAttribute('cy', startY);
      startPoint.setAttribute('r', '6');
      startPoint.setAttribute('fill', '#2ECC71');
      startPoint.setAttribute('stroke', 'white');
      startPoint.setAttribute('stroke-width', '2');
      svg.appendChild(startPoint);
      
      // Add end marker - get last point from path
      const endPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      const pointsArray = pathData.split(' ');
      const endCoord = pointsArray[pointsArray.length - 1].split(',');
      endPoint.setAttribute('cx', endCoord[0]);
      endPoint.setAttribute('cy', endCoord[1]);
      endPoint.setAttribute('r', '6');
      endPoint.setAttribute('fill', '#E74C3C');
      endPoint.setAttribute('stroke', 'white');
      endPoint.setAttribute('stroke-width', '2');
      svg.appendChild(endPoint);
    } else {
      // If no route selected, show a placeholder with instructions
      const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textElement.setAttribute('x', '50%');
      textElement.setAttribute('y', '50%');
      textElement.setAttribute('text-anchor', 'middle');
      textElement.setAttribute('font-size', '14px');
      textElement.setAttribute('fill', '#888');
      textElement.textContent = 'Selecione uma rota para visualizar no mapa';
      svg.appendChild(textElement);
    }
    
    // Add elements to container
    mapContainer.appendChild(mapBackground);
    mapContainer.appendChild(svg);
    
    console.log(`Mapa inicializado ${routeId ? `para rota ${routeId}` : 'sem rota específica'} com zoom ${zoom}`);
    
    return () => {
      // Cleanup when unmounting
      while (mapContainer.firstChild) {
        mapContainer.removeChild(mapContainer.firstChild);
      }
    };
  }, [routeId, zoom]);
  
  return (
    <Card className={`overflow-hidden ${className || ''}`}>
      <CardContent className="p-0">
        <div 
          ref={mapRef} 
          className="relative w-full h-64 bg-gray-100 rounded-md"
          style={{ minHeight: '250px' }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-0">
            <MapIcon className="h-8 w-8 opacity-20 mr-2" />
            <span>Carregando mapa...</span>
          </div>
          
          {/* Map controls */}
          <div className="absolute top-2 right-2 p-2 bg-white/95 rounded-md shadow-sm z-10">
            <div className="flex flex-col space-y-2">
              <button 
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                onClick={handleZoomIn}
                disabled={zoom >= maxZoom}
                aria-label="Zoom in"
              >
                <ZoomIn size={16} className={zoom >= maxZoom ? 'text-gray-300' : 'text-gray-800'} />
              </button>
              <button 
                className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                onClick={handleZoomOut}
                disabled={zoom <= minZoom}
                aria-label="Zoom out"
              >
                <ZoomOut size={16} className={zoom <= minZoom ? 'text-gray-300' : 'text-gray-800'} />
              </button>
            </div>
          </div>
          
          {/* Route information overlay */}
          {routeId && (
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-3 z-10 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div>
                  {mockRoutes.find(route => route.id === routeId) ? (
                    <>
                      <div className="font-semibold">
                        {mockRoutes.find(route => route.id === routeId)?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {mockRoutes.find(route => route.id === routeId)?.distance} km • 
                        {mockRoutes.find(route => route.id === routeId)?.elevation} m de elevação
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold">Rota Selecionada</div>
                  )}
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Using the mockRoutes from the main Routes component for simplicity
// In a real application, this would be imported or passed as props
const mockRoutes = [
  {
    id: '1',
    name: 'Circuito da Lagoa',
    distance: 15.8,
    elevation: 125,
    type: 'road',
    favorite: true
  },
  {
    id: '2',
    name: 'Trilha da Serra',
    distance: 22.3,
    elevation: 450,
    type: 'mountain',
    favorite: false
  },
  {
    id: '3',
    name: 'Volta ao Parque',
    distance: 8.5,
    elevation: 65,
    type: 'urban',
    favorite: true
  },
  {
    id: '4',
    name: 'Travessia Litoral',
    distance: 35.2,
    elevation: 210,
    type: 'road',
    favorite: false
  },
  {
    id: '5',
    name: 'Circuito das Cachoeiras',
    distance: 18.7,
    elevation: 520,
    type: 'mountain',
    favorite: true
  }
];

export default RouteMap;

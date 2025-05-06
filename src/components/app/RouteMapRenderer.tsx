
import React, { useEffect, useRef } from 'react';
import { MapIcon } from 'lucide-react';
import { config } from '@/config/env';

interface RouteMapRendererProps {
  routeId?: string;
  zoom: number;
  isEditing?: boolean;
  points?: Array<[number, number]>;
}

const RouteMapRenderer: React.FC<RouteMapRendererProps> = ({ 
  routeId, 
  zoom, 
  isEditing = false,
  points = []
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
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
    
    // Path style changes based on selected route or editing mode
    if (isEditing) {
      // Show editing mode interface
      const textOverlay = document.createElement('div');
      textOverlay.style.position = 'absolute';
      textOverlay.style.top = '10px';
      textOverlay.style.left = '10px';
      textOverlay.style.background = 'rgba(255,255,255,0.8)';
      textOverlay.style.padding = '8px 12px';
      textOverlay.style.borderRadius = '4px';
      textOverlay.style.fontSize = '14px';
      textOverlay.style.fontWeight = 'bold';
      textOverlay.style.color = '#2ECC71';
      textOverlay.textContent = 'Modo Edição';
      mapContainer.appendChild(textOverlay);
      
      // We would add editing-specific elements here
      // For now, just add a visual cue that the map is in editing mode
      const editingOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      editingOverlay.setAttribute('width', '100%');
      editingOverlay.setAttribute('height', '100%');
      editingOverlay.setAttribute('fill', 'none');
      editingOverlay.setAttribute('stroke', '#2ECC71');
      editingOverlay.setAttribute('stroke-width', '6');
      editingOverlay.setAttribute('stroke-opacity', '0.4');
      svg.appendChild(editingOverlay);
      
    } else if (routeId) {
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
      textElement.textContent = isEditing ? 'Clique para adicionar pontos' : 'Selecione uma rota para visualizar no mapa';
      svg.appendChild(textElement);
    }
    
    // Add elements to container
    mapContainer.appendChild(mapBackground);
    mapContainer.appendChild(svg);
    
    console.log(`Mapa inicializado ${routeId ? `para rota ${routeId}` : isEditing ? 'em modo de edição' : 'sem rota específica'} com zoom ${zoom}`);
    
    return () => {
      // Cleanup when unmounting
      while (mapContainer.firstChild) {
        mapContainer.removeChild(mapContainer.firstChild);
      }
    };
  }, [routeId, zoom, isEditing, points]);

  return (
    <div 
      ref={mapRef} 
      className="relative w-full h-64 bg-gray-100 rounded-md"
      style={{ minHeight: '250px', cursor: isEditing ? 'crosshair' : 'default' }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-0">
        <MapIcon className="h-8 w-8 opacity-20 mr-2" />
        <span>Carregando mapa...</span>
      </div>
    </div>
  );
};

export default RouteMapRenderer;

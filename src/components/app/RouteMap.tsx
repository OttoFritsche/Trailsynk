
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface RouteMapProps {
  routeId?: string;
  className?: string;
}

const RouteMap: React.FC<RouteMapProps> = ({ routeId, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Placeholder para inicialização do mapa
    // Esta é uma implementação visual básica que seria substituída por uma biblioteca de mapas real
    const mapContainer = mapRef.current;
    
    // Exemplo de rota estilizada (simulada com SVG)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    
    // Criar um caminho de rota estilizado
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M50,50 C100,25 150,75 200,50 S250,25 300,50 S350,75 400,50');
    path.setAttribute('stroke', '#2ECC71');
    path.setAttribute('stroke-width', '4');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(path);
    
    // Se tivermos um ID de rota, adicionar um marcador de início/fim
    if (routeId) {
      const startPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      startPoint.setAttribute('cx', '50');
      startPoint.setAttribute('cy', '50');
      startPoint.setAttribute('r', '6');
      startPoint.setAttribute('fill', '#2ECC71');
      svg.appendChild(startPoint);
      
      const endPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      endPoint.setAttribute('cx', '400');
      endPoint.setAttribute('cy', '50');
      endPoint.setAttribute('r', '6');
      endPoint.setAttribute('fill', '#E74C3C');
      svg.appendChild(endPoint);
    }
    
    // Adicionar o fundo do mapa
    const mapBackground = document.createElement('div');
    mapBackground.style.position = 'absolute';
    mapBackground.style.top = '0';
    mapBackground.style.left = '0';
    mapBackground.style.width = '100%';
    mapBackground.style.height = '100%';
    mapBackground.style.backgroundImage = 'url("https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/0,0,1,0,0/600x400?access_token=pk.placeholder")';
    mapBackground.style.backgroundSize = 'cover';
    mapBackground.style.opacity = '0.8';
    mapBackground.style.borderRadius = 'inherit';
    
    // Adicionar elementos ao contêiner
    mapContainer.appendChild(mapBackground);
    mapContainer.appendChild(svg);
    
    console.log(`Mapa inicializado ${routeId ? `para rota ${routeId}` : 'sem rota específica'}`);
    
    return () => {
      // Limpeza ao desmontar o componente
      while (mapContainer.firstChild) {
        mapContainer.removeChild(mapContainer.firstChild);
      }
    };
  }, [routeId]);
  
  return (
    <Card className={`overflow-hidden ${className || ''}`}>
      <CardContent className="p-0">
        <div 
          ref={mapRef} 
          className="relative w-full h-64 bg-gray-100 rounded-md"
          style={{ minHeight: '250px' }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-0">
            Carregando mapa...
          </div>
          
          {/* Overlay de controles de exemplo */}
          <div className="absolute top-2 right-2 p-2 bg-white/80 rounded-md shadow-sm z-10">
            <div className="flex flex-col space-y-2">
              <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm">
                <span>+</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm">
                <span>-</span>
              </button>
            </div>
          </div>
          
          {/* Informações da rota */}
          {routeId && (
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-3 z-10">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">Rota de Exemplo</div>
                  <div className="text-sm text-gray-500">15,8 km • 125 m de elevação</div>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-primary/10 text-primary p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </button>
                  <button className="bg-primary/10 text-primary p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

export default RouteMap;

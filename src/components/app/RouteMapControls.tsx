
import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface RouteMapControlsProps {
  zoom: number;
  maxZoom: number;
  minZoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const RouteMapControls: React.FC<RouteMapControlsProps> = ({
  zoom,
  maxZoom,
  minZoom,
  onZoomIn,
  onZoomOut
}) => {
  return (
    <div className="absolute top-2 right-2 p-2 bg-white/95 rounded-md shadow-sm z-10">
      <div className="flex flex-col space-y-2">
        <button 
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
          onClick={onZoomIn}
          disabled={zoom >= maxZoom}
          aria-label="Zoom in"
        >
          <ZoomIn size={16} className={zoom >= maxZoom ? 'text-gray-300' : 'text-gray-800'} />
        </button>
        <button 
          className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
          onClick={onZoomOut}
          disabled={zoom <= minZoom}
          aria-label="Zoom out"
        >
          <ZoomOut size={16} className={zoom <= minZoom ? 'text-gray-300' : 'text-gray-800'} />
        </button>
      </div>
    </div>
  );
};

export default RouteMapControls;


import React from 'react';
import { Map, MapPin, Navigation, Route } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapPlaceholderProps {
  title?: string;
  description?: string;
  type?: 'route' | 'event' | 'location';
  className?: string;
  height?: string;
  showPin?: boolean;
  imageSrc?: string;
}

const EnhancedMapPlaceholder: React.FC<MapPlaceholderProps> = ({
  title,
  description,
  type = 'route',
  className,
  height = 'h-[300px]',
  showPin = true,
  imageSrc
}) => {
  const getIcon = () => {
    switch (type) {
      case 'route':
        return <Route className="h-8 w-8 text-primary/90" />;
      case 'event':
        return <MapPin className="h-8 w-8 text-primary/90" />;
      case 'location':
        return <Navigation className="h-8 w-8 text-primary/90" />;
      default:
        return <Map className="h-8 w-8 text-primary/90" />;
    }
  };

  // A set of map background images for different contexts
  const defaultImages = {
    route: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop&q=60',
    event: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&auto=format&fit=crop&q=60',
    location: 'https://images.unsplash.com/photo-1526824867479-c89522f5562f?w=800&auto=format&fit=crop&q=60'
  };

  const backgroundImage = imageSrc || defaultImages[type] || defaultImages.route;

  return (
    <div 
      className={cn(
        "w-full rounded-md overflow-hidden relative bg-gray-200", 
        height, 
        className
      )}
    >
      {/* Map background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage}
          alt="Map background" 
          className="w-full h-full object-cover opacity-30"
        />
        
        {/* Overlay with map-like pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 to-gray-100/60"></div>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%232ECC71' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px'
        }}>
        </div>
      </div>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
        {getIcon()}
        
        {title && (
          <h3 className="font-medium text-lg mt-2 text-gray-800">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="text-sm text-gray-600 mt-1 max-w-xs">
            {description}
          </p>
        )}
        
        <div className="mt-3 text-sm bg-white/80 px-3 py-1 rounded-full text-gray-600 backdrop-blur-sm">
          Carregando mapa...
        </div>
      </div>
      
      {/* Pin marker */}
      {showPin && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5">
          <div className="w-6 h-6 rounded-full bg-primary/20 animate-ping"></div>
        </div>
      )}
      
      {/* Routes paths - only shown for route type */}
      {type === 'route' && (
        <div className="absolute inset-0 z-1 opacity-40">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M20,50 Q40,30 60,50 T90,50" stroke="#2ECC71" strokeWidth="2" fill="none" />
            <path d="M10,60 Q30,40 50,70 T90,60" stroke="#1A1F2C" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default EnhancedMapPlaceholder;

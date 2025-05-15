
import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RouteMapMarkerProps {
  active?: boolean;
  children?: React.ReactNode;
  variant?: 'start' | 'end' | 'waypoint' | 'selected';
  className?: string;
  onClick?: () => void;
  tooltip?: string;
}

const RouteMapMarker: React.FC<RouteMapMarkerProps> = ({
  active = false,
  variant = 'waypoint',
  children,
  className,
  onClick,
  tooltip
}) => {
  // Define color schemes based on marker types
  const colorScheme = {
    start: {
      base: 'bg-green-500',
      ring: 'ring-green-300/30',
      shadow: 'shadow-green-500/20'
    },
    end: {
      base: 'bg-red-500',
      ring: 'ring-red-300/30',
      shadow: 'shadow-red-500/20'
    },
    waypoint: {
      base: 'bg-blue-500',
      ring: 'ring-blue-300/30',
      shadow: 'shadow-blue-500/20'
    },
    selected: {
      base: 'bg-purple-500',
      ring: 'ring-purple-300/30',
      shadow: 'shadow-purple-500/20'
    }
  };
  
  const colors = colorScheme[variant];
  
  const markerElement = (
    <div 
      className={cn(
        "relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 cursor-pointer",
        colors.base,
        colors.shadow,
        active ? 'scale-110' : 'scale-100',
        active ? 'ring-4' : 'ring-2',
        colors.ring,
        "before:content-[''] before:absolute before:left-1/2 before:-bottom-2 before:-translate-x-1/2 before:w-4 before:h-4 before:rotate-45 before:bg-inherit",
        "hover:scale-110",
        className
      )}
      onClick={onClick}
    >
      <MapPin className="h-5 w-5 text-white" />
    </div>
  );
  
  return (
    <div className="relative group">
      {tooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {markerElement}
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        markerElement
      )}
      
      {children && (
        <div className={cn(
          "absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 bg-white p-2 rounded-md shadow-md whitespace-nowrap min-w-max z-10",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        )}>
          {children}
        </div>
      )}
    </div>
  );
};

export default RouteMapMarker;

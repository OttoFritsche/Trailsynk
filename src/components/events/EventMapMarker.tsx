
import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventMapMarkerProps {
  active?: boolean;
  children?: React.ReactNode;
  variant?: 'default' | 'group' | 'competition' | 'open';
  className?: string;
}

const EventMapMarker: React.FC<EventMapMarkerProps> = ({
  active = false,
  variant = 'default',
  children,
  className
}) => {
  // Define color schemes based on event types
  const colorScheme = {
    default: {
      base: 'bg-primary',
      ring: 'ring-primary/30',
      shadow: 'shadow-primary/20'
    },
    group: {
      base: 'bg-blue-500',
      ring: 'ring-blue-300/30',
      shadow: 'shadow-blue-500/20'
    },
    competition: {
      base: 'bg-red-500',
      ring: 'ring-red-300/30',
      shadow: 'shadow-red-500/20'
    },
    open: {
      base: 'bg-green-500',
      ring: 'ring-green-300/30',
      shadow: 'shadow-green-500/20'
    }
  };
  
  const colors = colorScheme[variant];
  
  return (
    <div className="relative group">
      <div 
        className={cn(
          "relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
          colors.base,
          colors.shadow,
          active ? 'scale-110' : 'scale-100',
          active ? 'ring-4' : 'ring-2',
          colors.ring,
          "before:content-[''] before:absolute before:left-1/2 before:-bottom-2 before:-translate-x-1/2 before:w-4 before:h-4 before:rotate-45 before:bg-inherit",
          "hover:scale-110",
          className
        )}
      >
        <MapPin className="h-5 w-5 text-white" />
      </div>
      
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

export default EventMapMarker;

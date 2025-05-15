
import React from 'react';
import { Button } from '@/components/ui/button';
import { Map, Layers, Mountain } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapStyleSelectorProps {
  currentStyle: 'streets' | 'outdoors' | 'satellite';
  onChange: (style: 'streets' | 'outdoors' | 'satellite') => void;
  className?: string;
}

const MapStyleSelector: React.FC<MapStyleSelectorProps> = ({
  currentStyle,
  onChange,
  className
}) => {
  return (
    <div className={cn(
      "bg-white/95 rounded-md shadow-sm p-2 flex flex-col gap-2",
      className
    )}>
      <Button
        variant={currentStyle === 'streets' ? 'secondary' : 'outline'}
        size="sm"
        onClick={() => onChange('streets')}
        className="justify-start gap-2"
      >
        <Map className="h-4 w-4" />
        <span className="text-xs">Ruas</span>
      </Button>
      
      <Button
        variant={currentStyle === 'outdoors' ? 'secondary' : 'outline'}
        size="sm"
        onClick={() => onChange('outdoors')}
        className="justify-start gap-2"
      >
        <Mountain className="h-4 w-4" />
        <span className="text-xs">Terreno</span>
      </Button>
      
      <Button
        variant={currentStyle === 'satellite' ? 'secondary' : 'outline'}
        size="sm"
        onClick={() => onChange('satellite')}
        className="justify-start gap-2"
      >
        <Layers className="h-4 w-4" />
        <span className="text-xs">Satélite</span>
      </Button>
    </div>
  );
};

export default MapStyleSelector;

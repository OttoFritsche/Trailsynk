
import React from 'react';
import { MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface RideMapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ride: {
    name: string;
    location: string;
    date: Date;
  } | null;
  formatDate: (date: Date) => string;
}

export const RideMapDialog: React.FC<RideMapDialogProps> = ({
  open,
  onOpenChange,
  ride,
  formatDate
}) => {
  if (!ride) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{ride.name} - Ponto de Encontro</DialogTitle>
          <DialogDescription>
            {ride.location} • {formatDate(ride.date)}
          </DialogDescription>
        </DialogHeader>
        <div className="h-[300px] bg-gray-200 rounded-md relative">
          {/* Placeholder para o mapa real */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto" />
              <p className="mt-2 text-sm">Ponto de Encontro</p>
              <p className="text-xs">{ride.location}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

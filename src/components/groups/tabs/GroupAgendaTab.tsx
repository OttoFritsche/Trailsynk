
import React from 'react';
import { Map, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GroupAgendaTabProps {
  upcomingRides: any[];
  formatDate: (date: Date) => string;
  openRideMapDialog: (ride: any) => void;
  onScheduleClick: () => void;
}

export const GroupAgendaTab: React.FC<GroupAgendaTabProps> = ({ 
  upcomingRides, 
  formatDate, 
  openRideMapDialog,
  onScheduleClick
}) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Próximos Pedais</h3>
        <Button 
          onClick={onScheduleClick}
          size="sm"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Agendar Pedal
        </Button>
      </div>
      
      <div className="space-y-3">
        {upcomingRides.map((ride) => (
          <Card key={ride.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="p-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{ride.name}</h4>
                    <Badge className="bg-primary/80">
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDate(ride.date)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{ride.description}</p>
                  <div className="mt-3 flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{ride.location}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openRideMapDialog(ride)}
                    >
                      <Map className="mr-2 h-4 w-4" />
                      Ver no Mapa
                    </Button>
                    <Button size="sm">Confirmar Presença</Button>
                  </div>
                </div>
                <div className="w-full md:w-1/3 bg-gray-100 min-h-[120px] relative hidden md:block">
                  {/* Placeholder para o mapa */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Map className="h-8 w-8" />
                  </div>
                  <div className="absolute bottom-2 right-2 z-10">
                    <Badge variant="outline" className="bg-white">
                      Ponto de Encontro
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {upcomingRides.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-md">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">Nenhum pedal agendado</h3>
            <p className="mt-1 text-sm text-gray-500">
              Seja o primeiro a agendar um pedal para este grupo!
            </p>
            <Button 
              onClick={onScheduleClick} 
              className="mt-4"
            >
              Agendar Pedal
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

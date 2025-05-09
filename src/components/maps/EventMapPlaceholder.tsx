
import React from 'react';
import EnhancedMapPlaceholder from './EnhancedMapPlaceholder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventMapPlaceholderProps {
  eventName?: string;
  eventLocation?: string;
  eventDate?: string;
  eventTime?: string;
  participantsCount?: number;
  height?: string;
  className?: string;
}

const EventMapPlaceholder: React.FC<EventMapPlaceholderProps> = ({
  eventName = 'Evento',
  eventLocation = 'Local do Evento',
  eventDate,
  eventTime,
  participantsCount,
  height = 'h-[300px]',
  className
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Local do Evento
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <EnhancedMapPlaceholder
          type="event"
          height={height}
          title={eventLocation}
          description={eventName}
          imageSrc="https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&auto=format&fit=crop&q=60"
        />
        
        {/* Event details overlay */}
        <div className="bg-white p-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {eventDate && (
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                <span>{eventDate}</span>
              </div>
            )}
            
            {eventTime && (
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 text-gray-500 mr-2" />
                <span>{eventTime}</span>
              </div>
            )}
            
            {participantsCount && (
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 text-gray-500 mr-2" />
                <span>{participantsCount} participante{participantsCount !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
          
          <div className="mt-3 text-sm">
            <p className="font-medium">{eventLocation}</p>
            <p className="text-gray-600 mt-1">Clique para ver no mapa ou obter direções.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventMapPlaceholder;

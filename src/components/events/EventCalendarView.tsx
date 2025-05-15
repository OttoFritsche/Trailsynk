
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type DayProps } from 'react-day-picker';

interface Event {
  id: string;
  name: string;
  date: Date;
  type: string; // 'Grupo', 'Competição', 'Aberto'
}

interface EventCalendarViewProps {
  events: Event[];
  onDateSelect?: (date: Date | undefined) => void;
  onEventClick?: (eventId: string) => void;
}

const EventCalendarView: React.FC<EventCalendarViewProps> = ({
  events,
  onDateSelect,
  onEventClick
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [eventsOnDate, setEventsOnDate] = useState<Event[]>([]);
  
  // Function to check if a date has events
  const hasEventsOnDate = (date: Date): boolean => {
    const dateStr = date.toDateString();
    return events.some(event => new Date(event.date).toDateString() === dateStr);
  };

  // Function to get events for a specific date
  const getEventsForDate = (date: Date | undefined): Event[] => {
    if (!date) return [];
    
    const dateStr = date.toDateString();
    return events.filter(event => new Date(event.date).toDateString() === dateStr);
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setEventsOnDate(getEventsForDate(date));
    
    if (onDateSelect) {
      onDateSelect(date);
    }
  };
  
  // Custom day render to show events
  const renderDay = (props: DayProps) => {
    // Cast date to a proper Date object if it's not already
    const date = new Date(props.date);
    const hasEvents = hasEventsOnDate(date);
    
    // Count events by type
    const eventsByType: Record<string, number> = {};
    if (hasEvents) {
      const dateStr = date.toDateString();
      events.forEach(event => {
        if (new Date(event.date).toDateString() === dateStr) {
          eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
        }
      });
    }
    
    return (
      <div className="relative w-full h-full">
        <div className={`flex h-7 w-7 items-center justify-center rounded-full ${
          props.selected ? 'bg-primary text-primary-foreground' : hasEvents ? 'bg-primary/10' : ''
        }`}>
          {date.getDate()}
        </div>
        
        {hasEvents && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
            {eventsByType['Grupo'] && (
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            )}
            {eventsByType['Competição'] && (
              <div className="w-1 h-1 bg-red-500 rounded-full"></div>
            )}
            {eventsByType['Aberto'] && (
              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  // Get the event badge color based on type
  const getEventBadgeClass = (type: string): string => {
    switch (type) {
      case 'Grupo':
        return 'border-blue-500 text-blue-700 bg-blue-50';
      case 'Competição':
        return 'border-red-500 text-red-700 bg-red-50';
      case 'Aberto':
        return 'border-green-500 text-green-700 bg-green-50';
      default:
        return 'border-gray-500 text-gray-700 bg-gray-50';
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="border-b"
          components={{
            Day: renderDay
          }}
        />
        
        <div className="p-4">
          {selectedDate ? (
            <>
              <div className="mb-3 flex items-center">
                <h3 className="font-medium">
                  Eventos em {selectedDate.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </h3>
                <Badge variant="outline" className="ml-2">
                  {eventsOnDate.length} {eventsOnDate.length === 1 ? 'evento' : 'eventos'}
                </Badge>
              </div>
              
              {eventsOnDate.length > 0 ? (
                <div className="space-y-2">
                  {eventsOnDate.map(event => (
                    <div
                      key={event.id}
                      className="p-2 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => onEventClick && onEventClick(event.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{event.name}</span>
                        <Badge variant="outline" className={getEventBadgeClass(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(event.date).toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  Não há eventos nesta data
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6 text-gray-500">
              Selecione uma data para ver os eventos
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCalendarView;


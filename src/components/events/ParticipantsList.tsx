
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlusCircle, ChevronRight } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isOrganizer?: boolean;
}

interface ParticipantsListProps {
  participants: Participant[];
  maxVisible?: number;
  total?: number;
  onShowMore?: () => void;
  canJoin?: boolean;
  onJoin?: () => void;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  maxVisible = 10,
  total,
  onShowMore,
  canJoin = true,
  onJoin
}) => {
  const displayParticipants = participants.slice(0, maxVisible);
  const remainingCount = (total || participants.length) - displayParticipants.length;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Participantes</CardTitle>
          <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
            {total || participants.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Visual representation of participants */}
        <div className="flex flex-wrap gap-1">
          {displayParticipants.map((participant) => (
            <div key={participant.id} className="relative group">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={participant.avatar} alt={participant.name} />
                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              {participant.isOrganizer && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] opacity-0 group-hover:opacity-100 transition-opacity text-center truncate rounded-b-full py-[2px]">
                {participant.name}
              </div>
            </div>
          ))}
          
          {remainingCount > 0 && (
            <div 
              className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={onShowMore}
            >
              +{remainingCount}
            </div>
          )}
        </div>
        
        {/* List of participants */}
        <div className="space-y-2">
          {displayParticipants.slice(0, 5).map((participant) => (
            <div key={participant.id} className="flex items-center justify-between py-1">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{participant.name}</span>
              </div>
              {participant.isOrganizer && (
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                  Organizador
                </span>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          {remainingCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs" onClick={onShowMore}>
              Ver todos os participantes
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          )}
          
          {canJoin && (
            <Button 
              className="ml-auto flex items-center gap-1"
              size="sm"
              onClick={onJoin}
            >
              <PlusCircle className="h-4 w-4" />
              Participar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParticipantsList;

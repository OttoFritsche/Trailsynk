
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MoreVertical, Phone, Video, Users } from 'lucide-react';
import { ChatType } from '@/types/chat';

interface ChatHeaderProps {
  chatId: string;
  name: string;
  avatar?: string;
  type: ChatType;
  participantCount?: number;
  onlineStatus?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  chatId, 
  name, 
  avatar,
  type,
  participantCount,
  onlineStatus
}) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/app/messages');
  };
  
  // Get first two letters for avatar fallback
  const avatarFallback = type === 'group' ? 'GP' : name.substring(0, 2).toUpperCase();
  
  return (
    <div className="border-b bg-white py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBackClick} 
          className="mr-2 md:mr-4"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Voltar</span>
        </Button>
        
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-green-100 text-green-800">
              {type === 'group' ? <Users size={18} /> : avatarFallback}
            </AvatarFallback>
          </Avatar>
          
          <div className="ml-3">
            <h2 className="text-sm font-semibold">{name}</h2>
            <p className="text-xs text-gray-500">
              {type === 'group' 
                ? `${participantCount || 0} participantes` 
                : onlineStatus || 'offline'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="text-gray-600">
          <Phone className="h-5 w-5" />
          <span className="sr-only">Ligar</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="text-gray-600">
          <Video className="h-5 w-5" />
          <span className="sr-only">Videochamada</span>
        </Button>
        
        <Button variant="ghost" size="icon" className="text-gray-600">
          <MoreVertical className="h-5 w-5" />
          <span className="sr-only">Mais opções</span>
        </Button>
      </div>
    </div>
  );
};

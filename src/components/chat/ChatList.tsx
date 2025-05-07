
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChatPreview } from '@/types/chat';
import { Users } from 'lucide-react';

interface ChatListProps {
  chats: ChatPreview[];
}

export const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  const navigate = useNavigate();

  const handleChatClick = (chatId: string) => {
    navigate(`/app/messages/${chatId}`);
  };

  // Helper function to format message preview (truncate if too long)
  const formatMessagePreview = (content: string): string => {
    return content.length > 40 ? `${content.substring(0, 37)}...` : content;
  };

  return (
    <div className="space-y-2">
      {chats.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">Nenhuma conversa encontrada</p>
        </div>
      ) : (
        chats.map((chat) => (
          <div 
            key={chat.id} 
            onClick={() => handleChatClick(chat.id)}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-100 
                      ${chat.unreadCount > 0 ? 'bg-green-50' : ''}`}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={chat.avatar} alt={chat.name} />
                <AvatarFallback className="bg-green-100 text-green-800">
                  {chat.type === 'group' ? 
                    <Users className="h-6 w-6" /> : 
                    chat.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {chat.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                </span>
              )}
            </div>
            
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className={`text-sm font-medium truncate ${chat.unreadCount > 0 ? 'font-semibold' : ''}`}>
                  {chat.name}
                </h3>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(chat.lastMessage.timestamp), { 
                    addSuffix: true,
                    locale: ptBR 
                  })}
                </span>
              </div>
              
              <p className={`text-sm text-gray-500 truncate ${chat.unreadCount > 0 ? 'font-medium text-gray-700' : ''}`}>
                {chat.type === 'group' && chat.lastMessage.senderId !== 'user-1' && (
                  <span className="font-medium mr-1">
                    {chat.participants.find(p => p.id === chat.lastMessage.senderId)?.name.split(' ')[0] || 'Alguém'}:
                  </span>
                )}
                {formatMessagePreview(chat.lastMessage.content)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};


import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from '@/types/chat';

interface ChatBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  showSender: boolean;
  isGroupChat: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isCurrentUser, 
  showSender,
  isGroupChat
}) => {
  // Determine time format for the message
  const formattedTime = formatDistanceToNow(new Date(message.timestamp), { 
    addSuffix: true, 
    locale: ptBR
  });
  
  // Get first two letters of sender name for fallback avatar
  const avatarFallback = message.senderName.substring(0, 2).toUpperCase();

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
        {/* Avatar - only show for other users in a group chat */}
        {!isCurrentUser && isGroupChat && (
          <div className="flex-shrink-0 self-end mb-1 mx-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.senderAvatar} alt={message.senderName} />
              <AvatarFallback className="bg-green-100 text-green-800">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
        
        {/* Message content */}
        <div className="flex flex-col">
          {/* Sender name for group chats */}
          {!isCurrentUser && isGroupChat && showSender && (
            <span className="text-xs font-medium text-gray-600 ml-1 mb-1">
              {message.senderName}
            </span>
          )}
          
          <div className={`rounded-lg py-2 px-3 max-w-xs md:max-w-md break-words ${
            isCurrentUser 
              ? 'bg-primary text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}>
            <p className="text-sm">{message.content}</p>
          </div>
          
          {/* Timestamp and read status */}
          <div className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
            {formattedTime}
            {isCurrentUser && (
              <span className={`ml-2 ${message.isRead ? 'text-blue-500' : 'text-gray-400'}`}>
                {message.isRead ? '✓✓' : '✓'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

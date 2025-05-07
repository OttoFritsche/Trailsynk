
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { getMockChatDetails } from '@/utils/mockChatData';
import { ChatDetail as ChatDetailType, Message } from '@/types/chat';

const ChatDetail: React.FC = () => {
  const { chatId = '' } = useParams<{ chatId: string }>();
  const [chatDetails, setChatDetails] = useState<ChatDetailType | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch chat details
  useEffect(() => {
    // Simulate API call to get chat details
    const fetchChatDetails = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const details = getMockChatDetails(chatId);
        setChatDetails(details);
        setMessages(details.messages);
      } catch (error) {
        console.error('Error fetching chat details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChatDetails();
  }, [chatId]);
  
  // Scroll to bottom of messages whenever they update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle sending a new message
  const handleSendMessage = (content: string) => {
    if (!chatDetails) return;
    
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      chatId: chatId,
      senderId: 'user-1', // Current user ID
      senderName: 'Você',
      content,
      timestamp: new Date(),
      isRead: false
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // In a real app, you would send this to an API here
    console.log('Sending message:', content);
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  // Show error if chat not found
  if (!chatDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-semibold mb-2">Conversa não encontrada</h2>
        <p className="text-gray-500">A conversa solicitada não existe ou foi excluída.</p>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{`Chat: ${chatDetails.name} | TrailSynk`}</title>
      </Helmet>
      
      <div className="flex flex-col h-[calc(100vh-5rem)] -mt-4 -mx-4 md:m-0 md:h-[calc(100vh-8rem)] rounded-lg overflow-hidden">
        {/* Chat Header */}
        <ChatHeader 
          chatId={chatId}
          name={chatDetails.name}
          avatar={chatDetails.avatar}
          type={chatDetails.type}
          participantCount={chatDetails.participants.length}
          onlineStatus="online"
        />
        
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4 bg-white">
          <div className="space-y-1">
            {messages.map((message, index) => {
              // Determine if we should show the sender name
              // Show name if it's the first message from this sender or if previous message was from someone else
              const showSender = index === 0 || 
                messages[index - 1].senderId !== message.senderId;
              
              return (
                <ChatBubble
                  key={message.id}
                  message={message}
                  isCurrentUser={message.senderId === 'user-1'}
                  showSender={showSender}
                  isGroupChat={chatDetails.type === 'group'}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Input Area */}
        <ChatInput 
          onSendMessage={handleSendMessage}
          placeholder={`Mensagem para ${chatDetails.type === 'group' ? chatDetails.name : chatDetails.participants[0].name}...`}
        />
      </div>
    </>
  );
};

export default ChatDetail;

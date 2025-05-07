
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { ChatList } from '@/components/chat/ChatList';
import { mockChats } from '@/utils/mockChatData';
import { ChatPreview } from '@/types/chat';

const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<ChatPreview[]>(mockChats);
  
  // Filter chats based on search query
  const filteredChats = searchQuery.trim() === '' 
    ? chats 
    : chats.filter(chat => 
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <>
      <Helmet>
        <title>Mensagens | TrailSynk</title>
      </Helmet>
      
      <div className="space-y-4">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Mensagens</h1>
            <p className="text-sm text-gray-500">
              Conversas com ciclistas e grupos
            </p>
          </div>
          
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-1" />
            Nova Conversa
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar nas mensagens..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Chat List */}
        <div className="bg-white rounded-lg shadow-sm">
          <ChatList chats={filteredChats} />
        </div>
      </div>
    </>
  );
};

export default Messages;

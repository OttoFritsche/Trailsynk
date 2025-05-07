
import React, { useState, useRef, KeyboardEvent } from 'react';
import { Send, PlusCircle, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage,
  placeholder = 'Digite uma mensagem...'
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
      
      // Focus back on the textarea after sending
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without shift for new line)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="border-t bg-white py-3 px-4">
      <div className="flex items-end gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          type="button" 
          className="rounded-full text-gray-500 hover:text-gray-700 flex-shrink-0"
        >
          <PlusCircle className="h-5 w-5" />
          <span className="sr-only">Anexar</span>
        </Button>
        
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[40px] resize-none py-2 pr-12 overflow-hidden border-gray-300"
            rows={1}
          />
          
          <Button 
            variant="ghost" 
            size="icon" 
            type="button" 
            className="absolute bottom-1 right-12 text-gray-500 hover:text-gray-700"
          >
            <Smile className="h-5 w-5" />
            <span className="sr-only">Emoji</span>
          </Button>
        </div>
        
        <Button 
          onClick={handleSendMessage}
          className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 flex items-center justify-center flex-shrink-0"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Enviar</span>
        </Button>
      </div>
    </div>
  );
};

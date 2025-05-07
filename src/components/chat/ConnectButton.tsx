
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConnectButtonProps {
  userId: string;
  userName: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'outline';
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({ 
  userId, 
  userName,
  size = 'sm',
  variant = 'ghost'
}) => {
  const navigate = useNavigate();
  
  // This would actually create a chat or navigate to existing one
  // For now we'll just simulate with a mock chat ID
  const handleClick = () => {
    // In reality, this would check if a chat exists or create a new one
    // For demo purposes, we'll navigate to a fixed chat
    navigate('/app/messages/chat-1');
  };
  
  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleClick}
      className="text-gray-600 hover:text-gray-800"
    >
      <MessageCircle className="h-4 w-4 mr-1" />
      <span>Mensagem</span>
    </Button>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// Define message type
interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Olá! Sou seu Assessor Ciclista Inteligente. Como posso te ajudar hoje?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Create new user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    // Update messages state with user message
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // This is where we would normally make the API call to the backend
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: `ai-${Date.now()}`,
          content: getSimulatedResponse(inputValue),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
      
      // In the future, replace with actual API call:
      // const response = await fetch('/api/ai/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: inputValue }),
      // });
      // const data = await response.json();
      // const aiResponse = { ... }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple simulation of AI responses (to be replaced with actual backend)
  const getSimulatedResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('olá') || input.includes('oi') || input.includes('começar')) {
      return 'Olá, ciclista! Estou aqui para ajudar com dicas de treino, manutenção de bikes e sugestões de rotas. O que você precisa hoje?';
    } else if (input.includes('treino') || input.includes('melhorar')) {
      return 'Para melhorar seu desempenho, recomendo alternar entre treinos de intensidade e resistência. Tente fazer sprints curtos em um dia e pedaladas longas de baixa intensidade no outro. Também é importante descansar adequadamente.';
    } else if (input.includes('manutenção') || input.includes('bike') || input.includes('bicicleta')) {
      return 'Para manter sua bike em boas condições, verifique a pressão dos pneus semanalmente, lubrifique a corrente a cada 200km, e faça uma revisão completa a cada 6 meses. Limpe sua bike após pedalar em condições úmidas ou com lama.';
    } else if (input.includes('rota') || input.includes('percurso')) {
      return 'Com base no seu histórico, você parece gostar de rotas com elevação moderada. Já experimentou a Trilha da Serra? Tem 22km com 450m de elevação e paisagens incríveis.';
    } else {
      return 'Interessante! Como seu assessor de ciclismo, posso oferecer dicas personalizadas sobre treinos, rotas ou manutenção da sua bike. Tem alguma dessas áreas que gostaria de explorar?';
    }
  };

  return (
    <div className="flex flex-col h-[70vh] md:h-[80vh]">
      {/* Chat messages area */}
      <Card className="flex-1 overflow-y-auto p-4 mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <div className="flex items-center mb-1">
                  {!message.isUser && (
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src="/lovable-uploads/c6ac0b91-7542-4299-8422-3007983a958b.png" alt="TrailSynk" />
                      <AvatarFallback>TS</AvatarFallback>
                    </Avatar>
                  )}
                  <span className="text-xs opacity-75">
                    {message.isUser ? 'Você' : 'Assessor IA'}
                  </span>
                  {message.isUser && (
                    <Avatar className="h-6 w-6 ml-2">
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <div className="text-xs opacity-50 text-right mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%] rounded-tl-none">
                <div className="flex items-center mb-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/lovable-uploads/c6ac0b91-7542-4299-8422-3007983a958b.png" alt="TrailSynk" />
                    <AvatarFallback>TS</AvatarFallback>
                  </Avatar>
                  <span className="text-xs opacity-75">Assessor IA</span>
                </div>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messageEndRef} />
        </div>
      </Card>

      {/* Message input area */}
      <div className="flex items-center space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua pergunta..."
          disabled={isLoading}
          className="flex-1 p-4 text-base"
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={isLoading || !inputValue.trim()} 
          className="bg-primary hover:bg-primary-dark text-white"
        >
          <Send className="h-5 w-5" />
          <span className="sr-only">Enviar</span>
        </Button>
      </div>
    </div>
  );
};

export default AIChat;

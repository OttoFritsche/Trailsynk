
import React from 'react';
import AIChat from '@/components/app/AIChat';

const Assistant: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Assessor IA</h1>
        <p className="text-muted-foreground">
          Converse com seu assistente pessoal de ciclismo e obtenha dicas, sugestões de rotas e muito mais.
        </p>
      </div>
      
      <AIChat />
      
      <div className="text-xs text-gray-400 text-center mt-2">
        O Assessor IA está em fase de desenvolvimento. As respostas são baseadas em conhecimentos gerais de ciclismo.
      </div>
    </div>
  );
};

export default Assistant;

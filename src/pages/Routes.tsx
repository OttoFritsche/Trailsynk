
import React from 'react';
import { Route } from 'lucide-react';

const Routes: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Rotas Sugeridas e Exploradas</h1>
        <p className="text-muted-foreground">
          Visualize suas rotas e explore novas trilhas.
        </p>
      </div>
      
      <div className="rounded-lg border border-dashed p-8 text-center">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Route className="h-10 w-10 text-primary" />
          </div>
          
          <h3 className="mt-4 text-lg font-semibold">Conteúdo em desenvolvimento</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Em breve você poderá visualizar mapas interativos, salvar suas rotas 
            favoritas e descobrir novos caminhos para explorar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Routes;


import React from 'react';
import { TrailConnection } from '@/types/trails';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle } from 'lucide-react';

interface TrailsListProps {
  connections: TrailConnection[];
  loading: boolean;
  error: Error | null;
  searchQuery: string;
}

const TrailsList: React.FC<TrailsListProps> = ({ connections, loading, error, searchQuery }) => {
  // Filter connections based on search query
  const filteredConnections = connections.filter(connection => {
    if (!searchQuery) return true;
    const fullName = `${connection.fullName || ''}`.toLowerCase();
    const username = `${connection.username || ''}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || 
           username.includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="ml-4 space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
        <p>Erro ao carregar conexões: {error.message}</p>
        <p className="text-sm mt-2">Por favor, tente novamente mais tarde.</p>
      </div>
    );
  }

  if (filteredConnections.length === 0) {
    return searchQuery ? (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground mb-4">
          Nenhum resultado encontrado para "{searchQuery}"
        </p>
        <Button variant="outline" onClick={() => window.location.href = "/app/trails"}>
          Limpar Busca
        </Button>
      </Card>
    ) : (
      <Card className="p-6 text-center">
        <h3 className="font-medium text-lg mb-2">Você ainda não tem conexões</h3>
        <p className="text-muted-foreground mb-4">
          Comece convidando seus amigos para o TrailSynk
        </p>
        <Button className="bg-[#2ECC71] hover:bg-[#27ae60]">
          Encontrar Ciclistas
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredConnections.map((connection) => (
        <TrailConnectionCard key={connection.id} connection={connection} />
      ))}
    </div>
  );
};

const TrailConnectionCard: React.FC<{ connection: TrailConnection }> = ({ connection }) => {
  const { fullName, username, avatarUrl, lastActivity, online, stats } = connection;
  const displayName = fullName || username || 'Ciclista';
  const initials = displayName.substring(0, 2).toUpperCase();
  
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="relative">
          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-base leading-none">{displayName}</h3>
              {username && <p className="text-sm text-muted-foreground">@{username}</p>}
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Mensagem</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <div>
          {lastActivity ? (
            <span>Último pedal {lastActivity}</span>
          ) : (
            <span>Sem atividades recentes</span>
          )}
        </div>
        {stats?.totalDistance && (
          <Badge variant="outline" className="bg-green-50">
            {stats.totalDistance}km
          </Badge>
        )}
      </div>
    </Card>
  );
};

export default TrailsList;


import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { CyclistSearchResults } from '@/components/social/CyclistSearchResults';
import { SuggestedCyclists } from '@/components/social/SuggestedCyclists';

// Interface para usuários/ciclistas
interface Cyclist {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  isFollowing?: boolean;
  mutualFriends?: number;
  location?: string;
  bikeType?: string;
}

// Mock para sugestões de ciclistas
const mockSuggestions: Cyclist[] = [
  { 
    id: 'user1', 
    name: 'Ricardo Almeida', 
    username: 'ricardo_mtb',
    avatar: '',
    mutualFriends: 3,
    location: 'Salvador, BA',
    bikeType: 'Mountain Bike' 
  },
  { 
    id: 'user2', 
    name: 'Fernanda Silva', 
    username: 'fefe.bike',
    avatar: '',
    mutualFriends: 5,
    location: 'Rio de Janeiro, RJ',
    bikeType: 'Road Bike'
  },
  { 
    id: 'user3', 
    name: 'Gabriel Costa', 
    username: 'gabi_pedalante',
    avatar: '',
    mutualFriends: 2,
    location: 'São Paulo, SP',
    bikeType: 'Gravel Bike'
  },
  { 
    id: 'user4', 
    name: 'Luciana Santos', 
    username: 'lu.santos',
    avatar: '',
    mutualFriends: 1,
    location: 'Belo Horizonte, MG',
    bikeType: 'Mountain Bike'
  }
];

// Mock para resultados de busca
const mockSearchResults = (query: string): Cyclist[] => {
  if (!query) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return [
    { 
      id: 'search1', 
      name: 'Amanda Oliveira', 
      username: 'amanda_bikes',
      avatar: '',
      location: 'Fortaleza, CE',
      bikeType: 'Road Bike'
    },
    { 
      id: 'search2', 
      name: 'Bruno Mendes', 
      username: 'brunomtb',
      avatar: '',
      location: 'Florianópolis, SC',
      bikeType: 'Mountain Bike'
    },
    { 
      id: 'search3', 
      name: 'Carla Rodriguez', 
      username: 'carla.pedal',
      avatar: '',
      location: 'Recife, PE',
      bikeType: 'Urban Bike'
    },
  ].filter(cyclist => 
    cyclist.name.toLowerCase().includes(lowercaseQuery) || 
    cyclist.username.toLowerCase().includes(lowercaseQuery)
  );
};

const FindCyclists: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Cyclist[]>([]);
  const [suggestedCyclists, setSuggestedCyclists] = useState<Cyclist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    // Simular carregamento de sugestões
    const loadSuggestions = () => {
      setLoading(true);
      // Aqui seria uma chamada API para carregar sugestões personalizadas
      setTimeout(() => {
        setSuggestedCyclists(mockSuggestions);
        setLoading(false);
      }, 1000);
    };
    
    loadSuggestions();
  }, []);

  // Realizar busca quando o usuário digita
  useEffect(() => {
    if (searchQuery.length >= 2) {
      setSearching(true);
      // Simular tempo de resposta da API
      const timeoutId = setTimeout(() => {
        const results = mockSearchResults(searchQuery);
        setSearchResults(results);
        setSearching(false);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleConnect = (cyclist: Cyclist) => {
    toast.success(`Convite enviado para ${cyclist.name}`);
    // Aqui implementaria a lógica real de enviar convite/conectar
  };

  return (
    <>
      <Helmet>
        <title>Encontrar Ciclistas | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Encontrar Novos Ciclistas</h1>
          <p className="text-muted-foreground">
            Conecte-se com outros ciclistas, participe de grupos e compartilhe suas experiências.
          </p>
        </div>

        {/* Barra de busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar por nome ou @usuário..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Resultados da busca */}
        {searching && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        )}

        {searchQuery.length >= 2 && !searching && (
          <CyclistSearchResults 
            results={searchResults} 
            onConnectClick={handleConnect} 
            searchQuery={searchQuery}
          />
        )}

        {/* Sugestões de ciclistas */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Sugestões para você</h2>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : (
            <SuggestedCyclists 
              cyclists={suggestedCyclists}
              onConnectClick={handleConnect}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FindCyclists;

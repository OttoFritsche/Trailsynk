
import { useState, useEffect } from 'react';
import { TrailConnection } from '@/types/trails';
import { useAuth } from '@/hooks/useAuth';

// This is a mock implementation that will be replaced with actual API calls
export const useTrailConnections = () => {
  const [connections, setConnections] = useState<TrailConnection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        
        // Mock data for now - would be replaced with actual API call
        // e.g., const { data, error } = await supabase.from('connections').select('*').eq('user_id', user?.id);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockConnections: TrailConnection[] = [
          {
            id: '1',
            userId: '101',
            fullName: 'Ana Silva',
            username: 'anasilva',
            avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
            online: true,
            lastActivity: 'há 2 horas',
            stats: { totalDistance: 235 }
          },
          {
            id: '2',
            userId: '102',
            fullName: 'Carlos Mendes',
            username: 'carlosm',
            avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
            online: false,
            lastActivity: 'há 1 dia',
            stats: { totalDistance: 489 }
          },
          {
            id: '3',
            userId: '103',
            fullName: 'Marina Costa',
            username: 'marinacoast',
            avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
            online: false,
            lastActivity: 'há 3 dias',
            stats: { totalDistance: 127 }
          },
          {
            id: '4',
            userId: '104',
            fullName: 'Pedro Alves',
            username: 'pedroalves',
            avatarUrl: 'https://randomuser.me/api/portraits/men/46.jpg',
            online: true,
            lastActivity: 'há 30 minutos',
            stats: { totalDistance: 356 }
          },
          {
            id: '5',
            userId: '105',
            fullName: 'Juliana Ramos',
            username: 'juramos',
            avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
            online: false,
            lastActivity: 'há 1 semana',
            stats: { totalDistance: 780 }
          }
        ];
        
        setConnections(mockConnections);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch connections'));
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchConnections();
    }
  }, [user]);

  return { connections, loading, error };
};

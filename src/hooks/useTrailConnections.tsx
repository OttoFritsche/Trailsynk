
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
        
        // Expanded mock data with diverse avatars and statuses
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
          },
          // Additional connections
          {
            id: '6',
            userId: '106',
            fullName: 'Roberto Ferreira',
            username: 'robertof',
            avatarUrl: 'https://randomuser.me/api/portraits/men/56.jpg',
            online: true,
            lastActivity: 'agora mesmo',
            stats: { totalDistance: 612 }
          },
          {
            id: '7',
            userId: '107',
            fullName: 'Camila Santos',
            username: 'camilasantos',
            avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
            online: false,
            lastActivity: 'há 2 dias',
            stats: { totalDistance: 295 }
          },
          {
            id: '8',
            userId: '108',
            fullName: 'Lucas Oliveira',
            username: 'lucase',
            avatarUrl: 'https://randomuser.me/api/portraits/men/72.jpg',
            online: true,
            lastActivity: 'há 15 minutos',
            stats: { totalDistance: 428 }
          },
          {
            id: '9',
            userId: '109',
            fullName: 'Fernanda Lima',
            username: 'ferlima',
            avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
            online: false,
            lastActivity: 'há 5 dias',
            stats: { totalDistance: 532 }
          },
          {
            id: '10',
            userId: '110',
            fullName: 'Ricardo Gomes',
            username: 'ricgomes',
            avatarUrl: 'https://randomuser.me/api/portraits/men/18.jpg',
            online: true,
            lastActivity: 'há 1 hora',
            stats: { totalDistance: 845 }
          },
          {
            id: '11',
            userId: '111',
            fullName: 'Patrícia Duarte',
            username: 'patduarte',
            avatarUrl: 'https://randomuser.me/api/portraits/women/54.jpg',
            online: false,
            lastActivity: 'há 2 semanas',
            stats: { totalDistance: 187 }
          },
          {
            id: '12',
            userId: '112',
            fullName: 'Grupo Pedal Matinal',
            username: 'pedalmatinal',
            avatarUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&h=200&fit=crop',
            online: true,
            lastActivity: 'há 5 horas',
            stats: { totalDistance: 1250 }
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

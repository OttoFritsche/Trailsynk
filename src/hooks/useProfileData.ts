
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProfileData, UserStats, UserBadge } from '@/types/profile';

export const useProfileData = (user: User | null) => {
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [loading, setLoading] = useState(true);
  
  // Simplified user statistics for profile overview
  const [userStats, setUserStats] = useState<UserStats>({
    totalDistance: 0,
    totalDuration: 0,
    highestElevation: 0,
    longestRide: 0,
    totalRides: 0
  });
  
  // Showcase badges (only a few for the preview)
  const [highlightedBadges, setHighlightedBadges] = useState<UserBadge[]>([
    {
      id: 'b1',
      title: 'Iniciante',
      description: 'Completou sua primeira trilha',
      dateEarned: new Date('2023-10-15'),
      status: 'earned'
    },
    {
      id: 'b2',
      title: 'Explorador',
      description: 'Explorou 5 rotas diferentes',
      dateEarned: new Date('2023-11-02'),
      status: 'earned'
    },
    {
      id: 'b3',
      title: 'Aventureiro',
      description: 'Percorreu mais de 100km em trilhas',
      dateEarned: new Date('2023-12-18'),
      status: 'earned'
    }
  ]);

  // For Strava connection status
  const [isConnectedToStrava, setIsConnectedToStrava] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, full_name, avatar_url, created_at, is_profile_complete')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        setProfileData(data || {});
        
        // Mock statistics for profile overview
        setUserStats({
          totalDistance: 457.8,
          totalDuration: 3840, // in minutes
          highestElevation: 1250,
          longestRide: 78.5,
          totalRides: 42
        });
        
      } catch (error: any) {
        console.error('Error fetching profile data:', error.message);
        toast.error('Erro ao carregar dados do perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  return { 
    profileData, 
    loading, 
    userStats, 
    highlightedBadges,
    isConnectedToStrava
  };
};

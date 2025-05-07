
import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProfileData, UserStats, UserBadge, ProfilePhoto } from '@/types/profile';

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

  // Profile photos management
  const [photos, setPhotos] = useState<ProfilePhoto[]>([
    { 
      id: 'photo1',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=300&fit=crop',
      caption: 'Pedalada matinal na orla'
    },
    { 
      id: 'photo2',
      url: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&h=300&fit=crop',
      caption: 'Trilha no Parque da Serra'
    },
    { 
      id: 'photo3',
      url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=300&fit=crop',
      caption: 'Encontro do grupo MTB Salvador'
    },
    { 
      id: 'photo4',
      url: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=800&h=300&fit=crop' 
    },
    { 
      id: 'photo5',
      url: 'https://images.unsplash.com/photo-1553007830-89e37b527205?w=800&h=300&fit=crop' 
    }
  ]);

  const fetchProfileData = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url, created_at, is_profile_complete, weight, height, age, riding_preferences')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      // Make sure we're handling the returned data as a ProfileData object
      const profileInfo: ProfileData = data || {};
      setProfileData(profileInfo);
      
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
  }, [user]);

  // Função para atualizar os dados do perfil após uma edição
  const refreshProfileData = useCallback(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // Funções para gerenciar fotos
  const addPhoto = useCallback((newPhoto: ProfilePhoto) => {
    setPhotos(prev => [newPhoto, ...prev]);
    toast.success("Foto adicionada com sucesso!");
  }, []);

  const deletePhoto = useCallback((photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    toast.success("Foto removida com sucesso!");
  }, []);

  const reorderPhotos = useCallback((reorderedPhotos: ProfilePhoto[]) => {
    setPhotos(reorderedPhotos);
    toast.success("Ordem das fotos atualizada!");
  }, []);

  return { 
    profileData, 
    loading, 
    userStats, 
    highlightedBadges,
    isConnectedToStrava,
    refreshProfileData,
    photos,
    addPhoto,
    deletePhoto,
    reorderPhotos
  };
};

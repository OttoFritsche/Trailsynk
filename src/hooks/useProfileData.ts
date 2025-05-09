import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ProfileData, UserStats, UserBadge, ProfilePhoto, PhotoAlbum, Bicycle } from '@/types/profile';

export const useProfileData = (user: User | null) => {
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [loading, setLoading] = useState(true);
  
  // Bicycles for the profile
  const [bicycles, setBicycles] = useState<Bicycle[]>([
    {
      id: 'bike1',
      name: 'Specialized Epic Pro',
      brand: 'Specialized',
      model: 'Epic Pro',
      type: 'MTB',
      image_url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=300&fit=crop',
      purchase_date: '2023-03-12',
      initial_odometer: 0
    },
    {
      id: 'bike2',
      name: 'Caloi Elite Carbon',
      brand: 'Caloi',
      model: 'Elite Carbon',
      type: 'Road',
      image_url: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&h=300&fit=crop',
      purchase_date: '2022-04-25',
      initial_odometer: 120
    },
    {
      id: 'bike3',
      name: 'Trek Fuel EX 8',
      brand: 'Trek',
      model: 'Fuel EX 8',
      type: 'MTB Full',
      image_url: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&h=300&fit=crop',
      purchase_date: '2021-01-05',
      initial_odometer: 0
    }
  ]);
  
  // Expanded user statistics for profile overview
  const [userStats, setUserStats] = useState<UserStats>({
    totalDistance: 0,
    totalDuration: 0,
    highestElevation: 0,
    longestRide: 0,
    totalRides: 0,
    weeklyAverage: 0,
    totalElevationGain: 0,
    favoriteRouteType: '',
    avgSpeed: 0
  });
  
  // Expanded badges
  const [highlightedBadges, setHighlightedBadges] = useState<UserBadge[]>([
    {
      id: 'b1',
      title: 'Iniciante',
      description: 'Completou sua primeira trilha',
      dateEarned: new Date('2023-10-15'),
      status: 'earned',
      category: 'achievement'
    },
    {
      id: 'b2',
      title: 'Explorador',
      description: 'Explorou 5 rotas diferentes',
      dateEarned: new Date('2023-11-02'),
      status: 'earned',
      category: 'distance'
    },
    {
      id: 'b3',
      title: 'Aventureiro',
      description: 'Percorreu mais de 100km em trilhas',
      dateEarned: new Date('2023-12-18'),
      status: 'earned',
      category: 'distance'
    },
    {
      id: 'b4',
      title: 'Rei da Montanha',
      description: 'Acumulou mais de 5.000m de elevação',
      dateEarned: new Date('2024-01-22'),
      status: 'earned',
      category: 'elevation'
    },
    {
      id: 'b5',
      title: 'Velocista',
      description: 'Manteve média acima de 30km/h por 10km',
      dateEarned: new Date('2024-02-14'),
      status: 'earned',
      category: 'speed'
    },
    {
      id: 'b6',
      title: 'Maratonista',
      description: 'Completou um percurso de mais de 100km',
      dateEarned: undefined,
      status: 'locked',
      category: 'distance'
    }
  ]);
  
  // For Strava connection status
  const [isConnectedToStrava, setIsConnectedToStrava] = useState(false);

  // Expanded profile photos management
  const [photos, setPhotos] = useState<ProfilePhoto[]>([
    { 
      id: 'photo1',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=300&fit=crop',
      caption: 'Pedalada matinal na orla',
      date: new Date('2024-03-15')
    },
    { 
      id: 'photo2',
      url: 'https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=800&h=300&fit=crop',
      caption: 'Trilha no Parque da Serra',
      albumId: 'album1',
      date: new Date('2024-02-28')
    },
    { 
      id: 'photo3',
      url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=300&fit=crop',
      caption: 'Encontro do grupo MTB Salvador',
      albumId: 'album1',
      date: new Date('2024-02-20')
    },
    { 
      id: 'photo4',
      url: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=800&h=300&fit=crop',
      albumId: 'album2',
      caption: 'Passeio de bike no centro histórico',
      date: new Date('2024-01-12')
    },
    { 
      id: 'photo5',
      url: 'https://images.unsplash.com/photo-1553007830-89e37b527205?w=800&h=300&fit=crop',
      albumId: 'album2',
      caption: 'Competição regional - 3º lugar!',
      date: new Date('2023-12-05')
    },
    { 
      id: 'photo6',
      url: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=800&h=300&fit=crop',
      caption: 'Serra do Luar - Trecho técnico',
      date: new Date('2024-04-02')
    },
    { 
      id: 'photo7',
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=300&fit=crop',
      albumId: 'album3',
      caption: 'Pedal Solidário 2024',
      date: new Date('2024-03-28')
    },
    { 
      id: 'photo8',
      url: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?w=800&h=300&fit=crop',
      albumId: 'album3',
      caption: 'Manhã perfeita para pedalar',
      date: new Date('2024-04-10')
    }
  ]);
  
  // Expanded photo albums management
  const [albums, setAlbums] = useState<PhotoAlbum[]>([
    {
      id: 'album1',
      title: 'Trilhas de Verão',
      description: 'Aventuras pelo Parque da Serra',
      coverPhotoId: 'photo2',
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2023-12-15')
    },
    {
      id: 'album2',
      title: 'Pedaladas Urbanas',
      description: 'Explorando a cidade com amigos',
      coverPhotoId: 'photo4',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: 'album3',
      title: 'Eventos e Competições',
      description: 'Registros de participações em eventos',
      coverPhotoId: 'photo7',
      createdAt: new Date('2024-03-25'),
      updatedAt: new Date('2024-04-10')
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
      
      // Enhanced statistics for profile overview
      setUserStats({
        totalDistance: 1457.8,
        totalDuration: 9840, // in minutes
        highestElevation: 1850,
        longestRide: 112.5,
        totalRides: 86,
        weeklyAverage: 68.5,
        totalElevationGain: 28750,
        favoriteRouteType: 'Mountain',
        avgSpeed: 22.4
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
    
    // Atualiza as capas dos álbums caso a foto deletada seja uma capa
    setAlbums(prev => prev.map(album => 
      album.coverPhotoId === photoId 
        ? { ...album, coverPhotoId: undefined } 
        : album
    ));
    
    toast.success("Foto removida com sucesso!");
  }, []);

  const reorderPhotos = useCallback((reorderedPhotos: ProfilePhoto[]) => {
    setPhotos(reorderedPhotos);
    toast.success("Ordem das fotos atualizada!");
  }, []);

  // Funções para gerenciar álbuns
  const addAlbum = useCallback((newAlbum: PhotoAlbum) => {
    setAlbums(prev => [...prev, newAlbum]);
    toast.success("Álbum criado com sucesso!");
    return newAlbum.id;
  }, []);

  const updateAlbum = useCallback((albumId: string, updates: Partial<PhotoAlbum>) => {
    setAlbums(prev => prev.map(album => 
      album.id === albumId 
        ? { ...album, ...updates, updatedAt: new Date() } 
        : album
    ));
    toast.success("Álbum atualizado com sucesso!");
  }, []);

  const deleteAlbum = useCallback((albumId: string) => {
    // Remove o álbum
    setAlbums(prev => prev.filter(album => album.id !== albumId));
    
    // Atualiza as fotos para remover a associação com o álbum
    setPhotos(prev => prev.map(photo => 
      photo.albumId === albumId 
        ? { ...photo, albumId: undefined } 
        : photo
    ));
    
    toast.success("Álbum removido com sucesso!");
  }, []);

  const assignPhotoToAlbum = useCallback((photoId: string, albumId: string | undefined) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId 
        ? { ...photo, albumId } 
        : photo
    ));
    
    if (albumId) {
      toast.success("Foto adicionada ao álbum!");
    } else {
      toast.success("Foto removida do álbum!");
    }
  }, []);

  const setAlbumCover = useCallback((albumId: string, photoId: string) => {
    setAlbums(prev => prev.map(album => 
      album.id === albumId 
        ? { ...album, coverPhotoId: photoId, updatedAt: new Date() } 
        : album
    ));
    
    toast.success("Capa do álbum atualizada!");
  }, []);

  const getAlbumPhotos = useCallback((albumId: string) => {
    return photos.filter(photo => photo.albumId === albumId);
  }, [photos]);

  const getAlbumById = useCallback((albumId: string) => {
    return albums.find(album => album.id === albumId);
  }, [albums]);

  return { 
    profileData, 
    loading, 
    userStats, 
    highlightedBadges,
    isConnectedToStrava,
    bicycles,
    refreshProfileData: fetchProfileData,
    photos,
    addPhoto,
    deletePhoto,
    reorderPhotos,
    albums,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    assignPhotoToAlbum,
    setAlbumCover,
    getAlbumPhotos,
    getAlbumById
  };
};

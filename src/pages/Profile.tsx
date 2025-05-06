
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarClock, Award, BarChart3, ArrowUpRight, 
  Trophy, Clock, Bike, TrendingUp, Mountain 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface ProfileData {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
}

interface UserStats {
  totalDistance: number;
  totalDuration: number;
  highestElevation: number;
  longestRide: number;
}

interface UserBadge {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  dateEarned: Date;
}

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [loading, setLoading] = useState(true);
  
  // Placeholder for future data integration
  const [userStats, setUserStats] = useState<UserStats>({
    totalDistance: 0,
    totalDuration: 0,
    highestElevation: 0,
    longestRide: 0
  });
  
  // Placeholder badges
  const [badges, setBadges] = useState<UserBadge[]>([
    {
      id: 'b1',
      title: 'Iniciante',
      description: 'Completou sua primeira trilha',
      dateEarned: new Date('2023-10-15')
    },
    {
      id: 'b2',
      title: 'Explorador',
      description: 'Explorou 5 rotas diferentes',
      dateEarned: new Date('2023-11-02')
    },
    {
      id: 'b3',
      title: 'Aventureiro',
      description: 'Percorreu mais de 100km em trilhas',
      dateEarned: new Date('2023-12-18')
    }
  ]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, full_name, avatar_url, created_at')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        setProfileData(data || {});
        
        // Simulate fetching stats (would be from Supabase in real implementation)
        // This would be replaced with actual API calls
        setUserStats({
          totalDistance: 457.8,
          totalDuration: 3840, // in minutes
          highestElevation: 1250,
          longestRide: 78.5
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

  const handleStravaConnect = () => {
    // In a real application, this would be your backend endpoint that
    // handles the OAuth flow initiation
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://your-backend-url.com';
    const endpoint = `${backendUrl}/auth/strava`;
    
    // Using window.location to redirect to the backend endpoint
    // The backend will then redirect to Strava's authorization page
    window.location.href = endpoint;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const formatDuration = (minutes: number) => {
    const days = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    const mins = minutes % 60;
    
    return `${days ? `${days}d ` : ''}${hours ? `${hours}h ` : ''}${mins}min`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-6 bg-white rounded-xl shadow-sm p-6">
          <Skeleton className="h-32 w-32 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const joinDate = profileData.created_at 
    ? formatDate(profileData.created_at)
    : 'Data desconhecida';

  const displayName = profileData.full_name || profileData.username || user?.email?.split('@')[0] || 'Ciclista';
  
  // For now, we'll assume the user is not connected to Strava
  // Once the database is updated, we can fetch this value
  const isConnectedToStrava = false;

  return (
    <>
      <Helmet>
        <title>Meu Perfil | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-xl shadow-sm p-6">
          <div className="relative">
            {profileData.avatar_url ? (
              <img 
                src={profileData.avatar_url} 
                alt={displayName}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg" 
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl text-primary font-bold border-4 border-white shadow-lg">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold mb-1">{displayName}</h1>
            {profileData.username && (
              <p className="text-muted-foreground">@{profileData.username}</p>
            )}
            <div className="flex items-center justify-center md:justify-start mt-2 gap-2 text-sm text-muted-foreground">
              <CalendarClock className="h-4 w-4" />
              <span>Membro desde {joinDate}</span>
            </div>
          </div>
        </div>

        {/* Strava Connection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" 
                      fill={isConnectedToStrava ? "#FC4C02" : "currentColor"}/>
              </svg>
              Conexão com Strava
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {isConnectedToStrava ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Conectado</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Desconectado</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {isConnectedToStrava 
                    ? 'Sua conta está conectada ao Strava. Seus dados de atividades estão sendo sincronizados.' 
                    : 'Conecte sua conta Strava para sincronizar automaticamente suas atividades e estatísticas.'}
                </p>
              </div>
              <Button 
                onClick={handleStravaConnect}
                className={isConnectedToStrava 
                  ? "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50" 
                  : "bg-[#FC4C02] hover:bg-[#E34302] text-white"}
              >
                {isConnectedToStrava ? 'Reconectar' : 'Conectar Strava'}
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section - Improved */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Estatísticas de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Bike className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Distância Total</p>
                <p className="text-xl font-bold">{userStats.totalDistance} km</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Clock className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Tempo Total</p>
                <p className="text-xl font-bold">{formatDuration(userStats.totalDuration)}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Mountain className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Maior Elevação</p>
                <p className="text-xl font-bold">{userStats.highestElevation}m</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Trophy className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Maior Pedalada</p>
                <p className="text-xl font-bold">{userStats.longestRide} km</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section - Improved */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Badges Conquistados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {badges.map(badge => (
                <div key={badge.id} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 shadow-sm">
                    {badge.iconUrl ? (
                      <img src={badge.iconUrl} alt={badge.title} className="w-10 h-10" />
                    ) : (
                      <Trophy className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-center">{badge.title}</h4>
                  <p className="text-xs text-muted-foreground text-center mt-1">{badge.description}</p>
                </div>
              ))}
              
              {/* Placeholder para badges futuros */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={`placeholder-${index}`} className="flex flex-col items-center opacity-40">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2 border border-dashed border-gray-300">
                    <Award className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-sm font-medium text-center">???</h4>
                  <p className="text-xs text-muted-foreground text-center mt-1">Badge Bloqueado</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;


import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Award, BarChart3, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface ProfileData {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
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

        {/* Stats Placeholder */}
        <Card className="bg-gray-50 border border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <BarChart3 className="h-5 w-5" />
              Estatísticas de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                Estatísticas de performance serão exibidas aqui.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Badges Placeholder */}
        <Card className="bg-gray-50 border border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <Award className="h-5 w-5" />
              Badges Conquistados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                Seus badges e conquistas serão exibidos aqui.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarClock, Award, BarChart3, ArrowUpRight, 
  Trophy, Clock, Bike, TrendingUp, Mountain, 
  Flame, Gauge, MapPin, Calendar, Target, Flag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip
} from "recharts";

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
  maxAvgSpeed: number;
  totalRides: number;
  totalElevationGain: number;
  highestHeartRate: number;
}

interface UserBadge {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  dateEarned?: Date;
  status: "earned" | "locked";
}

// Mock performance data for chart
const performanceData = [
  { month: 'Jan', distance: 120, duration: 600, elevation: 800 },
  { month: 'Feb', distance: 170, duration: 750, elevation: 1100 },
  { month: 'Mar', distance: 140, duration: 800, elevation: 950 },
  { month: 'Apr', distance: 200, duration: 1000, elevation: 1300 },
  { month: 'May', distance: 250, duration: 1200, elevation: 1500 },
  { month: 'Jun', distance: 190, duration: 900, elevation: 1250 },
  { month: 'Jul', distance: 220, duration: 1100, elevation: 1400 },
  { month: 'Aug', distance: 300, duration: 1400, elevation: 1800 },
  { month: 'Sep', distance: 280, duration: 1350, elevation: 1700 },
  { month: 'Oct', distance: 240, duration: 1150, elevation: 1450 },
  { month: 'Nov', distance: 190, duration: 900, elevation: 1200 },
  { month: 'Dec', distance: 160, duration: 750, elevation: 950 },
];

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({});
  const [loading, setLoading] = useState(true);
  
  // Enhanced user statistics
  const [userStats, setUserStats] = useState<UserStats>({
    totalDistance: 0,
    totalDuration: 0,
    highestElevation: 0,
    longestRide: 0,
    maxAvgSpeed: 0,
    totalRides: 0,
    totalElevationGain: 0,
    highestHeartRate: 0
  });
  
  // Enhanced badges collection
  const [badges, setBadges] = useState<UserBadge[]>([
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
    },
    {
      id: 'b4',
      title: 'Montanhista',
      description: 'Completou uma trilha com +1000m de elevação',
      dateEarned: new Date('2024-01-22'),
      status: 'earned'
    },
    {
      id: 'b5',
      title: 'Madrugador',
      description: 'Iniciou uma trilha antes do amanhecer',
      dateEarned: new Date('2024-02-05'),
      status: 'earned'
    },
    {
      id: 'b6',
      title: 'Conquistador',
      description: 'Percorreu +5000m de elevação acumulada',
      status: 'locked'
    },
    {
      id: 'b7',
      title: 'Resistente',
      description: 'Completou uma trilha de +100km',
      status: 'locked'
    },
    {
      id: 'b8',
      title: 'Veloz',
      description: 'Manteve velocidade média de +25km/h',
      status: 'locked'
    },
    {
      id: 'b9',
      title: 'Consistente',
      description: 'Completou trilhas por 5 semanas seguidas',
      status: 'locked'
    },
    {
      id: 'b10',
      title: 'Desafiador',
      description: 'Completou todas as trilhas difíceis',
      status: 'locked'
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
        
        // Enhanced mock statistics
        setUserStats({
          totalDistance: 457.8,
          totalDuration: 3840, // in minutes
          highestElevation: 1250,
          longestRide: 78.5,
          maxAvgSpeed: 28.3,
          totalRides: 42,
          totalElevationGain: 8750,
          highestHeartRate: 187
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

        {/* Enhanced Stats Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Estatísticas de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Gauge className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Maior Vel. Média</p>
                <p className="text-xl font-bold">{userStats.maxAvgSpeed} km/h</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <MapPin className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Total de Pedais</p>
                <p className="text-xl font-bold">{userStats.totalRides}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <TrendingUp className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Acumul. Subida</p>
                <p className="text-xl font-bold">{userStats.totalElevationGain}m</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center shadow-sm">
                <Flame className="h-6 w-6 text-primary mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Maior FC</p>
                <p className="text-xl font-bold">{userStats.highestHeartRate} bpm</p>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="mt-6 bg-white rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Performance Anual
              </h3>
              <div className="h-64">
                <ChartContainer 
                  config={{
                    distance: {
                      label: "Distância (km)",
                      color: "#2ECC71",
                    },
                    elevation: {
                      label: "Elevação (m)",
                      color: "#E67E22",
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={performanceData}
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                      />
                      <YAxis 
                        yAxisId="left"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm text-xs">
                                <div className="font-medium">{payload[0].payload.month}</div>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="h-2 w-2 rounded-full bg-primary" />
                                  <span>Distância: {payload[0]?.value} km</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-orange-500" />
                                  <span>Elevação: {payload[2]?.value || 0} m</span>
                                </div>
                              </div>
                            )
                          }
                          return null;
                        }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="distance"
                        stroke="#2ECC71"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="elevation"
                        stroke="#E67E22"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Badges Conquistados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-h-[420px] overflow-y-auto p-2">
              {badges.map(badge => (
                <div 
                  key={badge.id} 
                  className={`flex flex-col items-center ${badge.status === 'locked' ? 'opacity-50' : ''}`}
                >
                  <div className={`w-16 h-16 rounded-full ${badge.status === 'earned' ? 'bg-primary/10' : 'bg-gray-200'} flex items-center justify-center mb-2 shadow-sm relative`}>
                    {badge.iconUrl ? (
                      <img src={badge.iconUrl} alt={badge.title} className="w-10 h-10" />
                    ) : (
                      badge.status === 'earned' ? (
                        <Trophy className="w-8 h-8 text-primary" />
                      ) : (
                        <Award className="w-8 h-8 text-gray-400" />
                      )
                    )}
                    {badge.status === 'locked' && (
                      <div className="absolute -bottom-1 -right-1 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </div>
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-center">{badge.title}</h4>
                  <p className="text-xs text-muted-foreground text-center mt-1">{badge.description}</p>
                  {badge.dateEarned && (
                    <p className="text-xs text-primary mt-1">
                      {new Date(badge.dateEarned).toLocaleDateString('pt-BR')}
                    </p>
                  )}
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

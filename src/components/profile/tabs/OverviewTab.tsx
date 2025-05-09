
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Award, Flag, MapPin, Route as RouteIcon, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import StravaConnection from '@/components/profile/StravaConnection';
import HeatmapPlaceholder from '@/components/profile/HeatmapPlaceholder';
import RecentActivitiesList from '@/components/profile/RecentActivitiesList';
import { Activity as ActivityType } from '@/components/app/ActivityFeedItem';
import BadgesPreview from '@/components/profile/BadgesPreview';
import EnhancedMapPlaceholder from '@/components/maps/EnhancedMapPlaceholder';
import { UserBadge } from '@/types/profile';

interface OverviewTabProps {
  isConnectedToStrava: boolean;
  handleStravaConnect: () => void;
  recentActivities: ActivityType[];
  onLike: (activityId: string) => void;
  onComment: (activityId: string) => void;
  badges?: UserBadge[];
  stats?: {
    totalDistance: number;
    weeklyAverage?: number;
    totalRides?: number;
  };
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  isConnectedToStrava,
  handleStravaConnect,
  recentActivities,
  onLike,
  onComment,
  badges = [],
  stats = { totalDistance: 0, weeklyAverage: 0, totalRides: 0 }
}) => {
  return (
    <div className="space-y-6">
      <StravaConnection 
        isConnectedToStrava={isConnectedToStrava}
        handleStravaConnect={handleStravaConnect}
      />
      
      {/* Activity Map & Recent Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enhanced Heat Map */}
        <Card className="overflow-hidden p-4">
          <h3 className="font-medium mb-3">Mapa de Atividades</h3>
          <EnhancedMapPlaceholder 
            type="route" 
            description="Conecte-se ao Strava para sincronizar suas rotas e visualizar seu mapa de calor."
          />
        </Card>
        
        {/* Badges and Achievements */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Conquistas Recentes</h3>
            <Button variant="link" size="sm" className="p-0 h-auto" asChild>
              <Link to="/app/badges">Ver Todas <ArrowUpRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </div>
          {badges.length > 0 ? (
            <BadgesPreview badges={badges.slice(0, 3)} />
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <Award className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <h3 className="font-medium mb-1">Nenhuma conquista ainda</h3>
              <p className="text-sm text-gray-500 mb-3">
                Continue pedalando para desbloquear suas primeiras conquistas!
              </p>
              <Button size="sm" variant="outline">Ver Desafios Ativos</Button>
            </div>
          )}
        </Card>
      </div>
      
      {/* Stats Summary */}
      <Card className="p-4">
        <h3 className="font-medium mb-3">Resumo de Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-md text-center">
            <Route className="mx-auto h-5 w-5 text-primary mb-1" />
            <p className="text-2xl font-bold">{stats.totalDistance} km</p>
            <p className="text-xs text-gray-500">Distância Total</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md text-center">
            <Calendar className="mx-auto h-5 w-5 text-primary mb-1" />
            <p className="text-2xl font-bold">{stats.weeklyAverage} km</p>
            <p className="text-xs text-gray-500">Média Semanal</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md text-center">
            <Flag className="mx-auto h-5 w-5 text-primary mb-1" />
            <p className="text-2xl font-bold">{stats.totalRides}</p>
            <p className="text-xs text-gray-500">Total de Atividades</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md text-center">
            <Activity className="mx-auto h-5 w-5 text-primary mb-1" />
            <p className="text-2xl font-bold">23</p>
            <p className="text-xs text-gray-500">Atividades este Mês</p>
          </div>
        </div>
      </Card>
      
      {/* Recent Activities */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Atividades Recentes</h3>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/app/training/activities">
              Ver todas
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        {recentActivities.length > 0 ? (
          <RecentActivitiesList 
            activities={recentActivities.slice(0, 2)}
            onLike={onLike}
            onComment={onComment}
          />
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-md">
            <RouteIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <h3 className="font-medium mb-1">Nenhuma atividade recente</h3>
            <p className="text-sm text-gray-500 mb-3">
              Conecte seu Strava ou registre manualmente suas primeiras atividades
            </p>
            <div className="flex justify-center gap-2">
              <Button size="sm">Conectar Strava</Button>
              <Button size="sm" variant="outline">Registrar Atividade</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;

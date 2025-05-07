
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { User, MapPin, Calendar, Activity, Clock, TrendingUp, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LeftSidebarProps {
  user: any;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ user }) => {
  // Placeholder data for weekly stats
  const weeklyStats = {
    distance: 45.2,
    rides: 3,
    elevation: 685
  };
  
  // Placeholder data for monthly stats
  const monthlyStats = {
    totalActivities: 12,
    bikeHours: 14.5,
    trailHours: 6.2,
    trainingHours: 3.8
  };

  return (
    <div className="space-y-4 sticky top-4">
      {/* User Profile Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            {user?.avatar_url ? (
              <img 
                src={user.avatar_url} 
                alt={user.name || 'User'}
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <User className="h-10 w-10 text-primary" />
              </div>
            )}
            <h3 className="font-semibold text-lg">{user?.name || 'Ciclista'}</h3>
            <p className="text-sm text-muted-foreground">@{user?.username || 'usuario'}</p>
            
            <div className="w-full mt-4 grid grid-cols-3 divide-x">
              <div className="text-center px-1">
                <p className="font-semibold">{weeklyStats.distance}</p>
                <p className="text-xs text-muted-foreground">km</p>
              </div>
              <div className="text-center px-1">
                <p className="font-semibold">{weeklyStats.rides}</p>
                <p className="text-xs text-muted-foreground">pedais</p>
              </div>
              <div className="text-center px-1">
                <p className="font-semibold">{weeklyStats.elevation}</p>
                <p className="text-xs text-muted-foreground">m elev</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Overview - Strava Style */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm">Últimas 4 semanas</h4>
            <div className="flex items-center text-primary text-xs">
              <Activity className="h-3.5 w-3.5 mr-1" />
              <span>{monthlyStats.totalActivities} atividades</span>
            </div>
          </div>
          
          <div className="space-y-2.5 mb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm">Bike</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{monthlyStats.bikeHours}h</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Trilha</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{monthlyStats.trailHours}h</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-sm">Treino</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{monthlyStats.trainingHours}h</span>
              </div>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <Button variant="link" size="sm" className="p-0 h-auto text-primary" asChild>
              <Link to="/app/statistics" className="flex items-center">
                <BarChart className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">Ver Estatísticas Completas</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Performance Trends Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-sm">Tendências</h4>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Vel. Média</span>
                <span className="text-xs font-medium text-green-500">+4%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Distância</span>
                <span className="text-xs font-medium text-green-500">+12%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h4 className="text-sm font-medium mb-2">Acesso Rápido</h4>
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <Link to="/app/routes/new">
              <MapPin className="mr-2 h-4 w-4" />
              Nova Rota
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
            <Link to="/app/groups">
              <Calendar className="mr-2 h-4 w-4" />
              Agendar Pedal
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftSidebar;

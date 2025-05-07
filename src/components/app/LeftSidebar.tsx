
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { User, MapPin, Calendar } from 'lucide-react';
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

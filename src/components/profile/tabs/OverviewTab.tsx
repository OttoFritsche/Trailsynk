import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Map, Plus, ExternalLink } from 'lucide-react';
import ActivityFeed from '@/components/app/ActivityFeed';

interface OverviewTabProps {
  isConnectedToStrava: boolean;
  handleStravaConnect: () => void;
  recentActivities: any[];
  onLike: (activityId: string) => void;
  onComment: (activityId: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  isConnectedToStrava, 
  handleStravaConnect,
  recentActivities,
  onLike,
  onComment
}) => {
  return (
    <div className="space-y-6">
      {/* Boas-vindas e Conexão Strava */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Bem-vindo(a)!</h2>
          <p className="text-gray-600">
            Explore trilhas, conecte-se com amigos e registre suas aventuras.
          </p>
        </div>

        <div className="p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Conecte-se ao Strava</h2>
          <p className="text-gray-600 mb-4">
            Sincronize suas atividades automaticamente e compartilhe com a comunidade.
          </p>
          {isConnectedToStrava ? (
            <div className="text-green-500 font-medium">
              <ExternalLink className="mr-2 inline-block h-4 w-4 align-middle" />
              Conectado ao Strava!
            </div>
          ) : (
            <Button onClick={handleStravaConnect} variant="outline">
              Conectar ao Strava
            </Button>
          )}
        </div>
      </div>

      {/* Feed de Atividades Recentes */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Atividades Recentes</h2>
          <Link to="/app/activities">
            <Button size="sm" variant="outline">
              Ver Todas
            </Button>
          </Link>
        </div>
        
        <ActivityFeed 
          activities={recentActivities} 
          onLike={onLike}
          onComment={onComment}
        />
      </div>

      {/* Próximos Eventos e Desafios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Próximos Eventos</h2>
          <p className="text-gray-600">
            Descubra eventos de ciclismo e trilhas perto de você.
          </p>
          <Button variant="secondary" asChild>
            <Link to="/app/events">
              <Calendar className="mr-2 h-4 w-4" />
              Explorar Eventos
            </Link>
          </Button>
        </div>

        <div className="p-6 rounded-lg bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Desafios</h2>
          <p className="text-gray-600">
            Participe de desafios e teste seus limites.
          </p>
          <Button variant="secondary" asChild>
            <Link to="/app/challenges">
              <Plus className="mr-2 h-4 w-4" />
              Ver Desafios
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;

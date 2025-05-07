
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, Calendar } from 'lucide-react';
import TrailSuggestions from './TrailSuggestions';

// Mock data for demonstration
const upcomingRides = [
  {
    id: 'ride1',
    title: 'Pedal da Serra',
    date: '12 Jun, 08:30',
    attendees: 8
  },
  {
    id: 'ride2',
    title: 'Circuito Urbano',
    date: '15 Jun, 16:00',
    attendees: 4
  }
];

const myGroups = [
  {
    id: 'group1',
    name: 'MTB Salvador',
    members: 24
  },
  {
    id: 'group2',
    name: 'Ciclistas do Parque',
    members: 12
  },
  {
    id: 'group3',
    name: 'Pedalada Noturna',
    members: 18
  }
];

const currentChallenges = [
  {
    id: 'challenge1',
    name: 'Subidas de Junho',
    progress: 65,
    goal: '3000m'
  },
  {
    id: 'challenge2',
    name: '200km Semanais',
    progress: 30,
    goal: '200km'
  }
];

const RightSidebar: React.FC = () => {
  return (
    <div className="space-y-4 sticky top-4">
      {/* Current Challenges */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium flex items-center">
              <Trophy className="mr-2 h-4 w-4 text-primary" />
              Desafios Ativos
            </h4>
            <Link to="/app/badges" className="text-xs text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          
          <div className="space-y-2">
            {currentChallenges.map(challenge => (
              <div key={challenge.id} className="p-2 bg-gray-50 rounded-md">
                <div className="flex justify-between text-sm">
                  <span>{challenge.name}</span>
                  <span className="font-medium">{challenge.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-1.5 bg-primary rounded-full" 
                    style={{ width: `${challenge.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-right text-muted-foreground mt-1">
                  Meta: {challenge.goal}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Trail Suggestions - New Component */}
      <TrailSuggestions />
      
      {/* My Groups */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium flex items-center">
              <Users className="mr-2 h-4 w-4 text-primary" />
              Meus Grupos
            </h4>
            <Link to="/app/groups" className="text-xs text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          
          <div className="space-y-2">
            {myGroups.map(group => (
              <Link 
                key={group.id} 
                to={`/app/groups/${group.id}`}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-gray-100"
              >
                <span className="text-sm">{group.name}</span>
                <span className="text-xs text-muted-foreground">{group.members} membros</span>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Rides */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              Próximos Pedais
            </h4>
            <Link to="/app" className="text-xs text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          
          {upcomingRides.length > 0 ? (
            <div className="space-y-2">
              {upcomingRides.map(ride => (
                <div key={ride.id} className="flex justify-between p-2 bg-gray-50 rounded-md">
                  <div>
                    <p className="text-sm font-medium">{ride.title}</p>
                    <p className="text-xs text-muted-foreground">{ride.date}</p>
                  </div>
                  <div className="text-xs flex items-center text-muted-foreground">
                    <Users className="h-3 w-3 mr-1" />
                    {ride.attendees}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2">
              Nenhum pedal agendado
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RightSidebar;

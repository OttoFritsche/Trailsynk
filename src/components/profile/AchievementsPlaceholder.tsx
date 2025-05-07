
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

const AchievementsPlaceholder: React.FC = () => {
  // Gere conquistas mock para demonstração
  const achievements = [
    { 
      id: 'a1', 
      title: 'Rei da Montanha', 
      description: 'Maior elevação acumulada em um único mês', 
      date: '15 Mai, 2023',
      background: 'bg-gradient-to-br from-amber-300 to-amber-500'
    },
    { 
      id: 'a2', 
      title: '500km em um mês', 
      description: 'Distância total percorrida em 30 dias', 
      date: '30 Mar, 2023',
      background: 'bg-gradient-to-br from-slate-400 to-slate-600'
    },
    { 
      id: 'a3', 
      title: 'Ciclista Dedicado', 
      description: '30 dias consecutivos pedalando', 
      date: '12 Fev, 2023',
      background: 'bg-gradient-to-br from-amber-700 to-amber-900'
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Conquistas Principais</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map(achievement => (
            <div 
              key={achievement.id} 
              className="flex flex-col items-center p-4 rounded-lg text-center border"
            >
              <div className={`p-4 rounded-full mb-3 ${achievement.background} text-white`}>
                <Trophy className="h-8 w-8" />
              </div>
              <h4 className="font-semibold mb-1">{achievement.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{achievement.date}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsPlaceholder;

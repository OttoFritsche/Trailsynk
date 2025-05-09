
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Calendar, Award, MapPin, Bike } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Challenge {
  id: string;
  title: string;
  type: 'distance' | 'elevation' | 'consistency' | 'speed' | 'community';
  description: string;
  goal: number;
  unit: string;
  currentProgress: number;
  deadline?: Date;
  badgeImageUrl?: string;
}

interface ChallengesPreviewProps {
  challenges: Challenge[];
  onViewChallenge?: (challengeId: string) => void;
}

const ChallengesPreview: React.FC<ChallengesPreviewProps> = ({
  challenges,
  onViewChallenge = () => console.log("View challenge clicked"),
}) => {
  const getChallengeIcon = (type: Challenge['type']) => {
    switch (type) {
      case 'distance':
        return <Bike className="h-5 w-5 text-blue-500" />;
      case 'elevation':
        return <MapPin className="h-5 w-5 text-purple-500" />;
      case 'consistency':
        return <Calendar className="h-5 w-5 text-green-500" />;
      case 'speed':
        return <Award className="h-5 w-5 text-red-500" />;
      case 'community':
        return <Trophy className="h-5 w-5 text-amber-500" />;
      default:
        return <Trophy className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-primary" />
          Desafios Ativos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {challenges.map((challenge) => {
          const progressPercentage = (challenge.currentProgress / challenge.goal) * 100;
          
          return (
            <div 
              key={challenge.id} 
              className="border rounded-lg p-4 cursor-pointer hover:border-primary/50 hover:bg-gray-50 transition-colors"
              onClick={() => onViewChallenge(challenge.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getChallengeIcon(challenge.type)}
                  <h3 className="text-sm font-medium ml-2">{challenge.title}</h3>
                </div>
                <Badge variant="outline" className="text-xs">
                  {challenge.type === 'distance' ? 'Distância' : 
                   challenge.type === 'elevation' ? 'Elevação' : 
                   challenge.type === 'consistency' ? 'Consistência' : 
                   challenge.type === 'speed' ? 'Velocidade' : 'Comunidade'}
                </Badge>
              </div>
              
              <p className="text-xs text-gray-600 mb-3">{challenge.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{`${challenge.currentProgress} ${challenge.unit}`}</span>
                  <span className="text-primary font-medium">{`${challenge.goal} ${challenge.unit}`}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              {challenge.deadline && (
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Termina em {challenge.deadline.toLocaleDateString('pt-BR')}</span>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ChallengesPreview;

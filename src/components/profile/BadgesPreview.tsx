
import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Trophy, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserBadge } from '@/types/profile';

interface BadgesPreviewProps {
  badges: UserBadge[];
}

const BadgesPreview: React.FC<BadgesPreviewProps> = ({ badges }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Badges Conquistados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {badges.map(badge => (
            <div 
              key={badge.id} 
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 shadow-sm">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-sm font-medium text-center">{badge.title}</h4>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Veja sua coleção completa de badges e desbloqueie mais conquistas.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full flex justify-between">
          <Link to="/app/badges">
            Ver Todos os Badges
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BadgesPreview;

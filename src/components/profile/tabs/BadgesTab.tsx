
import React from 'react';
import { UserBadge } from '@/types/profile';

interface BadgesTabProps {
  badges: UserBadge[];
}

const BadgesTab: React.FC<BadgesTabProps> = ({ badges }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Minhas Conquistas</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div 
            key={badge.id} 
            className={`border rounded-lg p-4 ${badge.status === 'earned' ? 'bg-primary/5 border-primary/20' : 'bg-gray-100 border-gray-200'}`}
          >
            <h3 className="font-medium mb-1">{badge.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{badge.description}</p>
            {badge.status === 'earned' ? (
              <div className="text-xs font-medium text-primary">
                Conquistado em {badge.dateEarned?.toLocaleDateString()}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">Ainda não conquistado</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgesTab;

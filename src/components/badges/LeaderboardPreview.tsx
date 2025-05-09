
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ListOrdered, Medal, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface LeaderboardEntry {
  id: string;
  position: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  value: number;
  unit: string;
  isCurrentUser?: boolean;
}

interface LeaderboardPreviewProps {
  title: string;
  entries: LeaderboardEntry[];
  onViewFullLeaderboard?: () => void;
}

const LeaderboardPreview: React.FC<LeaderboardPreviewProps> = ({
  title,
  entries,
  onViewFullLeaderboard = () => console.log("View full leaderboard clicked"),
}) => {
  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Medal className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return null;
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <ListOrdered className="h-5 w-5 mr-2 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {entries.map((entry) => (
            <div 
              key={entry.id}
              className={`flex items-center p-3 ${entry.isCurrentUser ? 'bg-primary/5' : ''}`}
            >
              <div className="w-8 flex items-center justify-center">
                {getPositionIcon(entry.position) || (
                  <span className="text-sm font-medium text-gray-500">{entry.position}</span>
                )}
              </div>
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={entry.userAvatar} alt={entry.userName} />
                <AvatarFallback>{entry.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <span className={`text-sm font-medium ${entry.isCurrentUser ? 'text-primary' : ''}`}>
                  {entry.userName}
                </span>
              </div>
              <div className="text-sm font-bold">
                {entry.value} <span className="text-xs font-normal text-gray-500">{entry.unit}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full" 
            onClick={onViewFullLeaderboard}
          >
            <Users className="h-4 w-4 mr-2" />
            Ver Leaderboard Completo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardPreview;

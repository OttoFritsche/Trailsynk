
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Activity, Calendar, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActivitySummaryCardProps {
  id: string;
  title: string;
  date: string;
  distance: number; // in km
  duration: number; // in minutes
  elevation: number; // in meters
  type: 'ride' | 'run' | 'hike' | 'other';
  aiInsight?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const ActivitySummaryCard: React.FC<ActivitySummaryCardProps> = ({
  id,
  title,
  date,
  distance,
  duration,
  elevation,
  type,
  aiInsight,
  intensity = 'medium',
}) => {
  // Format duration to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  // Get intensity color
  const getIntensityColor = () => {
    switch (intensity) {
      case 'low': return 'bg-blue-100 text-blue-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  // Get icon by activity type
  const getActivityIcon = () => {
    switch (type) {
      case 'run': return <Activity className="h-4 w-4" />;
      case 'hike': return <TrendingUp className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />; // Default to ride icon
    }
  };

  return (
    <Link to={`/app/activity/${id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-full ${getIntensityColor()}`}>
              {getActivityIcon()}
            </span>
            <h3 className="font-medium text-base">{title}</h3>
          </div>
          <div className="text-xs text-muted-foreground flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            {date}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">Distância</span>
              <span className="font-medium">{distance} km</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">Duração</span>
              <span className="font-medium">{formatDuration(duration)}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-muted-foreground">Elevação</span>
              <span className="font-medium">{elevation} m</span>
            </div>
          </div>
          
          {aiInsight && (
            <div className="bg-primary/10 rounded p-2 text-sm flex items-start">
              <div className="text-primary mr-2 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
              </div>
              <p className="text-xs">{aiInsight}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ActivitySummaryCard;

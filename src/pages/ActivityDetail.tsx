import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import ActivityDetailHeader from '@/components/activities/ActivityDetailHeader';
import ActivityDetailMetrics from '@/components/activities/ActivityDetailMetrics';
import ActivityDetailActions from '@/components/activities/ActivityDetailActions';
import ActivityPerformanceChart from '@/components/activities/ActivityPerformanceChart';
import ActivityComments from '@/components/activities/ActivityComments';
import ReportRouteConditionModal from '@/components/activity/ReportRouteConditionModal';
import { AlertCircle } from 'lucide-react';

const mockActivity = {
  id: '1',
  title: 'Morning Ride on Mountain View Trail',
  date: '10 May 2023',
  time: '06:45',
  distance: 24.8,
  duration: 95,
  elevation: 520,
  speed: 15.6,
  heartRate: 142,
  cadence: 89,
  power: 210,
  kudos: 18,
  comments: 4,
  image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c',
  description: 'Great morning ride through the Mountain View trail. Weather was perfect, trails were dry.'
};

const mockComments = [
  {
    id: '1',
    author: 'Jane Smith',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    content: 'Impressive ride! How was that new trail section?',
    date: '10 May 2023 • 10:15',
  },
  {
    id: '2',
    author: 'Mike Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
    content: 'Nice pace! Let\'s ride together next weekend.',
    date: '10 May 2023 • 11:30',
  },
];

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  // In a real app, this would fetch the activity by id
  const activity = mockActivity;
  
  if (!activity) {
    return <div className="container py-10">Activity not found</div>;
  }

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <ActivityDetailHeader
        title={activity.title}
        date={activity.date}
        time={activity.time}
        description={activity.description}
        image={activity.image}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActivityDetailMetrics 
          distance={activity.distance}
          duration={activity.duration}
          elevation={activity.elevation}
          speed={activity.speed}
          heartRate={activity.heartRate}
          cadence={activity.cadence}
          power={activity.power}
        />

        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Ações</h2>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => setIsReportModalOpen(true)}
            >
              <AlertCircle className="h-4 w-4" />
              Reportar Condição
            </Button>
          </div>
          
          <ActivityDetailActions 
            kudosCount={activity.kudos} 
            commentsCount={activity.comments}
            onKudos={() => console.log('Kudos clicked')}
            onShare={() => console.log('Share clicked')}
          />
        </div>
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-3">Performance</h2>
        <ActivityPerformanceChart 
          distance={[/* mock distance time series data */]}
          speed={[/* mock speed time series data */]}
          heartRate={[/* mock heart rate time series data */]}
          elevation={[/* mock elevation time series data */]}
        />
      </Card>

      <ActivityComments comments={mockComments} />
      
      {/* Route Condition Reporting Modal */}
      <ReportRouteConditionModal
        open={isReportModalOpen}
        onOpenChange={setIsReportModalOpen}
      />
    </div>
  );
};

export default ActivityDetail;


import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { ActivityDetailHeader } from '@/components/activities/ActivityDetailHeader';
import { ActivityDetailMetrics } from '@/components/activities/ActivityDetailMetrics';
import { ActivityDetailActions } from '@/components/activities/ActivityDetailActions';
import { ActivityPerformanceChart } from '@/components/activities/ActivityPerformanceChart';
import { ActivityComments } from '@/components/activities/ActivityComments';
import ReportRouteConditionModal from '@/components/activity/ReportRouteConditionModal';
import { AlertCircle } from 'lucide-react';

const mockActivity = {
  id: '1',
  title: 'Morning Ride on Mountain View Trail',
  date: new Date('2023-05-10T06:45:00'),
  time: '06:45',
  distance: 24.8,
  duration: 5700, // in seconds (95 minutes)
  elevation: 520,
  metrics: {
    avgSpeed: 15.6,
    maxSpeed: 28.3,
    avgHeartRate: 142,
    avgCadence: 89,
    calories: 850
  },
  kudos: 18,
  comments: 4,
  image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c',
  description: 'Great morning ride through the Mountain View trail. Weather was perfect, trails were dry.'
};

const mockComments = [
  {
    id: '1',
    userId: 'user123',
    userName: 'Jane Smith',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    text: 'Impressive ride! How was that new trail section?',
    createdAt: new Date('2023-05-10T10:15:00'),
  },
  {
    id: '2',
    userId: 'user456',
    userName: 'Mike Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
    text: 'Nice pace! Let\'s ride together next weekend.',
    createdAt: new Date('2023-05-10T11:30:00'),
  },
];

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  
  // In a real app, this would fetch the activity by id
  const activity = mockActivity;
  
  if (!activity) {
    return <div className="container py-10">Activity not found</div>;
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Comment submitted:', newComment);
    setNewComment('');
  };

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <ActivityDetailHeader
        name={activity.title}
        date={activity.date}
        userName="Your Name"
        userAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActivityDetailMetrics 
          duration={activity.duration}
          distance={activity.distance}
          elevation={activity.elevation}
          metrics={activity.metrics}
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
            onLikeClick={() => console.log('Like clicked')}
            onShareClick={() => console.log('Share clicked')}
            onViewRouteClick={() => console.log('View route clicked')}
            isLiked={false}
            hasOriginalRoute={true}
          />
        </div>
      </div>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-3">Performance</h2>
        <ActivityPerformanceChart />
      </Card>

      <ActivityComments 
        comments={mockComments}
        newComment={newComment}
        setNewComment={setNewComment}
        onSubmitComment={handleSubmitComment}
      />
      
      {/* Route Condition Reporting Modal */}
      <ReportRouteConditionModal
        open={isReportModalOpen}
        onOpenChange={setIsReportModalOpen}
      />
    </div>
  );
};

export default ActivityDetail;

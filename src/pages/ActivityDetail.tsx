
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronLeft, Calendar, Clock, TrendingUp, Share2, Route, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import RouteMap from '@/components/app/RouteMap';
import { ActivityDetailHeader } from '@/components/activities/ActivityDetailHeader';
import { ActivityDetailMetrics } from '@/components/activities/ActivityDetailMetrics';
import { ActivityDetailActions } from '@/components/activities/ActivityDetailActions';
import { ActivityComments } from '@/components/activities/ActivityComments';
import { ActivityPerformanceChart } from '@/components/activities/ActivityPerformanceChart';

// Interface para os detalhes da atividade
interface ActivityDetails {
  id: string;
  name: string;
  date: Date;
  duration: number; // em segundos
  distance: number; // em km
  elevation: number; // em metros
  routeId?: string;
  routeName?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  likes: number;
  comments: Array<{
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    text: string;
    createdAt: Date;
  }>;
  metrics: {
    avgSpeed: number; // km/h
    maxSpeed: number; // km/h
    avgCadence?: number; // rpm
    avgHeartRate?: number; // bpm
    calories?: number;
  };
  performanceData?: any; // para gráficos
}

// Mock para dados da atividade (deverão vir do backend posteriormente)
const mockActivityDetails: ActivityDetails = {
  id: '1',
  name: 'Pedal Matinal na Orla',
  date: new Date(2023, 6, 25, 8, 30),
  duration: 5400, // 1h30min
  distance: 32.5,
  elevation: 320,
  routeId: '2',
  routeName: 'Rota Litoral Norte',
  userId: 'user456',
  userName: 'Marina Costa',
  userAvatar: '',
  likes: 8,
  comments: [
    {
      id: 'comment1',
      userId: 'user123',
      userName: 'Carlos Oliveira',
      userAvatar: '',
      text: 'Ótimo pedal! Como estavam as condições da estrada?',
      createdAt: new Date(2023, 6, 25, 12, 15)
    },
    {
      id: 'comment2',
      userId: 'user789',
      userName: 'Julia Santos',
      userAvatar: '',
      text: 'Impressionante a sua média de velocidade nesta elevação!',
      createdAt: new Date(2023, 6, 25, 14, 30)
    }
  ],
  metrics: {
    avgSpeed: 21.6,
    maxSpeed: 42.3,
    avgCadence: 86,
    avgHeartRate: 142,
    calories: 850
  }
};

const ActivityDetail: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activityDetails, setActivityDetails] = useState<ActivityDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    const loadActivityDetails = async () => {
      setLoading(true);
      try {
        // Na implementação real, isso buscaria dados da API/Supabase
        // const response = await fetchActivityDetails(activityId);
        // setActivityDetails(response);
        
        // Usando dados mock por enquanto
        setTimeout(() => {
          setActivityDetails(mockActivityDetails);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar detalhes da atividade:', error);
        toast.error('Não foi possível carregar os detalhes da atividade');
        setLoading(false);
      }
    };

    if (activityId) {
      loadActivityDetails();
    }
  }, [activityId]);

  const handleBack = () => {
    navigate('/app'); // Voltar para o feed
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Aqui implementaria a lógica real de curtir/descurtir uma atividade
  };

  const handleShareActivity = () => {
    toast.info('Funcionalidade "Compartilhar" será implementada em breve');
  };

  const handleViewOriginalRoute = () => {
    if (activityDetails?.routeId) {
      navigate(`/app/routes/${activityDetails.routeId}`);
    } else {
      toast.info('Esta atividade não está associada a uma rota salva');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    // Aqui implementaria a lógica real de adicionar um comentário
    toast.success('Comentário adicionado com sucesso!');
    setNewComment('');
    
    // Atualização visual temporária dos comentários
    if (activityDetails) {
      const updatedDetails = { ...activityDetails };
      updatedDetails.comments = [
        ...updatedDetails.comments,
        {
          id: `temp-${Date.now()}`,
          userId: user?.id || 'current-user',
          userName: user?.user_metadata?.name || 'Você',
          userAvatar: user?.user_metadata?.avatar_url || '',
          text: newComment,
          createdAt: new Date()
        }
      ];
      setActivityDetails(updatedDetails);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          className="mb-4"
          size="sm"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Feed
        </Button>
        <Skeleton className="h-[70px] w-full rounded-md" />
        <Skeleton className="h-[300px] w-full rounded-md" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-20 rounded-md" />
          <Skeleton className="h-20 rounded-md" />
          <Skeleton className="h-20 rounded-md" />
          <Skeleton className="h-20 rounded-md" />
        </div>
        <Skeleton className="h-[200px] w-full rounded-md" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>
    );
  }

  if (!activityDetails) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-2">Atividade não encontrada</h2>
        <p className="text-muted-foreground mb-4">A atividade solicitada não existe ou foi removida.</p>
        <Button onClick={handleBack}>Voltar para Feed</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{activityDetails.name} | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        {/* Botão Voltar */}
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          className="mb-4 px-2"
          size="sm"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Feed
        </Button>

        {/* Cabeçalho da atividade */}
        <ActivityDetailHeader 
          name={activityDetails.name}
          date={activityDetails.date}
          userName={activityDetails.userName}
          userAvatar={activityDetails.userAvatar}
        />

        {/* Mapa da atividade */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <RouteMap routeId={activityId} className="h-[350px] w-full" />
        </div>

        {/* Métricas principais */}
        <ActivityDetailMetrics 
          duration={activityDetails.duration}
          distance={activityDetails.distance}
          elevation={activityDetails.elevation}
          metrics={activityDetails.metrics}
        />
        
        {/* Gráficos de performance */}
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Desempenho</h3>
          <ActivityPerformanceChart />
        </div>

        {/* Botões de ação */}
        <ActivityDetailActions
          onLikeClick={handleLike} 
          onShareClick={handleShareActivity}
          onViewRouteClick={handleViewOriginalRoute}
          isLiked={isLiked}
          hasOriginalRoute={!!activityDetails.routeId}
        />

        {/* Comentários */}
        <ActivityComments 
          comments={activityDetails.comments}
          newComment={newComment}
          setNewComment={setNewComment}
          onSubmitComment={handleCommentSubmit}
        />
      </div>
    </>
  );
};

export default ActivityDetail;

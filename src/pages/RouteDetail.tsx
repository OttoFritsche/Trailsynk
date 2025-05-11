
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ChevronLeft, MapPin, Calendar, Share2, Heart, Save, Route as RouteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import RouteMap from '@/components/app/RouteMap';
import { RouteDetailHeader } from '@/components/routes/RouteDetailHeader';
import { RouteDetailMetrics } from '@/components/routes/RouteDetailMetrics';
import { RouteDetailActions } from '@/components/routes/RouteDetailActions';
import { RouteDetailCreator } from '@/components/routes/RouteDetailCreator';

// Interface para os detalhes da rota
interface RouteDetails {
  id: string;
  name: string;
  description: string;
  distance: number;
  elevation: number;
  type: 'estrada' | 'mountain' | 'gravel' | 'urbano';
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  createdAt: Date;
  isOwner?: boolean;
  isFavorite?: boolean;
}

// Mock para dados da rota (deverão vir do backend posteriormente)
const mockRouteDetails: RouteDetails = {
  id: '1',
  name: 'Trilha do Mirante',
  description: 'Uma rota desafiadora com vistas espetaculares dos mirantes da cidade. Perfeita para mountain bike e com pontos de parada para fotos e descanso.',
  distance: 24.5,
  elevation: 650,
  type: 'mountain',
  creatorId: 'user123',
  creatorName: 'Carlos Oliveira',
  creatorAvatar: '',
  createdAt: new Date(2023, 5, 15),
  isOwner: false,
  isFavorite: true
};

const RouteDetail: React.FC = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const loadRouteDetails = async () => {
      setLoading(true);
      try {
        // Na implementação real, isso buscaria dados da API/Supabase
        // const response = await fetchRouteDetails(routeId);
        // setRouteDetails(response);
        
        // Usando dados mock por enquanto
        setTimeout(() => {
          setRouteDetails(mockRouteDetails);
          setIsFavorite(mockRouteDetails.isFavorite || false);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erro ao carregar detalhes da rota:', error);
        toast.error('Não foi possível carregar os detalhes da rota');
        setLoading(false);
      }
    };

    if (routeId) {
      loadRouteDetails();
    }
  }, [routeId]);

  const handleBack = () => {
    navigate('/app/routes');
  };

  const handleSaveRoute = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite 
      ? 'Rota removida dos favoritos' 
      : 'Rota salva nos favoritos');
  };

  const handleRideThisRoute = () => {
    toast.info('Funcionalidade "Pedalar Esta Rota" será implementada em breve');
    // Aqui o app poderá iniciar um novo pedal usando esta rota
  };

  const handleShareRoute = () => {
    toast.info('Funcionalidade "Compartilhar" será implementada em breve');
    // Aqui o app poderá compartilhar a rota com outros usuários
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
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Rotas
        </Button>
        <Skeleton className="h-[70px] w-full rounded-md" />
        <Skeleton className="h-[300px] w-full rounded-md" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-20 rounded-md" />
          <Skeleton className="h-20 rounded-md" />
          <Skeleton className="h-20 rounded-md" />
        </div>
        <Skeleton className="h-24 w-full rounded-md" />
      </div>
    );
  }

  if (!routeDetails) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-2">Rota não encontrada</h2>
        <p className="text-muted-foreground mb-4">A rota solicitada não existe ou foi removida.</p>
        <Button onClick={handleBack}>Voltar para Rotas</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{routeDetails.name} | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        {/* Botão Voltar */}
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          className="mb-4 px-2"
          size="sm"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Rotas
        </Button>

        {/* Cabeçalho da rota */}
        <RouteDetailHeader 
          name={routeDetails.name}
          type={routeDetails.type}
          createdAt={routeDetails.createdAt}
        />

        {/* Mapa da rota */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <RouteMap routeId={routeId} className="h-[350px] w-full" />
        </div>

        {/* Métricas da rota */}
        <RouteDetailMetrics 
          distance={routeDetails.distance}
          elevation={routeDetails.elevation}
          type={routeDetails.type}
        />

        {/* Botões de ação */}
        <RouteDetailActions
          onRideClick={handleRideThisRoute}
          onSaveClick={handleSaveRoute}
          onShareClick={handleShareRoute}
          isFavorite={isFavorite}
        />

        {/* Descrição */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="font-medium mb-2">Descrição</h3>
          <p className="text-sm text-muted-foreground">{routeDetails.description}</p>
        </div>

        {/* Informações do criador */}
        <RouteDetailCreator
          creatorName={routeDetails.creatorName}
          creatorAvatar={routeDetails.creatorAvatar}
          creatorId={routeDetails.creatorId}
        />
      </div>
    </>
  );
};

export default RouteDetail;

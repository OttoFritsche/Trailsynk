
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Map, 
  Wrench, 
  Zap, 
  BarChart4, 
  Heart, 
  Maximize, 
  ArrowRight 
} from 'lucide-react';

export type InsightType = 
  'performance' | 'route' | 'maintenance' | 'recovery' | 
  'progress' | 'challenge' | 'info' | 'warning' | 'success';

interface AIInsightCardProps {
  type: InsightType;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  metric?: {
    value: number | string;
    label: string;
    trend?: 'up' | 'down' | 'stable';
    unit?: string;
  };
  imageUrl?: string;
}

const AIInsightCard: React.FC<AIInsightCardProps> = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
  metric,
  imageUrl
}) => {
  // Helper functions to determine styling and icons based on the insight type
  const getIcon = () => {
    switch (type) {
      case 'performance':
        return <BarChart4 className="h-5 w-5 text-blue-600" />;
      case 'route':
        return <Map className="h-5 w-5 text-green-600" />;
      case 'maintenance':
        return <Wrench className="h-5 w-5 text-amber-600" />;
      case 'recovery':
        return <Heart className="h-5 w-5 text-red-600" />;
      case 'progress':
        return <Activity className="h-5 w-5 text-indigo-600" />;
      case 'challenge':
        return <Maximize className="h-5 w-5 text-purple-600" />;
      case 'info':
        return <Zap className="h-5 w-5 text-blue-600" />;
      case 'warning':
        return <Wrench className="h-5 w-5 text-amber-600" />;
      case 'success':
        return <Activity className="h-5 w-5 text-green-600" />;
      default:
        return <Zap className="h-5 w-5 text-primary" />;
    }
  };

  const getBackground = () => {
    switch (type) {
      case 'performance':
        return 'bg-blue-50';
      case 'route':
        return 'bg-green-50';
      case 'maintenance':
        return 'bg-amber-50';
      case 'recovery':
        return 'bg-red-50';
      case 'progress':
        return 'bg-indigo-50';
      case 'challenge':
        return 'bg-purple-50';
      case 'info':
        return 'bg-blue-50';
      case 'warning':
        return 'bg-amber-50';
      case 'success':
        return 'bg-green-50';
      default:
        return 'bg-primary/5';
    }
  };

  const getBorder = () => {
    switch (type) {
      case 'performance':
        return 'border-blue-100';
      case 'route':
        return 'border-green-100';
      case 'maintenance':
        return 'border-amber-100';
      case 'recovery':
        return 'border-red-100';
      case 'progress':
        return 'border-indigo-100';
      case 'challenge':
        return 'border-purple-100';
      case 'info':
        return 'border-blue-100';
      case 'warning':
        return 'border-amber-100';
      case 'success':
        return 'border-green-100';
      default:
        return 'border-primary/10';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'performance':
        return 'Insight de Performance';
      case 'route':
        return 'Sugestão de Rota';
      case 'maintenance':
        return 'Alerta de Manutenção';
      case 'recovery':
        return 'Dica de Recuperação';
      case 'progress':
        return 'Progresso Detectado';
      case 'challenge':
        return 'Desafio Personalizado';
      case 'info':
        return 'Informação';
      case 'warning':
        return 'Aviso';
      case 'success':
        return 'Sucesso';
      default:
        return 'Insight TrailSynk AI';
    }
  };

  return (
    <Card className={`overflow-hidden border ${getBorder()}`}>
      <div className={`p-4 flex items-center gap-3 border-b ${getBorder()} ${getBackground()}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white`}>
          {getIcon()}
        </div>
        <div>
          <h4 className="font-medium">{getTitle()}</h4>
          <p className="text-xs text-gray-500">Gerado pela IA do TrailSynk</p>
        </div>
      </div>
      
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h3 className="font-medium text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm mb-4">{description}</p>
              
              <Button 
                onClick={onAction}
                variant="outline"
                className="w-full md:w-auto flex items-center gap-2"
              >
                {actionLabel}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            {(metric || imageUrl) && (
              <div className="flex-shrink-0 w-full md:w-48">
                {imageUrl ? (
                  <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt="Insight visualization" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : metric ? (
                  <div className={`p-4 rounded-md ${getBackground()} text-center h-full flex flex-col justify-center`}>
                    <span className="text-3xl font-bold">
                      {metric.value}
                      {metric.unit && <span className="text-sm ml-1">{metric.unit}</span>}
                    </span>
                    <span className="text-sm text-gray-600 mt-1">{metric.label}</span>
                    
                    {metric.trend && (
                      <div className={`flex items-center justify-center gap-1 mt-2 text-xs 
                        ${metric.trend === 'up' ? 'text-green-600' : 
                          metric.trend === 'down' ? 'text-red-600' : 
                          'text-gray-600'}`}
                      >
                        {metric.trend === 'up' && '▲'}
                        {metric.trend === 'down' && '▼'}
                        {metric.trend === 'stable' && '■'}
                        
                        <span>
                          {metric.trend === 'up' ? 'Aumentando' : 
                           metric.trend === 'down' ? 'Diminuindo' : 
                           'Estável'}
                        </span>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightCard;
export type { AIInsightCardProps };

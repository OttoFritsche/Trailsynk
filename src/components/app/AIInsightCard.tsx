
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Route, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Tipos de insights que a IA pode fornecer
export type AIInsightType = 'performance' | 'route' | 'maintenance';

interface AIInsightCardProps {
  type: AIInsightType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const AIInsightCard: React.FC<AIInsightCardProps> = ({
  type,
  title,
  description,
  actionLabel,
  onAction
}) => {
  // Configurações baseadas no tipo de insight
  const getInsightConfig = () => {
    switch (type) {
      case 'performance':
        return {
          icon: <Lightbulb className="h-5 w-5" />,
          bgColor: 'bg-indigo-50',
          borderColor: 'border-indigo-200',
          iconBg: 'bg-indigo-100',
          iconColor: 'text-indigo-600',
          buttonVariant: 'outline' as const,
          buttonColor: 'text-indigo-600 border-indigo-300 hover:bg-indigo-50',
        };
      case 'route':
        return {
          icon: <Route className="h-5 w-5" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          buttonVariant: 'outline' as const,
          buttonColor: 'text-green-600 border-green-300 hover:bg-green-50',
        };
      case 'maintenance':
        return {
          icon: <Wrench className="h-5 w-5" />,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-600',
          buttonVariant: 'outline' as const,
          buttonColor: 'text-amber-600 border-amber-300 hover:bg-amber-50',
        };
      default:
        return {
          icon: <Lightbulb className="h-5 w-5" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          buttonVariant: 'default' as const,
          buttonColor: '',
        };
    }
  };

  const config = getInsightConfig();

  return (
    <Card className={`overflow-hidden border ${config.borderColor} ${config.bgColor} mb-6`}>
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className={`flex-shrink-0 rounded-full p-2 ${config.iconBg} ${config.iconColor} mr-3`}>
            {config.icon}
          </div>
          <div className="flex-grow">
            <div className="flex items-center mb-1">
              <h4 className="font-medium text-base">Assessor IA</h4>
            </div>
            <h3 className="font-semibold text-base mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            
            {actionLabel && onAction && (
              <Button 
                variant={config.buttonVariant}
                size="sm"
                className={config.buttonColor}
                onClick={onAction}
              >
                {actionLabel}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightCard;

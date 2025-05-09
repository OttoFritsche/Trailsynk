
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, AlertCircle, Calendar, CheckCircle } from 'lucide-react';

interface MaintenanceSuggestion {
  id: string;
  bikeId: string;
  bikeName: string;
  type: 'routine' | 'urgent' | 'upcoming';
  message: string;
  suggestedDate?: Date;
}

interface MaintenanceSuggestionCardProps {
  suggestions: MaintenanceSuggestion[];
  onViewDetails?: (suggestionId: string) => void;
  onMarkComplete?: (suggestionId: string) => void;
}

const MaintenanceSuggestionCard: React.FC<MaintenanceSuggestionCardProps> = ({
  suggestions,
  onViewDetails = () => console.log("View details clicked"),
  onMarkComplete = () => console.log("Mark complete clicked"),
}) => {
  const getIconForType = (type: MaintenanceSuggestion['type']) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'upcoming':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      default:
        return <Wrench className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Wrench className="h-5 w-5 mr-2 text-primary" />
          Manutenção Sugerida (IA)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className={`p-3 rounded-lg border flex flex-col space-y-2 ${
                suggestion.type === 'urgent' 
                  ? 'bg-red-50 border-red-200' 
                  : suggestion.type === 'upcoming' 
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getIconForType(suggestion.type)}
                  <span className="font-medium">{suggestion.bikeName}</span>
                </div>
                {suggestion.suggestedDate && (
                  <span className="text-xs text-gray-500">
                    {suggestion.suggestedDate.toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700">{suggestion.message}</p>
              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onMarkComplete(suggestion.id)}
                  className="text-xs h-8"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Marcar Concluído
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewDetails(suggestion.id)}
                  className="text-xs h-8"
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>Nenhuma sugestão de manutenção no momento.</p>
          </div>
        )}
        
        <div className="text-center pt-2">
          <Button variant="ghost" size="sm" className="w-full">
            Ver Histórico de Manutenção
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceSuggestionCard;


import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Beef, Coffee, Utensils, Clock, Trash2, Award } from 'lucide-react';
import { NutritionSuggestion } from '@/types/nutrition';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { nutritionService } from '@/services/nutritionService';
import { toast } from 'sonner';

interface NutritionSuggestionCardProps {
  suggestion: NutritionSuggestion;
  onDelete?: () => void;
}

const NutritionSuggestionCard: React.FC<NutritionSuggestionCardProps> = ({
  suggestion,
  onDelete
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir esta sugestão?')) {
      setIsDeleting(true);
      try {
        const success = await nutritionService.deleteNutritionSuggestion(suggestion.id);
        if (success && onDelete) {
          onDelete();
        }
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getTypeIcon = () => {
    switch (suggestion.type) {
      case 'pre_treino':
        return <Coffee className="h-5 w-5 text-blue-500" />;
      case 'durante_treino':
        return <Award className="h-5 w-5 text-green-500" />;
      case 'pos_treino':
        return <Beef className="h-5 w-5 text-red-500" />;
      case 'diario':
        return <Utensils className="h-5 w-5 text-purple-500" />;
      default:
        return <Utensils className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeLabel = () => {
    switch (suggestion.type) {
      case 'pre_treino':
        return 'Pré-Treino';
      case 'durante_treino':
        return 'Durante Treino';
      case 'pos_treino':
        return 'Pós-Treino';
      case 'diario':
        return 'Alimentação Diária';
      default:
        return 'Sugestão';
    }
  };
  
  const formattedDate = suggestion.recommended_at ? 
    format(new Date(suggestion.recommended_at), "PP 'às' p", { locale: ptBR }) : 
    'Data não disponível';

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getTypeIcon()}
            <CardTitle className="text-lg font-semibold">{getTypeLabel()}</CardTitle>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3 w-3 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm whitespace-pre-line">{suggestion.description}</p>
        
        {(suggestion.calories || suggestion.proteins || suggestion.carbs || suggestion.fats) && (
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            {suggestion.calories && (
              <div className="bg-gray-50 p-2 rounded-md">
                <div className="text-sm font-semibold">{suggestion.calories}</div>
                <div className="text-xs text-gray-500">kcal</div>
              </div>
            )}
            {suggestion.proteins && (
              <div className="bg-red-50 p-2 rounded-md">
                <div className="text-sm font-semibold">{suggestion.proteins}g</div>
                <div className="text-xs text-gray-500">Proteínas</div>
              </div>
            )}
            {suggestion.carbs && (
              <div className="bg-yellow-50 p-2 rounded-md">
                <div className="text-sm font-semibold">{suggestion.carbs}g</div>
                <div className="text-xs text-gray-500">Carboidratos</div>
              </div>
            )}
            {suggestion.fats && (
              <div className="bg-blue-50 p-2 rounded-md">
                <div className="text-sm font-semibold">{suggestion.fats}g</div>
                <div className="text-xs text-gray-500">Gorduras</div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50" 
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Remover
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NutritionSuggestionCard;

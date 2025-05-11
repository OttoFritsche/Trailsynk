
import React, { useState, useEffect } from 'react';
import { NutritionSuggestion } from '@/types/nutrition';
import { nutritionService } from '@/services/nutritionService';
import NutritionSuggestionCard from './NutritionSuggestionCard';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { LoaderCircle, RefreshCw } from 'lucide-react';

const NutritionSuggestionList: React.FC = () => {
  const [suggestions, setSuggestions] = useState<NutritionSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await nutritionService.getNutritionSuggestions();
      setSuggestions(data);
    } catch (err) {
      setError('Não foi possível carregar as sugestões nutricionais.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const handleDelete = () => {
    fetchSuggestions();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>{error}</AlertDescription>
        <Button variant="outline" size="sm" onClick={fetchSuggestions} className="mt-2">
          <RefreshCw className="h-4 w-4 mr-1" />
          Tentar novamente
        </Button>
      </Alert>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md bg-gray-50">
        <p className="text-gray-500">Você ainda não tem nenhuma sugestão nutricional.</p>
        <p className="text-gray-500 mt-2">Pergunte ao assistente para receber recomendações personalizadas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <NutritionSuggestionCard
          key={suggestion.id}
          suggestion={suggestion}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default NutritionSuggestionList;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecommendedItem {
  id: string;
  name: string;
  price: number;
  image: string;
  seller: string;
  location: string;
  condition: string;
  reasonForRecommendation: string;
}

interface AIRecommendationsProps {
  recommendations: RecommendedItem[];
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ recommendations }) => {
  return (
    <Card className="border-primary/30 bg-primary/5 mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Lightbulb className="h-5 w-5 mr-2 text-primary" />
          Recomendações de Equipamentos para Você (IA)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommendations.map((item) => (
            <Link 
              key={item.id} 
              to={`/app/marketplace/${item.id}`} 
              className="group"
            >
              <div className="border rounded-lg overflow-hidden bg-white transition-shadow hover:shadow-md h-full flex flex-col">
                <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <Badge
                      variant="outline"
                      className={`${
                        item.condition === 'Novo' 
                          ? 'bg-green-100 border-green-200 text-green-800' 
                          : 'bg-blue-100 border-blue-200 text-blue-800'
                      }`}
                    >
                      {item.condition}
                    </Badge>
                    <Badge
                      className="bg-primary border-primary"
                    >
                      <Lightbulb className="h-3 w-3 mr-1" />
                      Sugestão IA
                    </Badge>
                  </div>
                </div>
                <div className="p-3 flex-grow flex flex-col">
                  <h3 className="font-medium truncate">{item.name}</h3>
                  <p className="text-lg font-semibold text-primary">R$ {item.price.toLocaleString('pt-BR')}</p>
                  <p className="text-xs text-gray-600 mt-1 italic">{item.reasonForRecommendation}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span className="truncate max-w-[60%]">{item.seller}</span>
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;

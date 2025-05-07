
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  User, 
  MapPin, 
  MessageCircle, 
  Heart, 
  Share,
  Phone,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Mock data for marketplace items details
const mockItemDetails = {
  id: '1',
  name: 'Bicicleta Specialized Epic Comp',
  price: 8500,
  condition: 'Usado',
  seller: {
    id: 'user1',
    name: 'João Silva',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80'
  },
  location: 'São Paulo, SP',
  description: 'Bicicleta Specialized Epic Comp Carbon 2020, tamanho M, com apenas 1500km rodados. Suspensão Brain, grupo SRAM GX Eagle 12v, freios Shimano XT, rodas Roval Control. Bike em excelente estado, sem arranhões ou amassados. Acompanha nota fiscal e manual. Aceito pagamento via Pix ou cartão de crédito.',
  category: 'Bicicletas',
  postedDate: '2023-05-15',
  images: [
    'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494951446597-0fd37c9db7fc?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&q=80'
  ],
  specifications: [
    { key: 'Marca', value: 'Specialized' },
    { key: 'Modelo', value: 'Epic Comp' },
    { key: 'Ano', value: '2020' },
    { key: 'Tamanho', value: 'M (17)' },
    { key: 'Material do Quadro', value: 'Carbono' },
    { key: 'Grupo', value: 'SRAM GX Eagle 12v' },
    { key: 'Freios', value: 'Shimano XT hidráulico' }
  ]
};

const MarketplaceItemDetail = () => {
  const { itemId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // In a real app, you would fetch the item details using the itemId
  const item = mockItemDetails;

  if (!item) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Item não encontrado</p>
        <Link to="/app/marketplace" className="text-primary hover:underline">
          Voltar para o Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Link to="/app/marketplace" className="inline-flex items-center text-gray-600 hover:text-primary mb-4">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar para o Marketplace
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Image gallery */}
        <div className="lg:col-span-2">
          <Carousel className="w-full bg-white rounded-lg shadow overflow-hidden">
            <CarouselContent className="-ml-1">
              {item.images.map((image, index) => (
                <CarouselItem key={index} className="pl-1">
                  <div className="p-1">
                    <div className="aspect-video overflow-hidden rounded-md">
                      <img
                        src={image}
                        alt={`${item.name} - Imagem ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          {/* Item description */}
          <Card className="mt-6 p-6">
            <h2 className="text-xl font-semibold mb-2">Descrição</h2>
            <p className="text-gray-700 whitespace-pre-line">{item.description}</p>
            
            <h3 className="text-lg font-semibold mt-6 mb-3">Especificações</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{spec.key}:</span>
                  <span className="text-gray-700">{spec.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column - Item details and actions */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? "text-red-500" : "text-gray-400"}
                >
                  <Heart className="h-5 w-5 fill-current" />
                </Button>
              </div>
              <div className="flex items-center mt-2">
                <Badge variant="secondary" className="mr-2">
                  {item.condition}
                </Badge>
                <Badge variant="outline">{item.category}</Badge>
              </div>
              <p className="text-3xl font-bold text-primary mt-4">
                R$ {item.price.toLocaleString('pt-BR')}
              </p>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center mb-4">
              <MapPin className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-gray-700">{item.location}</span>
            </div>
            
            <div className="flex items-center mb-4">
              <User className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-gray-700">Anunciado em {item.postedDate}</span>
            </div>
            
            <div className="space-y-2">
              <Button className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Enviar Mensagem
              </Button>
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Mostrar Contato
              </Button>
              <Button variant="outline" className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-3">
                <img 
                  src={item.seller.imageUrl} 
                  alt={item.seller.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h3 className="font-semibold">{item.seller.name}</h3>
                <div className="flex items-center text-sm">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span>{item.seller.rating}</span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              Ver Perfil
            </Button>
          </Card>
          
          <Card className="p-6 bg-yellow-50 border-yellow-200">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800">Dicas de Segurança</h3>
                <ul className="mt-2 text-sm space-y-1 text-yellow-800">
                  <li>• Verifique o produto pessoalmente antes de pagar</li>
                  <li>• Encontre em local público e seguro</li>
                  <li>• Nunca envie dinheiro adiantado</li>
                  <li>• Desconfie de preços muito abaixo do mercado</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItemDetail;

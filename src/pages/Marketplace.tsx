
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, PlusCircle, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// Enhanced mock data for marketplace items
const mockItems = [
  {
    id: '1',
    name: 'Bicicleta Specialized Epic Comp',
    price: 8500,
    condition: 'Usado',
    seller: 'João Silva',
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    name: 'Capacete Giro Syntax MIPS',
    price: 450,
    condition: 'Novo',
    seller: 'Maria Torres',
    location: 'Rio de Janeiro, RJ',
    image: 'https://images.unsplash.com/photo-1557687654-eff900306574?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    name: 'Sapatilha MTB Shimano XC50',
    price: 320,
    condition: 'Usado',
    seller: 'Carlos Pereira',
    location: 'Belo Horizonte, MG',
    image: 'https://images.unsplash.com/photo-1605034493903-10ae5549989a?auto=format&fit=crop&q=80'
  },
  {
    id: '4',
    name: 'Bomba de Pneu Alta Pressão',
    price: 85,
    condition: 'Novo',
    seller: 'Ana Santos',
    location: 'Curitiba, PR',
    image: 'https://images.unsplash.com/photo-1526824867479-c89522f5562f?auto=format&fit=crop&q=80'
  },
  {
    id: '5',
    name: 'Camisa Ciclismo Manga Longa',
    price: 110,
    condition: 'Novo',
    seller: 'Pedro Costa',
    location: 'Brasília, DF',
    image: 'https://images.unsplash.com/photo-1519758335840-0fe9240da6ce?auto=format&fit=crop&q=80'
  },
  {
    id: '6',
    name: 'Freio a Disco Shimano XT',
    price: 750,
    condition: 'Usado',
    seller: 'Felipe Macedo',
    location: 'Porto Alegre, RS',
    image: 'https://images.unsplash.com/photo-1623825998402-264e326ec807?auto=format&fit=crop&q=80'
  },
  // Adicionados novos itens
  {
    id: '7',
    name: 'Bicicleta Caloi E-Vibe Carbon',
    price: 12800,
    condition: 'Novo',
    seller: 'Roberto Alves',
    location: 'Salvador, BA',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80'
  },
  {
    id: '8',
    name: 'Ciclocomputador Garmin Edge 830',
    price: 1850,
    condition: 'Usado',
    seller: 'Carla Mendes',
    location: 'Fortaleza, CE',
    image: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&q=80'
  },
  {
    id: '9',
    name: 'Bermuda de Ciclismo Assos',
    price: 380,
    condition: 'Novo',
    seller: 'Mariana Lima',
    location: 'Recife, PE',
    image: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?auto=format&fit=crop&q=80'
  },
  {
    id: '10',
    name: 'Suspensão Fox 34 Factory',
    price: 3200,
    condition: 'Usado',
    seller: 'Lucas Oliveira',
    location: 'Belo Horizonte, MG',
    image: 'https://images.unsplash.com/photo-1558864511-d1e20f1602cc?auto=format&fit=crop&q=80'
  },
  {
    id: '11',
    name: 'Kit de Reparo para Tubeless',
    price: 75,
    condition: 'Novo',
    seller: 'Amanda Silva',
    location: 'Curitiba, PR',
    image: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?auto=format&fit=crop&q=80'
  },
  {
    id: '12',
    name: 'Luzes para Bike USB',
    price: 120,
    condition: 'Novo',
    seller: 'Rafael Gomes',
    location: 'Brasília, DF',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80'
  },
  {
    id: '13',
    name: 'Óculos Ciclismo Oakley Sutro',
    price: 650,
    condition: 'Usado',
    seller: 'Juliana Costa',
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80'
  },
  {
    id: '14',
    name: 'Suporte de Bike para Carro',
    price: 420,
    condition: 'Usado',
    seller: 'Marcelo Santos',
    location: 'Rio de Janeiro, RJ',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80'
  }
];

const MarketplaceItem: React.FC<{
  id: string;
  name: string;
  price: number;
  seller: string;
  location: string;
  condition: string;
  image: string;
}> = ({ id, name, price, seller, location, condition, image }) => {
  return (
    <Link to={`/app/marketplace/${id}`} className="group">
      <div className="border rounded-lg overflow-hidden bg-white transition-shadow hover:shadow-md">
        <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-transform group-hover:scale-105" 
          />
          <Badge
            variant="outline"
            className={`absolute top-2 right-2 ${
              condition === 'Novo' 
                ? 'bg-green-100 border-green-200 text-green-800' 
                : 'bg-blue-100 border-blue-200 text-blue-800'
            }`}
          >
            {condition}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-medium truncate">{name}</h3>
          <p className="text-lg font-semibold text-primary">R$ {price.toLocaleString('pt-BR')}</p>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span className="truncate max-w-[60%]">{seller}</span>
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Placeholder component for loading state
const MarketplaceItemSkeleton: React.FC = () => (
  <div className="border rounded-lg overflow-hidden bg-white">
    <Skeleton className="aspect-video w-full" />
    <div className="p-4">
      <Skeleton className="h-5 w-full mb-2" />
      <Skeleton className="h-6 w-24 mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  </div>
);

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [condition, setCondition] = useState('all');
  const [loading, setLoading] = useState(false);

  // Simple filtering based on search term, category, and condition
  const filteredItems = mockItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (condition === 'all' || item.condition === condition)
  );

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-4 md:mb-0">Marketplace TrailSynk</h1>
        <Link to="/app/marketplace/new">
          <Button className="bg-primary hover:bg-primary-dark">
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Anúncio
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar itens..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  <SelectItem value="bikes">Bicicletas</SelectItem>
                  <SelectItem value="components">Componentes</SelectItem>
                  <SelectItem value="accessories">Acessórios</SelectItem>
                  <SelectItem value="clothes">Vestuário</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Qualquer estado</SelectItem>
                  <SelectItem value="Novo">Novo</SelectItem>
                  <SelectItem value="Usado">Usado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <MarketplaceItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MarketplaceItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              seller={item.seller}
              location={item.location}
              condition={item.condition}
              image={item.image}
            />
          ))}
          
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <h3 className="text-lg font-medium">Nenhum item encontrado</h3>
              <p className="text-gray-500 mt-1 mb-4">
                Tente ajustar os filtros ou buscar por termos diferentes
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setCategory('all');
                setCondition('all');
              }}>
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Marketplace;

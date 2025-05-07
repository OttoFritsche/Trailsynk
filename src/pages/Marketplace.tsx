
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, PlusCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Mock data for marketplace items
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
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img 
            src={image} 
            alt={name} 
            className="h-full w-full object-cover transition-transform group-hover:scale-105" 
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium truncate">{name}</h3>
          <p className="text-lg font-semibold text-primary">R$ {price.toLocaleString('pt-BR')}</p>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>{condition}</span>
            <span className="truncate">{location}</span>
          </div>
          <p className="text-sm text-gray-600 truncate mt-1">
            Vendedor: {seller}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  // Simple filtering based on search term and category
  const filteredItems = mockItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          
          <div className="flex items-center gap-4">
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
        </div>
      </div>
      
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
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Nenhum item encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;

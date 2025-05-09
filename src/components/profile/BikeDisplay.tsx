
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bike, Calendar, Tool, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Bicycle {
  id: string;
  brand: string;
  model: string;
  type: string;
  year?: number;
  color?: string;
  weight?: number;
  lastMaintenance?: string;
  maintenanceDue?: boolean;
  imageUrl?: string;
}

interface BikeDisplayProps {
  bikes: Bicycle[];
}

const BikeCard: React.FC<{ bike: Bicycle }> = ({ bike }) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-gray-100 relative">
        {bike.imageUrl ? (
          <img 
            src={bike.imageUrl} 
            alt={`${bike.brand} ${bike.model}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Bike className="h-12 w-12 text-gray-400" />
          </div>
        )}
        
        {bike.maintenanceDue && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle size={14} />
              Manutenção Pendente
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader>
        <CardTitle className="text-lg">
          {bike.brand} {bike.model}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Tipo:</span>
          <Badge variant="secondary">{bike.type}</Badge>
        </div>
        
        {bike.year && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Ano:</span>
            <span>{bike.year}</span>
          </div>
        )}
        
        {bike.color && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Cor:</span>
            <span>{bike.color}</span>
          </div>
        )}
        
        {bike.weight && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Peso:</span>
            <span>{bike.weight} kg</span>
          </div>
        )}
        
        {bike.lastMaintenance && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Última manutenção:</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {bike.lastMaintenance}
            </span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Tool size={16} />
          Gerenciar Manutenção
        </Button>
        <Button variant="secondary" asChild className="w-full">
          <Link to={`/app/bikes/${bike.id}`}>Ver Detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const BikeDisplay: React.FC<BikeDisplayProps> = ({ bikes }) => {
  if (!bikes || bikes.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <Bike className="mx-auto h-12 w-12 text-gray-400 mb-2" />
        <h3 className="font-medium">Nenhuma bicicleta cadastrada</h3>
        <p className="text-muted-foreground mb-4">
          Adicione suas bicicletas para gerenciar manutenções e personalizar suas estatísticas.
        </p>
        <Button>Adicionar Bicicleta</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Minhas Bicicletas</h3>
        <Button size="sm" variant="outline">
          <Bike className="mr-2 h-4 w-4" />
          Adicionar Bicicleta
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {bikes.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>
    </div>
  );
};

export default BikeDisplay;

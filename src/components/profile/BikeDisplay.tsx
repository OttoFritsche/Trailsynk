
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Settings, Tag } from 'lucide-react';
import { Bicycle } from '@/types/profile';

interface BikeDisplayProps {
  bicycle: Bicycle;
  onEdit?: () => void;
  onDelete?: () => void;
  onMaintenanceLog?: () => void;
}

const BikeDisplay: React.FC<BikeDisplayProps> = ({
  bicycle,
  onEdit,
  onDelete,
  onMaintenanceLog,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data desconhecida';
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 bg-gray-100">
        {bicycle.image_url ? (
          <img
            src={bicycle.image_url}
            alt={bicycle.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="5.5" cy="17.5" r="3.5"/>
              <circle cx="18.5" cy="17.5" r="3.5"/>
              <path d="M15 6a1 1 0 100-2 1 1 0 000 2z"/>
              <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
            </svg>
          </div>
        )}
      </div>

      <CardContent className="flex-1 pt-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{bicycle.name}</h3>
        </div>

        <div className="mt-4 space-y-2.5">
          {(bicycle.brand || bicycle.model) && (
            <div className="flex items-center text-sm">
              <Tag className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-600">
                {bicycle.brand} {bicycle.model}
              </span>
            </div>
          )}

          {bicycle.type && (
            <div className="flex items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="5.5" cy="17.5" r="3.5"/>
                <circle cx="18.5" cy="17.5" r="3.5"/>
                <path d="M15 6a1 1 0 100-2 1 1 0 000 2z"/>
                <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
              </svg>
              <span className="text-gray-600">{bicycle.type}</span>
            </div>
          )}

          {bicycle.purchase_date && (
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-600">
                Adquirida em {formatDate(bicycle.purchase_date)}
              </span>
            </div>
          )}

          {bicycle.initial_odometer !== undefined && (
            <div className="flex items-center text-sm">
              <Settings className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-gray-600">
                Odômetro inicial: {bicycle.initial_odometer} km
              </span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex gap-2 justify-end">
        {onMaintenanceLog && (
          <Button variant="outline" size="sm" onClick={onMaintenanceLog}>
            <Settings className="h-4 w-4 mr-2" />
            Manutenção
          </Button>
        )}
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            Editar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BikeDisplay;
export type { BikeDisplayProps };

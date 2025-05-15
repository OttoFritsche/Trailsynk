
import React, { useState } from 'react';
import { Check, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

interface FilterState {
  types: string[];
  distance: [number, number];
  elevation: [number, number];
  timeOfDay: string[];
  difficulty: string[];
}

interface EventFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    distance: [0, 100],
    elevation: [0, 2000],
    timeOfDay: [],
    difficulty: []
  });
  
  const [activeCount, setActiveCount] = useState(0);
  
  const updateFilters = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Count active filters (excluding those with default values)
    let count = 0;
    if (newFilters.types.length > 0) count++;
    if (newFilters.distance[0] > 0 || newFilters.distance[1] < 100) count++;
    if (newFilters.elevation[0] > 0 || newFilters.elevation[1] < 2000) count++;
    if (newFilters.timeOfDay.length > 0) count++;
    if (newFilters.difficulty.length > 0) count++;
    
    setActiveCount(count);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  const toggleArrayItem = (array: string[], item: string): string[] => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };
  
  const resetFilters = () => {
    const defaultFilters: FilterState = {
      types: [],
      distance: [0, 100],
      elevation: [0, 2000],
      timeOfDay: [],
      difficulty: []
    };
    
    setFilters(defaultFilters);
    setActiveCount(0);
    
    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
  };
  
  const FilterBadge = ({ active }: { active: boolean }) => (
    <Badge
      variant="outline"
      className={`rounded-full px-2 py-0.5 text-xs font-normal ${
        active ? 'bg-primary/10 text-primary border-primary/30' : 'bg-transparent'
      }`}
    >
      {activeCount}
    </Badge>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="h-4 w-4 mr-2" />
          <span className="mr-1">Filtros</span>
          {activeCount > 0 && <FilterBadge active={true} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filtros de Eventos</h4>
            <p className="text-sm text-muted-foreground">
              Refine sua busca de eventos com os filtros abaixo
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Tipo de Evento</h4>
            <div className="flex flex-wrap gap-2">
              {['Grupo', 'Competição', 'Aberto'].map(type => (
                <button
                  key={type}
                  onClick={() => updateFilters('types', toggleArrayItem(filters.types, type))}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filters.types.includes(type)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-transparent border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {filters.types.includes(type) && <Check className="h-3 w-3 mr-1 inline" />}
                  {type}
                </button>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">Distância (km)</h4>
              <span className="text-xs text-gray-500">
                {filters.distance[0]} - {filters.distance[1]}km
              </span>
            </div>
            <Slider
              defaultValue={[0, 100]}
              min={0}
              max={100}
              step={5}
              value={filters.distance}
              onValueChange={(value) => updateFilters('distance', value)}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">Elevação (m)</h4>
              <span className="text-xs text-gray-500">
                {filters.elevation[0]} - {filters.elevation[1]}m
              </span>
            </div>
            <Slider
              defaultValue={[0, 2000]}
              min={0}
              max={2000}
              step={100}
              value={filters.elevation}
              onValueChange={(value) => updateFilters('elevation', value)}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Horário</h4>
            <div className="flex flex-wrap gap-2">
              {['Manhã', 'Tarde', 'Noite'].map(time => (
                <button
                  key={time}
                  onClick={() => updateFilters('timeOfDay', toggleArrayItem(filters.timeOfDay, time))}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filters.timeOfDay.includes(time)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-transparent border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {filters.timeOfDay.includes(time) && <Check className="h-3 w-3 mr-1 inline" />}
                  {time}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Dificuldade</h4>
            <div className="flex flex-wrap gap-2">
              {['Iniciante', 'Moderado', 'Avançado', 'Expert'].map(level => (
                <button
                  key={level}
                  onClick={() => updateFilters('difficulty', toggleArrayItem(filters.difficulty, level))}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    filters.difficulty.includes(level)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-transparent border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {filters.difficulty.includes(level) && <Check className="h-3 w-3 mr-1 inline" />}
                  {level}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Limpar filtros
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary-dark">
              Aplicar filtros
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EventFilters;

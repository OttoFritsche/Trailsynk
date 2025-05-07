
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import ActivitySummaryCard from '@/components/training/ActivitySummaryCard';
import { mockActivities } from '@/components/training/mockTrainingData';

const MyActivities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Filter activities based on search, type, and date
  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || activity.type === selectedType;
    const matchesDate = !date || activity.date.includes(format(date, 'dd MMM'));

    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Minhas Atividades</h1>
        <p className="text-muted-foreground">
          Visualize e busque seus treinos e atividades
        </p>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Buscar atividades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex gap-2 w-full md:w-1/2">
              <Select
                value={selectedType}
                onValueChange={setSelectedType}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo de Atividade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="ride">Ciclismo</SelectItem>
                  <SelectItem value="run">Corrida</SelectItem>
                  <SelectItem value="hike">Caminhada</SelectItem>
                  <SelectItem value="other">Outros</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, 'dd/MM/yyyy') : <span>Filtrar por data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                  {date && (
                    <div className="p-3 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDate(undefined)}
                        className="w-full"
                      >
                        Limpar
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {filteredActivities.length} atividades encontradas
            </div>
            <div className="flex gap-2">
              {selectedType !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedType === 'ride' ? 'Ciclismo' : 
                   selectedType === 'run' ? 'Corrida' : 
                   selectedType === 'hike' ? 'Caminhada' : 'Outro'}
                  <button className="ml-1 text-xs" onClick={() => setSelectedType('all')}>✕</button>
                </Badge>
              )}
              
              {date && (
                <Badge variant="secondary" className="gap-1">
                  {format(date, 'dd/MM/yyyy')}
                  <button className="ml-1 text-xs" onClick={() => setDate(undefined)}>✕</button>
                </Badge>
              )}
              
              {(selectedType !== 'all' || date || searchQuery) && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSelectedType('all');
                    setDate(undefined);
                    setSearchQuery('');
                  }}
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <ActivitySummaryCard
              key={activity.id}
              id={activity.id}
              title={activity.title}
              date={activity.date}
              distance={activity.distance}
              duration={activity.duration}
              elevation={activity.elevation}
              type={activity.type}
              intensity={activity.intensity}
              aiInsight={activity.aiInsight}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-8">
            <div className="text-muted-foreground">
              Nenhuma atividade encontrada com os filtros aplicados.
            </div>
            <Button 
              variant="link" 
              onClick={() => {
                setSelectedType('all');
                setDate(undefined);
                setSearchQuery('');
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyActivities;

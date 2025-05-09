
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { useState } from 'react';

interface TrainingFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TrainingFormModal: React.FC<TrainingFormModalProps> = ({
  open,
  onOpenChange
}) => {
  // Form state
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activityType, setActivityType] = useState<string>("ride");
  const [effort, setEffort] = useState<string>("5");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a placeholder for the future implementation
    console.log("Form submitted - will be implemented later");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Registrar Treino Manual</DialogTitle>
            <DialogDescription>
              Preencha os detalhes do seu treino abaixo
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Título</Label>
              <Input
                id="title"
                placeholder="Nome do seu treino"
                className="col-span-3"
                required
              />
            </div>
            
            {/* Activity Type */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="activity-type" className="text-right">Tipo</Label>
              <Select
                value={activityType}
                onValueChange={setActivityType}
              >
                <SelectTrigger id="activity-type" className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo de atividade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ride">Pedal</SelectItem>
                  <SelectItem value="run">Corrida</SelectItem>
                  <SelectItem value="hike">Trilha</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Data</Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'dd/MM/yyyy') : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Time */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">Hora</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  className="w-full"
                  defaultValue="07:00"
                />
              </div>
            </div>
            
            {/* Distance */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="distance" className="text-right">Distância</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="distance"
                  type="number"
                  min="0"
                  step="0.1"
                  className="w-full"
                  placeholder="0"
                />
                <span className="text-sm text-muted-foreground">km</span>
              </div>
            </div>
            
            {/* Duration */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">Duração</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="duration-hours"
                  type="number"
                  min="0"
                  className="w-20"
                  placeholder="0"
                />
                <span className="text-sm text-muted-foreground">h</span>
                <Input
                  id="duration-minutes"
                  type="number"
                  min="0"
                  max="59"
                  className="w-20"
                  placeholder="0"
                />
                <span className="text-sm text-muted-foreground">min</span>
              </div>
            </div>
            
            {/* Elevation */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="elevation" className="text-right">Elevação</Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="elevation"
                  type="number"
                  min="0"
                  className="w-full"
                  placeholder="0"
                />
                <span className="text-sm text-muted-foreground">m</span>
              </div>
            </div>
            
            {/* Perceived Effort */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="effort" className="text-right">Esforço</Label>
              <Select
                value={effort}
                onValueChange={setEffort}
              >
                <SelectTrigger id="effort" className="col-span-3">
                  <SelectValue placeholder="Nível de esforço percebido" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Muito leve</SelectItem>
                  <SelectItem value="2">2 - Leve</SelectItem>
                  <SelectItem value="3">3 - Moderado</SelectItem>
                  <SelectItem value="4">4 - Um pouco difícil</SelectItem>
                  <SelectItem value="5">5 - Difícil</SelectItem>
                  <SelectItem value="6">6 - Mais difícil</SelectItem>
                  <SelectItem value="7">7 - Muito difícil</SelectItem>
                  <SelectItem value="8">8 - Extremamente difícil</SelectItem>
                  <SelectItem value="9">9 - Quase máximo</SelectItem>
                  <SelectItem value="10">10 - Máximo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Description */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Detalhes sobre o treino (opcional)"
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit">Salvar Treino</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TrainingFormModal;

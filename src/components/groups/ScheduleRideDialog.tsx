
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ScheduleRideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: string;
  groupName?: string;
}

export const ScheduleRideDialog: React.FC<ScheduleRideDialogProps> = ({ 
  open, 
  onOpenChange, 
  groupId,
  groupName 
}) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Aqui seria feita a lógica para salvar o pedal agendado
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Agendar Novo Pedal{groupName ? ` para ${groupName}` : ''}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Título do Pedal</Label>
            <Input id="title" placeholder="Ex: Pedal na orla" required />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Local do Ponto de Encontro</Label>
            <Input id="location" placeholder="Ex: Praça do Farol" required />
          </div>
          
          <div className="grid gap-2">
            <Label>Data e Hora</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP 'às' HH:mm", { locale: ptBR }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              placeholder="Detalhes sobre o pedal, tipo de percurso, dificuldade, etc." 
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Agendar Pedal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

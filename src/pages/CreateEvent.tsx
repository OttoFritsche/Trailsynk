
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, MapPin, Clock, Users, ArrowLeft, ImagePlus, Route } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { ImageUploader } from '@/components/marketplace/ImageUploader';
import { EventMap } from '@/components/events/EventMap';

// Form schema with validations
const eventFormSchema = z.object({
  name: z.string().min(5, { message: 'Nome do evento é obrigatório e deve ter pelo menos 5 caracteres' }),
  description: z.string().min(20, { message: 'Descrição deve ter pelo menos 20 caracteres' }),
  eventType: z.string({ required_error: 'Selecione um tipo de evento' }),
  date: z.date({ required_error: 'Selecione uma data para o evento' }),
  time: z.string({ required_error: 'Selecione um horário para o evento' }),
  location: z.string().min(5, { message: 'Localização é obrigatória' }),
  routeId: z.string().optional(),
  maxParticipants: z.number().int().positive().optional(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

const CreateEvent = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [meetingPoint, setMeetingPoint] = useState<[number, number] | null>(null);
  
  // Define default form values
  const defaultValues: Partial<EventFormValues> = {
    name: '',
    description: '',
    eventType: undefined,
    date: undefined,
    time: '',
    location: '',
    routeId: undefined,
    maxParticipants: undefined,
  };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      console.log('Form data:', data);
      console.log('Images:', images);
      console.log('Meeting point:', meetingPoint);
      
      // TODO: Implementation of actual API call to save event data
      
      toast.success('Evento criado com sucesso!');
      navigate('/app/events');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Erro ao criar evento. Por favor tente novamente.');
    }
  };

  const handleCancel = () => {
    navigate('/app/events');
  };

  const handleMapClick = (coordinates: [number, number]) => {
    setMeetingPoint(coordinates);
    form.setValue('location', `Lat: ${coordinates[0].toFixed(6)}, Lng: ${coordinates[1].toFixed(6)}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2" 
          onClick={() => navigate('/app/events')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Criar Novo Evento de Pedal</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Nome do Evento */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Evento</FormLabel>
                  <FormControl>
                    <Input placeholder="Pedal na Serra do Mar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descrição do Evento */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Evento</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva os detalhes do seu evento, dificuldade, requisitos, etc." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo de Evento */}
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo do Evento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo do evento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Grupo">Grupo Privado</SelectItem>
                      <SelectItem value="Aberto">Aberto à Comunidade</SelectItem>
                      <SelectItem value="Competição">Competição</SelectItem>
                      <SelectItem value="Cicloturismo">Cicloturismo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Data do Evento */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data do Evento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${
                              !field.value && "text-muted-foreground"
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ptBR })
                            ) : (
                              <span>Selecionar data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hora do Evento */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="time"
                          placeholder="Horário"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Localização do Evento */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização / Ponto de Encontro</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Endereço ou ponto de referência"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Mapa para Marcar Ponto de Encontro */}
            <Card className="p-0 overflow-hidden">
              <div className="p-4 bg-muted">
                <h3 className="font-medium flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4" /> 
                  Marque o ponto de encontro no mapa
                </h3>
              </div>
              <div className="h-[300px] w-full">
                <EventMap onMapClick={handleMapClick} selectedPoint={meetingPoint} />
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rota Associada (Placeholder) */}
              <FormField
                control={form.control}
                name="routeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rota Associada (opcional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar uma rota" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="route1">Trilha da Serra do Mar</SelectItem>
                        <SelectItem value="route2">Circuito Cidade-Praia</SelectItem>
                        <SelectItem value="route3">Volta na Represa</SelectItem>
                        <SelectItem value="route4">Subida ao Pico da Montanha</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Número Máximo de Participantes */}
              <FormField
                control={form.control}
                name="maxParticipants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número Máximo de Participantes (opcional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Users className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="number"
                          min="1"
                          placeholder="Deixe em branco para ilimitado"
                          className="pl-10"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value ? parseInt(e.target.value) : undefined;
                            field.onChange(value);
                          }}
                          value={field.value || ''}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Upload de Imagem/Banner */}
            <div className="space-y-2">
              <FormLabel>Imagem do Evento</FormLabel>
              <Card className="p-4">
                <ImageUploader 
                  onImagesChange={setImages} 
                  maxImages={1}
                />
              </Card>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary-dark order-2 sm:order-1 flex-1"
            >
              Publicar Evento
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              className="order-1 sm:order-2 flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateEvent;

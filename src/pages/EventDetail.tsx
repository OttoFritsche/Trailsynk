import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { CalendarDays, Clock, MapPin, Users, Link, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import AIInsightCard from '@/components/training/AIInsightCard';

const EventDetail = () => {
  const [showTrainingPlan, setShowTrainingPlan] = useState(false);

  // Mock event data
  const event = {
    id: '1',
    title: 'Desafio Ciclístico da Serra',
    description: 'Prepare-se para um percurso desafiador com paisagens incríveis. Ideal para quem busca superar seus limites!',
    date: '2024-06-15',
    time: '08:00',
    location: 'Serra da Mantiqueira, MG',
    organizer: {
      name: 'EcoSports Brasil',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    participants: 45,
    distance: 85,
    elevation: 1800,
    website: 'https://www.example.com/desafio-serra',
    details: `O Desafio Ciclístico da Serra é um evento para ciclistas experientes que buscam um percurso desafiador com belas paisagens. A prova terá 85km de extensão com 1800m de elevação acumulada, passando por estradas de terra e trilhas de montanha.

    Haverá pontos de apoio com água e frutas ao longo do percurso, além de equipe de resgate e primeiros socorros. É obrigatório o uso de capacete e luvas. Recomendamos levar câmara de ar reserva, bomba e ferramentas básicas.
    
    A inscrição inclui camiseta do evento, medalha de participação e seguro atleta. Os três primeiros colocados de cada categoria receberão troféus e prêmios dos patrocinadores.`,
    categories: ['ciclismo', 'montanha', 'desafio'],
    isRecommended: true,
    isClosed: false,
  };

  // Mock event plan
  const eventPlan = {
    trainingWeeks: 8,
    focus: 'Resistência e força em subidas',
    weeklyHours: 8,
  };

  return (
    <div className="container py-8">
      <Helmet>
        <title>{event.title} | TrailSynk</title>
      </Helmet>

      <div className="md:flex md:items-start md:justify-between">
        {/* Event Details */}
        <div className="md:w-3/5">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-600 mb-6">{event.description}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <CalendarDays className="h-5 w-5 mr-2" />
              {new Date(event.date).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="h-5 w-5 mr-2" />
              {event.time}
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="h-5 w-5 mr-2" />
              {event.location}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">Distância: {event.distance} km</Badge>
            <Badge variant="secondary">Elevação: {event.elevation} m</Badge>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={event.organizer.avatarUrl} alt={event.organizer.name} />
                <AvatarFallback>{event.organizer.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="ml-2 font-medium">{event.organizer.name}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="h-5 w-5 mr-2" />
              {event.participants} participantes
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Detalhes</h3>
            <p className="text-gray-700 whitespace-pre-line">{event.details}</p>
          </div>

          <div className="flex items-center gap-2">
            <Link className="h-5 w-5 mr-2 text-gray-700" />
            <a href={event.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {event.website}
            </a>
          </div>
        </div>

        {/* Event Actions */}
        <div className="md:w-2/5 md:pl-8 mt-6 md:mt-0">
          <Button className="w-full mb-4">Inscrever-se</Button>
          <Button variant="outline" className="w-full">Adicionar ao Calendário</Button>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Categorias</h3>
            <div className="flex items-center gap-2">
              {event.categories.map((category) => (
                <Badge key={category} variant="outline">{category}</Badge>
              ))}
            </div>
          </div>

          {event.isRecommended && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Recomendado pela comunidade
            </div>
          )}

          {event.isClosed && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Inscrições encerradas
            </div>
          )}
        </div>
      </div>

      {eventPlan && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Prepare-se com a IA do TrailSynk</h3>
          
          <AIInsightCard
            type="info"
            title="Plano de treino personalizado"
            description="Baseado no seu histórico de atividades e no perfil deste evento, a IA do TrailSynk preparou um plano de treinamento específico para você."
            actionLabel="Ver meu plano de treino"
            onAction={() => setShowTrainingPlan(true)}
            imageUrl="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&auto=format"
          />

          {/* Training Plan Modal */}
          <Dialog open={showTrainingPlan} onOpenChange={setShowTrainingPlan}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Plano de Treino Personalizado</DialogTitle>
                <DialogDescription>
                  Prepare-se para o Desafio Ciclístico da Serra com este plano de treino adaptado às suas necessidades.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Duração do Treino</h4>
                    <p>{eventPlan.trainingWeeks} semanas</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Foco</h4>
                    <p>{eventPlan.focus}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Horas Semanais</h4>
                    <p>{eventPlan.weeklyHours} horas</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium">Recomendações</h4>
                  <ul className="list-disc pl-5">
                    <li>Aumente gradualmente a intensidade dos treinos.</li>
                    <li>Priorize treinos de subida para fortalecer a musculatura.</li>
                    <li>Inclua treinos de longa duração para aumentar a resistência.</li>
                    <li>Descanse adequadamente para evitar lesões.</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default EventDetail;

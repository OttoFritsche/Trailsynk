
import React from 'react';
import { MapPin, Shield, Bell, Route } from 'lucide-react';
import PlanWithAIMockup from './PlanWithAIMockup';
import RideInformedMockup from './RideInformedMockup';
import MaintenanceMockup from './MaintenanceMockup';
import ConnectAndEvolveMockup from './ConnectAndEvolveMockup';

export const stepsData = [
  {
    icon: <MapPin className="w-12 h-12 text-primary" />,
    title: "Planeje com a IA",
    description: "TrailSynk sugere a rota mais segura e personalizada com base nos seus objetivos e condições atuais.",
    mockupContent: <PlanWithAIMockup />
  },
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "Pedale Informado",
    description: "Receba alertas em tempo real e dicas do seu assessor IA durante todo o percurso.",
    mockupContent: <RideInformedMockup />
  },
  {
    icon: <Bell className="w-12 h-12 text-primary" />,
    title: "Cuide da Sua Bike",
    description: "Lembretes inteligentes de manutenção baseados no seu uso real da bicicleta.",
    mockupContent: <MaintenanceMockup />
  },
  {
    icon: <Route className="w-12 h-12 text-primary" />,
    title: "Conecte-se e Evolua",
    description: "Participe da comunidade e melhore sua performance com insights personalizados.",
    mockupContent: <ConnectAndEvolveMockup />
  },
];

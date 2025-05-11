
import React from 'react';
import { MapPin, Shield, Bell, Route, Users, Activity } from 'lucide-react';
import PlanWithAIMockup from './PlanWithAIMockup';
import RideInformedMockup from './RideInformedMockup';
import MaintenanceMockup from './MaintenanceMockup';
import ConnectAndEvolveMockup from './ConnectAndEvolveMockup';

export const stepsData = [
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Planeje com a IA",
    description: "TrailSynk sugere a rota mais segura e personalizada com base nos seus objetivos e condições atuais, considerando trânsito, clima e feedback da comunidade.",
    mockupContent: <PlanWithAIMockup />,
    bulletPoints: [
      "Defina seus objetivos: treino, lazer ou deslocamento",
      "Escolha preferências como distância, elevação e tipo de terreno",
      "Receba até 3 sugestões de rotas otimizadas para sua escolha",
      "Visualize detalhes como segurança, tempo estimado e pontos de interesse"
    ],
    tooltips: [
      {
        position: "top-4 right-4",
        tooltipPosition: "bottom-0 right-0",
        title: "Filtros de Rota",
        description: "Personalize sua busca por tipo de terreno, elevação e distância"
      },
      {
        position: "bottom-20 left-4",
        tooltipPosition: "top-0 left-0",
        title: "Alerta de Segurança",
        description: "Visualize áreas com histórico de incidentes para evitar riscos"
      }
    ]
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Pedale Informado",
    description: "Receba alertas em tempo real e dicas do seu assessor IA durante todo o percurso para evitar perigos e otimizar sua performance.",
    mockupContent: <RideInformedMockup />,
    bulletPoints: [
      "Alertas sonoros sobre condições de trânsito à frente",
      "Sugestões de rotas alternativas em tempo real",
      "Monitoramento de desempenho e dicas para manter seu ritmo",
      "Compartilhamento de localização com amigos para pedaladas mais seguras"
    ],
    tooltips: [
      {
        position: "top-12 left-4",
        tooltipPosition: "bottom-0 left-0",
        title: "Estatísticas em Tempo Real",
        description: "Acompanhe velocidade, distância e outras métricas enquanto pedala"
      },
      {
        position: "bottom-16 right-4",
        tooltipPosition: "top-0 right-0",
        title: "Assistente de Voz",
        description: "Receba comandos por áudio sem precisar olhar para a tela"
      }
    ]
  },
  {
    icon: <Bell className="w-8 h-8 text-primary" />,
    title: "Cuide da Sua Bike",
    description: "Lembretes inteligentes de manutenção baseados no seu uso real da bicicleta e condições climáticas das suas pedaladas.",
    mockupContent: <MaintenanceMockup />,
    bulletPoints: [
      "Calendário personalizado de manutenção baseado no seu uso",
      "Alertas antes de problemas comuns como desgaste de freios ou corrente",
      "Registro automatizado do histórico de manutenções",
      "Recomendações de mecânicos bem avaliados próximos a você"
    ],
    tooltips: [
      {
        position: "top-14 right-4",
        tooltipPosition: "bottom-0 right-0",
        title: "Status dos Componentes",
        description: "Visualize o estado atual das peças da sua bicicleta"
      },
      {
        position: "bottom-20 left-4",
        tooltipPosition: "top-0 left-0",
        title: "Histórico de Serviços",
        description: "Acompanhe todas as manutenções realizadas na sua bike"
      }
    ]
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Conecte-se e Evolua",
    description: "Participe da comunidade e melhore sua performance com insights personalizados e desafios compartilhados entre ciclistas.",
    mockupContent: <ConnectAndEvolveMockup />,
    bulletPoints: [
      "Encontre ciclistas com interesses e níveis similares ao seu",
      "Participe de desafios semanais e competições amigáveis",
      "Compartilhe rotas favoritas e dicas com a comunidade",
      "Receba análises detalhadas da sua evolução ao longo do tempo"
    ],
    tooltips: [
      {
        position: "top-16 left-4",
        tooltipPosition: "bottom-0 left-0",
        title: "Desafios da Comunidade",
        description: "Participe de competições e ganhe reconhecimento"
      },
      {
        position: "bottom-24 right-4",
        tooltipPosition: "top-0 right-0",
        title: "Métricas de Performance",
        description: "Visualize sua evolução com gráficos detalhados"
      }
    ]
  }
];

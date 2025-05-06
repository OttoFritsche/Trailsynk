
import React from 'react';
import { ShieldCheck, Route, CalendarClock, Users } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-12 h-12 text-primary" />,
    title: "Segurança Preditiva em Rotas",
    description: "Pedale com tranquilidade. Nossa IA analisa tráfego, clima, incidentes e feedback da comunidade para alertar sobre perigos e sugerir as rotas mais seguras em tempo real."
  },
  {
    icon: <Route className="w-12 h-12 text-primary" />,
    title: "Rotas Personalizadas e Inteligentes",
    description: "Chega de rotas repetitivas! O TrailSynk aprende suas preferências e objetivos para sugerir percursos perfeitos para seu humor, treino ou tempo disponível."
  },
  {
    icon: <CalendarClock className="w-12 h-12 text-primary" />,
    title: "Lembretes de Manutenção Proativos",
    description: "Sua bike sempre pronta! A IA monitora o uso e avisa o momento ideal para lubrificar, revisar componentes ou fazer manutenções preventivas."
  },
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: "Comunidade Conectada e Insights",
    description: "Compartilhe suas aventuras, participe de desafios e receba análises de performance do seu Strava com dicas da IA para evoluir no esporte."
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
            Por que TrailSynk? Seu Assessor Ciclista Potencializado por IA
          </h2>
          <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
            Imagine ter um especialista ao seu lado em cada pedalada. 
            O TrailSynk vai além de um simples app de ciclismo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 animate-on-scroll"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-secondary/70 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

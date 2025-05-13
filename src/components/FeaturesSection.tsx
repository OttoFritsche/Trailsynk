
import React from 'react';
import { ShieldCheck, Route, CalendarClock, Users } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-12 h-12 text-primary" />,
    title: "Segurança Preditiva em Rotas",
    description: "Pedale com tranquilidade. Nossa IA analisa tráfego, clima, incidentes e feedback da comunidade para alertar sobre perigos e sugerir as rotas mais seguras em tempo real.",
    image: "/lovable-uploads/c29d1c74-d941-43cb-a314-e65236d58c8d.png"
  },
  {
    icon: <Route className="w-12 h-12 text-primary" />,
    title: "Rotas Personalizadas e Inteligentes",
    description: "Chega de rotas repetitivas! O TrailSynk aprende suas preferências e objetivos para sugerir percursos perfeitos para seu humor, treino ou tempo disponível.",
    image: "/lovable-uploads/ce3a1bb6-d8d6-43c6-bf13-bf07e1d249ed.png"
  },
  {
    icon: <CalendarClock className="w-12 h-12 text-primary" />,
    title: "Lembretes de Manutenção Proativos",
    description: "Sua bike sempre pronta! A IA monitora o uso e avisa o momento ideal para lubrificar, revisar componentes ou fazer manutenções preventivas.",
    image: "/lovable-uploads/711ca6c8-0729-44dd-aaa8-e5bb774f13c6.png"
  },
  {
    icon: <Users className="w-12 h-12 text-primary" />,
    title: "Comunidade Conectada e Insights",
    description: "Compartilhe suas aventuras, participe de desafios e receba análises de performance do seu Strava com dicas da IA para evoluir no esporte.",
    image: "/lovable-uploads/2945b311-cc8d-4750-a3b5-f277c59ca675.png"
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-secondary mb-4">
            Por que TrailSynk? Seu Assessor Ciclista Potencializado por IA
          </h2>
          <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
            Imagine ter um especialista ao seu lado em cada pedalada. 
            O TrailSynk vai além de um simples app de ciclismo.
          </p>
        </div>

        <div className="space-y-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-on-scroll ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`order-2 ${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              
              <div className={`order-1 ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-center mb-6 bg-primary/10 w-20 h-20 rounded-full mx-auto md:mx-0">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-4 text-center md:text-left">
                    {feature.title}
                  </h3>
                  <p className="text-secondary/70 text-center md:text-left">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;


import React from 'react';
import { Star, Heart, MessageSquare, Settings } from 'lucide-react';

const roadmapItems = [
  {
    icon: <Star className="w-6 h-6 text-primary" />,
    title: "Marketplace de Equipamentos",
    description: "Sugestões inteligentes de equipamentos com base no seu estilo de pedalada e necessidades específicas."
  },
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Eventos de Pedalada em Grupo",
    description: "Organização inteligente de eventos e matchmaking com ciclistas compatíveis com seu perfil."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-primary" />,
    title: "Integração com Smartwatches",
    description: "Receba alertas e dados em tempo real diretamente no seu Garmin ou Apple Watch."
  },
  {
    icon: <Settings className="w-6 h-6 text-primary" />,
    title: "Checklist de Pedal Inteligente",
    description: "Preparação personalizada antes de cada pedalada, sugerida pela IA com base nas condições."
  },
];

const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
            A Evolução do TrailSynk Não Para!
          </h2>
          <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
            Confira alguns dos recursos que estamos desenvolvendo para o futuro
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmapItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-start animate-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex-shrink-0 mr-4 bg-white p-2 rounded-full shadow-md">
                {item.icon}
              </div>
              <div className="flex-grow bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-secondary mb-1">
                  {item.title}
                </h3>
                <p className="text-secondary/70">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;

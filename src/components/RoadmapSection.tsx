
import React from 'react';
import { Star, Heart, MessageSquare, Settings, Sparkles } from 'lucide-react';

const roadmapItems = [
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    title: "Marketplace de Equipamentos",
    description: "Sugestões inteligentes de equipamentos com base no seu estilo de pedalada e necessidades específicas."
  },
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: "Eventos de Pedalada em Grupo",
    description: "Organização inteligente de eventos e matchmaking com ciclistas compatíveis com seu perfil."
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-primary" />,
    title: "Integração com Smartwatches",
    description: "Receba alertas e dados em tempo real diretamente no seu Garmin ou Apple Watch."
  },
  {
    icon: <Settings className="w-8 h-8 text-primary" />,
    title: "Checklist de Pedal Inteligente",
    description: "Preparação personalizada antes de cada pedalada, sugerida pela IA com base nas condições."
  },
];

const RoadmapSection: React.FC = () => {
  return (
    <section id="roadmap" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-secondary mb-4 flex items-center justify-center gap-2">
            <Sparkles className="text-primary" />
            <span>A Evolução do TrailSynk Não Para!</span>
          </h2>
          <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
            Confira alguns dos recursos que estamos desenvolvendo para o futuro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {roadmapItems.map((item, index) => (
            <div 
              key={index}
              className="animate-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
                <div className="bg-primary/5 p-6 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-full shadow-md group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-secondary/70">
                    {item.description}
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

export default RoadmapSection;

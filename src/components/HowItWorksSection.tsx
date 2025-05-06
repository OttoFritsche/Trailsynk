
import React from 'react';
import { MapPin, Shield, Bell, Route } from 'lucide-react';

const steps = [
  {
    icon: <MapPin className="w-12 h-12 text-primary" />,
    title: "Planeje com a IA",
    description: "TrailSynk sugere a rota mais segura e personalizada com base nos seus objetivos e condições atuais.",
    mockupUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "Pedale Informado",
    description: "Receba alertas em tempo real e dicas do seu assessor IA durante todo o percurso.",
    mockupUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  {
    icon: <Bell className="w-12 h-12 text-primary" />,
    title: "Cuide da Sua Bike",
    description: "Lembretes inteligentes de manutenção baseados no seu uso real da bicicleta.",
    mockupUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
  },
  {
    icon: <Route className="w-12 h-12 text-primary" />,
    title: "Conecte-se e Evolua",
    description: "Participe da comunidade e melhore sua performance com insights personalizados.",
    mockupUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
            Veja o TrailSynk em Ação
          </h2>
          <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
            Uma experiência completa para transformar suas pedaladas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector Line (Only visible on large screens) */}
          <div className="absolute top-24 left-0 w-full h-0.5 bg-primary/30 hidden lg:block"></div>

          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative animate-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Circle with Step Number */}
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-6 border-2 border-primary z-10 relative">
                {step.icon}
              </div>
              
              {/* Step Content */}
              <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-secondary mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-secondary/70 text-center">
                  {step.description}
                </p>
              </div>

              {/* App Mockup */}
              <div className="mt-4 mx-auto max-w-[180px]">
                <div className="bg-secondary rounded-xl overflow-hidden shadow-lg p-1">
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={step.mockupUrl} 
                      alt={`TrailSynk ${step.title} mockup`} 
                      className="w-full h-auto object-cover aspect-[9/16]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1469474968028-56623f02e42e";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

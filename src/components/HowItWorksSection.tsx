
import React from 'react';
import { StepItem } from './how-it-works/StepItem';
import { stepsData } from './how-it-works/StepsData';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/0c071c4c-605b-4448-86c6-49d7c410ee82.png" 
          alt="Ciclistas na floresta" 
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gray-50/95"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-secondary mb-3">
            Veja o TrailSynk em Ação
          </h2>
          <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
            Uma experiência completa para transformar suas pedaladas
          </p>
        </div>

        <div className="relative">
          {/* Desktop zigzag layout */}
          <div className="hidden lg:block">
            {/* Connector line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/30 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-4 gap-6">
              {stepsData.map((step, index) => (
                <div 
                  key={index} 
                  className={`animate-on-scroll ${index % 2 === 0 ? 'pt-0 pb-32' : 'pt-32 pb-0'}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <StepItem 
                    icon={step.icon} 
                    title={step.title} 
                    description={step.description} 
                    mockupContent={step.mockupContent} 
                    index={index} 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile layout */}
          <div className="lg:hidden space-y-12">
            {stepsData.map((step, index) => (
              <div 
                key={index}
                className="animate-on-scroll"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <StepItem 
                  icon={step.icon} 
                  title={step.title} 
                  description={step.description} 
                  mockupContent={step.mockupContent} 
                  index={index} 
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Community showcase image - visible between steps 2 and 3 on larger screens */}
        <div className="mt-20 animate-on-scroll">
          <div className="rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-4xl">
            <img 
              src="/lovable-uploads/c29d1c74-d941-43cb-a314-e65236d58c8d.png" 
              alt="Comunidade de ciclistas na trilha" 
              className="w-full object-cover h-80"
            />
            <div className="bg-white p-6 text-center">
              <h3 className="text-2xl font-bold text-secondary mb-2">
                Junte-se à Comunidade TrailSynk
              </h3>
              <p className="text-secondary/70">
                Compartilhe experiências, descubra novas trilhas e evolua como ciclista com outros apaixonados pelo esporte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

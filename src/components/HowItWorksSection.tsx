
import React from 'react';
import { StepItem } from './how-it-works/StepItem';
import { stepsData } from './how-it-works/StepsData';

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
            Veja o TrailSynk em Ação
          </h2>
          <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
            Uma experiência completa para transformar suas pedaladas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Connector Line (Only visible on large screens) */}
          <div className="absolute top-24 left-0 w-full h-0.5 bg-primary/30 hidden lg:block"></div>

          {stepsData.map((step, index) => (
            <StepItem 
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              mockupContent={step.mockupContent}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

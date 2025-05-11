
import React, { useState } from 'react';
import { StepItem } from './how-it-works/StepItem';
import { stepsData } from './how-it-works/StepsData';

// Tooltip component for mockup callouts
const Tooltip: React.FC<{
  title: string;
  description: string;
  position: string;
  visible: boolean;
}> = ({ title, description, position, visible }) => {
  if (!visible) return null;
  
  return (
    <div className={`absolute ${position} z-20 bg-white p-2 rounded-lg shadow-lg border border-gray-200 w-40 text-xs transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <h4 className="font-bold text-primary mb-1">{title}</h4>
      <p className="text-secondary/70">{description}</p>
      <div className="absolute w-2 h-2 bg-white transform rotate-45 -z-10 border-l border-t border-gray-200" 
        style={{ 
          top: position.includes('top') ? 'calc(100% - 1px)' : position.includes('bottom') ? '-2px' : '50%',
          left: position.includes('left') ? 'calc(100% - 1px)' : position.includes('right') ? '-2px' : '50%',
          marginTop: position.includes('top') || position.includes('bottom') ? '0' : '-1px',
          marginLeft: position.includes('left') || position.includes('right') ? '0' : '-1px',
        }}></div>
    </div>
  );
};

const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  return (
    <section id="how-it-works" className="bg-gray-50 py-[50px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-3">
            Veja o TrailSynk em Ação
          </h2>
          <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
            Uma experiência completa para transformar suas pedaladas - siga o fluxo de uso abaixo
          </p>
        </div>

        {/* Step navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-lg shadow-md p-1">
            {stepsData.map((step, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeStep === index 
                    ? 'bg-primary text-white' 
                    : 'text-secondary hover:bg-gray-100'
                }`}
                onClick={() => setActiveStep(index)}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected step details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Text explanation */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                {stepsData[activeStep].icon}
              </div>
              <h3 className="text-2xl font-bold text-secondary">
                {stepsData[activeStep].title}
              </h3>
            </div>
            
            <p className="text-secondary/70 mb-6">
              {stepsData[activeStep].description}
            </p>
            
            <div className="space-y-4">
              {stepsData[activeStep].bulletPoints?.map((point, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold mr-3 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-secondary/80 flex-1">{point}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column - Interactive mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="bg-secondary rounded-[2rem] p-3 shadow-xl relative mx-auto" style={{ maxWidth: '280px' }}>
                <div className="rounded-[1.5rem] overflow-hidden h-[560px] relative bg-white">
                  {/* Content based on active step */}
                  <div className="relative h-full">
                    {stepsData[activeStep].mockupContent}
                    
                    {/* Interactive tooltips */}
                    {stepsData[activeStep].tooltips?.map((tooltip, idx) => (
                      <React.Fragment key={idx}>
                        <button 
                          className={`absolute ${tooltip.position} w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs animate-pulse z-10`}
                          onClick={() => setActiveTooltip(activeTooltip === `${activeStep}-${idx}` ? null : `${activeStep}-${idx}`)}
                        >
                          i
                        </button>
                        <Tooltip 
                          title={tooltip.title}
                          description={tooltip.description}
                          position={tooltip.tooltipPosition}
                          visible={activeTooltip === `${activeStep}-${idx}`}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                
                {/* Bottom "home" button */}
                <div className="w-1/3 h-1 bg-gray-400 rounded-full mx-auto mt-3"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center animate-pulse">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Steps timeline (minimized on mobile) */}
        <div className="mt-16 hidden md:block">
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
            
            <div className="flex justify-between relative">
              {stepsData.map((step, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col items-center ${
                    index <= activeStep ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      index <= activeStep 
                        ? 'bg-primary text-white' 
                        : 'bg-white border-2 border-gray-200'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="mt-2 text-xs font-medium text-center">
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

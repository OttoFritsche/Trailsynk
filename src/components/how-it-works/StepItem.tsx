
import React from 'react';

type MockupContentProps = {
  children: React.ReactNode;
};

const MockupContent: React.FC<MockupContentProps> = ({ children }) => (
  <div className="bg-white h-full w-full flex flex-col">
    {children}
  </div>
);

export interface StepItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  mockupContent: React.ReactNode;
  index: number;
}

const StepItem: React.FC<StepItemProps> = ({ 
  icon, 
  title, 
  description, 
  mockupContent,
  index 
}) => {
  return (
    <div 
      className="relative animate-on-scroll"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Circle with Step Icon */}
      <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-5 border-2 border-primary z-10 relative">
        {icon}
      </div>
      
      {/* Step Content */}
      <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
        <h3 className="text-xl font-bold text-secondary mb-2 text-center">
          {title}
        </h3>
        <p className="text-secondary/70 text-center mb-4">
          {description}
        </p>
      </div>

      {/* App Mockup */}
      <div className="mt-4 mx-auto max-w-[180px]">
        <div className="bg-secondary rounded-xl overflow-hidden shadow-lg p-1">
          <div className="rounded-lg overflow-hidden h-[280px]">
            {mockupContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export { StepItem, MockupContent };

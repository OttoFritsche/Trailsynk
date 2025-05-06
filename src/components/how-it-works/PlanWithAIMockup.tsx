
import React from 'react';
import { Map, Shield, Bell } from 'lucide-react';
import { MockupContent } from './StepItem';

const PlanWithAIMockup: React.FC = () => (
  <MockupContent>
    {/* Plan with AI mockup */}
    <div className="bg-primary text-white p-2 text-xs font-medium flex items-center">
      <Map className="h-3 w-3 mr-1" /> Nova Rota
      <div className="ml-auto flex space-x-1">
        <div className="bg-white/30 rounded-full h-2 w-2"></div>
        <div className="bg-white/30 rounded-full h-2 w-2"></div>
      </div>
    </div>
    
    <div className="flex-grow bg-gray-100 relative">
      {/* Map visualization with actual roads */}
      <div className="absolute inset-0 bg-gray-100"></div>
      
      {/* Roads */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M10,30 L30,30 L30,70 L70,70 L70,90" stroke="#d4d4d4" strokeWidth="3" fill="none" />
        <path d="M20,10 L20,50 L50,50 L50,90" stroke="#d4d4d4" strokeWidth="3" fill="none" />
        <path d="M80,20 L80,60 L40,60 L40,80" stroke="#d4d4d4" strokeWidth="3" fill="none" />
      </svg>
      
      {/* Route options */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Option 1 - Faster */}
        <path d="M20,10 L20,50 L50,50 L50,90" stroke="#2ECC71" strokeWidth="2" fill="none" />
        
        {/* Option 2 - Safer */}
        <path d="M20,10 L80,20 L80,60 L40,60 L40,80 L50,90" stroke="#2C3E50" strokeWidth="2" fill="none" strokeDasharray="3,2" />
        
        <circle cx="20" cy="10" r="3" fill="#2C3E50" />
        <circle cx="50" cy="90" r="3" fill="#2ECC71" />
      </svg>
      
      {/* Points of interest */}
      <div className="absolute top-1/4 left-1/5 bg-white rounded-full p-1 shadow-sm">
        <Shield className="h-2 w-2 text-primary" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 bg-white rounded-full p-1 shadow-sm">
        <Shield className="h-2 w-2 text-primary" />
      </div>
      <div className="absolute top-2/3 left-2/3 bg-white rounded-full p-1 shadow-sm">
        <Bell className="h-2 w-2 text-red-500" />
      </div>
    </div>
    
    <div className="p-2 bg-white">
      <div className="flex justify-between items-center mb-1.5">
        <div className="text-xs font-semibold flex items-center">
          <span className="w-2 h-2 bg-primary rounded-full mr-1"></span>
          <span>Rota Rápida (8,2 km)</span>
        </div>
        <div className="text-xs text-primary font-semibold">24 min</div>
      </div>
      
      <div className="flex justify-between items-center mb-1.5">
        <div className="text-xs font-semibold flex items-center">
          <span className="w-2 h-2 bg-secondary rounded-full mr-1"></span>
          <span>Rota Segura (9,5 km)</span>
        </div>
        <div className="text-xs text-secondary font-semibold">32 min</div>
      </div>
      
      <div className="mt-2 flex space-x-1">
        <div className="text-2xs text-white bg-primary flex-1 py-1 rounded text-center">Selecionar Rota</div>
        <div className="text-2xs text-primary border border-primary py-1 px-2 rounded text-center">Filtros</div>
      </div>
    </div>
  </MockupContent>
);

export default PlanWithAIMockup;

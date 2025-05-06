
import React from 'react';
import { Navigation, Activity, Shield, Bell } from 'lucide-react';
import { MockupContent } from './StepItem';

const RideInformedMockup: React.FC = () => (
  <MockupContent>
    {/* Ride Informed mockup */}
    <div className="bg-primary text-white p-2 text-xs font-medium flex items-center">
      <Navigation className="h-3 w-3 mr-1" /> Em Progresso
      <div className="ml-auto text-xs font-normal">09:24</div>
    </div>
    
    <div className="flex-grow flex flex-col">
      {/* Current stats */}
      <div className="grid grid-cols-2 gap-1 p-1">
        <div className="bg-gray-50 p-1 rounded">
          <div className="text-xs text-gray-500">Velocidade</div>
          <div className="text-sm font-semibold flex items-center">
            <Activity className="h-3 w-3 text-primary mr-1" /> 18,5 km/h
          </div>
        </div>
        <div className="bg-gray-50 p-1 rounded">
          <div className="text-xs text-gray-500">Distância</div>
          <div className="text-sm font-semibold">3,6 km</div>
        </div>
      </div>
      
      {/* Alert notification */}
      <div className="m-1 p-1 bg-red-50 border border-red-100 rounded flex items-center text-xs">
        <Shield className="h-4 w-4 text-red-500 mr-1" />
        <div>
          <div className="font-medium text-red-700">Alerta: Trânsito à frente</div>
          <div className="text-2xs text-red-600">Rota alternativa sugerida</div>
        </div>
      </div>
      
      {/* Mini map preview */}
      <div className="flex-grow m-1 bg-gray-100 relative rounded-sm">
        {/* Map visualization */}
        <div className="absolute inset-0 bg-gray-100"></div>
        
        {/* Roads */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,50 L40,50 L40,20 L70,20 L70,50 L90,50" stroke="#d4d4d4" strokeWidth="2" fill="none" />
          <path d="M10,50 L40,50 L40,80 L70,80 L70,50 L90,50" stroke="#d4d4d4" strokeWidth="2" fill="none" />
        </svg>
        
        {/* Routes - original (dotted) and detour (green) */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10,50 L40,50 L40,20 L70,20 L70,50 L90,50" stroke="#ccc" strokeWidth="2" fill="none" strokeDasharray="2,2" />
          <path d="M10,50 L40,50 L40,80 L70,80 L70,50 L90,50" stroke="#2ECC71" strokeWidth="2" fill="none" />
          
          {/* Traffic alert */}
          <circle cx="40" cy="20" r="3" fill="#ff4d4f" />
          <circle cx="10" cy="50" r="3" fill="#2C3E50" />
          <circle cx="90" cy="50" r="3" fill="#2ECC71" />
          
          {/* Current position */}
          <circle cx="40" cy="50" r="3" fill="#2ECC71" stroke="#fff" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Audio cue interface */}
      <div className="p-2 bg-gray-50 mx-1 mb-1 rounded flex items-center space-x-2">
        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Bell className="h-3 w-3 text-white" />
        </div>
        <div className="text-xs flex-grow">
          <div className="font-medium">Assistente TrailSynk</div>
          <div className="text-2xs text-gray-500">Em 200m, vire à direita para evitar o trânsito</div>
        </div>
      </div>
    </div>
  </MockupContent>
);

export default RideInformedMockup;

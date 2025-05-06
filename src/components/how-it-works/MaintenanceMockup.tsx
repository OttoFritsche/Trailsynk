
import React from 'react';
import { Settings, Check, Clock, Bell } from 'lucide-react';
import { MockupContent } from './StepItem';

const MaintenanceMockup: React.FC = () => (
  <MockupContent>
    {/* Maintenance mockup */}
    <div className="bg-primary text-white p-2 text-xs font-medium flex items-center">
      <Settings className="h-3 w-3 mr-1" /> Manutenção
      <div className="ml-auto flex space-x-1">
        <div className="bg-white/30 rounded-full h-2 w-2"></div>
        <div className="bg-white/30 rounded-full h-2 w-2"></div>
      </div>
    </div>
    
    <div className="flex-grow">
      {/* Maintenance checklist */}
      <div className="p-2">
        <div className="text-xs font-semibold text-secondary mb-2">Checklist de Manutenção</div>
        
        <div className="space-y-1.5">
          <div className="flex items-center bg-green-50 p-1.5 rounded text-xs">
            <div className="mr-2 bg-green-500 rounded-full p-0.5">
              <Check className="h-2 w-2 text-white" />
            </div>
            <span className="text-green-800">Calibrar pneus</span>
            <span className="ml-auto text-green-600 text-2xs">Feito</span>
          </div>
          
          <div className="flex items-center bg-red-50 p-1.5 rounded text-xs">
            <div className="mr-2 bg-red-500 rounded-full p-0.5 text-white flex items-center justify-center">
              <span className="text-2xs font-bold">!</span>
            </div>
            <span className="text-red-800">Lubrificar corrente</span>
            <span className="ml-auto text-red-600 text-2xs">Urgente</span>
          </div>
          
          <div className="flex items-center bg-amber-50 p-1.5 rounded text-xs">
            <div className="mr-2 bg-amber-500 rounded-full p-0.5">
              <Clock className="h-2 w-2 text-white" />
            </div>
            <span className="text-amber-800">Verificar freios</span>
            <span className="ml-auto text-amber-600 text-2xs">Em 3 dias</span>
          </div>
          
          <div className="flex items-center bg-gray-50 p-1.5 rounded text-xs">
            <div className="mr-2 bg-gray-400 rounded-full p-0.5">
              <Bell className="h-2 w-2 text-white" />
            </div>
            <span className="text-gray-800">Troca de cabos</span>
            <span className="ml-auto text-gray-600 text-2xs">Em 14 dias</span>
          </div>
        </div>
      </div>
      
      {/* Maintenance history chart */}
      <div className="p-2 mt-1">
        <div className="text-xs font-semibold text-secondary mb-2">Histórico de Uso</div>
        <div className="bg-gray-50 p-2 rounded-md">
          <div className="h-8 flex items-end space-x-1">
            <div className="h-3/6 w-[10%] bg-primary rounded-t"></div>
            <div className="h-4/6 w-[10%] bg-primary rounded-t"></div>
            <div className="h-2/6 w-[10%] bg-primary rounded-t"></div>
            <div className="h-5/6 w-[10%] bg-primary rounded-t"></div>
            <div className="h-full w-[10%] bg-primary rounded-t"></div>
            <div className="h-2/6 w-[10%] bg-primary rounded-t"></div>
            <div className="h-3/6 w-[10%] bg-primary rounded-t"></div>
          </div>
          <div className="flex justify-between text-2xs text-gray-500 mt-1">
            <span>Seg</span>
            <span>Ter</span>
            <span>Qua</span>
            <span>Qui</span>
            <span>Sex</span>
            <span>Sab</span>
            <span>Dom</span>
          </div>
        </div>
      </div>
      
      {/* Maintenance stats */}
      <div className="p-2 mt-1 text-xs">
        <div className="flex justify-between mb-1">
          <span className="text-gray-600">Última manutenção</span>
          <span className="font-medium">12 dias atrás</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Distância percorrida</span>
          <span className="font-medium">247 km</span>
        </div>
      </div>
    </div>
  </MockupContent>
);

export default MaintenanceMockup;

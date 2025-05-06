
import React from 'react';
import { Users, Star, Bike, Activity, Heart } from 'lucide-react';
import { MockupContent } from './StepItem';

const ConnectAndEvolveMockup: React.FC = () => (
  <MockupContent>
    {/* Community mockup */}
    <div className="bg-primary text-white p-2 text-xs font-medium flex items-center">
      <Users className="h-3 w-3 mr-1" /> Comunidade
      <div className="ml-auto flex space-x-1">
        <div className="bg-white/30 rounded-full h-2 w-2"></div>
        <div className="bg-white/30 rounded-full h-2 w-2"></div>
      </div>
    </div>
    
    <div className="flex-grow overflow-hidden">
      {/* Profile summary */}
      <div className="p-2 flex items-center border-b border-gray-100">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white text-xs">C</div>
        <div className="ml-2">
          <div className="text-xs font-semibold">Carlos Silva</div>
          <div className="text-2xs text-gray-500 flex items-center">
            <Star className="h-2 w-2 text-yellow-500 mr-0.5" fill="currentColor" />
            Ciclista Experiente • 247 km no mês
          </div>
        </div>
      </div>
      
      {/* Performance metrics */}
      <div className="p-2 border-b border-gray-100">
        <div className="text-xs font-semibold mb-1.5">Seu Desempenho</div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="bg-gray-50 p-1 rounded text-center">
            <div className="text-2xs text-gray-500">Velocidade</div>
            <div className="text-xs font-medium">16.8 km/h</div>
          </div>
          <div className="bg-gray-50 p-1 rounded text-center">
            <div className="text-2xs text-gray-500">Subidas</div>
            <div className="text-xs font-medium">389 m</div>
          </div>
          <div className="bg-green-50 p-1 rounded text-center">
            <div className="text-2xs text-green-600">Novo!</div>
            <div className="text-xs font-medium text-green-700">+12%</div>
          </div>
        </div>
      </div>
      
      {/* Activity feed */}
      <div className="overflow-y-auto h-full">
        <div className="p-2 border-b border-gray-100">
          <div className="flex items-center text-xs">
            <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
              <Bike className="h-2 w-2 text-primary" />
            </div>
            <span className="ml-1 font-medium text-secondary">Grupo Pedal Matinal</span>
          </div>
          <div className="text-2xs text-gray-600 mt-1">Pedalada em grupo amanhã às 6h no Parque Central.</div>
          <div className="mt-1 flex gap-1">
            <div className="text-2xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Participar</div>
            <div className="text-2xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Talvez</div>
          </div>
        </div>
        
        <div className="p-2 border-b border-gray-100">
          <div className="flex items-center text-xs">
            <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
              <Activity className="h-2 w-2 text-blue-600" />
            </div>
            <span className="ml-1 font-medium text-secondary">Novo recorde pessoal!</span>
          </div>
          <div className="text-2xs text-gray-600 mt-1">Você bateu seu recorde de velocidade média na rota "Volta ao Lago"</div>
          <div className="mt-1 text-2xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full inline-block">+12% de melhoria</div>
        </div>
        
        <div className="p-2">
          <div className="flex items-center text-xs">
            <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
              <Heart className="h-2 w-2 text-red-600" fill="currentColor" />
            </div>
            <span className="ml-1 font-medium text-secondary">Ana Souza</span>
          </div>
          <div className="text-2xs text-gray-600 mt-1">Gostou do seu registro na rota "Trilha da Serra"</div>
        </div>
      </div>
    </div>
  </MockupContent>
);

export default ConnectAndEvolveMockup;

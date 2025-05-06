
import React from 'react';
import { MapPin, Shield, Bell, Route, Map, Navigation, Bike, Users, Check, Star, Activity, Settings } from 'lucide-react';

const steps = [
  {
    icon: <MapPin className="w-12 h-12 text-primary" />,
    title: "Planeje com a IA",
    description: "TrailSynk sugere a rota mais segura e personalizada com base nos seus objetivos e condições atuais.",
    mockupContent: (
      <div className="bg-white h-full w-full flex flex-col">
        <div className="bg-primary text-white p-2 text-xs font-medium flex items-center">
          <Map className="h-3 w-3 mr-1" /> Nova Rota
          <div className="ml-auto flex space-x-1">
            <div className="bg-white/30 rounded-full h-2 w-2"></div>
            <div className="bg-white/30 rounded-full h-2 w-2"></div>
          </div>
        </div>
        <div className="flex-grow bg-gray-100 relative">
          {/* Map visualization */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%232ECC71' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px'
          }}></div>
          
          {/* Route visualization */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M20,80 Q40,20 60,60 T90,40" stroke="#2ECC71" strokeWidth="3" fill="none" />
            <circle cx="20" cy="80" r="3" fill="#1A1F2C" />
            <circle cx="90" cy="40" r="3" fill="#2ECC71" />
          </svg>
          
          {/* Points of interest */}
          <div className="absolute top-1/3 left-1/4 bg-white rounded-full p-1 shadow-md">
            <Shield className="h-2 w-2 text-primary" />
          </div>
          <div className="absolute top-2/3 right-1/3 bg-white rounded-full p-1 shadow-md">
            <Shield className="h-2 w-2 text-primary" />
          </div>
        </div>
        <div className="p-1 bg-white text-xs">
          <div className="flex justify-between items-center mb-1">
            <div className="font-semibold text-secondary">Parque → Centro</div>
            <div className="text-primary font-semibold">8,2 km</div>
          </div>
          <div className="flex items-center text-gray-500">
            <div className="h-1 flex-grow rounded-full bg-gray-100 mr-1">
              <div className="h-full w-3/4 bg-primary rounded-full"></div>
            </div>
            <span>25 min</span>
          </div>
        </div>
      </div>
    )
  },
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "Pedale Informado",
    description: "Receba alertas em tempo real e dicas do seu assessor IA durante todo o percurso.",
    mockupContent: (
      <div className="bg-white h-full w-full flex flex-col">
        <div className="bg-primary text-white p-2 text-xs font-medium flex items-center">
          <Navigation className="h-3 w-3 mr-1" /> Em Progresso
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
              <div className="text-red-600 text-2xs">Rota alternativa sugerida</div>
            </div>
          </div>
          
          {/* Map preview */}
          <div className="flex-grow m-1 bg-gray-100 relative rounded-sm">
            {/* Simplified map view */}
            <div className="absolute inset-0 opacity-50" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z' fill='%232ECC71' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }}></div>
            
            {/* Route visualization with detour */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M10,50 L40,50 L40,20 L70,20 L70,50 L90,50" stroke="#ccc" strokeWidth="2" fill="none" strokeDasharray="3,3" />
              <path d="M10,50 L40,50 L40,80 L70,80 L70,50 L90,50" stroke="#2ECC71" strokeWidth="2" fill="none" />
              <circle cx="40" cy="50" r="3" fill="#F44336" />
            </svg>
          </div>
        </div>
      </div>
    )
  },
  {
    icon: <Bell className="w-12 h-12 text-primary" />,
    title: "Cuide da Sua Bike",
    description: "Lembretes inteligentes de manutenção baseados no seu uso real da bicicleta.",
    mockupContent: (
      <div className="bg-white h-full w-full flex flex-col">
        <div className="bg-primary text-white p-2 text-xs font-medium flex items-center">
          <Settings className="h-3 w-3 mr-1" /> Manutenção
        </div>
        <div className="flex-grow">
          {/* Maintenance checklist */}
          <div className="p-2">
            <div className="text-xs font-semibold text-secondary mb-1">Checklist de Manutenção</div>
            
            <div className="space-y-1">
              <div className="flex items-center bg-green-50 p-1 rounded text-xs">
                <div className="mr-1 bg-green-100 rounded-full p-0.5">
                  <Check className="h-2 w-2 text-green-600" />
                </div>
                <span className="text-green-800">Calibrar pneus</span>
                <span className="ml-auto text-green-600">✓</span>
              </div>
              
              <div className="flex items-center bg-red-50 p-1 rounded text-xs">
                <div className="mr-1 bg-red-100 rounded-full p-0.5 text-red-600">!</div>
                <span className="text-red-800">Lubrificar corrente</span>
                <span className="ml-auto text-red-600">Urgente</span>
              </div>
              
              <div className="flex items-center bg-gray-50 p-1 rounded text-xs">
                <div className="mr-1 bg-gray-200 rounded-full p-0.5">
                  <Bell className="h-2 w-2 text-gray-600" />
                </div>
                <span className="text-gray-800">Verificar freios</span>
                <span className="ml-auto text-gray-600">Em 3 dias</span>
              </div>
              
              <div className="flex items-center bg-gray-50 p-1 rounded text-xs">
                <div className="mr-1 bg-gray-200 rounded-full p-0.5">
                  <Bell className="h-2 w-2 text-gray-600" />
                </div>
                <span className="text-gray-800">Troca de óleo</span>
                <span className="ml-auto text-gray-600">Em 7 dias</span>
              </div>
            </div>
          </div>
          
          {/* Maintenance stats */}
          <div className="p-2 bg-gray-50 mt-1 text-xs">
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
      </div>
    )
  },
  {
    icon: <Route className="w-12 h-12 text-primary" />,
    title: "Conecte-se e Evolua",
    description: "Participe da comunidade e melhore sua performance com insights personalizados.",
    mockupContent: (
      <div className="bg-white h-full w-full flex flex-col">
        <div className="bg-primary text-white p-2 text-xs font-medium flex items-center">
          <Users className="h-3 w-3 mr-1" /> Comunidade
        </div>
        <div className="flex-grow overflow-hidden">
          {/* Profile summary */}
          <div className="p-2 flex items-center border-b border-gray-100">
            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white text-xs">C</div>
            <div className="ml-2">
              <div className="text-xs font-semibold">Carlos Silva</div>
              <div className="text-2xs text-gray-500">Ciclista Experiente</div>
            </div>
            <div className="ml-auto flex">
              <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
              <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
              <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
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
              <div className="text-2xs text-gray-600 mt-1">Pedalada em grupo amanhã às 6h no Parque Central. Você está interessado?</div>
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
          </div>
        </div>
      </div>
    )
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
              {/* Circle with Step Icon */}
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
                  <div className="rounded-lg overflow-hidden h-[280px]">
                    {step.mockupContent}
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

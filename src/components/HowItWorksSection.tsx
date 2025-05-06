
import React from 'react';
import { MapPin, Shield, Bell, Route, Map, Navigation, Bike, Users, Check, Star, Activity, Settings, Clock, Heart } from 'lucide-react';

const steps = [
  {
    icon: <MapPin className="w-12 h-12 text-primary" />,
    title: "Planeje com a IA",
    description: "TrailSynk sugere a rota mais segura e personalizada com base nos seus objetivos e condições atuais.",
    mockupContent: (
      <div className="bg-white h-full w-full flex flex-col">
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
      </div>
    )
  },
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
    title: "Pedale Informado",
    description: "Receba alertas em tempo real e dicas do seu assessor IA durante todo o percurso.",
    mockupContent: (
      <div className="bg-white h-full w-full flex flex-col">
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
      </div>
    )
  },
  {
    icon: <Bell className="w-12 h-12 text-primary" />,
    title: "Cuide da Sua Bike",
    description: "Lembretes inteligentes de manutenção baseados no seu uso real da bicicleta.",
    mockupContent: (
      <div className="bg-white h-full w-full flex flex-col">
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
      </div>
    )
  },
  {
    icon: <Route className="w-12 h-12 text-primary" />,
    title: "Conecte-se e Evolua",
    description: "Participe da comunidade e melhore sua performance com insights personalizados.",
    mockupContent: (
      <div className="bg-white h-full w-full flex flex-col">
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
      </div>
    )
  },
];

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

          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative animate-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Circle with Step Icon */}
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-5 border-2 border-primary z-10 relative">
                {step.icon}
              </div>
              
              {/* Step Content */}
              <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all">
                <h3 className="text-xl font-bold text-secondary mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-secondary/70 text-center mb-4">
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

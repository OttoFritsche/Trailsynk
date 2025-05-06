
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, Bike, Navigation, Map, Activity } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-white to-gray-50 overflow-hidden pt-24 pb-12">
      {/* Stylized background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/10"></div>
        
        {/* Map-like pattern overlay */}
        <div className="absolute inset-0 opacity-10" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232ECC71' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
               backgroundSize: '100px 100px'
             }}>
        </div>
        
        {/* Stylized cycling routes */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" stroke="#2ECC71" strokeWidth="0.5" fill="none" />
            <path d="M0,60 Q30,40 60,70 T100,60" stroke="#1A1F2C" strokeWidth="0.5" fill="none" />
            <path d="M0,40 Q40,60 70,30 T100,40" stroke="#2ECC71" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent animate-fade-in">
            Seu Copiloto Inteligente para Aventuras de Bicicleta Inesquecíveis
          </h1>
          
          <h2 className="text-lg sm:text-xl md:text-2xl text-secondary/80 mb-6 max-w-3xl mx-auto animate-fade-in">
            Descubra um novo jeito de pedalar com o TrailSynk. Nossa IA analisa rotas em tempo real 
            para sua segurança, sugere percursos personalizados para seus objetivos, lembra da manutenção 
            da sua bike e conecta você a uma comunidade vibrante.
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in">
            <Button 
              onClick={scrollToWaitlist}
              size="lg" 
              className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Quero Meu Assessor Ciclista!
            </Button>
          </div>

          <div className="mt-4 animate-bounce">
            <a href="#features" className="text-primary hover:text-primary-dark">
              <ArrowDown className="mx-auto" size={32} />
            </a>
          </div>
          
          {/* App mockup showcase - Updated to show realistic app view */}
          <div className="mt-8 md:mt-10 relative">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all hover:shadow-3xl">
              <div className="p-1 bg-gradient-to-r from-primary to-primary-dark">
                <div className="p-2 bg-white rounded-lg">
                  {/* Realistic app mockup */}
                  <div className="relative aspect-[5/3] md:aspect-[16/9] w-full bg-gray-50 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Realistic TrailSynk app mockup */}
                      <div className="flex items-center justify-center w-full h-full">
                        <div className="relative w-full max-w-lg">
                          {/* Device frame */}
                          <div className="relative mx-auto bg-secondary rounded-[3rem] overflow-hidden shadow-xl border-8 border-gray-900" style={{maxWidth: "280px", height: "560px"}}>
                            {/* Top notch bar */}
                            <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 flex justify-center items-end z-20">
                              <div className="w-16 h-4 rounded-b-xl bg-gray-900"></div>
                            </div>
                            
                            {/* App screen */}
                            <div className="h-full rounded-xl overflow-hidden bg-white">
                              {/* App header */}
                              <div className="h-12 bg-primary flex items-center px-4 justify-between">
                                <div className="flex items-center">
                                  <Map className="h-5 w-5 text-white mr-2" />
                                  <div className="text-white font-medium">TrailSynk</div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                                    <Navigation className="h-3 w-3 text-white" />
                                  </div>
                                  <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center">
                                    <Activity className="h-3 w-3 text-white" />
                                  </div>
                                </div>
                              </div>
                              
                              {/* App map view */}
                              <div className="h-[calc(100%-12rem)] bg-gray-100 relative">
                                {/* Map background */}
                                <div className="absolute inset-0 opacity-90" style={{
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%23e5e5e5' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                                  backgroundSize: '50px 50px'
                                }}></div>
                                
                                {/* Roads */}
                                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  <path d="M10,30 L30,30 L30,60 L70,60 L70,80" stroke="#d4d4d4" strokeWidth="4" fill="none" />
                                  <path d="M20,10 L20,40 L50,40 L50,90" stroke="#d4d4d4" strokeWidth="4" fill="none" />
                                  <path d="M80,20 L80,50 L40,50 L40,70 L60,70 L60,90" stroke="#d4d4d4" strokeWidth="4" fill="none" />
                                </svg>
                                
                                {/* Active route */}
                                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  <path d="M20,10 L20,40 L50,40 L50,90" stroke="#2ECC71" strokeWidth="3" fill="none" />
                                  <circle cx="20" cy="10" r="3" fill="#2C3E50" />
                                  <circle cx="50" cy="90" r="3" fill="#2ECC71" />
                                  <circle cx="20" cy="40" r="1.5" fill="#2ECC71" />
                                  <circle cx="50" cy="40" r="1.5" fill="#2ECC71" />
                                </svg>
                                
                                {/* POI markers */}
                                <div className="absolute top-1/4 left-[20%] bg-green-500 h-2 w-2 rounded-full"></div>
                                <div className="absolute bottom-1/3 right-1/3 bg-green-500 h-2 w-2 rounded-full"></div>
                                <div className="absolute top-1/3 right-1/5 bg-red-500 h-2 w-2 rounded-full"></div>
                                
                                {/* User location */}
                                <div className="absolute top-[40%] left-[20%] h-4 w-4 bg-primary rounded-full border-2 border-white shadow-md flex items-center justify-center">
                                  <Bike className="h-2 w-2 text-white" />
                                </div>
                              </div>
                              
                              {/* App stats area */}
                              <div className="h-28 bg-white p-2 space-y-2">
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="bg-gray-50 p-2 rounded-md">
                                    <div className="text-xs text-gray-500">Velocidade</div>
                                    <div className="text-sm font-semibold flex items-center">
                                      <Activity className="h-3 w-3 text-primary mr-1" /> 18.5 km/h
                                    </div>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded-md">
                                    <div className="text-xs text-gray-500">Distância</div>
                                    <div className="text-sm font-semibold">4.7 km</div>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded-md">
                                    <div className="text-xs text-gray-500">Tempo</div>
                                    <div className="text-sm font-semibold">24 min</div>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <div className="flex-grow bg-gray-50 p-2 rounded-md flex items-center space-x-1">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <div className="text-xs">Rota segura recomendada</div>
                                  </div>
                                  <div className="bg-primary text-white rounded-md w-8 flex items-center justify-center">
                                    <Navigation className="h-4 w-4" />
                                  </div>
                                </div>
                              </div>
                              
                              {/* Bottom navigation bar */}
                              <div className="h-12 bg-white border-t border-gray-100 flex justify-around items-center px-4">
                                <Map className="h-6 w-6 text-primary" />
                                <Bike className="h-6 w-6 text-gray-400" />
                                <Activity className="h-6 w-6 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

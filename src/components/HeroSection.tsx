
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, Bike, Navigation, Map } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-white to-gray-50 overflow-hidden pt-20 pb-12">
      {/* New stylized background */}
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

      <div className="container mx-auto px-4 py-8 z-10">
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

          <div className="mt-6 animate-bounce">
            <a href="#features" className="text-primary hover:text-primary-dark">
              <ArrowDown className="mx-auto" size={32} />
            </a>
          </div>
          
          {/* App showcase illustration */}
          <div className="mt-10 md:mt-12 relative">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all hover:shadow-3xl">
              <div className="p-1 bg-gradient-to-r from-primary to-primary-dark">
                <div className="p-2 bg-white rounded-lg">
                  <div className="relative aspect-video md:aspect-[16/9] w-full bg-gray-50 rounded-lg overflow-hidden">
                    {/* Main visualization - cyclist with app interface */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/10"></div>
                      
                      {/* Stylized cyclist silhouette */}
                      <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 h-full flex items-end">
                        <div className="relative h-4/5 w-64">
                          <Bike className="absolute bottom-20 left-10 text-secondary/60" size={80} />
                          <div className="absolute bottom-28 left-24 w-12 h-20 rounded-full bg-secondary/60"></div>
                        </div>
                      </div>
                      
                      {/* App interface mockup */}
                      <div className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                        <div className="w-64 h-96 bg-white rounded-3xl shadow-xl border-4 border-gray-100 overflow-hidden">
                          <div className="h-10 bg-primary w-full flex items-center px-4">
                            <div className="bg-white/25 w-24 h-4 rounded-full"></div>
                            <div className="ml-auto flex space-x-1">
                              <div className="bg-white/25 w-4 h-4 rounded-full"></div>
                              <div className="bg-white/25 w-4 h-4 rounded-full"></div>
                            </div>
                          </div>
                          <div className="p-3 bg-gray-50 h-full">
                            <div className="bg-white rounded-lg shadow-sm h-40 mb-3 p-2">
                              <div className="bg-gray-100 h-full rounded-md flex items-center justify-center">
                                <Map className="text-primary opacity-50" size={32} />
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <div className="bg-white rounded-lg shadow-sm flex-1 h-20 p-2">
                                <div className="bg-gray-100 h-full rounded-md flex items-center justify-center">
                                  <Navigation className="text-primary opacity-50" size={24} />
                                </div>
                              </div>
                              <div className="bg-white rounded-lg shadow-sm flex-1 h-20 p-2">
                                <div className="bg-gray-100 h-full rounded-md flex items-center justify-center">
                                  <Bike className="text-primary opacity-50" size={24} />
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 space-y-2">
                              <div className="bg-white h-4 rounded-full w-full"></div>
                              <div className="bg-white h-4 rounded-full w-3/4"></div>
                              <div className="bg-white h-4 rounded-full w-5/6"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Route lines */}
                      <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M10,50 Q30,30 50,70 T90,50" stroke="#2ECC71" strokeWidth="2" fill="none" strokeDasharray="5,5" />
                        <path d="M20,80 Q40,20 60,60 T90,40" stroke="#1A1F2C" strokeWidth="1" fill="none" />
                      </svg>
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

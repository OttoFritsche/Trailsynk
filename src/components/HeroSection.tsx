import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown, Bike, Navigation, Map, Activity } from 'lucide-react';
const HeroSection: React.FC = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="relative flex items-center justify-center bg-gradient-to-br from-white to-gray-50 overflow-hidden pt-24 pb-12">
      {/* Stylized background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/10"></div>
        
        {/* Map-like pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
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

      <div className="container mx-auto z-10 py-[50px] px-[17px]">
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
            <Button onClick={scrollToWaitlist} size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
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
              <div className="p-1 bg-gradient-to-r from-primary to-primary-dark px-0 mx-0 my-0 py-[11px]">
                <div className="p-2 bg-white rounded-lg">
                  {/* Realistic app mockup */}
                  <div className="relative aspect-[5/3] md:aspect-[16/9] w-full bg-gray-50 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Realistic TrailSynk app mockup */}
                      <div className="flex items-center justify-center w-full h-full py-0 my-0 mx-0 px-0">
                        <div className="relative w-full max-w-lg py-0 px-0 rounded-sm mx-0 my-0">
                          {/* Device frame */}
                          
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
    </section>;
};
export default HeroSection;
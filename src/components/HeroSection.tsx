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
  return <section className="relative flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* Image background */}
        <div className="absolute inset-0 opacity-15">
          <img src="/lovable-uploads/c4ff46a9-7875-4056-aaac-a24ddd966ecc.png" alt="TrailSynk App Background" className="w-full h-full object-cover object-center" />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 to-gray-50/95"></div>
        
        {/* Map-like pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232ECC71' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }}>
        </div>
        
        {/* Stylized cycling routes that pass through the image */}
        <div className="absolute inset-0 opacity-40">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" stroke="#2ECC71" strokeWidth="1" fill="none" />
            <path d="M0,60 Q30,40 60,70 T100,60" stroke="#1A1F2C" strokeWidth="1" fill="none" />
            <path d="M0,40 Q40,60 70,30 T100,40" stroke="#2ECC71" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto z-10 py-10 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-[44px] px-[240px]">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl mb-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent animate-fade-in py-[40px] text-left mx-0 my-[50px] px-[67px] font-extrabold md:text-6xl">Pedale Mais Longe, Mais Seguro. Com a Inteligência TrailSynk.</h1>
            
            <h2 className="text-lg sm:text-xl text-secondary/80 mb-6 max-w-3xl mx-auto lg:mx-0 animate-fade-in py-[15px] px-[23px] md:text-3xl">Desbloqueie novas aventuras com rotas otimizadas por IA para seu estilo de pedal, receba insights de manutenção e conecte-se com ciclistas que compartilham sua paixão.</h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 animate-fade-in">
              <Button onClick={scrollToWaitlist} size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Quero Meu Assessor Ciclista!
              </Button>
            </div>

            <div className="mt-8 animate-bounce lg:hidden">
              <a href="#features" className="text-primary hover:text-primary-dark">
                <ArrowDown className="mx-auto" size={32} />
              </a>
            </div>
          </div>
          
          {/* Right column - App mockup image */}
          <div className="flex justify-center lg:justify-end items-center animate-fade-in">
            <div className="relative">
              
              {/* Decorative glow effect */}
              <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;
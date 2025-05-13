
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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        {/* Image background */}
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/0c071c4c-605b-4448-86c6-49d7c410ee82.png" 
            alt="Ciclistas na floresta" 
            className="w-full h-full object-cover object-center" 
          />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        
        {/* Map-like pattern overlay */}
        <div className="absolute inset-0 opacity-15" style={{
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

      <div className="container mx-auto z-10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Text content */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
              Pedale Mais Longe, <span className="text-primary">Mais Seguro.</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto font-light">
              Desbloqueie novas aventuras com rotas otimizadas por IA para seu estilo de pedal, 
              receba insights de manutenção e conecte-se com ciclistas que compartilham sua paixão.
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                onClick={scrollToWaitlist} 
                size="lg" 
                className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:-translate-y-1"
              >
                Quero Meu Assessor Ciclista!
              </Button>
            </div>
          </div>

          <div className="mt-12 animate-bounce">
            <a href="#features" className="text-white hover:text-primary transition-colors">
              <ArrowDown className="mx-auto" size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

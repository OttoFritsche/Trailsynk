
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex items-center justify-center bg-gradient-to-br from-white to-gray-50 overflow-hidden pt-10 pb-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/90"></div>
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

          <div className="mt-8 animate-bounce">
            <a href="#features" className="text-primary hover:text-primary-dark">
              <ArrowDown className="mx-auto" size={32} />
            </a>
          </div>
          
          <div className="mt-6 md:mt-10 relative">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform rotate-1 transition-all hover:rotate-0">
              <div className="p-1 bg-gradient-to-r from-primary to-primary-dark">
                <div className="p-2 bg-white">
                  <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" alt="TrailSynk app interface mockup" className="rounded w-full" />
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

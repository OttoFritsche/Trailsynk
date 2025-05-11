
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
    <section className="relative flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Dynamic background with video overlay */}
      <div className="absolute inset-0 z-0">
        {/* Video background */}
        <div className="absolute inset-0 opacity-20">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="https://vod-progressive.akamaized.net/exp=1716890917~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4894%2F15%2F399620466%2F1701961159.mp4~hmac=ef2fc36e8558f70fe999b44df37dc5bf86d3f8698a40e1ccd5ea7c5ff6b782ac/vimeo-prod-skyfire-std-us/01/4894/15/399620466/1701961159.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl mb-4 font-bold md:text-6xl bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent animate-fade-in">
              Descubra Sua Pedalada Perfeita: Rotas Mais Seguras, Mais Eficientes com IA
            </h1>
            
            <h2 className="text-lg sm:text-xl text-secondary/80 mb-6 max-w-3xl mx-auto lg:mx-0 animate-fade-in">
              Desbloqueie novas aventuras com rotas otimizadas por IA para seu estilo de pedal, receba insights de manutenção e conecte-se com ciclistas que compartilham sua paixão.
            </h2>
            
            {/* Interactive route search mockup */}
            <div className="bg-white p-4 rounded-lg shadow-lg mb-6 animate-fade-in relative overflow-hidden">
              <div className="flex items-center mb-3">
                <Map className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-medium">Encontre sua próxima aventura</h3>
              </div>
              
              <div className="flex gap-2">
                <div className="bg-gray-50 rounded-lg p-3 flex-grow">
                  <div className="flex items-center text-gray-500">
                    <input 
                      type="text" 
                      placeholder="Onde você quer pedalar hoje?" 
                      className="bg-transparent border-none outline-none w-full text-sm"
                    />
                  </div>
                </div>
                <Button className="bg-primary text-white px-3">
                  <Navigation className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Animated typing effect */}
              <div className="mt-2 text-sm text-gray-500">
                <span className="font-medium text-primary">Sugestões populares:</span>
                <div className="inline-block ml-2 overflow-hidden border-r-2 border-primary whitespace-nowrap animate-pulse">
                  <span className="typing-animation">Trilhas na Serra, Ciclovia Beira-Mar...</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 animate-fade-in">
              <Button onClick={scrollToWaitlist} size="lg" className="bg-primary hover:bg-primary-dark text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                Quero Meu Assessor Ciclista!
              </Button>
              
              <div className="text-sm text-secondary/70 flex items-center">
                <span className="inline-block animate-pulse bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 mr-2">NOVO</span>
                Integrações com Strava e Garmin
              </div>
            </div>

            {/* Social proof */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-sm italic text-gray-600 relative animate-fade-in">
              <div className="absolute -top-2 -left-2 text-primary text-2xl">"</div>
              <p>Encontrei rotas incríveis que nunca imaginei existir na minha cidade!</p>
              <div className="flex items-center justify-end mt-2">
                <span className="font-medium text-xs">- Marina S., ciclista urbana</span>
              </div>
              <div className="absolute -bottom-2 -right-2 text-primary text-2xl">"</div>
            </div>

            <div className="mt-8 animate-bounce hidden md:block">
              <a href="#features" className="text-primary hover:text-primary-dark">
                <ArrowDown className="mx-auto" size={32} />
              </a>
            </div>
          </div>
          
          {/* Right column - App mockup image */}
          <div className="flex justify-center lg:justify-end items-center animate-fade-in">
            <div className="relative">
              {/* App mockup with phone frame */}
              <div className="relative max-w-[300px] mx-auto">
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-secondary shadow-xl">
                  <img 
                    src="/lovable-uploads/e8d29d1f-b87b-45a9-93c1-55d12ffee19c.png" 
                    alt="TrailSynk App Interface" 
                    className="w-full h-auto"
                  />
                  
                  {/* Animated route overlay */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                    <div className="absolute h-2 w-2 bg-primary rounded-full" style={{ 
                      top: '40%', 
                      left: '30%',
                      animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' 
                    }}></div>
                    <div className="absolute h-2 w-2 bg-red-500 rounded-full" style={{ 
                      top: '60%', 
                      left: '70%',
                      animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s' 
                    }}></div>
                  </div>
                </div>
                
                {/* Decorative glow effect */}
                <div className="absolute -inset-1 bg-primary/20 rounded-[3rem] blur-xl -z-10"></div>
                
                {/* Floating safety badge */}
                <div className="absolute -right-12 top-10 bg-white p-2 rounded-lg shadow-lg flex items-center animate-pulse">
                  <Shield className="h-4 w-4 text-primary mr-1" />
                  <span className="text-xs font-medium">Rota Segura</span>
                </div>
                
                {/* Floating stats badge */}
                <div className="absolute -left-12 bottom-20 bg-white p-2 rounded-lg shadow-lg flex items-center animate-pulse">
                  <Activity className="h-4 w-4 text-primary mr-1" />
                  <span className="text-xs font-medium">+15% Performance</span>
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

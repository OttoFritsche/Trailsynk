
import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <img 
              src="/lovable-uploads/c6ac0b91-7542-4299-8422-3007983a958b.png" 
              alt="TrailSynk Logo" 
              className="h-10 w-auto"
            />
          </a>
        </div>

        <div className="hidden md:flex space-x-6 text-secondary text-sm">
          <a href="#features" className="hover:text-primary transition-colors">Recursos</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">Como Funciona</a>
          <a href="#testimonials" className="hover:text-primary transition-colors">Depoimentos</a>
          <a href="#roadmap" className="hover:text-primary transition-colors">Roadmap</a>
        </div>

        <Button 
          onClick={scrollToWaitlist} 
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2"
        >
          Entrar na Lista VIP
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

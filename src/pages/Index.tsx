
import React, { useEffect } from 'react';
import { setupAnimations } from '@/lib/animations';
import { Helmet } from 'react-helmet';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import RoadmapSection from '@/components/RoadmapSection';
import WaitlistSection from '@/components/WaitlistSection';
import FooterSection from '@/components/FooterSection';

const Index = () => {
  useEffect(() => {
    setupAnimations();
  }, []);

  return (
    <>
      <Helmet>
        <title>TrailSynk | Seu Assessor Ciclista Inteligente: Rotas Seguras e Personalizadas</title>
        <meta name="description" content="Inscreva-se no TrailSynk e revolucione seus pedais com IA! Descubra rotas seguras, insights de performance, lembretes de manutenção e uma comunidade ciclista vibrante." />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <RoadmapSection />
          <WaitlistSection />
        </main>
        
        <FooterSection />
      </div>
    </>
  );
};

export default Index;

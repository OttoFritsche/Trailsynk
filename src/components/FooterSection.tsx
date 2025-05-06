
import React from 'react';

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">
              Trail<span className="text-primary">Synk</span>
            </h3>
            <p className="text-gray-400 max-w-xs">
              Revolucionando a experiência dos ciclistas com inteligência artificial para uma pedalada mais segura, personalizada e conectada.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-primary transition-colors">Recursos</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-primary transition-colors">Como Funciona</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-primary transition-colors">Depoimentos</a></li>
              <li><a href="#roadmap" className="text-gray-400 hover:text-primary transition-colors">Roadmap</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Social</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {currentYear} TrailSynk. Todos os direitos reservados.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Termos de Uso</a>
            <a href="#" className="hover:text-primary">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

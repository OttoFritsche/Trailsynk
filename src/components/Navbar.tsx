
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavLogo from './navigation/NavLogo';
import NavItem from './navigation/NavItem';
import MobileNav from './navigation/MobileNav';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Itens de navegação atualizados com links claros
  const navItems = [
    { name: 'Início', href: '/', active: true },
    { name: 'Recursos', href: '#features' },
    { name: 'Como Funciona', href: '#how-it-works' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Roadmap', href: '#roadmap' },
  ];
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between p-4">
        <NavLogo />
        
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavItem
              key={item.name}
              name={item.name}
              href={item.href}
              active={item.active}
              className="px-3 py-2"
            />
          ))}
          
          <div className="ml-4 flex items-center gap-3">
            <Button variant="outline" asChild>
              <RouterLink to="/auth?mode=login">Login</RouterLink>
            </Button>
            <Button className="bg-primary hover:bg-primary-dark" asChild>
              <RouterLink to="/auth?mode=signup">Cadastre-se</RouterLink>
            </Button>
          </div>
        </div>
        
        <MobileNav 
          navItems={navItems}
          open={isMenuOpen}
          setOpen={setIsMenuOpen}
        />
      </div>
    </header>
  );
};

export default Navbar;

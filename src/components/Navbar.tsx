
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NavItem, { NavItemProps } from './navigation/NavItem';
import NavLogo from './navigation/NavLogo';
import MobileNav from './navigation/MobileNav';

// Constantes
const NAV_ITEMS: NavItemProps[] = [
  { name: 'Recursos', href: '#recursos' },
  { name: 'Como Funciona', href: '#como-funciona' },
  { name: 'Depoimentos', href: '#depoimentos' },
  { name: 'Roadmap', href: '#roadmap' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Determine active section based on scroll position
      const sections = NAV_ITEMS.map(item => item.href.replace('#', ''));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveItem(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
      aria-label="Navegação principal"
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4 max-w-7xl">
        <NavLogo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-6">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.name}
                name={item.name}
                href={item.href}
                active={`#${activeItem}` === item.href}
              />
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/auth?mode=login">
              <Button variant="ghost" size="sm" className="font-medium">
                Login
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button size="sm" className="font-medium">
                Cadastre-se
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav 
          navItems={NAV_ITEMS} 
          open={mobileMenuOpen} 
          setOpen={setMobileMenuOpen} 
        />
      </div>
    </nav>
  );
};

export default Navbar;

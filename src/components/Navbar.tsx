
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Bike, ChevronDown } from 'lucide-react';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: 'Recursos', href: '#recursos' },
    { name: 'Como Funciona', href: '#como-funciona' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Roadmap', href: '#roadmap' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}
      aria-label="Navegação principal"
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4 max-w-7xl">
        <Link to="/" className="flex items-center space-x-2" aria-label="TrailSynk Home">
          <Bike className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl text-primary">TrailSynk</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary transition-colors font-medium text-sm"
              >
                {item.name}
              </a>
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
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-1" 
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[75vw] sm:w-[350px]">
              <div className="flex flex-col space-y-6 py-6">
                <Link 
                  to="/" 
                  className="flex items-center space-x-2 mb-6" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Bike className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl text-primary">TrailSynk</span>
                </Link>
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <a 
                      key={item.name}
                      href={item.href}
                      className="text-gray-600 hover:text-primary py-2 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col space-y-3 pt-4 border-t">
                  <Link to="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">
                      Cadastre-se
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

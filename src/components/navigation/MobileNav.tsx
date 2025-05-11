
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import NavLogo from './NavLogo';
import { NavItemProps } from './NavItem';

interface MobileNavProps {
  navItems: NavItemProps[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ navItems, open, setOpen }) => {
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1" 
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[75vw] sm:w-[350px]">
          <div className="flex flex-col space-y-6 py-6">
            <NavLogo onClick={() => setOpen(false)} />
            
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-primary py-2 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            <div className="flex flex-col space-y-3 pt-4 border-t">
              <RouterLink to="/auth?mode=login" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  Login
                </Button>
              </RouterLink>
              <RouterLink to="/auth?mode=signup" onClick={() => setOpen(false)}>
                <Button className="w-full">
                  Cadastre-se
                </Button>
              </RouterLink>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;

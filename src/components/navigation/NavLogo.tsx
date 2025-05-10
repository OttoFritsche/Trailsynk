
import React from 'react';
import { Link } from 'react-router-dom';
import { Bike } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLogoProps {
  className?: string;
  onClick?: () => void;
}

const NavLogo: React.FC<NavLogoProps> = ({ className, onClick }) => {
  return (
    <Link 
      to="/" 
      className={cn("flex items-center space-x-2", className)} 
      aria-label="TrailSynk Home"
      onClick={onClick}
    >
      <Bike className="h-6 w-6 text-primary" />
      <span className="font-bold text-xl text-primary">TrailSynk</span>
    </Link>
  );
};

export default NavLogo;

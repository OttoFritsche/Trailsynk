
import React from 'react';
import { cn } from '@/lib/utils';

export interface NavItemProps {
  name: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  isScrolled?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  name,
  href,
  active,
  onClick,
  className,
  isScrolled = false,
}) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "transition-colors font-medium text-sm",
        isScrolled 
          ? "text-gray-600 hover:text-primary" 
          : "text-white hover:text-gray-200",
        active && (isScrolled ? "text-primary" : "text-gray-200"),
        className
      )}
      aria-current={active ? 'page' : undefined}
    >
      {name}
    </a>
  );
};

export default NavItem;

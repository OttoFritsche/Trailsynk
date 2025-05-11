
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface NavItemProps {
  name: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  name,
  href,
  active,
  onClick,
  className,
}) => {
  // Verificar se é um link interno ou âncora
  const isInternalLink = href.startsWith('/');
  
  if (isInternalLink) {
    return (
      <Link
        to={href}
        onClick={onClick}
        className={cn(
          "text-gray-600 hover:text-primary transition-colors font-medium text-sm",
          active && "text-primary",
          className
        )}
        aria-current={active ? 'page' : undefined}
      >
        {name}
      </Link>
    );
  }
  
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "text-gray-600 hover:text-primary transition-colors font-medium text-sm",
        active && "text-primary",
        className
      )}
      aria-current={active ? 'page' : undefined}
    >
      {name}
    </a>
  );
};

export default NavItem;

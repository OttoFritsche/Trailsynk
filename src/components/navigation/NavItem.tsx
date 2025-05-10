
import React from 'react';
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

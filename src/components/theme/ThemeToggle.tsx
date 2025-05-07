
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'icon' | 'button';
  size?: 'default' | 'sm';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className,
  variant = 'icon',
  size = 'default'
}) => {
  const { theme, toggleTheme } = useTheme();
  
  if (variant === 'button') {
    return (
      <Button
        variant="ghost"
        size={size}
        onClick={toggleTheme}
        className={cn("gap-2", className)}
      >
        {theme === 'dark' ? (
          <>
            <Sun className="h-4 w-4" />
            <span>Light Mode</span>
          </>
        ) : (
          <>
            <Moon className="h-4 w-4" />
            <span>Dark Mode</span>
          </>
        )}
      </Button>
    );
  }
  
  return (
    <Button
      variant="ghost"
      size={size === 'default' ? 'icon' : 'sm'}
      onClick={toggleTheme}
      className={cn("rounded-full", className)}
      aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === 'dark' ? (
        <Sun className={size === 'default' ? "h-5 w-5" : "h-4 w-4"} />
      ) : (
        <Moon className={size === 'default' ? "h-5 w-5" : "h-4 w-4"} />
      )}
    </Button>
  );
};

export default ThemeToggle;


import React from 'react';
import { cn } from '@/lib/utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: number | string;
  children: React.ReactNode;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns = 3, gap = 4, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          `grid grid-cols-1 md:grid-cols-${columns} gap-${gap}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

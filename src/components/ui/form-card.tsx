
import React, { ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FormCardProps {
  title?: string;
  description?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormCard = ({
  title,
  description,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  children,
  footer,
  onSubmit,
}: FormCardProps) => {
  const content = (
    <Card className={cn("w-full", className)}>
      {(title || description) && (
        <CardHeader className={headerClassName}>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn("pt-0", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("flex justify-between", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );

  if (onSubmit) {
    return (
      <form onSubmit={onSubmit} className="w-full">
        {content}
      </form>
    );
  }

  return content;
};

export default FormCard;

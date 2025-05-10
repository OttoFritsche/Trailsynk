
import React from 'react';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from './form';
import { Input } from './input';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';

interface InputRowProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  min?: number;
  max?: number;
  step?: number;
}

const InputRow: React.FC<InputRowProps> = ({
  form,
  name,
  label,
  placeholder,
  description,
  type = 'text',
  required = false,
  className,
  disabled = false,
  defaultValue,
  min,
  max,
  step,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Input 
              placeholder={placeholder} 
              type={type} 
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputRow;

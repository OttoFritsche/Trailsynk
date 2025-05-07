
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TrainingMenu from './TrainingMenu';

interface MobileTrainingMenuProps {
  isActive: boolean;
}

const MobileTrainingMenu: React.FC<MobileTrainingMenuProps> = ({ isActive }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(
          "flex flex-col items-center justify-center px-2",
          isActive ? "text-primary" : "text-muted-foreground"
        )}>
          <BarChart2 className="h-5 w-5" />
          <span className="text-xs mt-1">Treinamento</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56">
        <DropdownMenuLabel>Treinamento</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <TrainingMenu isActive={isActive} isMobile={true} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileTrainingMenu;

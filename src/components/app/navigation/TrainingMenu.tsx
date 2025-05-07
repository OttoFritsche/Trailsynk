
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar,
  Activity,
  BarChart2,
  LineChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface TrainingMenuProps {
  isActive: boolean;
  isMobile?: boolean;
}

const trainingItems = [
  { to: '/app/training/calendar', icon: Calendar, label: 'Calendário', activePath: '/app/training/calendar' },
  { to: '/app/training/activities', icon: Activity, label: 'Minhas Atividades', activePath: '/app/training/activities' },
  { to: '/app/training/weekly', icon: BarChart2, label: 'Controle Semanal', activePath: '/app/training/weekly' },
  { to: '/app/training/performance', icon: LineChart, label: 'Performance e Prontidão', activePath: '/app/training/performance' },
];

const TrainingMenu: React.FC<TrainingMenuProps> = ({ isActive, isMobile }) => {
  const getActiveStyles = (active: boolean) => {
    return active 
      ? "text-primary border-primary" 
      : "text-muted-foreground border-transparent hover:text-foreground hover:border-gray-300";
  };

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-1">
        {trainingItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              "px-3 py-1.5 border-b-2 transition-colors flex items-center text-sm h-auto",
              getActiveStyles(isActive)
            )}
          >
            <BarChart2 className="h-4 w-4 mr-1.5" />
            Treinamento
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-2 p-2">
              {trainingItems.map((item) => (
                <li key={item.to}>
                  <NavigationMenuLink asChild>
                    <Link 
                      to={item.to} 
                      className="flex items-center gap-2 p-2 hover:bg-accent rounded-md"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default TrainingMenu;

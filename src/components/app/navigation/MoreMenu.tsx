
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  Medal, 
  Users, 
  MapPin,
  UserPlus,
  Settings,
  Bot,
  MessageCircle,
  BadgeDollarSign,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MoreMenuProps {
  currentPath: string;
  mobileView?: boolean;
}

const MoreMenu: React.FC<MoreMenuProps> = ({ currentPath, mobileView = false }) => {
  const moreNavItems = [
    { to: '/app/statistics', icon: BarChart2, label: 'Estatísticas', activePath: '/app/statistics' },
    { to: '/app/badges', icon: Medal, label: 'Conquistas', activePath: '/app/badges' },
    { to: '/app/groups', icon: Users, label: 'Grupos', activePath: '/app/groups' },
    { to: '/app/trails', icon: MapPin, label: 'Trails', activePath: '/app/trails' },
    { to: '/app/find-cyclists', icon: UserPlus, label: 'Encontrar', activePath: '/app/find-cyclists' },
    { to: '/app/messages', icon: MessageCircle, label: 'Mensagens', activePath: '/app/messages' },
    { to: '/app/ai-assistant', icon: Bot, label: 'Assessor IA', activePath: '/app/ai-assistant' },
    { to: '/app/subscription', icon: BadgeDollarSign, label: 'Planos', activePath: '/app/subscription' },
    { to: '/app/settings', icon: Settings, label: 'Configurações', activePath: '/app/settings' },
  ];

  const isActive = (path: string) => {
    return currentPath.startsWith(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {mobileView ? (
          <button className="flex flex-col items-center justify-center px-2 text-muted-foreground">
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-xs mt-1">Mais</span>
          </button>
        ) : (
          <Button variant="ghost" size="sm" className="px-3 py-1.5 h-auto">
            <MoreHorizontal className="h-4 w-4 mr-1.5" />
            Mais
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={mobileView ? "center" : "end"} className="w-56">
        {mobileView && (
          <>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {moreNavItems.map((item) => (
          <DropdownMenuItem key={item.to} asChild>
            <Link 
              to={item.to} 
              className={cn(
                "flex items-center gap-2",
                isActive(item.activePath) ? "text-primary font-medium" : ""
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreMenu;

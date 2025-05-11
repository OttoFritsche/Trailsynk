import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Home, Route, Users, MessageSquare, Menu, Calendar, Apple } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavLogo from '@/components/navigation/NavLogo';
import NavItem from '@/components/navigation/NavItem';
import { useAuth } from '@/hooks/useAuth';

interface MobileNavigationProps {
  user: any;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ user }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { name: "Home", href: "/app", icon: Home },
    { name: "Rotas", href: "/app/routes", icon: Route },
    { name: "Grupos", href: "/app/groups", icon: Users },
    { name: "Mensagens", href: "/app/messages", icon: MessageSquare },
    { name: "Treinos", href: "/app/training/weekly", icon: Calendar },
    { name: "Nutrição", href: "/app/nutrition", icon: Apple },
    { name: "Mais", onClick: () => setIsDrawerOpen(true), icon: Menu },
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsDrawerOpen(false);
  };

  return (
    <div className="md:hidden">
      <div className="bg-white border-b py-2 px-4 flex items-center justify-between">
        <NavLogo />
        <div className="flex items-center space-x-2">
          {navItems.map((item, index) => (
            item.href ? (
              <NavItem
                key={index}
                href={item.href}
                name={item.name}
                active={location.pathname.startsWith(item.href)}
                className="hidden first:block"
              />
            ) : (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                onClick={item.onClick}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Button>
            )
          ))}
        </div>
      </div>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="bottom" className="bg-white">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              Navegue pelo TrailSynk
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="px-4">
              <Link to="/app/profile" className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name} />
                  <AvatarFallback>{user?.user_metadata?.full_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name}</p>
                  <p className="text-sm text-muted-foreground">@{user?.user_metadata?.username}</p>
                </div>
              </Link>
            </div>
            {navItems.map((item, index) => (
              item.href ? (
                <Link to={item.href} key={index} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsDrawerOpen(false)}>
                  {item.name}
                </Link>
              ) : null
            ))}
            <Button variant="ghost" className="justify-start" onClick={handleSignOut}>
              Sair
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;

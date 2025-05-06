
import React from 'react';
import { 
  Users, 
  LayoutDashboard,
  List,
  Settings,
  Search
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FutureSectionPlaceholderProps {
  title: string;
  description: string;
  icon: "users" | "layout-dashboard" | "list" | "settings" | "search";
}

const FutureSectionPlaceholder: React.FC<FutureSectionPlaceholderProps> = ({ 
  title, 
  description, 
  icon 
}) => {
  const getIcon = () => {
    switch(icon) {
      case "users": return <Users size={20} />;
      case "layout-dashboard": return <LayoutDashboard size={20} />;
      case "list": return <List size={20} />;
      case "settings": return <Settings size={20} />;
      case "search": return <Search size={20} />;
      default: return <LayoutDashboard size={20} />;
    }
  };

  return (
    <Card className="border-dashed hover:border-primary/50 hover:bg-primary/5 transition-colors">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {getIcon()}
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary/5 rounded-lg h-16 flex items-center justify-center">
          <p className="text-secondary/40 text-sm">Em breve</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FutureSectionPlaceholder;

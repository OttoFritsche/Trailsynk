
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="flex items-center gap-1"
          >
            <ChevronLeft size={16} />
            <span>Voltar ao Site</span>
          </Button>
          <div className="h-4 border-l border-gray-200"></div>
          <div className="font-semibold text-secondary">
            TrailSynk Admin
          </div>
        </div>
        
        {/* Placeholder para futuro menu ou opções de usuário */}
        <div>
          {/* Para futuras iterações: <UserMenu /> */}
        </div>
      </div>
      
      <div className="container mx-auto p-6 max-w-7xl">
        {children}
      </div>
      
      <div className="p-4 border-t bg-white text-center text-xs text-secondary/60 mt-10">
        <p>TrailSynk Admin Panel v0.1 - Restrito a uso administrativo</p>
      </div>
    </div>
  );
};

export default AdminLayout;

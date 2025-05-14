
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { stravaService } from '@/api/apiService';

interface SocialAuthButtonsProps {
  loading?: boolean;
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ loading }) => {
  const handleStravaLogin = () => {
    toast.info('Redirecionando para autenticação do Strava...');
    
    // Usando o serviço de API para iniciar o processo de autenticação do Strava
    stravaService.initiateStravaAuth();
  };

  const handleGoogleLogin = () => {
    toast.info('Funcionalidade de login com Google em breve disponível...');
    // Implementação futura
  };

  return (
    <>
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-4 text-gray-500 font-medium">ou continue com</span>
        </div>
      </div>
      
      <div className="grid gap-4">
        <Button 
          variant="outline" 
          className="w-full bg-[#FC4C02] hover:bg-[#FB5B1F] text-white hover:text-white border-0 font-medium h-12 shadow-md hover:shadow-lg transition-all duration-300"
          onClick={handleStravaLogin}
          disabled={loading}
        >
          <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" 
                  fill="currentColor"/>
          </svg>
          Login com Strava
        </Button>
        <Button 
          variant="outline" 
          className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium h-12 shadow-sm hover:shadow-md transition-all duration-300"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          {/* Usando SVG inline para o ícone do Google */}
          <svg className="mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" 
                  fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" 
                  fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" 
                  fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" 
                  fill="#EA4335"/>
          </svg>
          Login com Google
        </Button>
      </div>
    </>
  );
};

export default SocialAuthButtons;

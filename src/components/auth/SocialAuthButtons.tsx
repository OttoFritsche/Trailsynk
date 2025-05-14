
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { stravaService } from '@/api/apiService';
import { Google } from 'lucide-react';

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
          <Google className="mr-3 h-5 w-5" />
          Login com Google
        </Button>
      </div>
    </>
  );
};

export default SocialAuthButtons;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import { stravaService } from '@/api/apiService';

interface SocialAuthButtonsProps {
  loading?: boolean;
}

const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({ loading }) => {
  const handleStravaLogin = () => {
    toast.info('Redirecionando para autenticação do Strava...');
    
    // Usando o novo serviço de API para iniciar o processo de autenticação do Strava
    stravaService.initiateStravaAuth();
  };

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-card px-2 text-muted-foreground">ou continue com</span>
        </div>
      </div>
      
      <div className="grid gap-2">
        <Button 
          variant="outline" 
          className="w-full bg-[#FC4C02] hover:bg-[#FB5B1F] text-white hover:text-white border-0"
          onClick={handleStravaLogin}
          disabled={loading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" 
                  fill="currentColor"/>
          </svg>
          Login com Strava
        </Button>
        <Button variant="outline" className="w-full" disabled={loading}>
          <Mail className="mr-2 h-4 w-4" />
          Login com Google
        </Button>
      </div>
    </>
  );
};

export default SocialAuthButtons;

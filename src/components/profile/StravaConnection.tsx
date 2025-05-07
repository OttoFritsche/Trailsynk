
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface StravaConnectionProps {
  isConnectedToStrava: boolean;
  handleStravaConnect: () => void;
}

const StravaConnection: React.FC<StravaConnectionProps> = ({
  isConnectedToStrava,
  handleStravaConnect
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" 
                  fill={isConnectedToStrava ? "#FC4C02" : "currentColor"}/>
          </svg>
          Conexão com Strava
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {isConnectedToStrava ? (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Conectado</Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Desconectado</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {isConnectedToStrava 
                ? 'Sua conta está conectada ao Strava. Seus dados de atividades estão sendo sincronizados.' 
                : 'Conecte sua conta Strava para sincronizar automaticamente suas atividades e estatísticas.'}
            </p>
          </div>
          <Button 
            onClick={handleStravaConnect}
            className={isConnectedToStrava 
              ? "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50" 
              : "bg-[#FC4C02] hover:bg-[#E34302] text-white"}
          >
            {isConnectedToStrava ? 'Reconectar' : 'Conectar Strava'}
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StravaConnection;

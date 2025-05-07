
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Settings as SettingsIcon, User, Bell, Shield, Globe, Link, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const [unitsSystem, setUnitsSystem] = useState('metric'); // 'metric' ou 'imperial'
  const [language, setLanguage] = useState('pt-BR'); // 'pt-BR', 'en-US', etc.
  const [profileVisibility, setProfileVisibility] = useState('public'); // 'public' ou 'private'
  
  // Estado para interruptores (switches) de notificações
  const [notifyRides, setNotifyRides] = useState(true);
  const [notifyGroups, setNotifyGroups] = useState(true);
  const [notifyAchievements, setNotifyAchievements] = useState(true);
  const [notifyFriends, setNotifyFriends] = useState(true);
  const [notifyComments, setNotifyComments] = useState(true);
  
  // Estado para conexões externas
  const [stravaConnected, setStravaConnected] = useState(false);
  
  const handleEditProfile = () => {
    navigate('/app/profile/complete');
  };
  
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth');
      toast.success('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      toast.error('Erro ao fazer logout');
    }
  };
  
  const handleStravaConnection = () => {
    if (stravaConnected) {
      setStravaConnected(false);
      toast.success('Desconectado do Strava');
    } else {
      setStravaConnected(true);
      toast.success('Conectado ao Strava');
    }
  };
  
  const handleSaveSettings = () => {
    toast.success('Configurações salvas com sucesso');
  };

  return (
    <>
      <Helmet>
        <title>Configurações | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e configurações da conta.
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="privacy">Privacidade</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="connections">Conexões</TabsTrigger>
          </TabsList>
          
          {/* Aba: Configurações Gerais */}
          <TabsContent value="general" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Unidades de Medida</CardTitle>
                <CardDescription>
                  Escolha como as medidas serão exibidas para você em todo o aplicativo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={unitsSystem} 
                  onValueChange={setUnitsSystem}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metric" id="metric" />
                    <Label htmlFor="metric">Métrico (km, metros, kg)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imperial" id="imperial" />
                    <Label htmlFor="imperial">Imperial (milhas, pés, libras)</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Idioma</CardTitle>
                <CardDescription>
                  Escolha o idioma de exibição do aplicativo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={language} 
                  onValueChange={setLanguage}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pt-BR" id="pt-BR" />
                    <Label htmlFor="pt-BR">Português (Brasil)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en-US" id="en-US" />
                    <Label htmlFor="en-US">English (US)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="es" id="es" />
                    <Label htmlFor="es">Español</Label>
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Salvar Alterações</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Aba: Privacidade */}
          <TabsContent value="privacy" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Visibilidade do Perfil</CardTitle>
                <CardDescription>
                  Controle quem pode ver seu perfil, atividades e estatísticas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={profileVisibility} 
                  onValueChange={setProfileVisibility}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Público (visível para todos)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Privado (somente para suas conexões)</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Localização e Mapas</CardTitle>
                <CardDescription>
                  Defina como seus dados de localização são utilizados.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="location-tracking" className="font-medium">Rastreamento de Localização</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir que o app rastreie sua localização durante os pedais
                    </p>
                  </div>
                  <Switch id="location-tracking" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="location-sharing" className="font-medium">Compartilhamento de Localização</Label>
                    <p className="text-sm text-muted-foreground">
                      Compartilhar sua localização com membros do grupo durante pedais
                    </p>
                  </div>
                  <Switch id="location-sharing" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Salvar Preferências</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Aba: Notificações */}
          <TabsContent value="notifications" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificações</CardTitle>
                <CardDescription>
                  Escolha quais tipos de notificações você deseja receber.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-rides" className="font-medium">Pedais</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações sobre novos pedais e atualizações
                    </p>
                  </div>
                  <Switch id="notify-rides" checked={notifyRides} onCheckedChange={setNotifyRides} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-groups" className="font-medium">Grupos</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações sobre atividades e convites de grupos
                    </p>
                  </div>
                  <Switch id="notify-groups" checked={notifyGroups} onCheckedChange={setNotifyGroups} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-achievements" className="font-medium">Conquistas</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações sobre medalhas e metas alcançadas
                    </p>
                  </div>
                  <Switch id="notify-achievements" checked={notifyAchievements} onCheckedChange={setNotifyAchievements} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-friends" className="font-medium">Conexões</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações sobre solicitações e atividades de conexões
                    </p>
                  </div>
                  <Switch id="notify-friends" checked={notifyFriends} onCheckedChange={setNotifyFriends} />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-comments" className="font-medium">Comentários e Curtidas</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificações sobre interações em suas atividades
                    </p>
                  </div>
                  <Switch id="notify-comments" checked={notifyComments} onCheckedChange={setNotifyComments} />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>Salvar Preferências</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Aba: Conexões */}
          <TabsContent value="connections" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Conexões Externas</CardTitle>
                <CardDescription>
                  Conecte-se com outros serviços para importar e compartilhar suas atividades.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 mr-4 rounded-full bg-orange-500 flex items-center justify-center">
                      <Link className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Strava</p>
                      <p className="text-sm text-muted-foreground">
                        {stravaConnected 
                          ? 'Conectado: Importação automática de atividades ativada'
                          : 'Desconectado: Conecte para importar atividades'}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant={stravaConnected ? "outline" : "default"}
                    onClick={handleStravaConnection}
                  >
                    {stravaConnected ? 'Desconectar' : 'Conectar'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conta</CardTitle>
                <CardDescription>
                  Gerencie as configurações da sua conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleEditProfile}
                >
                  <User className="mr-2 h-4 w-4" />
                  Editar Perfil
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair da Conta
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;

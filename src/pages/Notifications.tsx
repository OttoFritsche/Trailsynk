
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Bell, Check, X, UserPlus, Award, Route, MessageSquare, Heart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { NotificationItem } from '@/components/notifications/NotificationItem';

// Interface para as notificações
interface Notification {
  id: string;
  type: 'connection' | 'group' | 'ride' | 'achievement' | 'like' | 'comment' | 'system';
  title: string;
  message: string;
  fromUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
  entityId?: string; // ID da entidade relacionada (grupo, pedal, etc)
  entityName?: string;
  date: Date;
  read: boolean;
  actionable: boolean; // Se a notificação requer ação do usuário
}

// Mock para notificações
const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'connection',
    title: 'Novo convite de Trail',
    message: 'te enviou um convite de Trail',
    fromUser: {
      id: 'user1',
      name: 'Mariana Santos',
      avatar: ''
    },
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    read: false,
    actionable: true
  },
  {
    id: 'notif2',
    type: 'group',
    title: 'Convite para grupo',
    message: 'te convidou para o grupo',
    fromUser: {
      id: 'user2',
      name: 'Carlos Oliveira',
      avatar: ''
    },
    entityId: 'group1',
    entityName: 'MTB Salvador',
    date: new Date(Date.now() - 1000 * 60 * 120), // 2 horas atrás
    read: false,
    actionable: true
  },
  {
    id: 'notif3',
    type: 'ride',
    title: 'Novo pedal agendado',
    message: 'agendou um novo pedal para',
    fromUser: {
      id: 'user3',
      name: 'Julia Santos',
      avatar: ''
    },
    entityId: 'ride1',
    entityName: 'Pedal na Orla - Domingo, 09:00',
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 horas atrás
    read: true,
    actionable: true
  },
  {
    id: 'notif4',
    type: 'achievement',
    title: 'Nova conquista!',
    message: 'Você conquistou a medalha',
    entityName: 'Primeiros 100km',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
    read: true,
    actionable: false
  },
  {
    id: 'notif5',
    type: 'like',
    title: 'Nova curtida',
    message: 'curtiu sua atividade',
    fromUser: {
      id: 'user4',
      name: 'Roberto Almeida',
      avatar: ''
    },
    entityId: 'activity1',
    entityName: 'Pedal Matinal na Orla',
    date: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 horas atrás
    read: true,
    actionable: false
  },
  {
    id: 'notif6',
    type: 'comment',
    title: 'Novo comentário',
    message: 'comentou em sua atividade',
    fromUser: {
      id: 'user5',
      name: 'Fernando Silva',
      avatar: ''
    },
    entityId: 'activity2',
    entityName: 'Trilha da Serra',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 dias atrás
    read: true,
    actionable: false
  },
  {
    id: 'notif7',
    type: 'system',
    title: 'Bem-vindo ao TrailSynk!',
    message: 'Complete seu perfil para ter uma experiência personalizada',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 dias atrás
    read: true,
    actionable: false
  }
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Simular carregamento de notificações
    const loadNotifications = () => {
      setLoading(true);
      // Aqui seria uma chamada API para carregar notificações
      setTimeout(() => {
        setNotifications(mockNotifications);
        setLoading(false);
      }, 1000);
    };
    
    loadNotifications();
  }, []);

  const handleAcceptAction = (notification: Notification) => {
    // Seria implementada a lógica real de aceitar convites, etc.
    toast.success(`Você aceitou: ${notification.title}`);
    removeNotification(notification.id);
  };

  const handleRejectAction = (notification: Notification) => {
    // Seria implementada a lógica real de rejeitar convites, etc.
    toast.info(`Você rejeitou: ${notification.title}`);
    removeNotification(notification.id);
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast.success('Todas as notificações foram marcadas como lidas');
  };

  const handleDeleteAllRead = () => {
    setNotifications(prev => 
      prev.filter(notif => !notif.read)
    );
    toast.success('Notificações lidas foram removidas');
  };

  const filteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(n => !n.read);
      case "actionable":
        return notifications.filter(n => n.actionable);
      default:
        return notifications;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Função para obter o ícone com base no tipo de notificação
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'connection':
        return UserPlus;
      case 'group':
        return Users;
      case 'ride':
        return Calendar;
      case 'achievement':
        return Award;
      case 'like':
        return Heart;
      case 'comment':
        return MessageSquare;
      case 'system':
      default:
        return Bell;
    }
  };

  return (
    <>
      <Helmet>
        <title>Notificações | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Notificações</h1>
            {unreadCount > 0 && (
              <p className="text-muted-foreground">Você tem {unreadCount} notificações não lidas</p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="mr-2 h-4 w-4" />
              Marcar todas como lidas
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDeleteAllRead}
            >
              <X className="mr-2 h-4 w-4" />
              Limpar lidas
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 max-w-sm">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="unread">Não lidas {unreadCount > 0 && `(${unreadCount})`}</TabsTrigger>
            <TabsTrigger value="actionable">Ações</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4 mt-4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : (
              <>
                {filteredNotifications().length > 0 ? (
                  filteredNotifications().map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      icon={getNotificationIcon(notification.type)}
                      onAccept={() => handleAcceptAction(notification)}
                      onReject={() => handleRejectAction(notification)}
                      onMarkAsRead={() => handleMarkAsRead(notification.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-2 opacity-30" />
                    <p className="text-lg font-medium">Nenhuma notificação</p>
                    <p className="text-muted-foreground">
                      {activeTab === "unread" 
                        ? "Você não tem notificações não lidas" 
                        : activeTab === "actionable" 
                        ? "Você não tem notificações que requerem ação"
                        : "Sua caixa de notificações está vazia"}
                    </p>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Notifications;

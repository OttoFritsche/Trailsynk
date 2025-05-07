
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, X, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  fromUser?: {
    id: string;
    name: string;
    avatar?: string;
  };
  entityId?: string;
  entityName?: string;
  date: Date;
  read: boolean;
  actionable: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  icon: React.ElementType;
  onAccept: () => void;
  onReject: () => void;
  onMarkAsRead: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  icon: Icon,
  onAccept,
  onReject,
  onMarkAsRead
}) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins}min`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-4 rounded-xl shadow-sm",
        notification.read ? "bg-white" : "bg-white border-l-4 border-primary"
      )}
      onClick={() => !notification.read && onMarkAsRead()}
    >
      <div className="flex items-start flex-1">
        {notification.fromUser ? (
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={notification.fromUser.avatar} alt={notification.fromUser.name} />
            <AvatarFallback>{notification.fromUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="h-10 w-10 mr-3 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="font-medium truncate">
              {notification.fromUser ? (
                <span>{notification.fromUser.name} {notification.message}</span>
              ) : (
                <span>{notification.title}</span>
              )}
            </div>
            <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
              {formatDate(notification.date)}
            </span>
          </div>
          
          {notification.entityName && (
            <p className="text-sm mt-1 truncate">{notification.entityName}</p>
          )}
        </div>
      </div>
      
      {notification.actionable && (
        <div className="ml-4 flex space-x-2">
          <Button 
            size="sm" 
            variant="default"
            className="w-9 h-9 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onAccept();
            }}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="w-9 h-9 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onReject();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

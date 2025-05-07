
export type ChatType = 'individual' | 'group';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface ChatPreview {
  id: string;
  type: ChatType;
  name: string;
  avatar?: string;
  lastMessage: {
    content: string;
    timestamp: Date;
    isRead: boolean;
    senderId: string;
  };
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  unreadCount: number;
}

export interface ChatDetail {
  id: string;
  type: ChatType;
  name: string;
  avatar?: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  messages: Message[];
  isGroupAdmin?: boolean;
}

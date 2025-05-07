
import { ChatPreview, ChatDetail } from '@/types/chat';

export const mockChats: ChatPreview[] = [
  {
    id: 'chat-1',
    type: 'individual',
    name: 'Rafael Souza',
    avatar: '/placeholder.svg',
    lastMessage: {
      content: 'Vamos pedalar no final de semana?',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      isRead: false,
      senderId: 'user-2'
    },
    participants: [
      { id: 'user-2', name: 'Rafael Souza', avatar: '/placeholder.svg' }
    ],
    unreadCount: 2
  },
  {
    id: 'chat-2',
    type: 'group',
    name: 'MTB Salvador',
    avatar: '/placeholder.svg',
    lastMessage: {
      content: 'Pessoal, alguém vai pro pedal de quinta?',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      isRead: true,
      senderId: 'user-3'
    },
    participants: [
      { id: 'user-1', name: 'Você', avatar: '/placeholder.svg' },
      { id: 'user-3', name: 'Carla Ferreira', avatar: '/placeholder.svg' },
      { id: 'user-4', name: 'Marcos Silva', avatar: '/placeholder.svg' },
      // more users...
    ],
    unreadCount: 0
  },
  {
    id: 'chat-3',
    type: 'individual',
    name: 'Luisa Costa',
    avatar: '/placeholder.svg',
    lastMessage: {
      content: 'Obrigada pelas dicas de rota!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      isRead: true,
      senderId: 'user-5'
    },
    participants: [
      { id: 'user-5', name: 'Luisa Costa', avatar: '/placeholder.svg' }
    ],
    unreadCount: 0
  },
  {
    id: 'chat-4',
    type: 'group',
    name: 'Ciclistas do Litoral',
    avatar: '/placeholder.svg',
    lastMessage: {
      content: 'Alguém sabe onde comprar aquela garrafa térmica?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true,
      senderId: 'user-6'
    },
    participants: [
      { id: 'user-1', name: 'Você', avatar: '/placeholder.svg' },
      { id: 'user-6', name: 'Pedro Santos', avatar: '/placeholder.svg' },
      { id: 'user-7', name: 'Julia Oliveira', avatar: '/placeholder.svg' },
      // more users...
    ],
    unreadCount: 0
  },
];

export const getMockMessages = (chatId: string) => {
  const currentUserId = 'user-1';
  const now = Date.now();
  
  // Different message patterns for different chats
  if (chatId === 'chat-1') {
    return [
      {
        id: 'msg-1-1',
        chatId,
        senderId: 'user-2',
        senderName: 'Rafael Souza',
        senderAvatar: '/placeholder.svg',
        content: 'Oi! Tudo bem?',
        timestamp: new Date(now - 1000 * 60 * 60), // 1 hour ago
        isRead: true
      },
      {
        id: 'msg-1-2',
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'Tudo ótimo, e você?',
        timestamp: new Date(now - 1000 * 60 * 59), // 59 minutes ago
        isRead: true
      },
      {
        id: 'msg-1-3',
        chatId,
        senderId: 'user-2',
        senderName: 'Rafael Souza',
        senderAvatar: '/placeholder.svg',
        content: 'Bem também! Estou planejando um pedal para o final de semana.',
        timestamp: new Date(now - 1000 * 60 * 30), // 30 minutes ago
        isRead: true
      },
      {
        id: 'msg-1-4',
        chatId,
        senderId: 'user-2',
        senderName: 'Rafael Souza',
        senderAvatar: '/placeholder.svg',
        content: 'Vamos pedalar no final de semana?',
        timestamp: new Date(now - 1000 * 60 * 15), // 15 minutes ago
        isRead: false
      },
    ];
  } else if (chatId === 'chat-2') {
    return [
      {
        id: 'msg-2-1',
        chatId,
        senderId: 'user-4',
        senderName: 'Marcos Silva',
        senderAvatar: '/placeholder.svg',
        content: 'Oi pessoal, conseguiram ver o novo trajeto que eu compartilhei?',
        timestamp: new Date(now - 1000 * 60 * 120), // 2 hours ago
        isRead: true
      },
      {
        id: 'msg-2-2',
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'Sim! Achei muito interessante, principalmente a parte da serra.',
        timestamp: new Date(now - 1000 * 60 * 100), // 100 minutes ago
        isRead: true
      },
      {
        id: 'msg-2-3',
        chatId,
        senderId: 'user-3',
        senderName: 'Carla Ferreira',
        senderAvatar: '/placeholder.svg',
        content: 'Parece desafiador... tem muita subida?',
        timestamp: new Date(now - 1000 * 60 * 90), // 90 minutes ago
        isRead: true
      },
      {
        id: 'msg-2-4',
        chatId,
        senderId: 'user-4',
        senderName: 'Marcos Silva',
        senderAvatar: '/placeholder.svg',
        content: 'Um pouco, mas a vista compensa!',
        timestamp: new Date(now - 1000 * 60 * 60), // 60 minutes ago
        isRead: true
      },
      {
        id: 'msg-2-5',
        chatId,
        senderId: 'user-3',
        senderName: 'Carla Ferreira',
        senderAvatar: '/placeholder.svg',
        content: 'Pessoal, alguém vai pro pedal de quinta?',
        timestamp: new Date(now - 1000 * 60 * 45), // 45 minutes ago
        isRead: true
      },
    ];
  } else if (chatId === 'chat-3') {
    return [
      {
        id: 'msg-3-1',
        chatId,
        senderId: 'user-5',
        senderName: 'Luisa Costa',
        senderAvatar: '/placeholder.svg',
        content: 'Olá! Vi que você conhece bem as trilhas da região norte.',
        timestamp: new Date(now - 1000 * 60 * 60 * 5), // 5 hours ago
        isRead: true
      },
      {
        id: 'msg-3-2',
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'Sim, pedalo lá quase toda semana. Alguma dúvida específica?',
        timestamp: new Date(now - 1000 * 60 * 60 * 4.5), // 4.5 hours ago
        isRead: true
      },
      {
        id: 'msg-3-3',
        chatId,
        senderId: 'user-5',
        senderName: 'Luisa Costa',
        senderAvatar: '/placeholder.svg',
        content: 'Estou procurando uma trilha intermediária para este sábado. Alguma sugestão?',
        timestamp: new Date(now - 1000 * 60 * 60 * 4), // 4 hours ago
        isRead: true
      },
      {
        id: 'msg-3-4',
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'Recomendo a Trilha do Vale Verde. É moderada, com vistas incríveis e tem umas paradas legais para descanso.',
        timestamp: new Date(now - 1000 * 60 * 60 * 3.5), // 3.5 hours ago
        isRead: true
      },
      {
        id: 'msg-3-5',
        chatId,
        senderId: 'user-5',
        senderName: 'Luisa Costa',
        senderAvatar: '/placeholder.svg',
        content: 'Obrigada pelas dicas de rota!',
        timestamp: new Date(now - 1000 * 60 * 60 * 3), // 3 hours ago
        isRead: true
      },
    ];
  } else {
    // Default messages for any other chat
    return [
      {
        id: `msg-${chatId}-1`,
        chatId,
        senderId: 'user-6',
        senderName: 'Pedro Santos',
        senderAvatar: '/placeholder.svg',
        content: 'Olá a todos!',
        timestamp: new Date(now - 1000 * 60 * 60 * 25), // 25 hours ago
        isRead: true
      },
      {
        id: `msg-${chatId}-2`,
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'Oi pessoal, como vocês estão?',
        timestamp: new Date(now - 1000 * 60 * 60 * 24.5), // 24.5 hours ago
        isRead: true
      },
      {
        id: `msg-${chatId}-3`,
        chatId,
        senderId: 'user-7',
        senderName: 'Julia Oliveira',
        senderAvatar: '/placeholder.svg',
        content: 'Tudo bem por aqui!',
        timestamp: new Date(now - 1000 * 60 * 60 * 24.2), // 24.2 hours ago
        isRead: true
      },
      {
        id: `msg-${chatId}-4`,
        chatId,
        senderId: 'user-6',
        senderName: 'Pedro Santos',
        senderAvatar: '/placeholder.svg',
        content: 'Alguém sabe onde comprar aquela garrafa térmica?',
        timestamp: new Date(now - 1000 * 60 * 60 * 24), // 24 hours ago
        isRead: true
      },
    ];
  }
};

export const getMockChatDetails = (chatId: string): ChatDetail => {
  const chat = mockChats.find(c => c.id === chatId);
  
  if (!chat) {
    // Fallback for unknown chat ID
    return {
      id: chatId,
      type: 'individual',
      name: 'Usuário',
      participants: [{ id: 'unknown', name: 'Usuário' }],
      messages: []
    };
  }
  
  return {
    id: chat.id,
    type: chat.type,
    name: chat.name,
    avatar: chat.avatar,
    participants: chat.participants,
    messages: getMockMessages(chatId),
    isGroupAdmin: chat.type === 'group' ? Math.random() > 0.5 : undefined
  };
};

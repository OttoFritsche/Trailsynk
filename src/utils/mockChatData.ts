
import { ChatPreview, ChatDetail } from '@/types/chat';

export const mockChats: ChatPreview[] = [
  {
    id: 'chat-1',
    type: 'individual',
    name: 'Rafael Souza',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: {
      content: 'Vamos pedalar no final de semana?',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      isRead: false,
      senderId: 'user-2'
    },
    participants: [
      { id: 'user-2', name: 'Rafael Souza', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }
    ],
    unreadCount: 2
  },
  {
    id: 'chat-2',
    type: 'group',
    name: 'MTB Salvador',
    avatar: 'https://images.unsplash.com/photo-1526824867479-c89522f5562f?w=100&h=100&fit=crop',
    lastMessage: {
      content: 'Pessoal, alguém vai pro pedal de quinta?',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      isRead: true,
      senderId: 'user-3'
    },
    participants: [
      { id: 'user-1', name: 'Você', avatar: '/placeholder.svg' },
      { id: 'user-3', name: 'Carla Ferreira', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      { id: 'user-4', name: 'Marcos Silva', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
      // more users...
    ],
    unreadCount: 0
  },
  {
    id: 'chat-3',
    type: 'individual',
    name: 'Luisa Costa',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    lastMessage: {
      content: 'Obrigada pelas dicas de rota!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      isRead: true,
      senderId: 'user-5'
    },
    participants: [
      { id: 'user-5', name: 'Luisa Costa', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }
    ],
    unreadCount: 0
  },
  {
    id: 'chat-4',
    type: 'group',
    name: 'Ciclistas do Litoral',
    avatar: 'https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=100&h=100&fit=crop',
    lastMessage: {
      content: 'Alguém sabe onde comprar aquela garrafa térmica?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true,
      senderId: 'user-6'
    },
    participants: [
      { id: 'user-1', name: 'Você', avatar: '/placeholder.svg' },
      { id: 'user-6', name: 'Pedro Santos', avatar: 'https://randomuser.me/api/portraits/men/56.jpg' },
      { id: 'user-7', name: 'Julia Oliveira', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
      // more users...
    ],
    unreadCount: 0
  },
  // Adicionando mais chats
  {
    id: 'chat-5',
    type: 'individual',
    name: 'Ricardo Gomes',
    avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
    lastMessage: {
      content: 'Acabei de adquirir aquela bike que te falei!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      isRead: false,
      senderId: 'user-8'
    },
    participants: [
      { id: 'user-8', name: 'Ricardo Gomes', avatar: 'https://randomuser.me/api/portraits/men/72.jpg' }
    ],
    unreadCount: 1
  },
  {
    id: 'chat-6',
    type: 'individual',
    name: 'Fernanda Lima',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    lastMessage: {
      content: 'O que achou daquele capacete novo?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      isRead: true,
      senderId: 'user-1'
    },
    participants: [
      { id: 'user-9', name: 'Fernanda Lima', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' }
    ],
    unreadCount: 0
  },
  {
    id: 'chat-7',
    type: 'group',
    name: 'Grupo Pedal Matinal',
    avatar: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=100&h=100&fit=crop',
    lastMessage: {
      content: 'Confirmados para amanhã: 15 pessoas',
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      isRead: true,
      senderId: 'user-10'
    },
    participants: [
      { id: 'user-1', name: 'Você', avatar: '/placeholder.svg' },
      { id: 'user-10', name: 'Roberto Almeida', avatar: 'https://randomuser.me/api/portraits/men/18.jpg' },
      { id: 'user-11', name: 'Luana Martins', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' },
      // more users...
    ],
    unreadCount: 0
  },
  {
    id: 'chat-8',
    type: 'individual',
    name: 'André Oliveira',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    lastMessage: {
      content: 'Manda o link daquela loja que você comentou',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      isRead: true,
      senderId: 'user-12'
    },
    participants: [
      { id: 'user-12', name: 'André Oliveira', avatar: 'https://randomuser.me/api/portraits/men/41.jpg' }
    ],
    unreadCount: 0
  },
  {
    id: 'chat-9',
    type: 'group',
    name: 'Competição Regional 2024',
    avatar: 'https://images.unsplash.com/photo-1557687654-eff900306574?w=100&h=100&fit=crop',
    lastMessage: {
      content: 'Inscrições abertas até sexta-feira!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      isRead: false,
      senderId: 'user-13'
    },
    participants: [
      { id: 'user-1', name: 'Você', avatar: '/placeholder.svg' },
      { id: 'user-13', name: 'Coordenação', avatar: 'https://randomuser.me/api/portraits/women/67.jpg' },
      { id: 'user-14', name: 'Paulo Mendes', avatar: 'https://randomuser.me/api/portraits/men/92.jpg' },
      // more users...
    ],
    unreadCount: 3
  },
  {
    id: 'chat-10',
    type: 'individual',
    name: 'Camila Torres',
    avatar: 'https://randomuser.me/api/portraits/women/54.jpg',
    lastMessage: {
      content: 'Vou precisar adiar nosso treino para quarta',
      timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      isRead: true,
      senderId: 'user-15'
    },
    participants: [
      { id: 'user-15', name: 'Camila Torres', avatar: 'https://randomuser.me/api/portraits/women/54.jpg' }
    ],
    unreadCount: 0
  }
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
        senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
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
        senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Bem também! Estou planejando um pedal para o final de semana.',
        timestamp: new Date(now - 1000 * 60 * 30), // 30 minutes ago
        isRead: true
      },
      {
        id: 'msg-1-4',
        chatId,
        senderId: 'user-2',
        senderName: 'Rafael Souza',
        senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Vamos pedalar no final de semana?',
        timestamp: new Date(now - 1000 * 60 * 15), // 15 minutes ago
        isRead: false
      },
      {
        id: 'msg-1-5',
        chatId,
        senderId: 'user-2',
        senderName: 'Rafael Souza',
        senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Tava pensando na trilha do Parque Nacional, o que acha?',
        timestamp: new Date(now - 1000 * 60 * 10), // 10 minutes ago
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
        senderAvatar: 'https://randomuser.me/api/portraits/men/46.jpg',
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
        senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: 'Parece desafiador... tem muita subida?',
        timestamp: new Date(now - 1000 * 60 * 90), // 90 minutes ago
        isRead: true
      },
      {
        id: 'msg-2-4',
        chatId,
        senderId: 'user-4',
        senderName: 'Marcos Silva',
        senderAvatar: 'https://randomuser.me/api/portraits/men/46.jpg',
        content: 'Um pouco, mas a vista compensa!',
        timestamp: new Date(now - 1000 * 60 * 60), // 60 minutes ago
        isRead: true
      },
      {
        id: 'msg-2-5',
        chatId,
        senderId: 'user-3',
        senderName: 'Carla Ferreira',
        senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: 'Pessoal, alguém vai pro pedal de quinta?',
        timestamp: new Date(now - 1000 * 60 * 45), // 45 minutes ago
        isRead: true
      },
      {
        id: 'msg-2-6',
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'Eu vou! Já confirmei no evento.',
        timestamp: new Date(now - 1000 * 60 * 40), // 40 minutes ago
        isRead: true
      },
      {
        id: 'msg-2-7',
        chatId,
        senderId: 'user-4',
        senderName: 'Marcos Silva',
        senderAvatar: 'https://randomuser.me/api/portraits/men/46.jpg',
        content: 'Também estarei lá. Vamos sair do ponto habitual?',
        timestamp: new Date(now - 1000 * 60 * 38), // 38 minutes ago
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
        senderAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
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
        senderAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
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
        senderAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        content: 'Obrigada pelas dicas de rota!',
        timestamp: new Date(now - 1000 * 60 * 60 * 3), // 3 hours ago
        isRead: true
      },
      {
        id: 'msg-3-6',
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'Por nada! Depois me conta como foi. Tenho outras opções se precisar.',
        timestamp: new Date(now - 1000 * 60 * 60 * 2.8), // 2.8 hours ago
        isRead: true
      },
    ];
  } else if (chatId === 'chat-5') {
    return [
      {
        id: 'msg-5-1',
        chatId,
        senderId: 'user-8',
        senderName: 'Ricardo Gomes',
        senderAvatar: 'https://randomuser.me/api/portraits/men/72.jpg',
        content: 'Oi, lembra daquela bike que te mostrei na loja?',
        timestamp: new Date(now - 1000 * 60 * 60 * 8), // 8 hours ago
        isRead: true
      },
      {
        id: 'msg-5-2',
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'Claro! Aquela MTB full suspension, né? Você decidiu comprar?',
        timestamp: new Date(now - 1000 * 60 * 60 * 7.5), // 7.5 hours ago
        isRead: true
      },
      {
        id: 'msg-5-3',
        chatId,
        senderId: 'user-8',
        senderName: 'Ricardo Gomes',
        senderAvatar: 'https://randomuser.me/api/portraits/men/72.jpg',
        content: 'Consegui negociar um bom desconto com o vendedor! Ele baixou quase 15%.',
        timestamp: new Date(now - 1000 * 60 * 60 * 7), // 7 hours ago
        isRead: true
      },
      {
        id: 'msg-5-4',
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'Uau! Isso é um ótimo negócio. Quando você vai retirar?',
        timestamp: new Date(now - 1000 * 60 * 60 * 6.8), // 6.8 hours ago
        isRead: true
      },
      {
        id: 'msg-5-5',
        chatId,
        senderId: 'user-8',
        senderName: 'Ricardo Gomes',
        senderAvatar: 'https://randomuser.me/api/portraits/men/72.jpg',
        content: 'Acabei de adquirir aquela bike que te falei!',
        timestamp: new Date(now - 1000 * 60 * 60 * 6), // 6 hours ago
        isRead: false
      },
      {
        id: 'msg-5-6',
        chatId,
        senderId: 'user-8',
        senderName: 'Ricardo Gomes',
        senderAvatar: 'https://randomuser.me/api/portraits/men/72.jpg',
        content: 'Topa fazer uma trilha teste no próximo fim de semana?',
        timestamp: new Date(now - 1000 * 60 * 60 * 5.9), // 5.9 hours ago
        isRead: false
      },
    ];
  } else if (chatId === 'chat-9') {
    return [
      {
        id: 'msg-9-1',
        chatId,
        senderId: 'user-13',
        senderName: 'Coordenação',
        senderAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
        content: 'Olá ciclistas! Estamos felizes em anunciar a Competição Regional de 2024.',
        timestamp: new Date(now - 1000 * 60 * 60 * 24), // 24 hours ago
        isRead: true
      },
      {
        id: 'msg-9-2',
        chatId,
        senderId: 'user-13',
        senderName: 'Coordenação',
        senderAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
        content: 'O evento contará com categorias de MTB, Speed e Gravel. Percursos de 30km, 60km e 100km.',
        timestamp: new Date(now - 1000 * 60 * 60 * 23.9), // 23.9 hours ago
        isRead: true
      },
      {
        id: 'msg-9-3',
        chatId,
        senderId: 'user-14',
        senderName: 'Paulo Mendes',
        senderAvatar: 'https://randomuser.me/api/portraits/men/92.jpg',
        content: 'Qual o valor da inscrição este ano?',
        timestamp: new Date(now - 1000 * 60 * 60 * 20), // 20 hours ago
        isRead: true
      },
      {
        id: 'msg-9-4',
        chatId,
        senderId: 'user-13',
        senderName: 'Coordenação',
        senderAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
        content: 'As inscrições custam R$120 para qualquer categoria até dia 20/05. Após essa data, R$150.',
        timestamp: new Date(now - 1000 * 60 * 60 * 19), // 19 hours ago
        isRead: true
      },
      {
        id: 'msg-9-5',
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'O local de largada será o mesmo do ano passado?',
        timestamp: new Date(now - 1000 * 60 * 60 * 15), // 15 hours ago
        isRead: true
      },
      {
        id: 'msg-9-6',
        chatId,
        senderId: 'user-13',
        senderName: 'Coordenação',
        senderAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
        content: 'Sim! A largada será no Parque Central, mas os percursos foram atualizados. Compartilharemos os mapas em breve.',
        timestamp: new Date(now - 1000 * 60 * 60 * 14), // 14 hours ago
        isRead: true
      },
      {
        id: 'msg-9-7',
        chatId,
        senderId: 'user-13',
        senderName: 'Coordenação',
        senderAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
        content: 'Inscrições abertas até sexta-feira!',
        timestamp: new Date(now - 1000 * 60 * 60 * 8), // 8 hours ago
        isRead: false
      },
      {
        id: 'msg-9-8',
        chatId,
        senderId: 'user-13',
        senderName: 'Coordenação',
        senderAvatar: 'https://randomuser.me/api/portraits/women/67.jpg',
        content: 'Já temos mais de 150 inscritos! Os kits incluirão camiseta, squeeze, medalha e brindes dos patrocinadores.',
        timestamp: new Date(now - 1000 * 60 * 60 * 7), // 7 hours ago
        isRead: false
      },
      {
        id: 'msg-9-9',
        chatId,
        senderId: 'user-14',
        senderName: 'Paulo Mendes',
        senderAvatar: 'https://randomuser.me/api/portraits/men/92.jpg',
        content: 'Alguém da categoria Master 40+ aqui no grupo? Vamos treinar juntos?',
        timestamp: new Date(now - 1000 * 60 * 60 * 4), // 4 hours ago
        isRead: false
      },
    ];
  } else {
    // Default messages for any other chat
    return [
      {
        id: `msg-${chatId}-1`,
        chatId,
        senderId: `user-${chatId.split('-')[1]}`,
        senderName: mockChats.find(c => c.id === chatId)?.name || 'Usuário',
        senderAvatar: mockChats.find(c => c.id === chatId)?.avatar || '/placeholder.svg',
        content: 'Olá! Tudo bem com você?',
        timestamp: new Date(now - 1000 * 60 * 60 * 25), // 25 hours ago
        isRead: true
      },
      {
        id: `msg-${chatId}-2`,
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'Tudo ótimo, e você?',
        timestamp: new Date(now - 1000 * 60 * 60 * 24.5), // 24.5 hours ago
        isRead: true
      },
      {
        id: `msg-${chatId}-3`,
        chatId,
        senderId: `user-${chatId.split('-')[1]}`,
        senderName: mockChats.find(c => c.id === chatId)?.name || 'Usuário',
        senderAvatar: mockChats.find(c => c.id === chatId)?.avatar || '/placeholder.svg',
        content: 'Bem também! Vamos combinar um pedal qualquer dia desses?',
        timestamp: new Date(now - 1000 * 60 * 60 * 24), // 24 hours ago
        isRead: true
      },
      {
        id: `msg-${chatId}-4`,
        chatId,
        senderId: currentUserId,
        senderName: 'Você',
        content: 'Com certeza! Estava pensando em algo para o próximo final de semana.',
        timestamp: new Date(now - 1000 * 60 * 60 * 23.5), // 23.5 hours ago
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

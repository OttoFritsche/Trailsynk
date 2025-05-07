
// Tipo para os detalhes do grupo
interface GroupDetails {
  id: string;
  name: string;
  description: string;
  image: string;
  memberCount: number;
  isAdmin?: boolean;
  createdAt?: Date;
}

// Dados de exemplo para fins de demonstração
const mockGroups = [
  {
    id: '1',
    name: 'MTB Salvador',
    description: 'Grupo de Mountain Bike de Salvador',
    memberCount: 24,
    nextRideDate: new Date(Date.now() + 86400000 * 2), // 2 dias a partir de agora
    image: '/placeholder.svg',
    isAdmin: true,
    createdAt: new Date(Date.now() - 86400000 * 30), // 30 dias atrás
  },
  {
    id: '2',
    name: 'Ciclistas do Litoral',
    description: 'Pedalando pelas praias do litoral baiano',
    memberCount: 15,
    nextRideDate: new Date(Date.now() + 86400000 * 5), // 5 dias a partir de agora
    image: '/placeholder.svg',
    isAdmin: false,
    createdAt: new Date(Date.now() - 86400000 * 60), // 60 dias atrás
  },
  {
    id: '3',
    name: 'Pedal Noturno',
    description: 'Explorando a cidade à noite',
    memberCount: 8,
    nextRideDate: new Date(Date.now() + 86400000 * 1), // 1 dia a partir de agora
    image: '/placeholder.svg',
    isAdmin: false,
    createdAt: new Date(Date.now() - 86400000 * 15), // 15 dias atrás
  }
];

/**
 * Busca detalhes de um grupo específico por ID
 * Na implementação real, isso buscaria dados do Supabase
 */
export const fetchGroupDetails = async (groupId: string): Promise<GroupDetails> => {
  // Simulando uma chamada de API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const group = mockGroups.find(g => g.id === groupId);
      
      if (group) {
        resolve({
          id: group.id,
          name: group.name,
          description: group.description,
          image: group.image,
          memberCount: group.memberCount,
          isAdmin: group.isAdmin,
          createdAt: group.createdAt
        });
      } else {
        reject(new Error('Grupo não encontrado'));
      }
    }, 500); // Simulando um atraso de rede
  });
};

/**
 * Adiciona um usuário a um grupo
 * Na implementação real, isso enviaria dados para o Supabase
 */
export const joinGroup = async (groupId: string, userId: string): Promise<boolean> => {
  // Simulando uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Lógica simulada de adição ao grupo
      resolve(true);
    }, 500);
  });
};

/**
 * Remove um usuário de um grupo
 * Na implementação real, isso enviaria dados para o Supabase
 */
export const leaveGroup = async (groupId: string, userId: string): Promise<boolean> => {
  // Simulando uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Lógica simulada de remoção do grupo
      resolve(true);
    }, 500);
  });
};

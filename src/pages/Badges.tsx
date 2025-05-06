
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/hooks/useAuth';
import { Award, Trophy, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Mock badge data
interface Badge {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  iconType?: string; // For selecting different icons
  dateEarned?: Date;
  criteria?: string;
  status: "earned" | "locked";
  category: "distance" | "elevation" | "speed" | "consistency" | "achievement";
}

const mockBadges: Badge[] = [
  {
    id: 'b1',
    title: 'Iniciante',
    description: 'Completou sua primeira trilha',
    dateEarned: new Date('2023-10-15'),
    criteria: 'Complete sua primeira trilha registrada no app.',
    status: 'earned',
    category: 'achievement'
  },
  {
    id: 'b2',
    title: 'Explorador',
    description: 'Explorou 5 rotas diferentes',
    dateEarned: new Date('2023-11-02'),
    criteria: 'Explore e complete 5 rotas diferentes registradas no app.',
    status: 'earned',
    category: 'achievement'
  },
  {
    id: 'b3',
    title: 'Aventureiro',
    description: 'Percorreu mais de 100km em trilhas',
    dateEarned: new Date('2023-12-18'),
    criteria: 'Acumule mais de 100km em trilhas registradas.',
    status: 'earned',
    category: 'distance'
  },
  {
    id: 'b4',
    title: 'Montanhista',
    description: 'Completou uma trilha com +1000m de elevação',
    dateEarned: new Date('2024-01-22'),
    criteria: 'Complete uma única trilha com mais de 1000m de ganho de elevação.',
    status: 'earned',
    category: 'elevation'
  },
  {
    id: 'b5',
    title: 'Madrugador',
    description: 'Iniciou uma trilha antes do amanhecer',
    dateEarned: new Date('2024-02-05'),
    criteria: 'Inicie e registre uma trilha antes do amanhecer (5:00-6:30).',
    status: 'earned',
    category: 'achievement'
  },
  {
    id: 'b6',
    title: 'Conquistador',
    description: 'Percorreu +5000m de elevação acumulada',
    criteria: 'Acumule mais de 5000m de elevação em todas as suas atividades.',
    status: 'locked',
    category: 'elevation'
  },
  {
    id: 'b7',
    title: 'Resistente',
    description: 'Completou uma trilha de +100km',
    criteria: 'Complete uma única trilha com mais de 100km de distância.',
    status: 'locked',
    category: 'distance'
  },
  {
    id: 'b8',
    title: 'Veloz',
    description: 'Manteve velocidade média de +25km/h',
    criteria: 'Mantenha uma velocidade média acima de 25km/h em uma trilha de pelo menos 20km.',
    status: 'locked',
    category: 'speed'
  },
  {
    id: 'b9',
    title: 'Consistente',
    description: 'Completou trilhas por 5 semanas seguidas',
    criteria: 'Complete pelo menos uma trilha por semana durante 5 semanas consecutivas.',
    status: 'locked',
    category: 'consistency'
  },
  {
    id: 'b10',
    title: 'Desafiador',
    description: 'Completou todas as trilhas difíceis',
    criteria: 'Complete todas as trilhas classificadas como "difíceis" no app.',
    status: 'locked',
    category: 'achievement'
  },
  {
    id: 'b11',
    title: 'Noturno',
    description: 'Completou uma trilha à noite',
    criteria: 'Complete uma trilha inteiramente durante o período noturno (20:00-5:00).',
    status: 'locked',
    category: 'achievement'
  },
  {
    id: 'b12',
    title: 'Cume Duplo',
    description: 'Conquistou dois picos em um único dia',
    criteria: 'Atinja o ponto mais alto de duas trilhas diferentes no mesmo dia.',
    status: 'locked',
    category: 'achievement'
  },
  {
    id: 'b13',
    title: 'Velocista',
    description: 'Atingiu velocidade máxima de +50km/h',
    criteria: 'Atinja uma velocidade máxima de pelo menos 50km/h em uma descida.',
    status: 'locked',
    category: 'speed'
  },
  {
    id: 'b14',
    title: 'Maratonista',
    description: 'Percorreu +200km em uma semana',
    criteria: 'Acumule mais de 200km em uma única semana.',
    status: 'locked',
    category: 'distance'
  },
  {
    id: 'b15',
    title: 'Elevação Extrema',
    description: 'Ganhou +2000m de elevação em um único dia',
    criteria: 'Acumule mais de 2000m de elevação em um único dia.',
    status: 'locked',
    category: 'elevation'
  }
];

const BadgesPage = () => {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge);
    setIsDialogOpen(true);
  };

  // Count badges by status
  const earnedCount = mockBadges.filter(badge => badge.status === 'earned').length;
  const totalCount = mockBadges.length;
  const completionPercentage = Math.round((earnedCount / totalCount) * 100);

  return (
    <>
      <Helmet>
        <title>Meus Badges | TrailSynk</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Meus Badges Conquistados</h1>
          <p className="text-muted-foreground">
            Coleção de conquistas e desafios no seu percurso como ciclista.
          </p>
        </div>

        {/* Badge Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Progresso de Conquistas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Badges Conquistados</h3>
                  <p className="text-muted-foreground">
                    {earnedCount} de {totalCount} badges desbloqueados
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span>Conquistados: {earnedCount}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span>Bloqueados: {totalCount - earnedCount}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badge Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Coleção de Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="earned">Conquistados</TabsTrigger>
                <TabsTrigger value="distance">Distância</TabsTrigger>
                <TabsTrigger value="elevation">Elevação</TabsTrigger>
                <TabsTrigger value="speed">Velocidade</TabsTrigger>
                <TabsTrigger value="achievement">Conquistas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <BadgeGrid badges={mockBadges} onBadgeClick={handleBadgeClick} />
              </TabsContent>
              
              <TabsContent value="earned" className="mt-6">
                <BadgeGrid 
                  badges={mockBadges.filter(badge => badge.status === 'earned')} 
                  onBadgeClick={handleBadgeClick} 
                />
              </TabsContent>
              
              <TabsContent value="distance" className="mt-6">
                <BadgeGrid 
                  badges={mockBadges.filter(badge => badge.category === 'distance')} 
                  onBadgeClick={handleBadgeClick} 
                />
              </TabsContent>
              
              <TabsContent value="elevation" className="mt-6">
                <BadgeGrid 
                  badges={mockBadges.filter(badge => badge.category === 'elevation')} 
                  onBadgeClick={handleBadgeClick} 
                />
              </TabsContent>
              
              <TabsContent value="speed" className="mt-6">
                <BadgeGrid 
                  badges={mockBadges.filter(badge => badge.category === 'speed')} 
                  onBadgeClick={handleBadgeClick} 
                />
              </TabsContent>
              
              <TabsContent value="achievement" className="mt-6">
                <BadgeGrid 
                  badges={mockBadges.filter(badge => badge.category === 'achievement')} 
                  onBadgeClick={handleBadgeClick} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Badge Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">{selectedBadge?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedBadge && (
            <div className="flex flex-col items-center space-y-4 py-4">
              <div className={`w-24 h-24 rounded-full ${selectedBadge.status === 'earned' ? 'bg-primary/10' : 'bg-gray-200'} flex items-center justify-center shadow-sm`}>
                {selectedBadge.iconUrl ? (
                  <img src={selectedBadge.iconUrl} alt={selectedBadge.title} className="w-16 h-16" />
                ) : (
                  selectedBadge.status === 'earned' ? (
                    <Trophy className="w-12 h-12 text-primary" />
                  ) : (
                    <Award className="w-12 h-12 text-gray-400" />
                  )
                )}
              </div>
              
              <Badge variant={selectedBadge.status === 'earned' ? 'default' : 'outline'}>
                {selectedBadge.status === 'earned' ? 'Conquistado' : 'Bloqueado'}
              </Badge>
              
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">{selectedBadge.description}</p>
                
                {selectedBadge.dateEarned && (
                  <p className="text-sm text-primary">
                    Conquistado em {new Date(selectedBadge.dateEarned).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md w-full mt-2">
                <h4 className="font-medium mb-1">Critérios para conquistar:</h4>
                <p className="text-sm text-muted-foreground">{selectedBadge.criteria}</p>
              </div>
            </div>
          )}
          
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Fechar
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Badge Grid Component
interface BadgeGridProps {
  badges: Badge[];
  onBadgeClick: (badge: Badge) => void;
}

const BadgeGrid: React.FC<BadgeGridProps> = ({ badges, onBadgeClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-h-[480px] overflow-y-auto p-2">
      {badges.map(badge => (
        <div 
          key={badge.id} 
          className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
            badge.status === 'earned' ? 'border-primary/30 hover:border-primary' : 'opacity-70 hover:opacity-100 border-gray-200'
          }`}
          onClick={() => onBadgeClick(badge)}
        >
          <div className={`w-16 h-16 rounded-full ${badge.status === 'earned' ? 'bg-primary/10' : 'bg-gray-200'} flex items-center justify-center mb-2`}>
            {badge.iconUrl ? (
              <img src={badge.iconUrl} alt={badge.title} className="w-10 h-10" />
            ) : (
              badge.status === 'earned' ? (
                <Trophy className="w-8 h-8 text-primary" />
              ) : (
                <Award className="w-8 h-8 text-gray-400" />
              )
            )}
            {badge.status === 'locked' && (
              <div className="absolute -bottom-1 -right-1 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            )}
          </div>
          <h4 className="text-sm font-medium text-center">{badge.title}</h4>
          <p className="text-xs text-muted-foreground text-center mt-1 line-clamp-2">{badge.description}</p>
          {badge.dateEarned && (
            <p className="text-xs text-primary mt-1">
              {new Date(badge.dateEarned).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default BadgesPage;

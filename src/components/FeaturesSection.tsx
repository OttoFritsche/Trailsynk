
import React from 'react';
import { ShieldCheck, Route, CalendarClock, Users, Settings, Map, Activity, Bell } from 'lucide-react';
import { cn } from "@/lib/utils";

const featureCategories = [
  {
    title: "Planeje Sua Pedalada",
    description: "Ferramentas inteligentes para criar a experiência perfeita de ciclismo",
    features: [
      {
        icon: <Route className="w-12 h-12 text-primary" />,
        title: "Rotas Personalizadas e Inteligentes",
        description: "Diga à IA suas preferências (distância, elevação, terreno), e ela encontrará o percurso perfeito para seu humor e nível de preparo físico. Descubra lugares escondidos e evite o trânsito intenso."
      },
      {
        icon: <Map className="w-12 h-12 text-primary" />,
        title: "Descoberta de Trilhas",
        description: "Explore trilhas compartilhadas pela comunidade, filtradas por nível de dificuldade, tipo de bike e avaliações. Visualize detalhes como elevação, superfície e pontos de interesse."
      }
    ]
  },
  {
    title: "Mantenha-se Seguro",
    description: "Proteção avançada para você e sua bicicleta",
    features: [
      {
        icon: <ShieldCheck className="w-12 h-12 text-primary" />,
        title: "Segurança Preditiva em Rotas",
        description: "Nossa IA analisa tráfego, clima e feedback da comunidade para identificar potenciais perigos e sugerir rotas alternativas em tempo real. Alertas sonoros para áreas de alto risco durante seu percurso."
      },
      {
        icon: <Bell className="w-12 h-12 text-primary" />,
        title: "Lembretes de Manutenção Proativos",
        description: "Receba notificações baseadas no seu uso para lubrificar a corrente, verificar os freios ou calibrar os pneus. Um calendário inteligente que se adapta ao seu estilo de pedalada e condições climáticas."
      }
    ]
  },
  {
    title: "Conecte-se e Evolua",
    description: "Comunidade e análises para melhorar sua performance",
    features: [
      {
        icon: <Users className="w-12 h-12 text-primary" />,
        title: "Comunidade Conectada",
        description: "Participe de grupos locais, desafios temáticos e eventos. Compartilhe rotas favoritas, dicas de equipamento e conquistas. Encontre parceiros de pedal com interesses e níveis de habilidade semelhantes."
      },
      {
        icon: <Activity className="w-12 h-12 text-primary" />,
        title: "Análise de Performance",
        description: "Visualize sua evolução com métricas detalhadas como potência, cadência e zonas cardíacas. Receba insights personalizados para melhorar aspectos específicos do seu desempenho."
      }
    ]
  }
];

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isHovered: boolean;
  onHover: () => void;
}> = ({ icon, title, description, index, isHovered, onHover }) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 animate-on-scroll cursor-pointer",
        isHovered ? "border-primary/50 shadow-lg shadow-primary/10 transform scale-[1.02]" : ""
      )}
      style={{ animationDelay: `${index * 0.2}s` }}
      onMouseEnter={onHover}
    >
      <div className="flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-secondary mb-3 text-center">
        {title}
      </h3>
      <p className="text-secondary/70 text-center">
        {description}
      </p>

      {/* Interactive element that appears on hover */}
      {isHovered && (
        <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-center">
          <span className="text-primary font-medium cursor-pointer hover:underline">
            Saiba mais →
          </span>
        </div>
      )}
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = React.useState<number | null>(null);

  return (
    <section id="features" className="bg-white py-[50px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
            Por que TrailSynk? Seu Assessor Ciclista Potencializado por IA
          </h2>
          <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
            Imagine ter um especialista ao seu lado em cada pedalada. 
            O TrailSynk vai além de um simples app de ciclismo.
          </p>
        </div>

        {featureCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16 last:mb-0">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-secondary mb-2">{category.title}</h3>
              <p className="text-secondary/70">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {category.features.map((feature, featureIndex) => {
                const globalIndex = categoryIndex * 2 + featureIndex;
                return (
                  <FeatureCard 
                    key={globalIndex}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    index={globalIndex}
                    isHovered={hoveredFeature === globalIndex}
                    onHover={() => setHoveredFeature(globalIndex)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;


import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Ana Silva",
    role: "Ciclista Urbana",
    avatar: "AS",
    content: "O TrailSynk transformou minhas pedaladas pela cidade. Os alertas de segurança em tempo real já me salvaram de várias situações perigosas!"
  },
  {
    name: "Carlos Mendes",
    role: "Mountain Biker",
    avatar: "CM",
    content: "As sugestões de trilhas são incríveis! A IA consegue entender exatamente o tipo de desafio que estou procurando a cada dia."
  },
  {
    name: "Juliana Costa",
    role: "Ciclista de Estrada",
    avatar: "JC",
    content: "Os lembretes de manutenção são perfeitos. Nunca mais tive problemas inesperados com minha bike durante os treinos longos."
  },
  {
    name: "Roberto Alves",
    role: "Cicloturista",
    avatar: "RA",
    content: "A comunidade do TrailSynk é incrível! Já conheci vários ciclistas em minhas viagens e agora tenho companhia para pedalar em qualquer cidade."
  },
  {
    name: "Fernanda Lima",
    role: "Ciclista de Montanha",
    avatar: "FL",
    content: "A análise de desempenho do TrailSynk me ajudou a melhorar significativamente nos últimos meses. Consigo ver claramente minha evolução!"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        
        {/* Decorative routes */}
        <svg className="absolute inset-0 h-full w-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,40 Q30,60 50,30 T100,50" stroke="#2ECC71" strokeWidth="0.5" fill="none" />
          <path d="M0,60 Q40,30 70,50 T100,30" stroke="#1A1F2C" strokeWidth="0.5" fill="none" />
          <path d="M0,50 Q20,70 60,40 T100,60" stroke="#2ECC71" strokeWidth="0.5" fill="none" />
        </svg>
        
        {/* Bicycle icons pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232ECC71' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='5.5' cy='17.5' r='3.5'/%3E%3Ccircle cx='18.5' cy='17.5' r='3.5'/%3E%3Cpath d='M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold text-secondary mb-4">
            O que os Ciclistas que Testaram o TrailSynk Dizem
          </h2>
          <p className="text-secondary/70 text-lg italic">(em breve)</p>
        </div>

        {/* Desktop grid layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Mobile & Tablet carousel */}
        <div className="md:hidden">
          <Carousel className="w-full max-w-md mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <TestimonialCard testimonial={testimonial} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static mr-2" />
              <CarouselNext className="relative static" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

interface TestimonialProps {
  testimonial: {
    name: string;
    role: string;
    avatar: string;
    content: string;
  };
  index: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ testimonial, index }) => (
  <div 
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 flex flex-col animate-on-scroll"
    style={{ animationDelay: `${index * 0.15}s` }}
  >
    <div className="mb-4 text-primary/30">
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 32 32">
        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H7c0-1.7 1.3-3 3-3V8zm18 0c-3.3 0-6 2.7-6 6v10h10V14h-7c0-1.7 1.3-3 3-3V8z"></path>
      </svg>
    </div>
    
    <p className="text-secondary/80 flex-grow mb-6 italic text-lg">
      "{testimonial.content}"
    </p>
    
    <div className="flex items-center mt-auto">
      <Avatar className="h-12 w-12 mr-3 border-2 border-primary">
        <AvatarFallback className="bg-primary text-white font-bold">
          {testimonial.avatar}
        </AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-medium text-secondary text-lg">{testimonial.name}</h4>
        <p className="text-sm text-secondary/70">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

export default TestimonialsSection;


import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Ana Silva",
    role: "Ciclista Urbana",
    location: "São Paulo, SP",
    avatar: "AS",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3ljbGluZyUyMGdpcmx8ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60",
    content: "O TrailSynk transformou minhas pedaladas pela cidade. Os alertas de segurança em tempo real já me salvaram de várias situações perigosas!",
    rating: 5,
    bikeType: "Urbana",
    highlight: "Segurança"
  },
  {
    name: "Carlos Mendes",
    role: "Mountain Biker",
    location: "Florianópolis, SC",
    avatar: "CM",
    image: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5282?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWluJTIwYmlrZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60",
    content: "As sugestões de trilhas são incríveis! A IA consegue entender exatamente o tipo de desafio que estou procurando a cada dia. Já descobri mais de 15 novas trilhas na minha região que nunca havia encontrado antes.",
    rating: 5,
    bikeType: "MTB",
    highlight: "Descoberta de Trilhas"
  },
  {
    name: "Juliana Costa",
    role: "Ciclista de Estrada",
    location: "Rio de Janeiro, RJ",
    avatar: "JC",
    image: "https://images.unsplash.com/photo-1598386651788-bd1818e13da4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHJvYWQlMjBjeWNsaXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60",
    content: "Os lembretes de manutenção são perfeitos. Nunca mais tive problemas inesperados com minha bike durante os treinos longos. O app me avisou sobre o desgaste da corrente uma semana antes dela começar a falhar.",
    rating: 4,
    bikeType: "Speed",
    highlight: "Manutenção"
  },
  {
    name: "Roberto Almeida",
    role: "Cicloturista",
    location: "Curitiba, PR",
    avatar: "RA",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y3ljbGluZyUyMHRvdXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=100&q=60",
    content: "Para viagens longas, o TrailSynk é imbatível! As recomendações de hospedagem e pontos de parada com boas avaliações de outros ciclistas fizeram toda a diferença na minha viagem de 500km pelo litoral.",
    rating: 5,
    bikeType: "Touring",
    highlight: "Cicloturismo"
  },
  {
    name: "Fernanda Rocha",
    role: "Triatleta",
    location: "Brasília, DF",
    avatar: "FR",
    image: "https://images.unsplash.com/photo-1594285566436-434f3b97f804?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dHJpYXRobG9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=100&q=60",
    content: "Como triatleta, preciso de análises de desempenho precisas. Os insights de treinamento do TrailSynk melhoraram meu tempo no ciclismo em 12% no último semestre!",
    rating: 5,
    bikeType: "TT",
    highlight: "Performance"
  },
  {
    name: "Paulo Henrique",
    role: "Ciclista Recreativo",
    location: "Salvador, BA",
    avatar: "PH",
    image: "https://images.unsplash.com/photo-1571188654248-7a89213915f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmlrZSUyMGNhc3VhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=100&q=60",
    content: "Mesmo sendo um ciclista de final de semana, encontrei uma comunidade incrível através do app. Já fiz vários amigos nos grupos locais e agora pedalamos juntos regularmente.",
    rating: 4,
    bikeType: "Híbrida",
    highlight: "Comunidade"
  }
];

type TestimonialCardProps = {
  testimonial: typeof testimonials[0];
  isActive: boolean;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isActive }) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 flex flex-col ${isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-4 border-2 border-primary">
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback className="bg-primary text-white">
              {testimonial.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-secondary">{testimonial.name}</h4>
            <div className="text-xs text-secondary/70">
              <div>{testimonial.role}</div>
              <div className="flex items-center">
                <span>{testimonial.location}</span>
                <span className="mx-1">•</span>
                <span className="bg-primary/10 text-primary px-1.5 rounded-full text-2xs">
                  {testimonial.bikeType}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
          {testimonial.highlight}
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
          />
        ))}
      </div>
      
      <div className="text-secondary/80 flex-grow mb-6 italic">
        "{testimonial.content}"
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };
  
  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-white py-[50px]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
            O que os Ciclistas Dizem Sobre o TrailSynk
          </h2>
          <p className="text-lg text-secondary/70 max-w-3xl mx-auto">
            Experiências reais de pessoas que transformaram suas pedaladas
          </p>
        </div>

        {/* Testimonial Carousel - Desktop */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-3 gap-6">
            {testimonials.slice(activeIndex, activeIndex + 3).map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                testimonial={testimonial}
                isActive={index === 1}
              />
            ))}
          </div>
          
          {/* Navigation */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50"
          >
            <ChevronLeft className="h-5 w-5 text-secondary" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50"
          >
            <ChevronRight className="h-5 w-5 text-secondary" />
          </button>
        </div>
        
        {/* Testimonial List - Mobile */}
        <div className="md:hidden space-y-4">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={testimonial}
              isActive={true}
            />
          ))}
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button 
              key={index}
              className={`w-2.5 h-2.5 rounded-full mx-1 ${
                Math.floor(activeIndex / 3) === Math.floor(index / 3) 
                  ? 'bg-primary' 
                  : 'bg-gray-300'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

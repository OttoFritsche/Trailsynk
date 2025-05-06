
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
            O que os Ciclistas que Testaram o TrailSynk Dizem
          </h2>
          <p className="text-secondary/70 text-lg italic">(em breve)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 flex flex-col animate-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="mb-4">
                <svg className="w-10 h-10 text-primary/30" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H7c0-1.7 1.3-3 3-3V8zm18 0c-3.3 0-6 2.7-6 6v10h10V14h-7c0-1.7 1.3-3 3-3V8z"></path>
                </svg>
              </div>
              
              <p className="text-secondary/80 flex-grow mb-6 italic">
                {testimonial.content}
              </p>
              
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 border-2 border-primary">
                  <AvatarFallback className="bg-primary text-white">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-secondary">{testimonial.name}</h4>
                  <p className="text-xs text-secondary/70">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

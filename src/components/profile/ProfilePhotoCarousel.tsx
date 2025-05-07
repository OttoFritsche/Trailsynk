
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from '@/components/ui/card';

interface ProfilePhotoCarouselProps {
  photos: string[];
}

const ProfilePhotoCarousel: React.FC<ProfilePhotoCarouselProps> = ({ photos }) => {
  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-64 md:h-80 bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Nenhuma foto disponível</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={index}>
              <Card className="border-0 overflow-hidden">
                <div className="h-64 md:h-80 w-full">
                  <img 
                    src={photo} 
                    alt={`Atividade ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl" 
                  />
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4">
          <CarouselPrevious className="pointer-events-auto" />
          <CarouselNext className="pointer-events-auto" />
        </div>
      </Carousel>
    </div>
  );
};

export default ProfilePhotoCarousel;

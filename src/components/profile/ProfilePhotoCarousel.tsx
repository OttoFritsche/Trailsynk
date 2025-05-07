
import React, { useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel";
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'; 

interface ProfilePhoto {
  url: string;
  caption?: string;
}

interface ProfilePhotoCarouselProps {
  photos: string[] | ProfilePhoto[];
  onAddPhoto?: () => void;
}

const ProfilePhotoCarousel: React.FC<ProfilePhotoCarouselProps> = ({ photos, onAddPhoto }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Convert simple string array to ProfilePhoto array for consistent handling
  const normalizedPhotos: ProfilePhoto[] = photos.map(photo => 
    typeof photo === 'string' ? { url: photo } : photo
  );

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    
    // Initial call to set the first slide
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!normalizedPhotos || normalizedPhotos.length === 0) {
    return (
      <div className="w-full h-64 md:h-80 bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Nenhuma foto disponível</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {normalizedPhotos.map((photo, index) => (
            <CarouselItem key={index}>
              <Card className="border-0 overflow-hidden">
                <div className="h-64 md:h-80 w-full relative">
                  <img 
                    src={photo.url} 
                    alt={photo.caption || `Foto ${index + 1}`}
                    className="w-full h-full object-cover rounded-xl" 
                  />
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 rounded-b-xl">
                      <p className="text-sm">{photo.caption}</p>
                    </div>
                  )}
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Slide counter */}
        <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
          {current + 1} / {count}
        </div>

        {/* Navigation arrows */}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4">
          <CarouselPrevious className="pointer-events-auto" />
          <CarouselNext className="pointer-events-auto" />
        </div>
      </Carousel>

      {/* Thumbnails */}
      <div className="flex justify-center space-x-2 mt-4">
        {normalizedPhotos.map((photo, index) => (
          <button
            key={index}
            className={`rounded-full transition-all ${current === index ? "ring-2 ring-primary" : ""}`}
            onClick={() => api?.scrollTo(index)}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={photo.url} alt={`Thumbnail ${index + 1}`} />
              <AvatarFallback>{index + 1}</AvatarFallback>
            </Avatar>
          </button>
        ))}
        
        {onAddPhoto && (
          <button 
            onClick={onAddPhoto}
            className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <span className="text-lg">+</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoCarousel;

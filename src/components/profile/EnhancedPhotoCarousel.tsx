
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel";
import { Card } from '@/components/ui/card';
import { ProfilePhoto } from '@/types/profile';

interface EnhancedPhotoCarouselProps {
  photos: ProfilePhoto[];
  autoPlayInterval?: number; // in milliseconds
  className?: string;
}

const EnhancedPhotoCarousel: React.FC<EnhancedPhotoCarouselProps> = ({ 
  photos, 
  autoPlayInterval = 5000, // Default to 5 seconds
  className = ""
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  // Set up carousel API
  useEffect(() => {
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

  // Auto-play functionality
  useEffect(() => {
    if (!api || !autoPlayEnabled || isHovering || photos.length <= 1) return;
    
    const intervalId = setInterval(() => {
      if (current === count - 1) {
        api.scrollTo(0);
      } else {
        api.scrollToIdx(current + 1);
      }
    }, autoPlayInterval);
    
    return () => clearInterval(intervalId);
  }, [api, current, count, autoPlayEnabled, isHovering, autoPlayInterval, photos.length]);

  // Handle mouse interactions for desktop
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // Fallback for when no photos are available
  if (!photos || photos.length === 0) {
    return (
      <div className={`w-full h-64 bg-gray-100 rounded-t-xl flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Sem fotos de atividades</p>
      </div>
    );
  }

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Carousel */}
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={photo.id || index}>
              <Card className="border-0 overflow-hidden">
                <div className="h-64 md:h-72 w-full relative">
                  <img 
                    src={photo.url} 
                    alt={photo.caption || `Atividade ${index + 1}`}
                    className="w-full h-full object-cover" 
                  />
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                      <p className="text-sm">{photo.caption}</p>
                    </div>
                  )}
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Slide counter */}
        <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
          {current + 1} / {count}
        </div>

        {/* Navigation controls - visible on hover or touch */}
        <div className={`absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 transition-opacity ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
          <CarouselPrevious className="relative left-0 h-8 w-8" />
          <CarouselNext className="relative right-0 h-8 w-8" />
        </div>
      </Carousel>

      {/* Pagination indicators */}
      <div className="absolute bottom-2 left-0 right-0">
        <div className="flex justify-center gap-1">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === current ? "w-4 bg-white" : "w-2 bg-white/50"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedPhotoCarousel;

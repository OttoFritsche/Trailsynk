
import React, { useState, useRef, useCallback } from 'react';
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
import { Trash2, Maximize2, MoveVertical, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfilePhoto } from '@/types/profile';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface CustomAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface ProfilePhotoCarouselProps {
  photos: ProfilePhoto[];
  onDeletePhoto?: (photoId: string) => void;
  onReorderPhotos?: (photos: ProfilePhoto[]) => void;
  onAddPhoto?: () => void;
  isEditable?: boolean;
  customActions?: (photoId: string) => CustomAction[];
}

const ProfilePhotoCarousel: React.FC<ProfilePhotoCarouselProps> = ({ 
  photos, 
  onDeletePhoto, 
  onReorderPhotos,
  onAddPhoto,
  isEditable = true,
  customActions
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [fullscreenPhoto, setFullscreenPhoto] = useState<ProfilePhoto | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<ProfilePhoto | null>(null);
  const [reorderMode, setReorderMode] = useState(false);
  const reorderedPhotosRef = useRef<ProfilePhoto[]>([...photos]);

  React.useEffect(() => {
    reorderedPhotosRef.current = [...photos];
  }, [photos]);

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

  const handleFullscreen = (photo: ProfilePhoto) => {
    setFullscreenPhoto(photo);
  };

  const handleConfirmDelete = useCallback(() => {
    if (photoToDelete && onDeletePhoto) {
      onDeletePhoto(photoToDelete.id);
      setPhotoToDelete(null);
    }
  }, [photoToDelete, onDeletePhoto]);

  const movePhotoUp = useCallback(() => {
    if (current === 0) return;
    
    const newPhotos = [...reorderedPhotosRef.current];
    const temp = newPhotos[current];
    newPhotos[current] = newPhotos[current - 1];
    newPhotos[current - 1] = temp;
    
    reorderedPhotosRef.current = newPhotos;
    api?.scrollTo(current - 1);
  }, [current, api]);

  const movePhotoDown = useCallback(() => {
    if (current === count - 1) return;
    
    const newPhotos = [...reorderedPhotosRef.current];
    const temp = newPhotos[current];
    newPhotos[current] = newPhotos[current + 1];
    newPhotos[current + 1] = temp;
    
    reorderedPhotosRef.current = newPhotos;
    api?.scrollTo(current + 1);
  }, [current, count, api]);

  const saveReordering = useCallback(() => {
    if (onReorderPhotos) {
      onReorderPhotos(reorderedPhotosRef.current);
    }
    setReorderMode(false);
  }, [onReorderPhotos]);

  const cancelReordering = useCallback(() => {
    reorderedPhotosRef.current = [...photos];
    setReorderMode(false);
  }, [photos]);

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-64 md:h-80 bg-gray-100 rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Nenhuma foto disponível</p>
      </div>
    );
  }

  const currentPhoto = photos[current];

  return (
    <>
      <div className="relative">
        {/* Carousel Controls for Reordering */}
        {reorderMode && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
            <Button 
              size="sm" 
              variant="secondary"
              onClick={movePhotoUp}
              disabled={current === 0}
            >
              ↑ Mover para cima
            </Button>
            <Button 
              size="sm" 
              variant="secondary"
              onClick={movePhotoDown}
              disabled={current === count - 1}
            >
              ↓ Mover para baixo
            </Button>
            <Button 
              size="sm" 
              variant="default"
              onClick={saveReordering}
            >
              Salvar Ordem
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={cancelReordering}
            >
              Cancelar
            </Button>
          </div>
        )}
        
        {/* Main Carousel */}
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent>
            {photos.map((photo, index) => (
              <CarouselItem key={photo.id}>
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
                    
                    {/* Photo Actions */}
                    {isEditable && (
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                          onClick={() => handleFullscreen(photo)}
                        >
                          <Maximize2 className="h-4 w-4 text-gray-700" />
                        </Button>
                        
                        {/* Se temos ações personalizadas, usamos dropdown */}
                        {customActions ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                size="icon" 
                                variant="secondary" 
                                className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                              >
                                <MoreVertical className="h-4 w-4 text-gray-700" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {customActions(photo.id).map((action, i) => (
                                <React.Fragment key={i}>
                                  <DropdownMenuItem 
                                    onClick={action.onClick}
                                    className="cursor-pointer flex items-center gap-2"
                                  >
                                    {action.icon}
                                    {action.label}
                                  </DropdownMenuItem>
                                  {i < customActions(photo.id).length - 1 && <DropdownMenuSeparator />}
                                </React.Fragment>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Button 
                            size="icon" 
                            variant="secondary" 
                            className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                            onClick={() => setPhotoToDelete(photo)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        )}
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

          {/* Navigation arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4">
            <CarouselPrevious className="pointer-events-auto" />
            <CarouselNext className="pointer-events-auto" />
          </div>
        </Carousel>

        {/* Thumbnails and Actions */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2 overflow-x-auto flex-grow">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                className={`rounded-full transition-all ${current === index ? "ring-2 ring-primary" : ""}`}
                onClick={() => api?.scrollTo(index)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={photo.url} alt={`Thumbnail ${index + 1}`} />
                  <AvatarFallback>{index + 1}</AvatarFallback>
                </Avatar>
              </button>
            ))}
            
            {isEditable && onAddPhoto && (
              <button 
                onClick={onAddPhoto}
                className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <span className="text-lg">+</span>
              </button>
            )}
          </div>
          
          {/* Reorder Button */}
          {isEditable && onReorderPhotos && !reorderMode && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-shrink-0 gap-1"
              onClick={() => setReorderMode(true)}
            >
              <MoveVertical className="h-4 w-4" />
              Reordenar
            </Button>
          )}
        </div>
      </div>

      {/* Fullscreen Photo Dialog */}
      <Dialog open={!!fullscreenPhoto} onOpenChange={() => setFullscreenPhoto(null)}>
        <DialogContent className="max-w-4xl w-[90vw] h-[80vh] p-2">
          <DialogClose className="absolute right-2 top-2 z-10 rounded-sm opacity-70 bg-black/50 text-white hover:opacity-100" />
          <div className="w-full h-full relative overflow-auto">
            {fullscreenPhoto && (
              <>
                <img 
                  src={fullscreenPhoto.url} 
                  alt={fullscreenPhoto.caption || "Foto em tela cheia"} 
                  className="w-full h-full object-contain" 
                />
                {fullscreenPhoto.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                    <p className="text-lg">{fullscreenPhoto.caption}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={!!photoToDelete} 
        onOpenChange={(open) => !open && setPhotoToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta foto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfilePhotoCarousel;

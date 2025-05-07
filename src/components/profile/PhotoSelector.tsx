
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { ProfilePhoto } from '@/types/profile';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PhotoSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: ProfilePhoto[];
  albumId: string;
  existingAlbumPhotos: ProfilePhoto[];
  onAddPhotosToAlbum: (photoIds: string[]) => void;
}

const PhotoSelector: React.FC<PhotoSelectorProps> = ({
  open,
  onOpenChange,
  photos,
  albumId,
  existingAlbumPhotos,
  onAddPhotosToAlbum
}) => {
  // Fotos que não estão no álbum atual
  const availablePhotos = useMemo(() => 
    photos.filter(photo => photo.albumId !== albumId),
  [photos, albumId]);

  // Estado para controlar as fotos selecionadas
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<Set<string>>(new Set());

  // Reset seleção quando o modal abre
  React.useEffect(() => {
    if (open) {
      setSelectedPhotoIds(new Set());
    }
  }, [open]);

  const togglePhoto = (photoId: string) => {
    const newSelection = new Set(selectedPhotoIds);
    if (newSelection.has(photoId)) {
      newSelection.delete(photoId);
    } else {
      newSelection.add(photoId);
    }
    setSelectedPhotoIds(newSelection);
  };

  const handleAddPhotos = () => {
    onAddPhotosToAlbum(Array.from(selectedPhotoIds));
    onOpenChange(false);
  };

  if (availablePhotos.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Fotos ao Álbum</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center">
            <p className="text-gray-500">Todas as suas fotos já estão em álbuns. Adicione novas fotos ao seu perfil primeiro.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Selecione fotos para adicionar ao álbum</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[50vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {availablePhotos.map(photo => (
              <div 
                key={photo.id} 
                className={`relative aspect-square cursor-pointer rounded-md overflow-hidden border-2 ${
                  selectedPhotoIds.has(photo.id) ? 'border-primary' : 'border-transparent'
                }`}
                onClick={() => togglePhoto(photo.id)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.caption || "Foto"} 
                  className="w-full h-full object-cover"
                />
                {selectedPhotoIds.has(photo.id) && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="bg-primary text-white rounded-full p-1">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            <p className="text-sm text-gray-500">
              {selectedPhotoIds.size} foto{selectedPhotoIds.size !== 1 ? 's' : ''} selecionada{selectedPhotoIds.size !== 1 ? 's' : ''}
            </p>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleAddPhotos}
                disabled={selectedPhotoIds.size === 0}
              >
                Adicionar
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoSelector;

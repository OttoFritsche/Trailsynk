
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, X, Star, StarOff, Trash2, Edit } from 'lucide-react';
import { PhotoAlbum, ProfilePhoto } from '@/types/profile';
import { formatDate } from '@/utils/profileUtils';
import ProfilePhotoCarousel from './ProfilePhotoCarousel';
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

interface AlbumViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  album: PhotoAlbum | null;
  photos: ProfilePhoto[];
  onEditAlbum: (album: PhotoAlbum) => void;
  onDeleteAlbum: (albumId: string) => void;
  onDeletePhoto: (photoId: string) => void;
  onSetCover: (albumId: string, photoId: string) => void;
  onAddPhotos: (albumId: string) => void;
  onRemovePhotoFromAlbum: (photoId: string) => void;
}

const AlbumViewer: React.FC<AlbumViewerProps> = ({
  open,
  onOpenChange,
  album,
  photos,
  onEditAlbum,
  onDeleteAlbum,
  onDeletePhoto,
  onSetCover,
  onAddPhotos,
  onRemovePhotoFromAlbum
}) => {
  const [confirmDeleteAlbum, setConfirmDeleteAlbum] = useState(false);
  const [photoToRemove, setPhotoToRemove] = useState<string | null>(null);

  if (!album) return null;

  const albumPhotos = photos.filter(photo => photo.albumId === album.id);

  const handleDelete = () => {
    onDeleteAlbum(album.id);
    onOpenChange(false);
  };

  const handleSetAsCover = (photoId: string) => {
    onSetCover(album.id, photoId);
  };

  const handleRemoveFromAlbum = (photoId: string) => {
    onRemovePhotoFromAlbum(photoId);
    setPhotoToRemove(null);
  };

  const photoActions = (photoId: string) => [
    {
      icon: album.coverPhotoId === photoId ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />,
      label: album.coverPhotoId === photoId ? "Remover da capa" : "Definir como capa",
      onClick: () => handleSetAsCover(photoId)
    },
    {
      icon: <Trash2 className="h-4 w-4 text-red-500" />,
      label: "Remover do álbum",
      onClick: () => setPhotoToRemove(photoId)
    }
  ];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl w-[95%] max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{album.title}</DialogTitle>
              <DialogDescription>
                {album.description && <p className="mt-1">{album.description}</p>}
                <p className="text-xs text-gray-500 mt-1">
                  Criado em {formatDate(album.createdAt.toISOString())} • {albumPhotos.length} fotos
                </p>
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onEditAlbum(album)}
                className="gap-1"
              >
                <Edit className="h-4 w-4" /> Editar
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setConfirmDeleteAlbum(true)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" /> Excluir Álbum
              </Button>
              <DialogClose asChild>
                <Button size="icon" variant="ghost">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
          
          <div className="mt-4">
            {albumPhotos.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-gray-500 mb-4">Este álbum não possui fotos</p>
                <Button onClick={() => onAddPhotos(album.id)}>Adicionar Fotos</Button>
              </div>
            ) : (
              <>
                <ProfilePhotoCarousel 
                  photos={albumPhotos}
                  onDeletePhoto={onDeletePhoto}
                  customActions={photoActions}
                />
                
                <div className="mt-4 flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => onAddPhotos(album.id)}
                  >
                    Adicionar Mais Fotos
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmação para excluir álbum */}
      <AlertDialog 
        open={confirmDeleteAlbum} 
        onOpenChange={setConfirmDeleteAlbum}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o álbum "{album.title}"?
              As fotos não serão excluídas, apenas removidas deste álbum.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir Álbum
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmação para remover foto do álbum */}
      <AlertDialog 
        open={!!photoToRemove} 
        onOpenChange={(open) => !open && setPhotoToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover foto do álbum</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover esta foto do álbum? A foto não será excluída do seu perfil.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => photoToRemove && handleRemoveFromAlbum(photoToRemove)}
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlbumViewer;

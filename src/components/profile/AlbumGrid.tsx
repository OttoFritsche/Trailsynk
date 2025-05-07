
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Image, Plus } from 'lucide-react';
import { PhotoAlbum, ProfilePhoto } from '@/types/profile';
import { formatDate } from '@/utils/profileUtils';
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

interface AlbumGridProps {
  albums: PhotoAlbum[];
  photos: ProfilePhoto[];
  onEditAlbum: (album: PhotoAlbum) => void;
  onDeleteAlbum: (albumId: string) => void;
  onViewAlbum: (albumId: string) => void;
  onCreateAlbum: () => void;
}

const AlbumGrid: React.FC<AlbumGridProps> = ({
  albums,
  photos,
  onEditAlbum,
  onDeleteAlbum,
  onViewAlbum,
  onCreateAlbum
}) => {
  const [albumToDelete, setAlbumToDelete] = React.useState<PhotoAlbum | null>(null);

  const getAlbumCoverUrl = (album: PhotoAlbum) => {
    if (album.coverPhotoId) {
      const coverPhoto = photos.find(photo => photo.id === album.coverPhotoId);
      if (coverPhoto) return coverPhoto.url;
    }
    
    // Se não tiver capa definida, tenta encontrar a primeira foto do álbum
    const albumPhotos = photos.filter(photo => photo.albumId === album.id);
    if (albumPhotos.length > 0) return albumPhotos[0].url;
    
    // Imagem padrão se não houver fotos no álbum
    return 'https://images.unsplash.com/photo-1508872558182-ffc7f1b387f9?w=800&h=600&fit=crop';
  };

  const getPhotoCount = (albumId: string) => {
    return photos.filter(photo => photo.albumId === albumId).length;
  };

  const handleConfirmDelete = () => {
    if (albumToDelete) {
      onDeleteAlbum(albumToDelete.id);
      setAlbumToDelete(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Card para adicionar novo álbum */}
        <Card className="flex flex-col items-center justify-center h-64 border-dashed cursor-pointer hover:bg-gray-50 transition-colors">
          <CardContent className="pt-6 flex flex-col items-center justify-center flex-1">
            <div className="bg-primary/10 p-4 rounded-full mb-3">
              <Plus className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-medium text-lg mb-1">Novo Álbum</h3>
            <p className="text-sm text-gray-500 text-center">Crie um álbum para organizar suas fotos</p>
          </CardContent>
          <CardFooter className="pb-4">
            <Button onClick={onCreateAlbum}>Criar Álbum</Button>
          </CardFooter>
        </Card>
        
        {/* Listagem de álbuns */}
        {albums.map(album => (
          <Card key={album.id} className="flex flex-col h-64 overflow-hidden">
            <div 
              className="relative h-36 cursor-pointer"
              onClick={() => onViewAlbum(album.id)}
            >
              <img 
                src={getAlbumCoverUrl(album)}
                alt={album.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="sm" className="gap-1">
                  <Image className="h-4 w-4" /> Ver Álbum
                </Button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded-md text-white text-xs">
                {getPhotoCount(album.id)} fotos
              </div>
            </div>
            
            <CardContent className="pt-3 flex-1">
              <h3 className="font-medium text-lg line-clamp-1" title={album.title}>{album.title}</h3>
              {album.description && (
                <p className="text-sm text-gray-500 line-clamp-1" title={album.description}>
                  {album.description}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                Criado em {formatDate(album.createdAt.toISOString())}
              </p>
            </CardContent>
            
            <CardFooter className="pt-0 flex justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEditAlbum(album)}
                className="gap-1"
              >
                <Edit className="h-4 w-4" /> Editar
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setAlbumToDelete(album)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-1"
              >
                <Trash className="h-4 w-4" /> Excluir
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Diálogo de confirmação para exclusão */}
      <AlertDialog 
        open={!!albumToDelete} 
        onOpenChange={(open) => !open && setAlbumToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o álbum "{albumToDelete?.title}"?
              As fotos não serão excluídas, mas serão removidas deste álbum.
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

export default AlbumGrid;

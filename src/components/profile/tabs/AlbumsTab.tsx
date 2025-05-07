
import React, { useState } from 'react';
import AlbumGrid from '../AlbumGrid';
import AlbumForm from '../AlbumForm';
import AlbumViewer from '../AlbumViewer';
import PhotoSelector from '../PhotoSelector';
import { PhotoAlbum, ProfilePhoto } from '@/types/profile';
import { v4 as uuidv4 } from 'uuid';

interface AlbumsTabProps {
  albums: PhotoAlbum[];
  photos: ProfilePhoto[];
  onAddAlbum: (album: PhotoAlbum) => string;
  onUpdateAlbum: (albumId: string, updates: Partial<PhotoAlbum>) => void;
  onDeleteAlbum: (albumId: string) => void;
  onDeletePhoto: (photoId: string) => void;
  onAssignPhotoToAlbum: (photoId: string, albumId: string | undefined) => void;
  onSetAlbumCover: (albumId: string, photoId: string) => void;
  getAlbumPhotos: (albumId: string) => ProfilePhoto[];
}

const AlbumsTab: React.FC<AlbumsTabProps> = ({
  albums,
  photos,
  onAddAlbum,
  onUpdateAlbum,
  onDeleteAlbum,
  onDeletePhoto,
  onAssignPhotoToAlbum,
  onSetAlbumCover,
  getAlbumPhotos
}) => {
  const [isAlbumFormOpen, setIsAlbumFormOpen] = useState(false);
  const [albumToEdit, setAlbumToEdit] = useState<PhotoAlbum | undefined>(undefined);
  const [selectedAlbum, setSelectedAlbum] = useState<PhotoAlbum | null>(null);
  const [isPhotoSelectorOpen, setIsPhotoSelectorOpen] = useState(false);
  const [currentAlbumId, setCurrentAlbumId] = useState<string | null>(null);
  
  const handleCreateAlbum = () => {
    setAlbumToEdit(undefined);
    setIsAlbumFormOpen(true);
  };
  
  const handleEditAlbum = (album: PhotoAlbum) => {
    setAlbumToEdit(album);
    setIsAlbumFormOpen(true);
  };
  
  const handleSaveAlbum = (album: PhotoAlbum) => {
    if (albumToEdit) {
      onUpdateAlbum(album.id, album);
      
      // Se o álbum sendo editado é o mesmo que está sendo visualizado, atualize-o
      if (selectedAlbum && selectedAlbum.id === album.id) {
        setSelectedAlbum(album);
      }
    } else {
      const newAlbumId = onAddAlbum(album);
      // Se quisermos selecionar o álbum recém-criado automaticamente
      // setSelectedAlbum(album);
    }
  };
  
  const handleDeleteAlbum = (albumId: string) => {
    onDeleteAlbum(albumId);
    // Feche o visualizador se o álbum deletado era o que estava sendo visualizado
    if (selectedAlbum && selectedAlbum.id === albumId) {
      setSelectedAlbum(null);
    }
  };
  
  const handleViewAlbum = (albumId: string) => {
    const album = albums.find(a => a.id === albumId);
    if (album) {
      setSelectedAlbum(album);
    }
  };
  
  const handleAddPhotosToAlbum = (albumId: string) => {
    setCurrentAlbumId(albumId);
    setIsPhotoSelectorOpen(true);
  };
  
  const assignPhotosToAlbum = (photoIds: string[]) => {
    if (!currentAlbumId) return;
    
    photoIds.forEach(photoId => {
      onAssignPhotoToAlbum(photoId, currentAlbumId);
    });
  };
  
  const handleRemovePhotoFromAlbum = (photoId: string) => {
    onAssignPhotoToAlbum(photoId, undefined);
  };

  return (
    <div className="space-y-6">
      <AlbumGrid 
        albums={albums}
        photos={photos}
        onEditAlbum={handleEditAlbum}
        onDeleteAlbum={handleDeleteAlbum}
        onViewAlbum={handleViewAlbum}
        onCreateAlbum={handleCreateAlbum}
      />
      
      <AlbumForm 
        open={isAlbumFormOpen}
        onOpenChange={setIsAlbumFormOpen}
        onSave={handleSaveAlbum}
        initialData={albumToEdit}
      />
      
      <AlbumViewer 
        open={!!selectedAlbum}
        onOpenChange={(open) => !open && setSelectedAlbum(null)}
        album={selectedAlbum}
        photos={selectedAlbum ? getAlbumPhotos(selectedAlbum.id) : []}
        onEditAlbum={handleEditAlbum}
        onDeleteAlbum={handleDeleteAlbum}
        onDeletePhoto={onDeletePhoto}
        onSetCover={onSetAlbumCover}
        onAddPhotos={(albumId) => handleAddPhotosToAlbum(albumId)}
        onRemovePhotoFromAlbum={handleRemovePhotoFromAlbum}
      />
      
      <PhotoSelector 
        open={isPhotoSelectorOpen}
        onOpenChange={setIsPhotoSelectorOpen}
        photos={photos}
        albumId={currentAlbumId || ''}
        existingAlbumPhotos={currentAlbumId ? getAlbumPhotos(currentAlbumId) : []}
        onAddPhotosToAlbum={assignPhotosToAlbum}
      />
    </div>
  );
};

export default AlbumsTab;


import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PhotoAlbum } from '@/types/profile';
import { v4 as uuidv4 } from 'uuid';

interface AlbumFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (album: PhotoAlbum) => void;
  initialData?: PhotoAlbum;
}

const AlbumForm: React.FC<AlbumFormProps> = ({
  open,
  onOpenChange,
  onSave,
  initialData
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preencher o formulário quando estiver editando um álbum existente
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date();
    
    const album: PhotoAlbum = initialData 
      ? {
          ...initialData,
          title,
          description: description || undefined,
          updatedAt: now
        }
      : {
          id: uuidv4(),
          title,
          description: description || undefined,
          createdAt: now,
          updatedAt: now
        };

    onSave(album);
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Editar Álbum' : 'Novo Álbum'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="album-title">Título</Label>
            <Input
              id="album-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nome do álbum"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="album-description">Descrição (opcional)</Label>
            <Textarea
              id="album-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do álbum..."
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={!title || isSubmitting}
            >
              {initialData ? 'Atualizar' : 'Criar'} Álbum
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumForm;

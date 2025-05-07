
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

interface AddPhotoModalProps {
  onPhotoAdded: (photoUrl: string, caption?: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddPhotoModal: React.FC<AddPhotoModalProps> = ({ 
  onPhotoAdded, 
  open, 
  onOpenChange 
}) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verificar tipo e tamanho do arquivo
    if (!file.type.startsWith('image/')) {
      toast.error('O arquivo deve ser uma imagem');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('O arquivo deve ter no máximo 5MB');
      return;
    }

    setPhotoFile(file);

    // Criar preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!photoFile || !user) return;

    setIsUploading(true);

    try {
      // Simulando o upload por enquanto
      // Em uma implementação real, usaríamos o Supabase Storage
      await new Promise(resolve => setTimeout(resolve, 1500));

      // URL temporária para simular o upload
      const mockUrl = URL.createObjectURL(photoFile);
      
      onPhotoAdded(mockUrl, caption || undefined);
      toast.success('Foto adicionada com sucesso!');
      
      // Reset and close
      onOpenChange(false);
      resetForm();
    } catch (error: any) {
      toast.error(`Erro ao adicionar foto: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setPreviewUrl(null);
    setPhotoFile(null);
    setCaption('');
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) resetForm();
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Foto</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {previewUrl ? (
            <div className="relative w-full aspect-video">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-md" 
              />
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute top-2 right-2 h-8 w-8" 
                onClick={() => {
                  setPreviewUrl(null);
                  setPhotoFile(null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-10 text-center">
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Label 
                htmlFor="photo-upload" 
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  Clique para selecionar ou arraste uma imagem
                </span>
                <span className="text-xs text-gray-400 mt-1">
                  JPG, PNG, GIF até 5MB
                </span>
              </Label>
            </div>
          )}
          
          <div>
            <Label htmlFor="caption">Legenda (opcional)</Label>
            <Input 
              id="caption" 
              placeholder="Descreva esta foto..." 
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => handleDialogClose(false)}
            disabled={isUploading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!photoFile || isUploading}
          >
            {isUploading ? (
              <>Enviando...</>
            ) : (
              <>Adicionar Foto</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPhotoModal;

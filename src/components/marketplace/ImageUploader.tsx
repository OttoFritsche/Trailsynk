
import React, { useState, useRef } from 'react';
import { Image, X, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  onImagesChange: (files: File[]) => void;
  maxImages?: number;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImagesChange, 
  maxImages = 5 
}) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (selectedFiles.length === 0) return;
    
    // Check if adding these would exceed the max
    if (imageFiles.length + selectedFiles.length > maxImages) {
      alert(`Você pode adicionar no máximo ${maxImages} imagens.`);
      return;
    }
    
    // Filter for only images
    const validImageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    
    // Create preview URLs
    const newPreviewUrls = validImageFiles.map(file => URL.createObjectURL(file));
    
    // Update state
    setPreviewImages([...previewImages, ...newPreviewUrls]);
    const updatedFiles = [...imageFiles, ...validImageFiles];
    setImageFiles(updatedFiles);
    onImagesChange(updatedFiles);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    // Remove preview
    const updatedPreviews = [...previewImages];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
    
    // Remove file
    const updatedFiles = [...imageFiles];
    updatedFiles.splice(index, 1);
    setImageFiles(updatedFiles);
    onImagesChange(updatedFiles);
  };

  return (
    <div className="space-y-4">
      {/* Image preview grid */}
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {previewImages.map((preview, index) => (
            <div key={index} className="relative group aspect-square">
              <img 
                src={preview} 
                alt={`Preview ${index + 1}`}
                className="h-full w-full object-cover rounded-md border-2 border-gray-200"
              />
              <button 
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow-sm opacity-80 hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Upload button */}
      <div 
        className={cn(
          "border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-primary/50 transition-colors",
          imageFiles.length >= maxImages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
        )}
        onClick={imageFiles.length >= maxImages ? undefined : handleUploadClick}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
          multiple
        />
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 rounded-full bg-primary/10">
            <Image className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {imageFiles.length > 0 ? (
                <>
                  <span className="text-primary">{imageFiles.length}</span> de <span className="text-primary">{maxImages}</span> imagens adicionadas
                </>
              ) : (
                'Clique para adicionar imagens'
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG ou GIF (Máx. {maxImages} imagens)
            </p>
          </div>
        </div>
      </div>
      
      {/* Add more button when there's already at least one image */}
      {(previewImages.length > 0 && previewImages.length < maxImages) && (
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={handleUploadClick}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar mais imagens
        </Button>
      )}
    </div>
  );
};

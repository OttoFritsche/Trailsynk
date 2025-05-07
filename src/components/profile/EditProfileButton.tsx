
import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfileData } from '@/types/profile';
import ProfileForm from './ProfileForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditProfileButtonProps {
  profileData: ProfileData;
  onProfileUpdate: () => void;
  isModalOpen?: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
}

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ 
  profileData, 
  onProfileUpdate,
  isModalOpen: externalIsOpen,
  setIsModalOpen: externalSetIsOpen
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = externalSetIsOpen || setInternalIsOpen;

  return (
    <>
      {/* Only render this button if external modal state control is not provided */}
      {externalIsOpen === undefined && (
        <Button 
          onClick={() => setIsOpen(true)} 
          variant="outline" 
          size="sm" 
          className="absolute top-4 right-4 bg-white/80 hover:bg-white z-10 flex items-center gap-1"
        >
          <Pencil className="h-3 w-3" />
          Editar Perfil
        </Button>
      )}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
          </DialogHeader>
          <ProfileForm 
            initialData={profileData} 
            onSuccess={() => {
              setIsOpen(false);
              onProfileUpdate();
            }} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditProfileButton;

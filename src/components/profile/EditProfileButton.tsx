
import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProfileForm, ProfileFormValues } from '@/components/profile/ProfileForm';
import { ProfileData } from '@/types/profile';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { uploadAvatarToStorage, updateUserProfile } from '@/utils/profileUtils';

interface EditProfileButtonProps {
  profileData: ProfileData;
  onProfileUpdate?: () => void;
}

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ 
  profileData,
  onProfileUpdate
}) => {
  const { user, updateUserProfile: updateAuthProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (
    values: ProfileFormValues, 
    avatarFile: File | null, 
    selectedPreferences: string[]
  ) => {
    if (!user) return;

    setIsSubmitting(true);
    
    try {
      let uploadedAvatarUrl = profileData.avatar_url;
      
      // Upload avatar if there's a new file
      if (avatarFile) {
        const avatarUrl = await uploadAvatarToStorage(user.id, avatarFile);
        if (avatarUrl) {
          uploadedAvatarUrl = avatarUrl;
        }
      }
      
      // Update profile
      const success = await updateUserProfile(
        user.id, 
        values, 
        uploadedAvatarUrl, 
        selectedPreferences
      );
      
      if (!success) {
        throw new Error('Failed to update profile');
      }
      
      // Update avatar_url in user metadata if available
      if (uploadedAvatarUrl) {
        await updateAuthProfile({ avatar_url: uploadedAvatarUrl });
      }
      
      toast.success('Perfil atualizado com sucesso!');
      
      // Close dialog and trigger refresh
      setOpen(false);
      if (onProfileUpdate) {
        onProfileUpdate();
      }
      
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error(`Erro ao salvar perfil: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1 absolute top-4 right-4 z-20"
        >
          <Pencil className="h-4 w-4" /> 
          Editar Perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">Editar Perfil</DialogTitle>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto py-4">
          <ProfileForm
            user={user}
            initialData={profileData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onCancel={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileButton;

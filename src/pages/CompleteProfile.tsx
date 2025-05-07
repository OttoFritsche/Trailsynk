
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { ProfileForm, ProfileFormValues } from '@/components/profile/ProfileForm';
import { fetchProfileData, uploadAvatarToStorage, updateUserProfile } from '@/utils/profileUtils';

const CompleteProfile: React.FC = () => {
  const { user, updateUserProfile: updateAuthProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialProfileData, setInitialProfileData] = useState({});

  // Load existing profile data
  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) return;

      try {
        const profileData = await fetchProfileData(user.id);
        if (profileData) {
          setInitialProfileData(profileData);
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
        toast.error('Erro ao carregar dados do perfil');
      }
    };

    loadProfileData();
  }, [user]);

  // Handle form submission
  const handleSubmit = async (
    values: ProfileFormValues, 
    avatarFile: File | null, 
    selectedPreferences: string[]
  ) => {
    if (!user) return;

    setIsSubmitting(true);
    
    try {
      let uploadedAvatarUrl = initialProfileData.avatar_url;
      
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
      
      // Update avatar_url in user metadata
      if (uploadedAvatarUrl) {
        await updateAuthProfile({ avatar_url: uploadedAvatarUrl });
      }
      
      toast.success('Perfil atualizado com sucesso!');
      navigate('/app/profile');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error(`Erro ao salvar perfil: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Complete Seu Perfil | TrailSynk</title>
      </Helmet>
      
      <div className="max-w-2xl mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="bg-white shadow-md">
          <CardHeader className="text-center border-b pb-6">
            <CardTitle className="text-3xl font-bold text-primary">Complete Seu Perfil TrailSynk</CardTitle>
            <CardDescription className="mt-2">
              Complete seu perfil para obter análises de performance personalizadas e uma experiência adaptada às suas necessidades de ciclismo.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <ProfileForm
              user={user}
              initialData={initialProfileData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              onCancel={() => navigate('/app/profile')}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CompleteProfile;

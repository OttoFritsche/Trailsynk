import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { fetchProfileData, uploadAvatarToStorage, updateUserProfile } from '@/utils/profileUtils';
import { ProfileData, Bicycle } from '@/types/profile';
import { supabase } from '@/integrations/supabase/client';

const CompleteProfile: React.FC = () => {
  const { user, updateUserProfile: updateAuthProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialProfileData, setInitialProfileData] = useState<ProfileData>({});

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

  // Handle profile update success
  const handleProfileUpdateSuccess = () => {
    navigate('/app/profile');
  };

  // Handle skip button click - mark profile as complete but keep it minimal
  const handleSkip = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Update the profile to mark it as complete
      const { error } = await supabase
        .from('profiles')
        .update({ is_profile_complete: true })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      toast.success('Você pode completar seu perfil mais tarde');
      navigate('/app');
    } catch (error) {
      console.error('Error marking profile as complete:', error);
      toast.error('Erro ao pular configuração do perfil');
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
              onSuccess={handleProfileUpdateSuccess}
              onCancel={() => navigate('/app/profile')}
            />
          </CardContent>
          
          <CardFooter className="flex justify-center pb-6">
            <Button 
              variant="outline" 
              onClick={handleSkip} 
              disabled={isSubmitting}
              className="mt-2"
            >
              Pular Por Enquanto
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CompleteProfile;

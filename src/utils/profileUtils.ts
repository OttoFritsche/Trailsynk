
import { supabase } from '@/integrations/supabase/client';
import { ProfileFormValues } from '@/components/profile/ProfileForm';
import { ProfileData } from '@/types/profile';

export const uploadAvatarToStorage = async (
  userId: string,
  avatarFile: File
): Promise<string | null> => {
  try {
    // Create avatar bucket if it doesn't exist
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('avatars');
    if (bucketError && bucketError.message.includes('not found')) {
      await supabase.storage.createBucket('avatars', {
        public: true,
        fileSizeLimit: 1024 * 1024 * 2 // 2MB
      });
    }
    
    // Upload the file
    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatarFile);
      
    if (error) throw error;
    
    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from('avatars')
      .getPublicUrl(data.path);
      
    return publicUrl.publicUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return null;
  }
};

export const updateUserProfile = async (
  userId: string,
  formValues: ProfileFormValues,
  avatarUrl: string | null,
  selectedPreferences: string[]
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formValues.full_name,
        username: formValues.username,
        weight: formValues.weight || null,
        height: formValues.height || null,
        age: formValues.age || null,
        avatar_url: avatarUrl,
        riding_preferences: selectedPreferences,
        is_profile_complete: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
};

export const fetchProfileData = async (userId: string): Promise<ProfileData | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    
    return data as unknown as ProfileData;
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
};

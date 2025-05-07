
import { supabase } from '@/integrations/supabase/client';
import { ProfileFormValues } from '@/components/profile/ProfileForm';
import { ProfileData, Bicycle } from '@/types/profile';

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
  selectedPreferences: string[],
  selectedGoals: string[] = [],
  otherGoal: string = '',
  bicycles: Bicycle[] = []
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
        ride_frequency: formValues.ride_frequency || null,
        avatar_url: avatarUrl,
        riding_preferences: selectedPreferences,
        goals: selectedGoals,
        other_goal: otherGoal,
        bicycles: bicycles,
        is_profile_complete: true, // Always mark as complete when profile is updated
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

// Format a date string to a more readable format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', { 
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Format duration in minutes to a readable format (e.g. "2h 30m")
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}m`;
  }
};

// Handler for Strava connection
export const handleStravaConnect = () => {
  // This is a placeholder for the actual Strava connection logic
  // In a real implementation, this would redirect to Strava OAuth flow
  console.log('Connecting to Strava...');
  alert('Esta funcionalidade será implementada em breve!');
};

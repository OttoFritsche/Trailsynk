
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserMetadata } from '@/types/auth';

export const signIn = async (
  email: string,
  password: string,
  username?: string
) => {
  try {
    let response;
    
    // Only try to find user by username if a username is provided
    if (username) {
      console.log("Attempting to login with username:", username);
      
      // Find the email associated with the username
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();
        
      if (fetchError || !data) {
        console.error('Error fetching user by username:', fetchError);
        return { success: false, error: new Error('Nome de usuário não encontrado') };
      }
      
      // Get user email from auth table
      console.log("Found user with ID:", data.id);
      
      // Sign in with the username's associated email
      const { data: userData, error: authError } = await supabase.auth.admin.getUserById(data.id);
      
      if (authError || !userData?.user) {
        console.error('Error getting user by ID:', authError);
        return { success: false, error: new Error('Erro ao obter informações do usuário') };
      }
      
      response = await supabase.auth.signInWithPassword({
        email: userData.user.email,
        password,
      });
    } else {
      // Normal email login
      console.log("Attempting to login with email:", email);
      response = await supabase.auth.signInWithPassword({
        email,
        password,
      });
    }
    
    const { error } = response;
    if (error) {
      console.error('Login error:', error);
      return { success: false, error };
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error };
  }
};

export const signUp = async (email: string, password: string, metadata?: UserMetadata) => {
  try {
    console.log("Signing up with:", { email, metadata });
    
    // First check if username is unique if provided
    if (metadata?.username) {
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', metadata.username)
        .maybeSingle();
        
      if (checkError) {
        console.error('Error checking username:', checkError);
      }
      
      if (existingUser) {
        return { success: false, error: new Error('Este nome de usuário já está em uso') };
      }
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) {
      console.error('Signup error:', error);
      return { success: false, error };
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { success: false, error };
  }
};

export const signOut = async () => {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (error: any) {
    console.error('Signout error:', error);
    toast.error('Erro ao sair da conta');
    return { success: false, error };
  }
};

export const updateUserProfile = async (updates: UserMetadata) => {
  try {
    const { error } = await supabase.auth.updateUser({
      data: updates
    });

    if (error) throw error;
    
    toast.success('Perfil atualizado com sucesso');
    return { success: true };
  } catch (error: any) {
    console.error('Profile update error:', error);
    toast.error(error.message || 'Erro ao atualizar perfil');
    return { success: false, error };
  }
};

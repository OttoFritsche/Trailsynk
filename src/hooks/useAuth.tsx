
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};

export type UserMetadata = {
  full_name?: string;
  username?: string;
  phone?: string;
  avatar_url?: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthState((current) => ({
          ...current,
          session,
          user: session?.user ?? null,
        }));

        if (event === 'SIGNED_IN') {
          toast.success('Login realizado com sucesso!');
        } else if (event === 'SIGNED_OUT') {
          toast.info('Você saiu da sua conta');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        session,
        user: session?.user ?? null,
        loading: false,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (
    email: string,
    password: string,
    username?: string
  ) => {
    try {
      let response;
      
      if (username) {
        // If username is provided, we need to find the email associated with it
        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('id')
          .eq('username', username)
          .single();
          
        if (fetchError) {
          console.error('Error fetching user by username:', fetchError);
          throw new Error('Nome de usuário não encontrado');
        }
        
        if (!data) {
          throw new Error('Nome de usuário não encontrado');
        }
        
        // Get user email from auth.users using the user ID
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(data.id);
        
        if (userError || !userData?.user) {
          throw new Error('Erro ao obter informações do usuário');
        }
        
        // Now sign in with the email
        response = await supabase.auth.signInWithPassword({
          email: userData.user.email,
          password,
        });
      } else {
        // Normal email login
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }
      
      const { error } = response;
      if (error) throw error;
      
      navigate('/app');
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error };
    }
  };

  const signUp = async (email: string, password: string, metadata?: UserMetadata) => {
    try {
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
          throw new Error('Este nome de usuário já está em uso');
        }
      }
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      return { success: true };
    } catch (error: any) {
      console.error('Signout error:', error);
      toast.error('Erro ao sair da conta');
      return { success: false, error };
    }
  };

  const updateUserProfile = async (updates: UserMetadata) => {
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

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    updateUserProfile
  };
};

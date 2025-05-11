
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { AuthState, UserMetadata, SignInResult, SignUpResult } from '@/types/auth';
import { toast } from 'sonner';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string, username?: string) => Promise<SignInResult>;
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<SignUpResult>;
  signOut: () => Promise<{ success: boolean; error?: Error }>;
  updateUserProfile: (updates: UserMetadata) => Promise<{ success: boolean; error?: Error }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthState((current) => ({
          ...current,
          session,
          user: session?.user ?? null,
        }));

        if (event === 'SIGNED_IN') {
          toast.success('Login realizado com sucesso!');
          
          // Check profile completion status for onboarding flow
          if (session?.user) {
            try {
              const { data: profileData, error } = await supabase
                .from('profiles')
                .select('is_profile_complete, username')
                .eq('id', session.user.id)
                .single();
              
              // Profile completion logic would go here
              // ...
            } catch (error) {
              console.error('Error checking profile status:', error);
            }
          }
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

  const handleSignIn = async (
    email: string,
    password: string,
    username?: string
  ): Promise<SignInResult> => {
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
          return { success: false, error: new Error('Nome de usuário não encontrado') };
        }
        
        // Get user email from auth table
        console.log("Found user with ID:", data.id);
        
        // Sign in with the username's associated email
        const { data: userData, error: authError } = await supabase.auth.admin.getUserById(data.id);
        
        if (authError || !userData?.user) {
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
        return { success: false, error };
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error };
    }
  };

  const handleSignUp = async (email: string, password: string, metadata?: UserMetadata): Promise<SignUpResult> => {
    try {
      // Check username uniqueness if provided
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
        return { success: false, error };
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error };
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      return { success: true };
    } catch (error: any) {
      toast.error('Erro ao sair da conta');
      return { success: false, error };
    }
  };

  const handleUpdateUserProfile = async (updates: UserMetadata) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) throw error;
      
      toast.success('Perfil atualizado com sucesso');
      return { success: true };
    } catch (error: any) {
      toast.error(error.message || 'Erro ao atualizar perfil');
      return { success: false, error };
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    updateUserProfile: handleUpdateUserProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

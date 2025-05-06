
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthState, UserMetadata } from '@/types/auth';
import { signIn, signUp, signOut, updateUserProfile } from '@/services/authService';

export { type AuthState, type UserMetadata } from '@/types/auth';

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

  const handleSignIn = async (
    email: string,
    password: string,
    username?: string
  ) => {
    const result = await signIn(email, password, username);
    
    if (result.success) {
      navigate('/app');
    }
    
    return result;
  };

  const handleSignOut = async () => {
    const result = await signOut();
    
    if (result.success) {
      navigate('/auth');
    }
    
    return result;
  };

  return {
    ...authState,
    signIn: handleSignIn,
    signUp,
    signOut: handleSignOut,
    updateUserProfile
  };
};

export default useAuth;

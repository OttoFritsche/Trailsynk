
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

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
              
              if (!error && profileData) {
                const isProfileComplete = !!profileData.is_profile_complete;
                
                // Only redirect if not already on the complete profile page
                if (!location.pathname.includes('/profile/complete')) {
                  if (!isProfileComplete) {
                    // Redirect to complete profile page
                    navigate('/app/profile/complete');
                  } else if (location.pathname === '/auth') {
                    // Only redirect to feed if coming from auth page
                    navigate('/app');
                  }
                }
              }
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
  }, [navigate, location.pathname]);

  const handleSignIn = async (
    email: string,
    password: string,
    username?: string
  ) => {
    const result = await signIn(email, password, username);
    
    if (result.success) {
      // Let the auth state change handler handle redirection
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

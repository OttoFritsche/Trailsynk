
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
    error: null,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Configurando um indicador de carregamento
    setAuthState(current => ({ ...current, loading: true, error: null }));
    
    // Set up auth state listener FIRST (seguindo as melhores práticas da Supabase)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        setAuthState((current) => ({
          ...current,
          session,
          user: session?.user ?? null,
          loading: false,
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
          navigate('/');
        } else if (event === 'USER_UPDATED') {
          toast.info('Perfil atualizado');
          setAuthState((current) => ({ 
            ...current,
            user: session?.user ?? null
          }));
        }
      }
    );

    // THEN check for existing session (importante manter esta ordem)
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        setAuthState({
          session: null,
          user: null,
          loading: false,
          error: error.message
        });
        return;
      }
      
      setAuthState({
        session,
        user: session?.user ?? null,
        loading: false,
        error: null
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
    // Reset error state and set loading
    setAuthState(current => ({ ...current, loading: true, error: null }));
    
    try {
      const result = await signIn(email, password, username);
      
      if (!result.success) {
        setAuthState(current => ({ 
          ...current, 
          loading: false, 
          error: result.error 
        }));
      }
      
      return result;
    } catch (error: any) {
      const errorMessage = error?.message || 'Erro ao fazer login';
      setAuthState(current => ({ 
        ...current, 
        loading: false, 
        error: errorMessage 
      }));
      
      return { success: false, error: errorMessage };
    }
  };

  const handleSignOut = async () => {
    setAuthState(current => ({ ...current, loading: true, error: null }));
    
    try {
      const result = await signOut();
      
      if (!result.success) {
        setAuthState(current => ({ 
          ...current, 
          loading: false, 
          error: result.error 
        }));
      }
      
      return result;
    } catch (error: any) {
      const errorMessage = error?.message || 'Erro ao sair';
      setAuthState(current => ({ 
        ...current, 
        loading: false, 
        error: errorMessage 
      }));
      
      return { success: false, error: errorMessage };
    }
  };

  // Exposição de estado adicional para facilitar acesso
  const isAuthenticated = !!authState.user;
  const { loading, error, user, session } = authState;

  return {
    isAuthenticated,
    loading,
    error,
    user,
    session,
    signIn: handleSignIn,
    signUp,
    signOut: handleSignOut,
    updateUserProfile
  };
};

export default useAuth;

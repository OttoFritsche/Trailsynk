
import { useState, useEffect, useRef } from 'react';
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
  const isMounted = useRef(true);
  
  useEffect(() => {
    // Set up the mounted ref for cleanup
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted.current) return;
        
        console.log("Auth state change event:", event);
        
        // Update session and user immediately
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
              setAuthState(current => ({ ...current, loading: true }));
              
              const { data: profileData, error } = await supabase
                .from('profiles')
                .select('is_profile_complete, username')
                .eq('id', session.user.id)
                .single();
              
              if (!isMounted.current) return;
              
              if (!error && profileData) {
                const isProfileComplete = !!profileData.is_profile_complete;
                
                // Small delay to ensure state updates are processed
                setTimeout(() => {
                  if (!isMounted.current) return;
                  
                  setAuthState(current => ({ ...current, loading: false }));
                  
                  // Redirect based on profile completion status
                  if (!isProfileComplete) {
                    navigate('/app/profile/complete', { replace: true });
                  } else if (location.pathname === '/auth') {
                    navigate('/app', { replace: true });
                  }
                }, 100);
              } else {
                if (!isMounted.current) return;
                setAuthState(current => ({ ...current, loading: false }));
                
                // Even if we couldn't get profile data, still redirect to app
                if (location.pathname === '/auth') {
                  navigate('/app', { replace: true });
                }
              }
            } catch (error) {
              console.error('Error checking profile status:', error);
              if (!isMounted.current) return;
              setAuthState(current => ({ ...current, loading: false }));
              
              // Even if there was an error, still redirect to app
              if (location.pathname === '/auth') {
                navigate('/app', { replace: true });
              }
            }
          }
        } else if (event === 'SIGNED_OUT') {
          toast.info('Você saiu da sua conta');
          setAuthState(current => ({ ...current, loading: false }));
          
          // Redirect to auth page on sign out
          navigate('/auth', { replace: true });
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted.current) return;
      
      console.log("Initial session check:", session ? "Session exists" : "No session");
      
      setAuthState({
        session,
        user: session?.user ?? null,
        loading: false,
      });
      
      // If user is authenticated and on auth page, redirect to app
      if (session?.user && location.pathname === '/auth') {
        navigate('/app', { replace: true });
      }
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
    setAuthState(current => ({ ...current, loading: true }));
    const result = await signIn(email, password, username);
    
    if (!result.success) {
      setAuthState(current => ({ ...current, loading: false }));
    }
    // If successful, let the auth state change handler handle redirection
    
    return result;
  };

  const handleSignOut = async () => {
    setAuthState(current => ({ ...current, loading: true }));
    const result = await signOut();
    
    if (result.success) {
      navigate('/auth', { replace: true });
    } else {
      setAuthState(current => ({ ...current, loading: false }));
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

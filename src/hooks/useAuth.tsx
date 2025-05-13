
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
    console.log("Setting up auth state listener");
    
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
          
          // Clear loading state immediately after sign in
          setTimeout(() => {
            if (!isMounted.current) return;
            
            setAuthState(current => ({ ...current, loading: false }));
            
            // Redirect based on current path
            if (location.pathname === '/auth') {
              console.log("Auth event: redirecting to /app from /auth");
              navigate('/app', { replace: true });
            }
          }, 100);
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
        loading: false,  // Important: Set loading to false after session check
      });
      
      // If user is authenticated and on auth page, redirect to app
      if (session?.user && location.pathname === '/auth') {
        console.log("Initial session check: redirecting to /app from /auth");
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
    
    if (!result.success) {
      setAuthState(current => ({ ...current, loading: false }));
    }
    // If successful, let the auth state change handler handle redirection
    
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

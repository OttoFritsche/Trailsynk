
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

// This function creates a Supabase client instance
export const createSupabaseClient = () => {
  // Check if we're in the browser environment
  if (typeof window !== 'undefined') {
    const supabaseUrl = window.ENV?.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = window.ENV?.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Only create the client if we have the credentials
    if (supabaseUrl && supabaseAnonKey) {
      return createClient(supabaseUrl, supabaseAnonKey);
    }
  }

  // Return null if we're not in the browser or don't have credentials
  return null;
};

// Hook for using Supabase in components
export const useSupabase = () => {
  const [supabase, setSupabase] = useState<ReturnType<typeof createSupabaseClient>>(null);

  useEffect(() => {
    const client = createSupabaseClient();
    setSupabase(client);
  }, []);

  return supabase;
};


import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

// Hook para usar Supabase em componentes
export const useSupabase = () => {
  const [supabaseClient, setSupabaseClient] = useState(supabase);

  useEffect(() => {
    setSupabaseClient(supabase);
  }, []);

  return supabaseClient;
};

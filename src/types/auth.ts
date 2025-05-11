
import { Session, User } from '@supabase/supabase-js';

export type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
};

export type UserMetadata = {
  full_name?: string;
  username?: string;
  phone?: string;
  avatar_url?: string;
  is_connected_to_strava?: boolean;
};

export type SignInResult = {
  success: boolean;
  error?: Error;
};

export type SignUpResult = SignInResult;

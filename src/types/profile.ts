
export interface ProfileData {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
  is_profile_complete?: boolean;
}

export interface UserStats {
  totalDistance: number;
  totalDuration: number;
  highestElevation: number;
  longestRide: number;
  totalRides: number;
}

export interface UserBadge {
  id: string;
  title: string;
  description: string;
  iconUrl?: string;
  dateEarned?: Date;
  status: "earned" | "locked";
}

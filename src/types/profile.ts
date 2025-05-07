
export interface ProfileData {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
  is_profile_complete?: boolean;
  weight?: number;
  height?: number;
  age?: number;
  riding_preferences?: string[];
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

export interface ProfilePhoto {
  id: string;
  url: string;
  caption?: string;
  albumId?: string;
  activityId?: string;
  isActivityPhoto?: boolean;
  date?: Date;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  description?: string;
  coverPhotoId?: string;
  createdAt: Date;
  updatedAt: Date;
}

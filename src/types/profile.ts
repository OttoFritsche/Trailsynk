
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
  ride_frequency?: string;
  goals?: string[];
  other_goal?: string;
  bicycles?: Bicycle[];
}

export interface UserStats {
  totalDistance: number;
  totalDuration: number;
  highestElevation: number;
  longestRide: number;
  totalRides: number;
  // Add the missing properties that are causing errors
  totalElevationGain?: number;
  weeklyAverage?: number;
  avgSpeed?: number;
  favoriteRouteType?: string;
}

export interface UserBadge {
  id: string;
  title: string;
  description: string;
  dateEarned?: Date;
  status: "earned" | "locked";
  // Add the missing property
  category?: 'distance' | 'elevation' | 'speed' | 'consistency' | 'achievement';
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

export interface Bicycle {
  id: string;
  name: string;
  brand?: string;
  model?: string;
  type?: string;
  image_url?: string;
  initial_odometer?: number;
  purchase_date?: string;
}

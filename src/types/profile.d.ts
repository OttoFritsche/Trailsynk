
export interface ProfileData {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
  is_profile_complete?: boolean;
  weight?: number;
  height?: number;
  age?: number;
  riding_preferences?: {
    favorite_terrain?: string;
    average_distance?: number;
    ride_frequency?: string;
  };
}

export interface UserStats {
  totalDistance: number;
  totalDuration: number;
  highestElevation: number;
  longestRide: number;
  totalRides: number;
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
  status: 'earned' | 'locked';
  category?: 'distance' | 'elevation' | 'speed' | 'consistency' | 'achievement';
}

export interface ProfilePhoto {
  id: string;
  url: string;
  caption?: string;
  albumId?: string;
  date: Date;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  description?: string;
  coverPhotoId?: string;
  createdAt: Date;
  updatedAt: Date;
}

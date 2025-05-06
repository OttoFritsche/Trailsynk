
export interface TrailConnection {
  id: string;
  userId: string;
  fullName?: string;
  username?: string;
  avatarUrl?: string;
  online?: boolean;
  lastActivity?: string;
  stats?: {
    totalDistance?: number;
    totalRides?: number;
    totalTime?: number;
  };
}

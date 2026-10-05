export interface CoordinatesResponse {
  city: string;
  latitude: number;
  longitude: number;
}

export interface FavoriteLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export interface CreateFavoriteLocationRequest {
  name: string;
  latitude: number;
  longitude: number;
}

export interface ClosestLocationsResponse {
  city: string;
  closest_locations: Array<FavoriteLocation & { distance_km: number }>;
}

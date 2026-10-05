import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ClosestLocationsResponse,
  CoordinatesResponse,
  CreateFavoriteLocationRequest,
  FavoriteLocation,
} from './location.models';

@Injectable({
  providedIn: 'root',
})
export class LocationApiService {
  private readonly baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private readonly http: HttpClient) {}

  getCoordinates(city: string): Observable<CoordinatesResponse> {
    const params = new HttpParams().set('city', city);
    return this.http.get<CoordinatesResponse>(`${this.baseUrl}/coordinates/`, { params });
  }

  createFavoriteLocation(payload: CreateFavoriteLocationRequest): Observable<FavoriteLocation> {
    return this.http.post<FavoriteLocation>(`${this.baseUrl}/favorite-locations/`, payload);
  }

  getFavoriteLocations(): Observable<FavoriteLocation[]> {
    return this.http.get<FavoriteLocation[]>(`${this.baseUrl}/favorite-locations/`);
  }

  getClosestLocations(city: string): Observable<ClosestLocationsResponse> {
    const params = new HttpParams().set('city', city);
    return this.http.get<ClosestLocationsResponse>(`${this.baseUrl}/closest-locations/`, { params });
  }
}

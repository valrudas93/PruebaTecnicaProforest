import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CreateFavoriteLocationRequest, FavoriteLocation } from '../location.models';
import { LocationApiService } from '../location-api.service';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss',
})
export class FavoritesPageComponent implements OnInit {
  favoriteName = '';
  favoriteLatitude: number | null = null;
  favoriteLongitude: number | null = null;

  createdFavorite: FavoriteLocation | null = null;
  favorites: FavoriteLocation[] = [];

  createLoading = false;
  listLoading = false;
  errorMessage = '';

  constructor(private readonly locationApi: LocationApiService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  createFavorite(): void {
    if (!this.favoriteName.trim() || this.favoriteLatitude === null || this.favoriteLongitude === null) {
      this.errorMessage = 'Completa nombre, latitud y longitud para registrar una ubicacion favorita.';
      return;
    }

    const payload: CreateFavoriteLocationRequest = {
      name: this.favoriteName.trim(),
      latitude: this.favoriteLatitude,
      longitude: this.favoriteLongitude,
    };

    this.createLoading = true;
    this.errorMessage = '';
    this.createdFavorite = null;

    this.locationApi.createFavoriteLocation(payload).subscribe({
      next: (response) => {
        this.createdFavorite = response;
        this.favoriteName = '';
        this.favoriteLatitude = null;
        this.favoriteLongitude = null;
        this.loadFavorites();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.getErrorMessage(error);
      },
      complete: () => {
        this.createLoading = false;
      },
    });
  }

  loadFavorites(): void {
    this.listLoading = true;
    this.errorMessage = '';

    this.locationApi.getFavoriteLocations().subscribe({
      next: (response) => {
        this.favorites = response;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.getErrorMessage(error);
      },
      complete: () => {
        this.listLoading = false;
      },
    });
  }

  trackByFavoriteId(_: number, item: FavoriteLocation): number {
    return item.id;
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }

    if (error.error && typeof error.error === 'object') {
      const detail = (error.error as { detail?: string }).detail;
      if (detail) {
        return detail;
      }
    }

    return 'No fue posible completar la solicitud. Verifica que el backend Django este activo en http://127.0.0.1:8000.';
  }
}

import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ClosestLocationsResponse, FavoriteLocation } from '../location.models';
import { LocationApiService } from '../location-api.service';

@Component({
  selector: 'app-closest-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './closest-page.component.html',
  styleUrl: './closest-page.component.scss',
})
export class ClosestPageComponent {
  city = '';
  loading = false;
  errorMessage = '';
  result: ClosestLocationsResponse | null = null;

  constructor(private readonly locationApi: LocationApiService) {}

  searchClosestLocations(): void {
    const city = this.city.trim();
    if (!city) {
      this.errorMessage = 'Debes ingresar una ciudad para buscar ubicaciones cercanas.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.result = null;

    this.locationApi.getClosestLocations(city).subscribe({
      next: (response) => {
        this.result = response;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.getErrorMessage(error);
      },
      complete: () => {
        this.loading = false;
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

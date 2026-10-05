import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CoordinatesResponse } from '../location.models';
import { LocationApiService } from '../location-api.service';

@Component({
  selector: 'app-coordinates-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coordinates-page.component.html',
  styleUrl: './coordinates-page.component.scss',
})
export class CoordinatesPageComponent {
  city = '';
  loading = false;
  errorMessage = '';
  result: CoordinatesResponse | null = null;

  constructor(private readonly locationApi: LocationApiService) {}

  searchCoordinates(): void {
    const city = this.city.trim();
    if (!city) {
      this.errorMessage = 'Debes ingresar una ciudad para consultar coordenadas.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.result = null;

    this.locationApi.getCoordinates(city).subscribe({
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

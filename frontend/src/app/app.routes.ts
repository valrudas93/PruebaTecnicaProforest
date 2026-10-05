import { Routes } from '@angular/router';
import { ClosestPageComponent } from './pages/closest-page.component';
import { CoordinatesPageComponent } from './pages/coordinates-page.component';
import { FavoritesPageComponent } from './pages/favorites-page.component';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'coordinates' },
	{ path: 'coordinates', component: CoordinatesPageComponent },
	{ path: 'favorites', component: FavoritesPageComponent },
	{ path: 'closest', component: ClosestPageComponent },
	{ path: '**', redirectTo: 'coordinates' },
];

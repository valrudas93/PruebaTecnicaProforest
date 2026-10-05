from django.urls import path

from .views import FavoriteLocationListCreateView, city_coordinates, closest_locations


urlpatterns = [
    path('coordinates/', city_coordinates, name='coordinates'),
    path('favorite-locations/', FavoriteLocationListCreateView.as_view(), name='favorite-locations'),
    path('closest-locations/', closest_locations, name='closest-locations'),
]

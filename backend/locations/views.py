from geopy.geocoders import Nominatim
from rest_framework import generics
from rest_framework.decorators import api_view
from .models import FavoriteLocation
from .serializers import FavoriteLocationSerializer
from rest_framework.response import Response
from rest_framework import status
from geopy.exc import GeocoderTimedOut, GeocoderServiceError
from geopy.distance import geodesic

geolocator = Nominatim(user_agent="myGeocoder")


def get_coordinates(city):
    try:
        location = geolocator.geocode(city, timeout=10)
    except (GeocoderTimedOut, GeocoderServiceError):
        return None

    if not location:
        return None

    return location.latitude, location.longitude


@api_view(['GET'])
def city_coordinates(request):
    city = request.GET.get('city')
    if not city:
        return Response({'error': 'City parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

    coordinates = get_coordinates(city)
    if coordinates:
        latitude, longitude = coordinates
        return Response(
            {'city': city, 'latitude': latitude, 'longitude': longitude},
            status=status.HTTP_200_OK,
        )

    return Response({'error': 'Location not found'}, status=status.HTTP_404_NOT_FOUND)


class FavoriteLocationListCreateView(generics.ListCreateAPIView):
    queryset = FavoriteLocation.objects.all().order_by('id')
    serializer_class = FavoriteLocationSerializer


@api_view(['GET'])
def closest_locations(request):
    city = request.GET.get('city')
    if not city:
        return Response({'error': 'City parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

    city_coordinates_value = get_coordinates(city)
    if not city_coordinates_value:
        return Response({'error': 'Location not found'}, status=status.HTTP_404_NOT_FOUND)

    city_latitude, city_longitude = city_coordinates_value
    favorites = FavoriteLocation.objects.all()
    distances = []

    for location in favorites:
        location_point = (float(location.latitude), float(location.longitude))
        city_point = (city_latitude, city_longitude)
        distance_km = geodesic(city_point, location_point).km
        distances.append(
            {
                'id': location.id,
                'name': location.name,
                'latitude': float(location.latitude),
                'longitude': float(location.longitude),
                'distance_km': round(distance_km, 2),
            }
        )

    closest = sorted(distances, key=lambda item: item['distance_km'])[:3]
    return Response({'city': city, 'closest_locations': closest}, status=status.HTTP_200_OK)





from rest_framework import serializers

from .models import FavoriteLocation

class FavoriteLocationSerializer(serializers.ModelSerializer):
    latitude = serializers.DecimalField(max_digits=10, decimal_places=8, coerce_to_string=False)
    longitude = serializers.DecimalField(max_digits=11, decimal_places=8, coerce_to_string=False)

    class Meta:
        model = FavoriteLocation
        fields = ['id', 'name', 'latitude', 'longitude']
from . models import FoodTesting_Scan
from rest_framework import serializers



class Food_Testing_Scan_serializer(serializers.ModelSerializer):
    class Meta :
        model = FoodTesting_Scan
        fields = '__all__'
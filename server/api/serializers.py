from . models import FoodTesting_Scan_Image, FoodTesting_Scan_text
from rest_framework import serializers



class Food_Testing_Scan_Image_serializer(serializers.ModelSerializer):
    class Meta :
        model = FoodTesting_Scan_Image
        fields = '__all__'


class Food_Testing_Scan_text_serializer(serializers.ModelSerializer):
    class Meta :
        model = FoodTesting_Scan_text
        fields = '__all__'
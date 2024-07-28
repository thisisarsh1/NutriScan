from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from . models import FoodTesting_Scan_Image, FoodTesting_Scan_text
from . serializers import Food_Testing_Scan_Image_serializer , Food_Testing_Scan_text_serializer


class Food_Testing_Scan_images_views(ModelViewSet):
    queryset = FoodTesting_Scan_Image.objects.all()
    serializer_class = Food_Testing_Scan_Image_serializer


class Food_Testing_Scan_text_views(ModelViewSet):
    queryset = FoodTesting_Scan_text.objects.all()
    serializer_class = Food_Testing_Scan_text_serializer


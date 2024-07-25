from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from . models import FoodTesting_Scan
from . serializers import Food_Testing_Scan_serializer


class Food_Testing_Scan_images(ModelViewSet):
    queryset = FoodTesting_Scan.objects.all()
    serializer_class = Food_Testing_Scan_serializer
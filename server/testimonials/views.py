from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from . models import testimonials
from .serializers import testimonial_serializer

class testimonial_views(ModelViewSet):
    queryset = testimonials.objects.all()
    serializer_class = testimonial_serializer

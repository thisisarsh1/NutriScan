from django.shortcuts import render
from . models import User_Profile
from . serializers import User_profile_serializer
from rest_framework.viewsets import ModelViewSet


class User_profile_views(ModelViewSet):
    queryset = User_Profile.objects.all()
    serializer_class = User_profile_serializer
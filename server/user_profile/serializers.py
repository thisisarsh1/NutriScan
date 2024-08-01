from rest_framework import serializers
from . models import User_Profile

class User_profile_serializer(serializers.ModelSerializer):
    class Meta :
        fields = '__all__'
        model = User_Profile
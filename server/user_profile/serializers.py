from rest_framework import serializers
from .models import User_Profile
from api.models import User

class User_profile_serializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True)  # Accept email in input

    class Meta:
        model = User_Profile
        # exclude = ['user']  # Exclude the user field from the output
        fields = '__all__'

    def create(self, validated_data):
        user_email = validated_data.pop('email')
        user = User.objects.get(email=user_email)  # Fetch user by email
        validated_data['user'] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        user_email = validated_data.pop('email', None)
        if user_email:
            user = User.objects.get(email=user_email)
            instance.user = user
        return super().update(instance, validated_data)

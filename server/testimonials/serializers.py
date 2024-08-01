from rest_framework import serializers
from . models import testimonials

class testimonial_serializer(serializers.ModelSerializer):
    class Meta :
        fields = '__all__'
        model = testimonials
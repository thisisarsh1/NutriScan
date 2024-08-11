# serializers.py

from rest_framework import serializers
from .models import diabetes_barcode

class diabetes_barcode_serializer(serializers.ModelSerializer):
    class Meta: 
        model = diabetes_barcode
        fields = [
            'response_id',
            'barcode_number',
            'result_data',
            'reason_data',
            'user',
            'sugar',
            'carbohydrates',
            'fiber',
            'fat',
            'protein',
            'calories',
            'cholesterol',
            'saturated_fat',
            'sodium',
            'potassium',
            'vitamin_c',
            'calcium',
            'iron'
        ]
        read_only_fields = [
            'response_id', 
            'result_data', 
            'reason_data',
            'sugar',
            'carbohydrates',
            'fiber',
            'fat',
            'protein',
            'calories',
            'cholesterol',
            'saturated_fat',
            'sodium',
            'potassium',
            'vitamin_c',
            'calcium',
            'iron'
        ]

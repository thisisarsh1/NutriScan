# serializers.py

from rest_framework import serializers
from .models import diabetes_barcode
from bot.serializers import Barcode_Bot_Serializer

class diabetes_barcode_serializer(serializers.ModelSerializer):
    class Meta: 
        model = diabetes_barcode
        barcode_bot= Barcode_Bot_Serializer(many= True, read_only = True )
        fields = [
            'response_id',
            'barcode_number',
            'result_data',
            'reason_data',
            'unhealthy_data',
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
            'iron',
            'barcode_bot'
        ]
        read_only_fields = [
            'response_id', 
            'result_data', 
            'reason_data',
            'unhealthy_data',
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

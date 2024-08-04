from rest_framework import serializers
from . models import diabetes_barcode

class diabetes_barcode_serializer(serializers.ModelSerializer):
    class Meta : 
        model = diabetes_barcode
        fields = ['response_id','barcode_number','result_data','reason_data', 'user'] 
        read_only_fields = ['response_data', 'reason_data']

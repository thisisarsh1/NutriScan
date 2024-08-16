# serializers.py
from rest_framework import serializers
from .models import BotResponse, Barcode_bot

class BotResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotResponse
        fields = ['question_id', 'question', 'bot_response','user']
        read_only_fields = ['bot_response']


class Barcode_Bot_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Barcode_bot
        fields = ['question_id', 'question', 'bot_response','user_barcode']
        read_only_fields = ['bot_response']

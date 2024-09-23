from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import BotResponse, Barcode_bot
from .serializers import BotResponseSerializer, Barcode_Bot_Serializer
from .bot_algo import bot_gemini
from .barcode_bot import bot_gemini_bot
from api.models import User
from disease_algorithm.models import diabetes_barcode 
from django.shortcuts import get_object_or_404

class BotResponseView(APIView):
    # def get(self, request):
    #     bot_responses = BotResponse.objects.all()
    #     serializer = BotResponseSerializer(bot_responses, many=True)
    #     return Response(serializer.data)

    def post(self, request):
        question = request.data.get('question')
        user_email = request.data.get('user_email')

        if not question:
            return Response({'error': 'Question is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not user_email:
            return Response({'error': 'User email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = get_object_or_404(User, email=user_email)

        bot_prompt = f"{question} Answer the question within 50 words" 
        
        bot_response_text = bot_gemini(bot_prompt, user.id)
        
        bot_response = BotResponse.objects.create(question=question, bot_response=bot_response_text, user=user)
        
        serializer = BotResponseSerializer(bot_response)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

class Bot_Barcode_View(APIView):
    # def get(self, request):
    #     bot_responses = Barcode_bot.objects.all()
    #     serializer = Barcode_Bot_Serializer(bot_responses, many=True)
    #     return Response(serializer.data)

    def post(self, request):
        question = request.data.get('question')
        user_email = request.data.get('user_email')
        barcode_number_user = request.data.get('barcode_number')
        print(barcode_number_user)

        if not question:
            return Response({'error': 'Question is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not user_email:
            return Response({'error': 'User email is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not barcode_number_user:
            return Response({'error': 'User Barcode Number is required'}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, email=user_email)
        barcode_number = get_object_or_404(diabetes_barcode, barcode_number=barcode_number_user, user=user)

        bot_prompt = f"{question} Answer the question within 50 words"
        
        bot_response_text = bot_gemini_bot(bot_prompt, user.id, barcode_number.barcode_number)

        bot_response = Barcode_bot.objects.create(
            question=question,
            bot_response=bot_response_text,
            user_barcode=barcode_number
        )

        serializer = Barcode_Bot_Serializer(bot_response)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

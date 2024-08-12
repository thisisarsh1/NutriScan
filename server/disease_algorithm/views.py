from django.shortcuts import render
from . models import diabetes_barcode
from . serializers import diabetes_barcode_serializer
from . diabetes_disease import ProductAnalysis
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status
from api.models import User

class Diabetes_Response_View(APIView):
    def get(self, request):
        bot_responses = diabetes_barcode.objects.all()
        serializer = diabetes_barcode_serializer(bot_responses, many=True)
        return Response(serializer.data)

    def post(self, request):
        barcode_number= request.data.get('barcode_number')
        user_email = request.data.get('user_email')

        if not barcode_number:
            return Response({'error': 'Barcode number is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not user_email:
            return Response({'error': 'User email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Lookup the user by email
        user = get_object_or_404(User,email=user_email)
        
        try:
            # Generate bot response with context
            analysis = ProductAnalysis(barcode_number)
            analysis.fetch_data()
            result_data = analysis.show_results()
            reason_data = analysis.show_reasons()
            sugar = analysis.get_sugar()
            carbohydrates = analysis.get_carbohydrates()
            fiber = analysis.get_fiber()
            fat = analysis.get_fat()
            protein = analysis.get_protein()
            calories = analysis.get_calories()
            cholesterol = analysis.get_cholesterol()
            saturated_fat = analysis.get_saturated_fat()
            sodium = analysis.get_sodium()
            potassium = analysis.get_potassium()
            vitamin_c = analysis.get_vitamin_c()
            calcium = analysis.get_calcium()
            iron = analysis.get_iron()


            # Debug print statements
            print(f"Result Data: {result_data}")
            print(f"Reason Data: {reason_data}")
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
        # Create BotResponse instance associated with the user
        final_making_response = diabetes_barcode.objects.create(
            barcode_number=barcode_number,
            result_data=result_data,
            reason_data=reason_data,
            sugar=sugar,
            carbohydrates=carbohydrates,
            fiber=fiber,
            fat=fat,
            protein=protein,
            calories=calories,
            cholesterol=cholesterol,
            saturated_fat=saturated_fat,
            sodium=sodium,
            potassium=potassium,
            vitamin_c=vitamin_c,
            calcium=calcium,
            iron=iron,
            user=user  # Assuming `user` is a variable holding the current user
        )
        
        # Serialize the bot response
        serializer = diabetes_barcode_serializer(final_making_response)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

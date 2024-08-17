# urls.py
from django.urls import path
from .views import BotResponseView, Bot_Barcode_View

urlpatterns = [
    path('bot_response/', BotResponseView.as_view(), name='bot_response'),
    path('bot_barcode/', Bot_Barcode_View.as_view(), name='bot_barcode'),
]

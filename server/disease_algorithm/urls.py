# urls.py
from django.urls import path
from .views import Diabetes_Response_View

urlpatterns = [
    path('barcode_response', Diabetes_Response_View.as_view(), name='diabetes_disease'),
]

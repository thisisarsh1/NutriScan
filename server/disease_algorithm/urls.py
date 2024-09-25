# urls.py
from django.urls import path
from .views import Diabetes_Response_View
from .live_scanning_views  import scanner_view,process_barcode

urlpatterns = [
    path('barcode_response', Diabetes_Response_View.as_view(), name='diabetes_disease'),
    path('live_scanning', scanner_view, name= 'scanner'),
    path('process_barcode', process_barcode, name='process_barcode'),
]

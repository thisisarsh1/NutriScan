# barcode_scanner/views.py
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse

def scanner_view(request):
    return render(request, 'scanner.html')

@csrf_exempt  # Use with caution; better to use CSRF tokens in production
def process_barcode(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        barcode = data.get('barcode')
        # Here you can save to the database or perform other actions
        return JsonResponse({'status': 'success', 'barcode': barcode})

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Food_Testing_Scan_images


router = DefaultRouter()
router.register('images',Food_Testing_Scan_images, basename='food_testing_scan_images')



urlpatterns = [
    path('foodscan/', include(router.urls))
]


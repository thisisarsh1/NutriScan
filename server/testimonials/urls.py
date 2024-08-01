from . views import testimonial_views
from django.urls import path,include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('testimonial',testimonial_views,basename='testimonial')

urlpatterns = [
    path('', include(router.urls))
]

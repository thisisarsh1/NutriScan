from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . views import User_profile_views

router = DefaultRouter()
router.register('user_profile',User_profile_views, basename='user_profile')

urlpatterns = [
    path('',include(router.urls))
]

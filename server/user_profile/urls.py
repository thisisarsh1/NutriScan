from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . views import User_profile_views
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register('user_profile',User_profile_views, basename='user_profile')

urlpatterns = [
    path('',include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

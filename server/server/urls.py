from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('bot/',include('bot.urls')),
    path('api/user/',include('user_profile.urls')),
    path('api/user/',include('testimonials.urls')),
    path('api/user/',include('disease_algorithm.urls')),
]

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import  staticfiles_urlpatterns


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('bot/',include('bot.urls')),
    path('api/user/',include('user_profile.urls')),
    path('api/user/',include('testimonials.urls')),
    path('api/user/',include('disease_algorithm.urls')),
    path('videocall',include('videocall.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns  += staticfiles_urlpatterns()  

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import Food_Testing_Scan_images_views, Food_Testing_Scan_text_views
from . authentication_views import  RegisterView, LoginView, LogoutView, PasswordResetView, PasswordResetRequestView
from . user_view import UserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.register('images',Food_Testing_Scan_images_views, basename='food_testing_scan_images')
router.register('text',Food_Testing_Scan_text_views, basename='food_testing_scan_text')



urlpatterns = [
    path('foodscan/', include(router.urls)),
    path('register',RegisterView.as_view()),
    path('login',LoginView.as_view()),
    path('user',UserView.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout',LogoutView.as_view()),
    path('password-reset-request/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset/', PasswordResetView.as_view(), name='password-reset'),
]


from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin 
from .managers import CustomUserManager
# Create your models here.



class FoodTesting_Scan_Image(models.Model):
    testing_id = models.AutoField(primary_key=True)
    scan_image = models.ImageField(upload_to='foodscan/')


    def __str__(self) :
        return self.testing_id
    


class FoodTesting_Scan_text(models.Model):
    testing_id = models.AutoField(primary_key=True)
    scan_text = models.TextField()

class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)
    password = models.CharField(max_length=500)
    username = None
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_expiration = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True)  # Default to True for active users
    is_staff = models.BooleanField(default=False)  # Add is_staff field if missing

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()


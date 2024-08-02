from django.db import models
from api.models import User

# Create your models here.
class User_Profile(models.Model):
    Proffesion = models.TextField()
    disease = models.TextField()
    date_of_birth = models.DateField()
    gender = models.TextField()
    user = models.ForeignKey(User,related_name='user_profile', on_delete=models.CASCADE)
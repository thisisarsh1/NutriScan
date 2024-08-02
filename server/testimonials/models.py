from django.db import models
from api.models import User


class testimonials(models.Model):
    review = models.TextField()
    user = models.ForeignKey(User, related_name='review', on_delete=models.CASCADE)

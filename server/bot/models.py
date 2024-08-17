from django.db import models
from api.models import User
from disease_algorithm.models import diabetes_barcode

class BotResponse(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=255, default='default_value')
    bot_response = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name='botresponse')
    def __str__(self):
        return self.question
    

class Barcode_bot(models.Model):
    question_id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=255, default='default_value')
    bot_response = models.TextField()
    user_barcode = models.ForeignKey(diabetes_barcode, on_delete=models.CASCADE , related_name='barcode_bot')
    
    def __str__(self):
        return self.question

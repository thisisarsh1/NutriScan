from django.db import models
from api.models import User


class diabetes_barcode(models.Model):
    response_id = models.AutoField(primary_key=True)
    barcode_number = models.CharField(max_length=255, default='default_value')
    result_data = models.TextField()
    reason_data = models.TextField()
    unhealthy_data = models.TextField(default=None)
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name='barcode_response')
    sugar = models.FloatField(null=True, blank=True)
    carbohydrates = models.FloatField(null=True, blank=True)
    fiber = models.FloatField(null=True, blank=True)
    fat = models.FloatField(null=True, blank=True)
    protein = models.FloatField(null=True, blank=True)
    calories = models.FloatField(null=True, blank=True)
    cholesterol = models.FloatField(null=True, blank=True)
    saturated_fat = models.FloatField(null=True, blank=True)
    sodium = models.FloatField(null=True, blank=True)
    potassium = models.FloatField(null=True, blank=True)
    vitamin_c = models.FloatField(null=True, blank=True)
    calcium = models.FloatField(null=True, blank=True)
    iron = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.barcode_number


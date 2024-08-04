from django.db import models
from api.models import User


class diabetes_barcode(models.Model):
    response_id = models.AutoField(primary_key=True)
    barcode_number = models.CharField(max_length=255, default='default_value')
    result_data = models.TextField()
    reason_data = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name='barcode_response')
    def __str__(self):
        return self.barcode_number


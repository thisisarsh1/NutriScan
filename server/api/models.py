from django.db import models

# Create your models here.
class FoodTesting_Scan(models.Model):
    testing_id = models.AutoField(primary_key=True)
    scan_image = models.ImageField(upload_to='foodscan/')


    def __str__(self) :
        return self.testing_id
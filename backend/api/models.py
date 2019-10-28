from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    pass

    def __str__(self):
        return self.email


class File(models.Model):
    title = models.CharField(max_length = 100)
    content = models.TextField()
    owner = models.ForeignKey('CustomUser', related_name='files', on_delete=models.CASCADE)

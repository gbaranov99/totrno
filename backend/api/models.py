from django.db import models
from django.contrib.auth.models import AbstractUser

class File(models.Model):
    title = models.CharField(max_length = 100)
    content = models.TextField()

class CustomUser(AbstractUser):
    name = models.CharField(blank=True, max_length=255)
    #username = models.CharField(blank=True, max_length=255)
    #email = models.EmailField(unique=True) 
    ###email = models.EmailField(_('email address'), unique=True)

    #USERNAME_FIELD = 'email'
    #REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

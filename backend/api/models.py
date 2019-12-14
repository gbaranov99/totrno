from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
#from mptt.models import MPTTModel, TreeForeignKey


class CustomUser(AbstractUser):

    def __str__(self):
        return self.email


class File(models.Model):
    title = models.CharField(max_length = 100)
    content = models.TextField(blank=True)
    owner = models.ForeignKey('CustomUser', related_name='files', on_delete=models.CASCADE)
    due_date = models.DateTimeField(null=True, blank=True)
    closed = models.BooleanField(default=True)
    completed = models.BooleanField(default=False)
    archived = models.BooleanField(default=False)
    parent = models.ForeignKey('File',  related_name='file_set', on_delete=models.CASCADE, null=True, blank=True)


class TimeLog(models.Model):
    beforeNote = models.CharField(max_length = 50, blank=True)
    afterNote = models.CharField(max_length = 50, blank=True)
    nextNote = models.CharField(max_length = 50, blank=True)
    startTime = models.DateTimeField(null=True, blank=True)
    endTime = models.DateTimeField(null=True, blank=True)
    duration = models.TimeField(null=True, blank=True)
    owner = models.ForeignKey('CustomUser', related_name='timelogs', on_delete=models.CASCADE)
    associated_file = models.ForeignKey('File',  related_name='timelog_set', on_delete=models.CASCADE, null=True, blank=True)
    active = models.BooleanField(default=False)
    file_name = models.CharField(max_length = 100, blank=True)

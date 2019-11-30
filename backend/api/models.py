from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
from mptt.models import MPTTModel, TreeForeignKey


class CustomUser(AbstractUser):
    pass

    def __str__(self):
        return self.email


#class File(MPTTModel):
#    title = models.CharField(max_length = 100, unique=True)
#    content = models.TextField()
#    owner = models.ForeignKey('CustomUser', related_name='files', on_delete=models.CASCADE)
#    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
#
#    class MPTTMeta:
#        order_insertion_by = ['title']
#        level = 0

class File(models.Model):
    title = models.CharField(max_length = 100)
    content = models.TextField()
    owner = models.ForeignKey('CustomUser', related_name='files', on_delete=models.CASCADE)
    parent = models.ForeignKey('File',  related_name='file_set', on_delete=models.CASCADE, null=True, blank=True)
    #path = ArrayField(models.ForeignKey('File', related_name='file_path', on_delete=models.CASCADE, null=True, blank=True))
    path = ArrayField(models.IntegerField(), default=list)


class TimeLog(models.Model):
    beforeNote = models.CharField(max_length = 50, blank=True)
    afterNote = models.CharField(max_length = 50, blank=True)
    nextNote = models.CharField(max_length = 50, blank=True)
    startTime = models.DateTimeField();
    endTime = models.DateTimeField(null=True, blank=True);
    owner = models.ForeignKey('CustomUser', related_name='timelogs', on_delete=models.CASCADE)
    associated_file = models.ForeignKey('File',  related_name='timelog_set', on_delete=models.CASCADE, null=True, blank=True)

from django.db import models
from django.contrib.auth.models import AbstractUser
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


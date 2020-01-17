from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField
#from mptt.models import MPTTModel, TreeForeignKey


#class UserSettings(models.Model):
#    countup = 'countup'
#    countdown = 'countdown'
#    interval = 'interval'
#    pomodoro = 'pomodoro'
#
#    timer_option_choices = [
#        (countup, 'countup'),
#        (countdown, 'countdown'),
#        (interval, 'interval'),
#        (pomodoro, 'pomodoro'),
#    ]
#    timer_choice = models.CharField( max_length=9, choices=timer_option_choices, default=countup)
#
#    pomodoro_duration = models.TimeField(null=True, blank=True)
#    pomodoro_small_break_count = models.IntegerField(null=True)
#    pomodoro_small_break_duration = models.TimeField(null=True, blank=True)
#    pomodoro_big_break_duration = models.TimeField(null=True, blank=True)


class CustomUser(AbstractUser):
    countup = 'countup'
    countdown = 'countdown'
    interval = 'interval'
    pomodoro = 'pomodoro'

    timer_option_choices = [
        (countup, 'countup'),
        (countdown, 'countdown'),
        (interval, 'interval'),
        (pomodoro, 'pomodoro'),
    ]
    timer_choice = models.CharField( max_length=9, choices=timer_option_choices, default=countup)
    countdown_duration = models.TimeField(default='00:30:00')
    pomodoro_duration = models.TimeField(default='00:25:00')
    pomodoro_short_break_count = models.IntegerField(default=4)
    pomodoro_short_break_duration = models.TimeField(default='00:05:00')
    pomodoro_long_break_duration = models.TimeField(default='00:30:00')

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
    beforeNote = models.CharField(max_length = 300, blank=True)
    afterNote = models.CharField(max_length = 300, blank=True)
    nextNote = models.CharField(max_length = 300, blank=True)
    startTime = models.DateTimeField(null=True, blank=True)
    endTime = models.DateTimeField(null=True, blank=True)
    duration = models.TimeField(null=True, blank=True)
    owner = models.ForeignKey('CustomUser', related_name='timelogs', on_delete=models.CASCADE)
    associated_file = models.ForeignKey('File',  related_name='timelog_set', on_delete=models.CASCADE, null=True, blank=True)
    active = models.BooleanField(default=False)
    file_name = models.CharField(max_length = 300, blank=True)

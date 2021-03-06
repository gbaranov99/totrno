from rest_framework import serializers
from .models import File, TimeLog, CustomUser
from rest_auth.serializers import UserDetailsSerializer

class RecursiveField(serializers.ModelSerializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class FileSerializer(serializers.ModelSerializer):
    file_set = RecursiveField(many=True, read_only=True)
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = File
        fields = ('id', 'title', 'content', 'owner', 'due_date', 'closed', 'completed', 'archived', 'parent', 'file_set')


class SingleFileSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = File
        fields = ('id', 'title', 'content', 'owner', 'due_date', 'closed', 'completed', 'archived', 'parent')


class TimeLogSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = TimeLog
        fields = ('id', 'before_note', 'after_note', 'next_note', 'start_time', 'end_time', 'duration', 'owner', 'associated_file', 'active', 'file_name',)


class UserDetailsSerializer(UserDetailsSerializer):

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + ('timer_choice', 'countdown_duration', 'pomodoro_duration', 'pomodoro_short_break_count', 'pomodoro_short_break_duration', 'pomodoro_long_break_duration',)

        read_only_fields = ('',)

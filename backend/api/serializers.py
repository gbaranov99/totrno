from rest_framework import serializers
from .models import File, CustomUser

class FileSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = File
        fields = ('id', 'title', 'content', 'owner',)


class UserSerializer(serializers.ModelSerializer):
    files = serializers.PrimaryKeyRelatedField(many=True, queryset=File.objects.all())

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'files',)

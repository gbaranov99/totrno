from rest_framework import serializers
from .models import File, CustomUser

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('id', 'title', 'content', 'pk')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'username', )

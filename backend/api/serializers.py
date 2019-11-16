from rest_framework import serializers
from .models import File, CustomUser

class RecursiveField(serializers.ModelSerializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class FileSerializer(serializers.ModelSerializer):
    file_set = RecursiveField(many=True, read_only=True)
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = File
        fields = ('id', 'title', 'content', 'owner', 'parent', 'file_set',)



class UserSerializer(serializers.ModelSerializer):
    files = serializers.PrimaryKeyRelatedField(many=True, queryset=File.objects.all())

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'files',)

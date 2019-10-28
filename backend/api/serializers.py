from rest_framework import serializers
from .models import File, CustomUser

class FileSerializer(serializers.ModelSerializer):
    #owner = serializers.ReadOnlyField(source='owner.username')
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = File
        fields = ('id', 'title', 'content', 'owner',)
        #fields = ('id', 'title', 'content',)

class UserSerializer(serializers.ModelSerializer):
    #files = serializers.HyperlinkedRelatedField(
    #    many=True, view_name='file-detail', read_only=True)
    files = serializers.PrimaryKeyRelatedField(many=True, queryset=File.objects.all())

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'files',)
        #fields = ('email', 'username')

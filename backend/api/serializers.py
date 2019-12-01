from rest_framework import serializers
from .models import File, TimeLog, CustomUser

class RecursiveField(serializers.ModelSerializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data


class FileSerializer(serializers.ModelSerializer):
    file_set = RecursiveField(many=True, read_only=True)
    #file_set = RecursiveField(many=True, )
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = File
        fields = ('id', 'title', 'content', 'owner', 'parent', 'file_set', 'closed')

    #TODO: get writeable nested serializers
    #def create(self, validated_data):
    #    id = validated_data.get('id', None)
    #    content = validated_data.get('content', None)
    #    owner = validated_data.get('owner', None)
    #    parent = validated_data.get('parent', None)
    #    file_set.set([])
    #    myfile = File.objects.create(id=id, content=content, owner=owner, parent=parent,file_set=file_set)
    #    return myfile


class UserSerializer(serializers.ModelSerializer):
    files = serializers.PrimaryKeyRelatedField(many=True, queryset=File.objects.all())

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'files',)

class TimeLogSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = TimeLog
        fields = ('id', 'beforeNote', 'afterNote', 'nextNote', 'startTime', 'endTime', 'owner', 'associated_file',)

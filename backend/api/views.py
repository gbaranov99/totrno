from .models import File, TimeLog, CustomUser
from .serializers import FileSerializer, TimeLogSerializer, UserSerializer
from rest_framework import generics, viewsets, permissions
from django.shortcuts import render
from rest_framework.response import Response


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def preform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return File.objects.filter(owner=user, parent=None)

class AllFileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def preform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return File.objects.filter(owner=user)

class TimeLogViewSet(viewsets.ModelViewSet):
    queryset = TimeLog.objects.all()
    serializer_class = TimeLogSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def preform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return TimeLog.objects.filter(owner=user)


#class UserViewSet(viewsets.ModelViewSet):
#    queryset = CustomUser.objects.all()
#    serializer_class = UserSerializer
#
#    def get_queryset(self):
#        user = self.request.user
#        return CustomUser.objects.filter(user=user)

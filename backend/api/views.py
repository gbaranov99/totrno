from .models import File, TimeLog, CustomUser
from .serializers import SingleFileSerializer, FileSerializer, TimeLogSerializer
#, UserSerializer
from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets, permissions, filters
from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth import get_user_model


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    def get_queryset(self):
        user = self.request.user
        return File.objects.filter(owner=user, parent=None)


#class UserViewSet(viewsets.ModelViewSet):
#    serializer_class = UserSerializer
#    permission_classes = (permissions.IsAuthenticated,)
#
#    #def perform_create(self, serializer):
#    #    serializer.save()
#    
#    def get_object(self):
#        return self.request.user
#
#    def get_queryset(self):
#        #user = self.request.user
#        #return CustomUser.objects.filter(username=user.username)
#        return get_user_model().objects.none()
#


class AllFileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = SingleFileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return File.objects.filter(owner=user)


class TimeLogViewSet(viewsets.ModelViewSet):
    queryset = TimeLog.objects.all()
    serializer_class = TimeLogSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return TimeLog.objects.filter(owner=user)


class ActiveTimeLogViewSet(viewsets.ModelViewSet):
    queryset = TimeLog.objects.all()
    serializer_class = TimeLogSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return TimeLog.objects.filter(owner=user, active=True)


class FileLogViewSet(viewsets.ModelViewSet):
    queryset = TimeLog.objects.all()
    #queryset = queryset.order_by('id')
    serializer_class = TimeLogSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = [filters.SearchFilter]
    search_fields= ['associated_file__id']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        user = self.request.user
        #return TimeLog.objects.filter(owner=user, associated_file=6)
        return TimeLog.objects.filter(owner=user).order_by('-startTime')

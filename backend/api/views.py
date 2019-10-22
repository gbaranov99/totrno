from .models import File, CustomUser
from .serializers import FileSerializer, UserSerializer
from rest_framework import viewsets
from django.shortcuts import render


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

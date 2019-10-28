from .models import File, CustomUser
from .serializers import FileSerializer, UserSerializer
from rest_framework import generics, viewsets, permissions
from django.shortcuts import render
from rest_framework.response import Response


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def preform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


#
#
#class FileList(generics.ListCreateAPIView):
#    queryset = File.objects.all()
#    serializer_class = FileSerializer
# 
#    def perform_create(self, serializer):
#        serializer.save(user=self.request.user)
# 
# 
#class FileDetail(generics.RetrieveUpdateDestroyAPIView):
#    serializer_class = FileSerializer
# 
#    def get_queryset(self):
#        return File.objects.all().filter(user=self.request.user)
#
#
#class UserList(generics.ListCreateAPIView):
#    queryset = CustomUser.objects.all()
#    serializer_class = UserSerializer
# 
# 
#class UserDetail(generics.RetrieveUpdateDestroyAPIView):
#    serializer_class = UserSerializer
# 
#    def get_queryset(self):
#        return CustomUser.objects.all().filter(username=self.request.user)

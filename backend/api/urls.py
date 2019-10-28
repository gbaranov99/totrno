from django.urls import path, include
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register('files', views.FileViewSet)
#router.register('users', views.UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/rest-auth/', include('rest_auth.urls')),
    path('api/rest-auth/registration', include('rest_auth.registration.urls')),
]

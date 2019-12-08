from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from api import views

router = routers.DefaultRouter()
router.register('files', views.FileViewSet)
router.register('allFiles', views.AllFileViewSet)
router.register('logs', views.TimeLogViewSet)
router.register('activeLogs', views.ActiveTimeLogViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/rest-auth/', include('rest_auth.urls')),
    path('api/rest-auth/registration', include('rest_auth.registration.urls')),
]

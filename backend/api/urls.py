from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from api import views

router = routers.DefaultRouter()
router.register('files', views.FileViewSet)
router.register('allFiles', views.AllFileViewSet)
router.register('allLogs', views.TimeLogViewSet)
#router.register('users', views.UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
#    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
#    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/rest-auth/', include('rest_auth.urls')),
    path('api/rest-auth/registration', include('rest_auth.registration.urls')),
]

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PostViewSet, SiteSettingsViewSet

router_v1 = DefaultRouter()
router_v1.register('posts', PostViewSet, basename='posts')
router_v1.register('settings', SiteSettingsViewSet, basename='settings')


urlpatterns = [
    path('v1/', include(router_v1.urls)),
]
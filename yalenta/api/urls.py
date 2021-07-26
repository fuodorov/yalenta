from django.urls import path, include
from rest_framework.routers import DefaultRouter

from posts.viewsets import PostViewSet, CommentViewSet, SiteSettingsViewSet

router_v1 = DefaultRouter()
router_v1.register('posts', PostViewSet, basename='posts')
router_v1.register('comments', CommentViewSet, basename='comments')
router_v1.register('settings', SiteSettingsViewSet, basename='settings')

urlpatterns = [
    path('v1/', include(router_v1.urls)),
    path('v1/o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('v1/', include('djoser.urls')),
]

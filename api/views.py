from rest_framework import viewsets

from posts.models import Post, SiteSettings
from .serializers import PostSerializer, SiteSettingsSerializer


class PostViewSet(viewsets.ModelViewSet):
    """View post class."""
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class SiteSettingsViewSet(viewsets.ModelViewSet):
    """View settings class."""
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Post, SiteSettings, Comment
from .paginations import CustomPagination
from .serializers import PostSerializer, CommentSerializer, SiteSettingsSerializer


class PostViewSet(viewsets.ModelViewSet):
    """View post class."""
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = CustomPagination
    permission_classes = (IsAuthenticatedOrReadOnly,)


class CommentViewSet(viewsets.ModelViewSet):
    """View comment class."""
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly,)


class SiteSettingsViewSet(viewsets.ModelViewSet):
    """View settings class."""
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer

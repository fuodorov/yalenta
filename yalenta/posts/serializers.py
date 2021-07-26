from rest_framework import serializers

from posts.models import Post, SiteSettings, Comment


class CommentSerializer(serializers.ModelSerializer):
    """Serializer comment class."""
    class Meta:
        fields = '__all__'
        model = Comment


class PostSerializer(serializers.ModelSerializer):
    """Serializer post class."""
    class Meta:
        fields = ('id', 'title', 'text', 'pub_date', 'image')
        model = Post


class SiteSettingsSerializer(serializers.ModelSerializer):
    """Serializer site settings class."""
    class Meta:
        fields = ('posts_per_page',)
        model = SiteSettings

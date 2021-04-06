from rest_framework import serializers

from posts.models import Post, SiteSettings


class PostSerializer(serializers.ModelSerializer):
    """Serializer post class."""
    class Meta:
        fields = '__all__'
        model = Post


class SiteSettingsSerializer(serializers.ModelSerializer):
    """Serializer site settings class."""
    class Meta:
        fields = ('posts_per_page',)
        model = SiteSettings

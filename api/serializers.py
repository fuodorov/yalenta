from rest_framework import serializers

from posts.models import Post, SiteSettings


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('title', 'text', 'image', 'pub_date')
        model = Post


class SiteSettingsSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('posts_per_page',)
        model = SiteSettings

from django import forms

from .models import Post, SiteSettings


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('title', 'text', 'image')


class SiteSettingsForm(forms.ModelForm):
    class Meta:
        model = SiteSettings
        fields = ('posts_per_page',)
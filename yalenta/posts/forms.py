from django import forms

from .models import Post, SiteSettings, Comment


class PostForm(forms.ModelForm):
    """Form for news post."""
    class Meta:
        model = Post
        fields = ('title', 'text', 'image')


class CommentForm(forms.ModelForm):
    """Form for post comment."""
    class Meta:
        model = Comment
        fields = ("text", )


class SiteSettingsForm(forms.ModelForm):
    """Form for site settings."""
    class Meta:
        model = SiteSettings
        fields = ('posts_per_page',)
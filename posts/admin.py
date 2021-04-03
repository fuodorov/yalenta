from django.contrib import admin
from django.contrib.admin import register
from django.utils.translation import gettext as _

from .models import Post


@register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'title',
        'text',
        'pub_date',
        'image',
    )
    search_fields = ('title',)
    list_filter = ('pub_date',)
    empty_value_display = _('-empty-')

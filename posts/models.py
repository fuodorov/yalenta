from django.db import models
from django.utils.translation import gettext_lazy as _

from .settings import POSTS_PER_PAGE_CHOICES
from .singleton_model import SingletonModel


class Post(models.Model):
    title = models.CharField(
        verbose_name=_('Title'),
        help_text=_('Write the title of the news item here'),
        max_length=255
    )
    text = models.TextField(
        verbose_name=_('Text'),
        help_text=_('Write the title of the news item here')
    )
    pub_date = models.DateTimeField(
        verbose_name=_('Date of publication'),
        help_text=_('Date the news was published'),
        auto_now_add=True
    )
    image = models.ImageField(
        verbose_name=_('Image'),
        help_text=_('Select a picture for the news'),
        upload_to='posts/',
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = _('News')
        verbose_name_plural = _('News')
        ordering = ('-pub_date',)

    def __str__(self):
        return self.title


class SiteSettings(SingletonModel):
    posts_per_page = models.CharField(
        verbose_name=_('The number of news on the page'),
        help_text=_('Select the number of news on the page'),
        choices=POSTS_PER_PAGE_CHOICES,
        default=POSTS_PER_PAGE_CHOICES[0][0],
        max_length=2
    )

    class Meta:
        verbose_name = _('Settings')
        verbose_name_plural = _('Settings')

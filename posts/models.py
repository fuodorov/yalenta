from django.db import models
from django.utils.translation import gettext as _


class Post(models.Model):
    title = models.TextField(
        verbose_name=_('Title'),
        help_text=_('Write the title of the news item here'),
        max_length=32
    )
    text = models.TextField(
        verbose_name=_('Text'),
        help_text=_('Write the title of the news item here'),
        max_length=256
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

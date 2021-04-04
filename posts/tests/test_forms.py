from django.test import Client, TestCase

from .constants import POST_TITLE, POST_TEXT, NEW_POST_URL, SITE_SETTINGS_URL
from ..models import Post, SiteSettings
from ..settings import POSTS_PER_PAGE_CHOICES


class PostFormTests(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.guest = Client()
        cls.post = Post.objects.create(title=POST_TITLE, text=POST_TEXT)

    def test_guest_new_post(self):
        cash_count = Post.objects.count()
        form_data = {'title': POST_TITLE, 'text': POST_TEXT}
        self.guest.post(NEW_POST_URL, data=form_data)
        self.assertEqual(Post.objects.count(), cash_count + 1)

    def test_guest_site_settings(self):
        for name, per_page in POSTS_PER_PAGE_CHOICES:
            form_data = {'posts_per_page': per_page}
            self.guest.post(SITE_SETTINGS_URL, data=form_data)
            self.assertEqual(int(SiteSettings.objects.first().posts_per_page),
                             per_page)

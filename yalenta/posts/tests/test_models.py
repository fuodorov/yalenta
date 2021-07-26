from django.test import Client, TestCase

from .constants import POST_TITLE, POST_TEXT, NEW_POST_URL, SITE_SETTINGS_URL
from ..models import Post, SiteSettings


class TestModelPost(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.post = Post.objects.create(title=POST_TITLE, text=POST_TEXT)

    def test_verbose_name(self):
        get_field = Post._meta.get_field
        field_verbose = {
            'title': get_field('title').verbose_name,
            'text': get_field('text').verbose_name,
            'image': get_field('image').verbose_name
        }
        for value, expected in field_verbose.items():
            with self.subTest(value=value):
                self.assertEqual(
                    self.post._meta.get_field(value).verbose_name, expected)

    def test_help_text(self):
        get_field = Post._meta.get_field
        field_verbose = {
            'title': get_field('title').help_text,
            'text': get_field('text').help_text,
            'image': get_field('image').help_text
        }
        for value, expected in field_verbose.items():
            with self.subTest(value=value):
                self.assertEqual(
                    self.post._meta.get_field(value).help_text, expected)


class TestModelSiteSettings(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.settings = SiteSettings.objects.create()

    def test_verbose_name(self):
        get_field = SiteSettings._meta.get_field
        field_verbose = {
            'posts_per_page': get_field('posts_per_page').verbose_name,
        }
        for value, expected in field_verbose.items():
            with self.subTest(value=value):
                self.assertEqual(
                    self.settings._meta.get_field(value).verbose_name, expected)

    def test_help_text(self):
        get_field = SiteSettings._meta.get_field
        field_verbose = {
            'posts_per_page': get_field('posts_per_page').help_text,
        }
        for value, expected in field_verbose.items():
            with self.subTest(value=value):
                self.assertEqual(
                    self.settings._meta.get_field(value).help_text, expected)

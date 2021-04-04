from django.test import Client, TestCase

from .constants import POST_TITLE, POST_TEXT, INDEX_URL
from ..models import Post, SiteSettings


class PaginatorTests(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.guest = Client()
        cls.per_page = int(SiteSettings.objects.create().posts_per_page)
        for post_item in range(2 * cls.per_page):
            Post.objects.create(title=POST_TITLE, text=POST_TEXT)

    def test_paginator_first_page(self):
        response = self.guest.get(INDEX_URL)
        self.assertEqual(len(response.context['page']), self.per_page)

    def test_paginator_second_page(self):
        response = self.guest.get(INDEX_URL + '?page=2')
        self.assertEqual(len(response.context['page']), self.per_page)

from django.test import Client, TestCase

import posts.tests.constants as consts
from ..models import Post

CHECK_TEMPLATE = {
            'new': (consts.NEW_POST_URL, consts.NEW_POST_TEMPLATE),
            'settings': (consts.SITE_SETTINGS_URL, consts.SITE_SETTINGS_TEMPLATE),
            'page_404': (consts.NOT_URL, consts.PAGE_NOT_FOUND_TEMPLATE),
            'about_author': (consts.AUTHOR_URL, consts.AUTHOR_TEMPLATE),
            'about_tech': (consts.TECH_URL, consts.TECH_TEMPLATE),
        }


class StaticURLTests(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.guest = Client()
        cls.post = Post.objects.create(title=consts.POST_TITLE,
                                       text=consts.POST_TEXT)

    def test_pages_template(self):
        for name, (url, template) in CHECK_TEMPLATE.items():
            with self.subTest(url=url, msg=name):
                self.assertTemplateUsed(self.guest.get(url), template)

    def test_pages_expected_code(self):
        guest = self.guest
        CHECK_EXPECTED_CODE = {
            'about_author_guest': (consts.AUTHOR_URL, guest, 200),
            'about_tech_guest': (consts.TECH_URL, guest, 200)
        }
        for name, (url, client, expected_code) in CHECK_EXPECTED_CODE.items():
            with self.subTest(url=url, msg=name):
                self.assertEqual(client.get(url).status_code, expected_code)

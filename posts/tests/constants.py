from django.urls import reverse

POST_TITLE = 'post-title'
POST_TEXT = 'posts-text'
POST_IMG = (
    b'\x47\x49\x46\x38\x39\x61\x02\x00'
    b'\x01\x00\x80\x00\x00\x00\x00\x00'
    b'\xFF\xFF\xFF\x21\xF9\x04\x00\x00'
    b'\x00\x00\x00\x2C\x00\x00\x00\x00'
    b'\x02\x00\x01\x00\x00\x02\x02\x0C'
    b'\x0A\x00\x3B'
)

INDEX_URL = reverse('index')
NEW_POST_URL = reverse('new_post')
SITE_SETTINGS_URL = reverse('site_settings')
AUTHOR_URL = reverse('about:author')
TECH_URL = reverse('about:tech')
PAGE_NOT_FOUND_URL = reverse('404')
SERVER_ERROR_URL = reverse('500')
NOT_URL = 'not' + PAGE_NOT_FOUND_URL

INDEX_TEMPLATE = 'index.html'
NEW_POST_TEMPLATE = 'posts/new_post.html'
SITE_SETTINGS_TEMPLATE = 'posts/site_settings.html'
PAGE_NOT_FOUND_TEMPLATE = 'misc/404.html'
AUTHOR_TEMPLATE = 'about/author.html'
TECH_TEMPLATE = 'about/tech.html'

from rest_framework import pagination

from posts.settings import POSTS_PER_PAGE_CHOICES


class CustomPagination(pagination.PageNumberPagination):
    page_size = POSTS_PER_PAGE_CHOICES[0][1]
    page_size_query_param = 'per_page'
    max_page_size = POSTS_PER_PAGE_CHOICES[2][1]

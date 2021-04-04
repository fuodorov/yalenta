from django.conf import settings
from django.conf.urls import handler404, handler500
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve

handler404 = 'posts.views.page_404'  # noqa
handler500 = 'posts.views.page_500'  # noqa

urlpatterns = [
    path('', include('posts.urls')),
    path('admin/', admin.site.urls),
    path('about/', include('about.urls', namespace='about')),
    re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
]

urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )

urlpatterns += static(
    settings.STATIC_URL,
    document_root=settings.STATIC_ROOT
)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += (path('__debug__/', include(debug_toolbar.urls)),)
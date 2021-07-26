from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('new/', views.new_post, name='new_post'),
    path('settings/', views.site_settings, name='site_settings'),
    path('404/', views.page_404, name='404'),
    path('500/', views.page_500, name='500'),
]

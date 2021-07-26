from django.urls import path

from . import views

app_name = 'docs'

urlpatterns = [
    path('redoc', views.ReDocView.as_view(), name='redoc'),
]

from django.core.paginator import Paginator
from django.shortcuts import get_object_or_404, redirect, render
from rest_framework import status

from .forms import PostForm, SiteSettingsForm
from .models import Post, SiteSettings


def index(request):
    per_page = get_object_or_404(SiteSettings).posts_per_page
    paginator = Paginator(Post.objects.all(), per_page)
    return render(request, 'index.html', {
        'page': paginator.get_page(request.GET.get('page')),
        'paginator': paginator
    })


def new_post(request):
    form = PostForm(request.POST or None, files=request.FILES or None)
    if not form.is_valid():
        return render(request, 'posts/new_post.html', {'form': form})
    form.save()
    return redirect('index')


def site_settings(request):
    form = SiteSettingsForm(request.POST or None)
    if not form.is_valid():
        return render(request, 'posts/site_settings.html', {'form': form})
    form.save()
    return redirect('index')


def page_404(request, exception):
    return render(request, 'misc/404.html', {'path': request.path},
                  status=status.HTTP_404_NOT_FOUND)


def page_500(request):
    return render(request, 'misc/500.html',
                  status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from django.core.paginator import Paginator
from django.shortcuts import redirect, render
from rest_framework import status

from .forms import PostForm, SiteSettingsForm
from .models import Post, SiteSettings


def index(request):
    """View home page function."""
    paginator = Paginator(
        Post.objects.all(),
        int(SiteSettings.load().posts_per_page)
    )
    return render(request, 'index.html', {
        'page': paginator.get_page(request.GET.get('page')),
        'paginator': paginator
    })


def new_post(request):
    """View new post page function."""
    form = PostForm(request.POST or None, files=request.FILES or None)
    if not form.is_valid():
        return render(request, 'posts/new_post.html', {'form': form})
    form.save()
    return redirect('index')


def site_settings(request):
    """View settings page function."""
    form = SiteSettingsForm(request.POST or None)
    if not form.is_valid():
        return render(request, 'posts/site_settings.html', {'form': form})
    form.save()
    return redirect('index')


def page_404(request, exception):
    """View not found page function."""
    return render(request, 'misc/404.html', {'path': request.path},
                  status=status.HTTP_404_NOT_FOUND)


def page_500(request):
    """View server error page function."""
    return render(request, 'misc/500.html',
                  status=status.HTTP_500_INTERNAL_SERVER_ERROR)

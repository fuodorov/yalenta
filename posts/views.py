from django.core.paginator import Paginator
from django.shortcuts import redirect, render
from rest_framework import status

from .forms import PostForm
from .models import Post


def index(request):
    paginator = Paginator(Post.objects.all(), 12)
    page_number = request.GET.get('page')
    page = paginator.get_page(page_number)
    return render(request, 'index.html', {
        'page': page,
        'paginator': paginator
    })


def new_post(request):
    form = PostForm(request.POST or None, files=request.FILES or None)
    if not form.is_valid():
        return render(request, 'posts/new_post.html', {'form': form})
    post = form.save(commit=False)
    post.author = request.user
    post.save()
    return redirect('index')


def page_404(request, exception):
    return render(request, 'misc/404.html', {'path': request.path},
                  status=status.HTTP_404_NOT_FOUND)


def page_500(request):
    return render(request, 'misc/500.html',
                  status=status.HTTP_500_INTERNAL_SERVER_ERROR)

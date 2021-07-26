from django.core.mail import send_mail
from posts.models import Post
from yalenta.celery import app
from yalenta.settings import EMAIL_HOST_USER

from .models import User


@app.task
def send_beat_email():
    for user in User.objects.all():
        send_mail(
            'Latest news on Yalenta',
            f'{Post.objects.all().first().title}',
            EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

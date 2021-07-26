import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'yalenta.settings')
app = Celery('yalenta', broker='pyamqp://guest@localhost//')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'send-spam-every-10-minute': {
        'task': 'accounts.tasks.send_beat_email',
        'schedule': crontab(minute='*/10'),
    }
}


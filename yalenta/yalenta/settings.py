import os
from pathlib import Path
from kombu import Exchange, Queue

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = '7bp2-^wjs#e_!p14o46#j+4=bk_(3t^i6i_fo1!a+w**-tnfuk'

DEBUG = False

ALLOWED_HOSTS = [
    "*",
    "localhost",
    "127.0.0.1",
    "[::1]",
    "testserver"
]

INTERNAL_IPS = [
    "127.0.0.1",
]

SITE_ID = 1

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.flatpages',
    'django.contrib.sites',
    'posts',
    'api',
    'about',
    'docs',
    'sorl.thumbnail',
    'debug_toolbar',
    'rest_framework',
    'corsheaders',
    'storages',
    'rest_framework.authtoken',
    'oauth2_provider',
    'accounts',
    'djoser',
    "djcelery_emails"
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

DJOSER = {
    "USER_ID_FIELD": "username",
    "LOGIN_FIELD": "email",
    "SEND_ACTIVATION_EMAIL": True,
    "ACTIVATION_URL": "activate/{uid}/{token}",
    "PASSWORD_RESET_CONFIRM_URL": "reset_password/{uid}/{token}",
    'SERIALIZERS': {
        'token_create': 'accounts.serializers.CustomTokenCreateSerializer',
    },
}

EMAIL_BACKEND = 'djcelery_emails.backends.CeleryEmailBackend'

AMQP_USER = 'guest'
AMQP_PASSWORD = 'guest'
AMQP_HOST = 'localhost'
AMQP_PORT = '5672'
AMQP_QUEUE = 'email-single-event-delivery'

CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_BROKER_TRANSPORT_OPTIONS = {
    'visibility_timeout': 3600,
}
# CELERY_TASK_DEFAULT_QUEUE = 'email-single-event-delivery'
CELERY_EMAIL_TASK_CONFIG = {
    'queue': 'celery',
    'name': 'djcelery_email_send',
    'ignore_result': False,
}
CELERY_ROUTES = {
    # 'accounts.tasks.send_beat_email': {
    #     'queue': 'email-single-event-delivery'
    # },
}
CELERY_QUEUES = (
    Queue('celery'),
)

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_PORT = 587
EMAIL_HOST_USER = 'fuodorov1998@gmail.com'
EMAIL_HOST_PASSWORD = ''
SITE_NAME = "Yalenta"

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'yalenta.urls'

TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'posts.context_processors.load_settings',
            ],
        },
    },
]

WSGI_APPLICATION = 'yalenta.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'yalenta_db',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

OAUTH2_PROVIDER = {
    'SCOPES': {'read': 'Read scope', 'write': 'Write scope'},
    'ACCESS_TOKEN_EXPIRE_SECONDS': 3600,
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
}

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

USE_S3 = 'TRUE'

if USE_S3:
    # aws settings
    AWS_ACCESS_KEY_ID = 'AKIA4MZ4LBLRUUUYFNJZ'
    AWS_SECRET_ACCESS_KEY = '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'
    AWS_STORAGE_BUCKET_NAME = 'yalenta'
    AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
    AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
    AWS_S3_REGION_NAME = 'eu-west-3'
    AWS_S3_SIGNATURE_VERSION = 's3v4'
    # s3 static settings
    AWS_LOCATION = 'static'
    STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}/'
    STATICFILES_STORAGE = 'yalenta.storage_backends.StaticStorage'
    # s3 public media settings
    PUBLIC_MEDIA_LOCATION = 'media'
    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{PUBLIC_MEDIA_LOCATION}/'
    DEFAULT_FILE_STORAGE = 'yalenta.storage_backends.PublicMediaStorage'
else:
    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'),)
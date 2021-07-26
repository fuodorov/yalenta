from abc import ABC
from storages.backends.s3boto3 import S3Boto3Storage


class StaticStorage(S3Boto3Storage, ABC):
    location = 'static'


class PublicMediaStorage(S3Boto3Storage, ABC):
    location = 'media'
    file_overwrite = False

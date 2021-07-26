from django.db import models


class SingletonModel(models.Model):
    """Model, which will always contain only one object."""
    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        """Automatically deletes all others."""
        self.__class__.objects.exclude(id=self.id).delete()
        super(SingletonModel, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        """Takes a single settings object from the database."""
        try:
            return cls.objects.get()
        except cls.DoesNotExist:
            return cls()
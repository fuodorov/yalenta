from django.views.generic.base import TemplateView


class ReDocView(TemplateView):
    """View docs page class."""
    template_name = 'docs/redoc.html'

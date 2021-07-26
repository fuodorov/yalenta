from django.views.generic.base import TemplateView


class AboutAuthorView(TemplateView):
    """View author page class."""
    template_name = 'about/author.html'


class AboutTechView(TemplateView):
    """View technology page class."""
    template_name = 'about/tech.html'

from .models import SiteSettings


def load_settings(request):
    """Loading the settings into the template."""
    return {'site_settings': SiteSettings.load()}
from django.apps import AppConfig
from django.utils.translation import ugettext_lazy as _


class SurveysConfig(AppConfig):
    name = 'surveys'
    verbose_name = _("Surveys")

    def ready(self):
        import surveys.signals

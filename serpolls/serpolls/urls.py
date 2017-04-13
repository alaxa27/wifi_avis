from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.shortcuts import HttpResponseRedirect, reverse
from django.utils.translation import ugettext as _
from django.views.i18n import JavaScriptCatalog

urlpatterns = [
    url(r'^$', lambda r: HttpResponseRedirect(reverse('surveys:login'))),
    url(r'^surveys/', include('surveys.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^nested_admin/', include('nested_admin.urls')),
    url(r'^jsi18n/$', JavaScriptCatalog.as_view(), name='javascript-catalog'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = _("Saint-Etienne du Rouvray Polls")

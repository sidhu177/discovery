from django.conf import settings
from django.conf.urls import include, url
from django.views.generic import TemplateView
from django.views.generic.base import RedirectView
from django.contrib import admin

from rest_framework.documentation import include_docs_urls
from uaa_client.decorators import staff_login_required

from vendors import views as vendors


admin.autodiscover()
urlpatterns = []

if settings.UAA_AUTH:
    admin.site.login = staff_login_required(admin.site.login)
    urlpatterns.append(url(r'^auth/', include('uaa_client.urls')))

urlpatterns.extend([
    url(r'^admin/', admin.site.urls),

    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^about/', TemplateView.as_view(template_name='index.html')),
    url(r'^resources/', TemplateView.as_view(template_name='index.html')),
    url(r'^help/', TemplateView.as_view(template_name='index.html')),

    url(r'^search/', TemplateView.as_view(template_name='index.html')),
    url(r'^vendor/', TemplateView.as_view(template_name='index.html')),
    
    url(r'^oasis/', TemplateView.as_view(template_name='index.html')),
    url(r'^bmo/', TemplateView.as_view(template_name='index.html')),
    url(r'^hcats/', TemplateView.as_view(template_name='index.html')),
    url(r'^pss/', TemplateView.as_view(template_name='index.html')),
        
    url(r'^api/', include('api.urls')),
    url(r'^api/', include_docs_urls(title="Discovery API", public=True)),
    url(r'^docs/', RedirectView.as_view(url='/api', permanent=False)),
    url(r'^developers?/', RedirectView.as_view(url='/api', permanent=False)),
])

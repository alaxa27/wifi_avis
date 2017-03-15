from django.conf.urls import url

from . import views

app_name = 'surveys'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<survey_id>[0-9]+)/$', views.detail, name='detail'),
    url(r'^current/$', views.current_survey, name='current'),
    url(r'^active-questions/$', views.active_questions, name='active-questions'),
    url(r'^answer/(?P<question_id>[0-9]+)$', views.answer, name='answer'),
]

from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<survey_id>[0-9]+)/$', views.detail, name='detail'),
    url(r'^current/results/data/', views.current_results_data, name='results'),
    url(r'^current/$', views.current_survey, name='current'),
    url(r'^current/results/', views.current_results, name='results-data'),
    url(r'^active-questions/$', views.active_questions, name='active-questions'),
    url(r'^answer/(?P<question_id>[0-9]+)$', views.answer, name='answer'),
]
app_name = 'surveys'

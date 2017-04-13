from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.login, name='login'),
    url(r'^current/$', views.current_survey, name='current'),
    url(r'^current/results/$', views.results, name='results'),
    url(r'^current/questions/$', views.active_questions_list, name='active-questions-list'),
    url(r'^current/comment/$', views.comment, name='comment'),
    url(r'^current/comments/$', views.comments_select, name='comments-select'),
    url(r'^current/comments/select$', views.select_comment, name='select-comment'),
    url(r'^current/comments/discard-all$', views.discard_all_comments, name='discard-all-comments'),
    url(r'^active-questions/$', views.active_questions, name='active-questions'),
    url(r'^answer/(?P<question_id>[0-9]+)$', views.answer, name='answer'),
    url(r'^skip/(?P<question_id>[0-9]+)?$', views.skip, name='skip'),
]
app_name = 'surveys'

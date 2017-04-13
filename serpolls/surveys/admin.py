from django.contrib import admin
from django.contrib.admin import widgets, SimpleListFilter
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext as _

from django_object_actions import DjangoObjectActions
from nested_admin.nested import NestedStackedInline, NestedTabularInline, NestedModelAdmin

from .models import Choice, Comment, Question, Session, Survey


class ChoiceInline(NestedTabularInline):
    model = Choice
    extra = 0
    exclude = ['image']


class QuestionInline(NestedTabularInline):
    model = Question
    extra = 0
    inlines = [ChoiceInline]

    formfield_overrides = {
        models.TextField: {'widget': widgets.AdminTextInputWidget}
    }


@admin.register(Survey)
class SurveyAdmin(DjangoObjectActions, NestedModelAdmin):
    fieldsets = [
        (None, {'fields': ['title']})
    ]
    inlines = [QuestionInline]

    list_display = ['__str__', 'is_current']
    search_fields = ['title']

    def is_current(self, obj):
        return Session.objects.filter(survey=obj, is_current=True).exists()

    is_current.boolean = True
    is_current.short_description = _("Current")
    is_current.boolean = True


class LinkedToSurvey:
    def link_to_survey(self, obj):
        link = reverse("admin:surveys_survey_change", args=[obj.survey.id])
        return '<a href="{}">{}</a>'.format(link, obj.survey)

    link_to_survey.allow_tags = True
    link_to_survey.short_description = _("Link to survey")


@admin.register(Session)
class SessionAdmin(DjangoObjectActions, NestedModelAdmin, LinkedToSurvey):
    fieldsets = [
        (None, {'fields': ['title', 'survey', 'is_current']})
    ]

    list_display = ['__str__', 'date', 'link_to_survey', 'is_current']
    list_filter = ['survey', 'is_current']
    list_editable = ['is_current']

    search_fields = ['title', 'survey', 'date']

    def set_current(self, _, obj):
        self.model.set_current(obj)

    set_current.label = _("Set current")
    set_current.short_description = _("Set session as current (overrides current)")
    set_current.allow_tags = True

    def reset_current(self, *_):
        self.model.reset_current()

    reset_current.label = _("Reset current")
    reset_current.short_description = _("Reset all sessions to non-current")
    reset_current.allow_tags = True

    def export(self, _, obj):
        obj.export_to_xlsx()

    export.label = _("Export to Excel")
    export.short_description = _("Export the gathered session data to an excel file")

    change_actions = ('set_current', 'export')
    changelist_actions = ('reset_current',)


class IsSurveyCurrentFilter(SimpleListFilter):
    title = _("survey current")
    parameter_name = 'survey_is_current'

    def lookups(self, request, model_admin):
        return (
            (True, _("Yes")),
            (False, _("No"))
        )

    def queryset(self, request, queryset):
        if not Session.objects.filter(is_current=True).exists():
            return queryset.none()
        if self.value():
            current_session = Session.objects.get(is_current=True)
            return queryset.filter(survey=current_session.survey)
        else:
            return queryset


@admin.register(Question)
class QuestionAdmin(DjangoObjectActions, NestedModelAdmin):

    fieldsets = [
        (None, {'fields': ['text', 'image', 'type', 'scale']})
    ]

    formfield_overrides = {
        models.TextField: {'widget': widgets.AdminTextInputWidget}
    }

    inlines = [ChoiceInline]
    actions = ['make_active', 'make_inactive']

    list_display = ['__str__', 'type', 'is_active', 'link_to_survey', 'is_survey_current']
    list_filter = ['type', 'is_active', 'survey', IsSurveyCurrentFilter]
    list_editable = ['is_active']

    search_fields = ['text', 'type', 'survey__title']

    def is_survey_current(self, obj):
        return obj.survey.is_current

    is_survey_current.boolean = True
    is_survey_current.short_description = _("Current survey")

    def link_to_survey(self, obj):
        link = reverse("admin:surveys_survey_change", args=[obj.survey.id])
        return '<a href="{}">{}</a>'.format(link, obj.survey)

    link_to_survey.allow_tags = True
    link_to_survey.short_description = _("Link to survey")

    def make_active(self, _, queryset):
        queryset.update(is_active=True)

    make_active.short_description = _("Make all selected questions active")

    def make_inactive(self, _, queryset):
        queryset.update(is_active=False)

    make_inactive.short_description = _("Make all selected questions inactive")

    def make_all_inactive(self, *args):
        self.make_inactive(args, queryset=Question.objects.filter(is_active=True))

    make_all_inactive.label = _("Disable all questions")
    make_all_inactive.short_description = _("Set all the questions inactive at once")

    changelist_actions = ('make_all_inactive',)


@admin.register(Comment)
class CommentAdmin(NestedModelAdmin):
    fieldsets = [
        (None, {'fields': ['author', 'text', 'session']})
    ]

    list_display = ['__str__', 'author', 'date', 'link_to_session', 'is_session_current']
    list_filter = ['session__survey', 'session', 'session__is_current', 'author']

    search_fields = ['author', 'text', 'date', 'session']

    def is_session_current(self, obj):
        return obj.session.survey.is_current

    is_session_current.boolean = True
    is_session_current.short_description = _("Current survey")

    def link_to_session(self, obj):
        link = reverse("admin:surveys_session_change", args=[obj.session.id])
        return '<a href="{}">{}</a>'.format(link, obj.session)

    link_to_session.allow_tags = True
    link_to_session.short_description = _("Link to session")

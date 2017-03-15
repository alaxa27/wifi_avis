from django.contrib import admin
from django.contrib.admin import widgets
from django.db import models
from django.urls import reverse

from django_object_actions import DjangoObjectActions
from nested_admin.nested import NestedStackedInline, NestedTabularInline, NestedModelAdmin

from .models import Survey, Question, Choice


class ChoiceInline(NestedTabularInline):
    model = Choice
    extra = 0
    exclude = ['image']


class QuestionInline(NestedTabularInline):
    model = Question
    extra = 0
    inlines = [ChoiceInline]
    exclude = ['image']

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

    def set_current(self, _, obj):
        self.model.set_current(obj)

    set_current.label = "Set current"
    set_current.short_description = "Set survey ass current (overrides current)"
    set_current.allow_tags = True

    def reset_current(self, *_):
        self.model.reset_current()

    reset_current.label = "Reset current"
    reset_current.short_description = "Reset all surveys to non-current"
    reset_current.allow_tags = True

    change_actions = ('set_current',)
    changelist_actions = ('reset_current',)


@admin.register(Question)
class QuestionAdmin(NestedModelAdmin):

    fieldsets = [
        (None, {'fields': ['text', 'image', 'type', 'scale']})
    ]

    formfield_overrides = {
        models.TextField: {'widget': widgets.AdminTextInputWidget}
    }

    inlines = [ChoiceInline]
    actions = ['make_active', 'make_inactive']

    list_display = ['__str__', 'type', 'is_active', 'link_to_survey']
    list_filter = ['type', 'is_active', 'survey']
    list_editable = ['is_active']

    search_fields = ['text', 'type', 'survey__title']

    def link_to_survey(self, obj):
        link = reverse("admin:surveys_survey_change", args=[obj.survey.id])
        return '<a href="{}">{}</a>'.format(link, obj.survey)

    link_to_survey.allow_tags = True

    def make_active(self, _, queryset):
        queryset.update(is_active=True)
    make_active.short_description = "Make all selected questions active"

    def make_inactive(self, _, queryset):
        queryset.update(is_active=False)
    make_inactive.short_description = "Make all selected questions inactive"

from django import forms
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

from .models import Choice, MultipleAnswer, Question, RateAnswer, UniqueAnswer


class LoginForm(forms.Form):
    first_name = forms.CharField(label=_("First name"), max_length=20)
    last_name = forms.CharField(label=_("Last name"), max_length=20)


class AnswerFormManager:
    @staticmethod
    def get_form(question, *args, **kwargs):
        if question.type == Question.UNIQUE:
            form = UniqueAnswerForm(question=question, *args, **kwargs)
        elif question.type == Question.MULTIPLE:
            form = MultipleAnswerForm(question=question, *args, **kwargs)
        elif question.type == Question.RATE:
            form = RateAnswerForm(question=question, *args, **kwargs)
        else:
            form = None
        return form


class UniqueAnswerForm(forms.ModelForm):
    class Meta:
        model = UniqueAnswer
        fields = ('choice', 'question')
        widgets = {
            'choice': forms.RadioSelect(),
            'question': forms.HiddenInput()
        }

    def __init__(self, *args, **kwargs):
        question = kwargs.pop('question')
        kwargs['initial'] = {'question': question}

        super().__init__(*args, **kwargs)

        choice_field = self.fields['choice']
        choice_field.queryset = Choice.objects.filter(question=question)
        choice_field.label = ""
        choice_field.empty_label = None

    def clean_question(self):
        question = self.cleaned_data.get('question')

        survey = question.survey
        if not survey.is_current:
            raise ValidationError("Survey must be current")

        if not question.is_active:
            raise ValidationError("Question must be active")

        if question.type != Question.UNIQUE:
            raise ValidationError("Question must be unique")

        return question


class MultipleAnswerForm(forms.ModelForm):
    class Meta:
        model = MultipleAnswer
        fields = ('choices', 'question')
        widgets = {
            'choices': forms.CheckboxSelectMultiple(),
            'question': forms.HiddenInput()
        }

    def __init__(self, *args, **kwargs):
        question = kwargs.pop('question')
        kwargs['initial'] = {'question': question}
        super().__init__(*args, **kwargs)

        choices_field = self.fields['choices']
        choices_field.queryset = Choice.objects.filter(question=question)
        choices_field.label = ""
        choices_field.empty_label = None

    def clean(self):
        super().clean()

        choices = self.cleaned_data.get('choices', [])
        question = self.cleaned_data.get('question')

        for choice in choices:
            if choice.question != question:
                raise ValidationError("Choices must correspond to the question")

        return self.cleaned_data

    def clean_question(self):
        question = self.cleaned_data.get('question')

        survey = question.survey
        if not survey.is_current:
            raise ValidationError("Survey must be current")

        if not question.is_active:
            raise ValidationError("Question must be active")

        if not question.type == Question.MULTIPLE:
            raise ValidationError("Question must be multiple-choice")

        return question

    def save(self, commit=True):
        if not commit:
            raise ValueError("Commit is required")

        answer = super().save()

        for choice in self.cleaned_data.get('choices'):
            answer.choices.add(choice)

        if commit:
            answer.save()

        return answer


class RateAnswerForm(forms.ModelForm):
    class Meta:
        model = RateAnswer
        fields = ('rating', 'question')
        widgets = {
            'question': forms.HiddenInput()
        }

    def __init__(self, *args, **kwargs):
        question = kwargs.pop('question')
        kwargs['initial'] = {'question': question}

        super().__init__(*args, **kwargs)

        rating_field = self.fields['rating']
        rating_field.label = ""
        rating_field.empty_label = None

    def clean_question(self):
        question = self.cleaned_data.get('question')

        survey = question.survey
        if not survey.is_current:
            raise ValidationError("Survey must be current")

        if not question.is_active:
            raise ValidationError("Question must be active")

        if question.type != Question.RATE:
            raise ValidationError("Question must be unique")

        return question

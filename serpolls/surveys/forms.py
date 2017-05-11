from django import forms
from django.utils.translation import ugettext_lazy as _

from .models import *


class LoginForm(forms.ModelForm):
    required_css_class = 'required'

    class Meta:
        model = Respondent
        fields = ('first_name', 'last_name', 'gender', 'age', 'session')
        widgets = {
            'session': forms.HiddenInput()
        }

    def __init__(self, *args, **kwargs):
        session = Session.objects.get(is_current=True)
        kwargs['initial'] = {
            'session': session
        }

        super().__init__(*args, **kwargs)

    def clean_session(self):
        session = self.cleaned_data.get('session')

        if session is None:
            raise ValidationError("Session must be defined")

        if session != Session.objects.get(is_current=True):
            raise ValidationError("Session must be current")

        return session


class AnswerFormManager:
    @staticmethod
    def get_form(session, question, *args, **kwargs):
        if question.type == Question.UNIQUE:
            form = UniqueAnswerForm(session=session, question=question, *args, **kwargs)
        elif question.type == Question.MULTIPLE:
            form = MultipleAnswerForm(session=session, question=question, *args, **kwargs)
        elif question.type == Question.RATE:
            form = RateAnswerForm(session=session, question=question, *args, **kwargs)
        elif question.type == Question.RANK:
            form = RankAnswerForm(session=session, question=question, *args, **kwargs)
        else:
            form = None
        return form


class UniqueAnswerForm(forms.ModelForm):
    class Meta:
        model = UniqueAnswer
        fields = ('choice', 'question', 'session')
        widgets = {
            'choice': forms.RadioSelect(),
            'question': forms.HiddenInput(),
            'session': forms.HiddenInput()
        }

    def __init__(self, *args, **kwargs):
        question = kwargs.pop('question')
        session = kwargs.pop('session')

        kwargs['initial'] = {
            'question': question,
            'session': session
        }

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

    def clean_session(self):
        session = self.cleaned_data.get('session')

        if not session.is_current:
            raise ValidationError("Session must be current")

        return session


class MultipleAnswerForm(forms.ModelForm):
    class Meta:
        model = MultipleAnswer
        fields = ('choices', 'question', 'session')
        widgets = {
            'choices': forms.CheckboxSelectMultiple(),
            'question': forms.HiddenInput(),
            'session': forms.HiddenInput()
        }

    def __init__(self, *args, **kwargs):
        question = kwargs.pop('question')
        session = kwargs.pop('session')

        kwargs['initial'] = {
            'question': question,
            'session': session
        }

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

    def clean_session(self):
        session = self.cleaned_data.get('session')

        if not session.is_current:
            raise ValidationError("Session must be current")

        return session

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
        fields = ('rating', 'question', 'session')
        widgets = {
            'question': forms.HiddenInput(),
            'session': forms.HiddenInput()
        }

    def __init__(self, *args, **kwargs):
        question = kwargs.pop('question')
        session = kwargs.pop('session')

        kwargs['initial'] = {
            'question': question,
            'session': session
        }

        super().__init__(*args, **kwargs)

        rating_field = self.fields['rating']
        rating_field.widget.attrs['max'] = question.scale
        rating_field.widget.attrs['class'] = question.scale_type
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

    def clean_session(self):
        session = self.cleaned_data.get('session')

        if not session.is_current:
            raise ValidationError("Session must be current")

        return session


class RankAnswerForm(forms.Form):
    question = forms.ModelChoiceField(
        queryset=Question.objects.filter(type=Question.RANK),
        widget=forms.HiddenInput
    )
    session = forms.ModelChoiceField(
        queryset=Session.objects.all(),
        widget=forms.HiddenInput
    )

    def __init__(self, *args, **kwargs):
        question = kwargs.pop('question')
        session = kwargs.pop('session')

        kwargs['initial'] = {
            'question': question,
            'session': session
        }

        super().__init__(*args, **kwargs)

        choices = Choice.objects.filter(question=question)
        for i, choice in enumerate(choices):
            self.fields[f'choice_{choice.id}'] = forms.IntegerField(
                label=choice.text,
                min_value=1,
                max_value=choices.count(),
                initial=i+1,
                widget=forms.Select(choices=[(i, i) for i in range(1, choices.count() + 1)])
            )

    def clean(self):
        question = self.cleaned_data.get('question')

        choice_fields = {k: v for k, v in self.cleaned_data.items() if k.startswith('choice_')}
        ranks = [value for value in choice_fields.values()]

        max_rank = question.choice_set.count()
        used_ranks = []
        for rank in ranks:
            if rank < 0:
                raise ValidationError("Ranks must be strictly positive integers")
            elif rank > max_rank:
                raise ValidationError("Ranks must not exceed choices count")
            elif rank in used_ranks:
                raise ValidationError("Ranks must not be chosen multiple times")

            used_ranks.append(rank)

        return self.cleaned_data

    def clean_question(self):
        question = self.cleaned_data.get('question')

        survey = question.survey
        if not survey.is_current:
            raise ValidationError("Survey must be current")

        if not question.is_active:
            raise ValidationError("Question must be active")

        if question.type != Question.RANK:
            raise ValidationError("Question must be rank")

        return question

    def clean_session(self):
        session = self.cleaned_data.get('session')

        if not session.is_current:
            raise ValidationError("Session must be current")

        return session

    def save(self, commit=True):
        session = self.cleaned_data.get('session')
        question = self.cleaned_data.get('question')
        choice_fields = {k: v for k, v in self.cleaned_data.items() if k.startswith('choice_')}

        answers = []
        for k, rank in choice_fields.items():
            choice = Choice.objects.get(id=k.split('_')[1])
            answers.append(RankAnswer(
                session=session,
                question=question,
                choice=choice,
                rank=rank
            ))

        if commit:
            for answer in answers:
                answer.save()

        return answers


import os

from django.conf import settings
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import ugettext_lazy as _

import openpyxl as xl


class Survey(models.Model):
    title = models.CharField(verbose_name=_("Title"), max_length=255)

    class Meta:
        verbose_name = _("Survey")

    @property
    def is_current(self):
        return Session.objects.filter(survey=self, is_current=True).exists()
    verbose_name_plural = _("Surveys")

    def __str__(self):
        return self.title


class Session(models.Model):
    title = models.CharField(verbose_name=_("Title"), max_length=255)
    survey = models.ForeignKey(Survey, verbose_name=_("Survey"), null=False, blank=False, on_delete=models.CASCADE)
    date = models.DateTimeField(verbose_name=_("Date"), auto_now=True)
    is_current = models.BooleanField(verbose_name=_("Current"), blank=True, default=False)

    @classmethod
    def reset_current(cls):
        cls.objects.filter(is_current=True).update(is_current=False)

    @classmethod
    def set_current(cls, new_current):
        cls.reset_current()
        new_current.is_current = True
        new_current.save()

    class Meta:
        verbose_name = _("Session")
        verbose_name_plural = _("Sessions")

    def clean(self, *args, **kwargs):
        # There must only be one current session
        if self.is_current:
            current_sessions = Session.objects.filter(is_current=True)
            if self.pk:
                current_sessions = current_sessions.exclude(pk=self.pk)
            if current_sessions.exists():
                raise ValidationError(_("Only one session can be active at time."))

    def export_to_xlsx(self):
        wb = xl.Workbook()
        results_ws = wb.create_sheet("Résultats")

        results_ws['A1'] = "Survey"
        results_ws['B1'] = self.survey.title

        results_ws['A2'] = "Session"
        results_ws['B2'] = self.title
        results_ws['C2'] = self.date

        line = 4
        for question in self.survey.question_set.all():
            # TODO: other question types
            results_ws['A{}'.format(line)] = str(question)
            results_ws['A{}'.format(line+1)] = "Réponses"

            if question.type in [Question.UNIQUE, Question.MULTIPLE]:
                for i, choice in enumerate(question.choice_set.all()):
                    results_ws['{}{}'.format(chr(ord("A") + i + 1),line)] = choice.text
                    results_ws['{}{}'.format(chr(ord("A") + i + 1),line + 1)] = \
                        UniqueAnswer.objects.filter(question=question, choice=choice, session=self).count() if question.type == Question.UNIQUE else MultipleAnswer.objects.filter(question=question, choices=choice, session=self).count()

            elif question.type == Question.RATE:
                for i in range(question.scale + 1):
                    results_ws['{}{}'.format(chr(ord("A") + i + 1),line)] = i
                    results_ws['{}{}'.format(chr(ord("A") + i + 1),line + 1)] = RateAnswer.objects.filter(question=question, rating=i, session=self).count()

            line += 3

        comments_ws = wb.create_sheet("Commentaires")

        for i, comment in enumerate(self.comment_set.all()):
            comments_ws['A'.format(i + 1)] = comment.date
            comments_ws['B'.format(i + 1)] = comment.author
            comments_ws['C'.format(i + 1)] = comment.text

        i = 0
        while os.path.exists(os.path.join(settings.EXPORT_DIR, "{} - {}.xlsx".format(self, i))):
            i += 1

        wb.save(os.path.join(settings.EXPORT_DIR, "{} - {}.xlsx".format(self, i)))

    def __str__(self):
        return self.title


class Question(models.Model):
    text = models.TextField(verbose_name=_("Question"), blank=False)
    image = models.ImageField(verbose_name=_("Image"), blank=True, null=True)
    survey = models.ForeignKey(Survey, verbose_name=_("Survey"), null=False, on_delete=models.CASCADE)

    UNIQUE = 'UNIQ'
    MULTIPLE = 'MULT'
    RANK = 'RANK'
    RATE = 'RATE'

    TYPES = (
        (UNIQUE, _("Unique")),
        (MULTIPLE, _("Multiple")),
        (RANK, _("Rank")),
        (RATE, _("Rate"))
    )

    type = models.CharField(verbose_name=_("Type"), max_length=4, choices=TYPES, default=UNIQUE)

    # RATE only
    scale = models.PositiveIntegerField(verbose_name=_("Scale"), blank=True, null=True)

    is_active = models.BooleanField(verbose_name=_("Active"), blank=True, default=False)

    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")

    def get_answers_data(self):
        # TODO: other question types
        if self.type == self.UNIQUE:
            return [
                UniqueAnswer.objects.filter(session__is_current=True, question=self, choice=choice).count()
                for choice in self.choice_set.all()
            ]
        elif self.type == self.MULTIPLE:
            return [
                MultipleAnswer.objects.filter(session__is_current=True, question=self, choices=choice).count()
                for choice in self.choice_set.all()
            ]
        elif self.type == self.RATE:
            return [
                RateAnswer.objects.filter(session__is_current=True, question=self, rating=rating).count()
                for rating in range(self.scale + 1)
            ]

    def __str__(self):
        return self.type + ": " + self.text


class Choice(models.Model):
    text = models.CharField(verbose_name=_("Choice"), max_length=255)
    image = models.ImageField(verbose_name=_("Image"), blank=True, null=True)
    question = models.ForeignKey(Question, verbose_name=_("Question"), null=False, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('text', 'question')
        verbose_name = _("Choice")
        verbose_name_plural = _("Choices")

    def clean(self):
        super().clean()

        if self.question.type == Question.RATE:
            raise ValidationError("No choice can be associated with a rate question")

    def __str__(self):
        return self.text


class RankChoicePair(models.Model):
    choice = models.ForeignKey(Choice, verbose_name=_("Choice"),  null=False)
    rank = models.PositiveIntegerField(verbose_name=_("Rank"), )

    class Meta:
        unique_together = ('choice', 'rank')
        verbose_name = _("Rank-choice pair")
        verbose_name_plural = _("Rank-choice pairs")

    def __str__(self):
        return "{}: {}".format(self.rank, self.choice)


class Answer(models.Model):
    question = models.ForeignKey(Question, verbose_name=_("Question"), blank=False, null=False, on_delete=models.CASCADE)
    session = models.ForeignKey(Session, verbose_name=_("Session"), blank=False, null=False)

    class Meta:
        abstract = True
        verbose_name = _("Answer")
        verbose_name_plural = _("Answers")

    def clean(self):
        try:
            self.question
        except Question.DoesNotExist:
            raise ValidationError("The question does not exist or correspond to the answer type")


class UniqueAnswer(Answer):
    choice = models.ForeignKey(Choice, verbose_name=_("Choice"),  blank=False, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _("Unique answer")
        verbose_name_plural = _("Unique answers")

    def clean(self, *args, **kwargs):
        super().clean()

        if self.question.type != Question.UNIQUE:
            raise ValidationError("Unique answer are valid only for unique choice questions")

        try:
            if self.choice.question != self.question:
                raise ValidationError("The choice must be assigned to the question")
        except Choice.DoesNotExist:
            raise ValidationError("The choice does not exist or correspond to the question")


class MultipleAnswer(Answer):
    choices = models.ManyToManyField(Choice, verbose_name=_("Choices"))
    # Note: many-to-many fields must be form-validated

    class Meta:
        verbose_name = _("Multiple answer")
        verbose_name_plural = _("Multiple answers")


class RankAnswer(Answer):
    rank_choice_pairs = models.ManyToManyField(RankChoicePair, verbose_name=_("Rank-choice pair"))  # Length must be equal to number of choices

    class Meta:
        verbose_name = _("Rank answer")
        verbose_name_plural = _("Rank answers")


class RateAnswer(Answer):
    rating = models.PositiveIntegerField(verbose_name=_("Rating"))

    class Meta:
        verbose_name = _("Rate answer")
        verbose_name_plural = _("Rate answers")

    def clean(self):
        super().clean()

        if self.question.type != Question.RATE:
            raise ValidationError(_("Rate answer are valid only for rate questions"))

        if self.rating > self.question.scale:
            raise ValidationError(
                _("The rating must not exceed the scale ({})")
                .format(self.question.scale)
            )


class Comment(models.Model):
    author = models.CharField(verbose_name=_("Author"), max_length=255, null=True)
    text = models.TextField(verbose_name=_("Text"))
    session = models.ForeignKey(Session, verbose_name=_("Session"), null=False)
    date = models.DateTimeField(verbose_name=_("Date"), auto_now=True)

    class Meta:
        verbose_name = _("Comment")
        verbose_name_plural = _("Comments")

    def __str__(self):
        if len(self.text) > 16:
            return "{}...".format(self.text[:16])
        else:
            return self.text

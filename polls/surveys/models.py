from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models


class Survey(models.Model):
    title = models.CharField(max_length=255)
    is_current = models.BooleanField(blank=True, default=False)

    @classmethod
    def reset_current(cls):
        cls.objects.filter(is_current=True).update(is_current=False)

    @classmethod
    def set_current(cls, new_current):
        cls.reset_current()
        new_current.is_current = True
        new_current.save()

    def clean(self, *args, **kwargs):
        # There must only be one current survey
        if self.is_current:
            current_surveys = Survey.objects.filter(is_current=True)
            if self.pk:
                current_surveys = current_surveys.exclude(pk=self.pk)
            if current_surveys.exists():
                raise ValidationError("Only one survey can be active at time.")

    def __str__(self):
        return self.title


class Question(models.Model):
    text = models.TextField(blank=False)
    image = models.ImageField(blank=True, null=True)
    survey = models.ForeignKey(Survey, null=False, on_delete=models.CASCADE)

    UNIQUE = 'UNIQ'
    MULTIPLE = 'MULT'
    RANK = 'RANK'
    RATE = 'RATE'

    TYPES = (
        (UNIQUE, 'Unique'),
        (MULTIPLE, 'Multiple'),
        (RANK, 'Rank'),
        (RATE, 'Rate')
    )

    type = models.CharField(max_length=4, choices=TYPES, default=UNIQUE)

    # RATE only
    scale = models.PositiveIntegerField(blank=True, null=True)

    is_active = models.BooleanField(blank=True, default=False)

    def __str__(self):
        return self.type + ": " + self.text


class Choice(models.Model):
    text = models.CharField(max_length=255)
    image = models.ImageField(blank=True, null=True)
    question = models.ForeignKey(Question, null=False, on_delete=models.CASCADE)
    votes = models.PositiveIntegerField(default=0)

    def clean(self):
        super().clean()

        if self.question.type == Question.RATE:
            raise ValidationError("No choice can be associated with a rate question")

    def __str__(self):
        return self.text


class RankChoicePair(models.Model):
    choice = models.ForeignKey(Choice, null=False)
    rank = models.PositiveIntegerField()

    class Meta:
        unique_together = ('choice', 'rank')

    def __str__(self):
        return "{}: {}".format(self.rank, self.choice)


class Answer(models.Model):
    user = models.ForeignKey(User, blank=True, null=True)
    question = models.ForeignKey(Question, blank=False, null=False, on_delete=models.CASCADE)

    class Meta:
        abstract = True
        unique_together = ('user', 'question')

    def clean(self):
        try:
            self.question
        except Question.DoesNotExist:
            raise ValidationError("The question does not exist or correspond to the answer type")


class UniqueAnswer(Answer):
    choice = models.ForeignKey(Choice, blank=False, on_delete=models.CASCADE)

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
    choices = models.ManyToManyField(Choice)
    # Note: many-to-many fields must be form-validated


class RankAnswer(Answer):
    rank_choice_pairs = models.ManyToManyField(RankChoicePair)  # Length must be equal to number of choices


class RateAnswer(Answer):
    question = models.ForeignKey(Question, null=False, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()

    def clean(self):
        super().clean()

        if self.question.type != Question.RATE:
            raise ValidationError("Rate answer are valid only for rate questions")

        if self.rating > self.question.scale:
            raise ValidationError(
                "The rating must not exceed the scale ({})"
                .format(self.question.scale)
            )

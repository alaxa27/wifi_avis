import itertools

from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.test import TestCase

from .forms import MultipleAnswerForm, RateAnswerForm, UniqueAnswerForm
from .models import Choice, MultipleAnswer, Question, RateAnswer, Survey, UniqueAnswer


class SurveyTest(TestCase):

    def setUp(self):
        Survey.objects.create(title="Survey_1", is_current=True)
        Survey.objects.create(title="Survey_2", is_current=False)
        Survey.objects.create(title="Survey_3", is_current=False)

    def test_survey(self):
        """"
        Save should properly work with default parameters.
        """
        survey = Survey(title="Foo")
        survey.save()

        self.assertIn(survey, Survey.objects.all())

    def test_survey_as_not_current(self):
        """
        Any survey should successfully be cleaned when not having is_current
        set to True.
        """
        survey = Survey(title="Foo", is_current=False)
        survey.save()

        self.assertIn(survey, Survey.objects.all())

    def test_survey_as_current_conflict(self):
        """
        Cleaning a survey as current whereas another one already is defined so
        should not be possible.
        """
        survey = Survey.objects.create(title="Foo")
        survey.is_current = True

        self.assertRaises(ValidationError, survey.clean)

    def test_survey_as_current_after_resetting_current(self):
        """
        Cleaning a survey as current after the previous "current" survey has been
        undefined as current is allowed.
        """
        survey = Survey.objects.get(is_current=True)
        survey.is_current = False
        survey.save()

        survey = Survey.objects.create(title="Foo")
        survey.is_current = True
        survey.save()

        self.assertTrue(Survey.objects.get(title="Foo").is_current)

    def test_survey_reset_current(self):
        """
        Calling reset_current static method should reset the current survey to
        non-current.
        """
        Survey.reset_current()
        self.assertFalse(Survey.objects.filter(is_current=True).exists())

    def test_survey_set_current(self):
        """
        Set current one a survey must make it as current after resetting any
        other current survey.
        """
        old_current = Survey.objects.get(is_current=True)
        new_current = Survey.objects.filter(is_current=False).first()
        Survey.set_current(new_current)

        self.assertFalse(Survey.objects.get(id=old_current.id).is_current)
        self.assertEqual(new_current, Survey.objects.get(is_current=True))


class ChoiceTest(TestCase):

    def setUp(self):
        Survey.objects.create(title="survey_0", is_current=True)

    def test_choice_with_rate_question(self):
        """
        No choice can be associated with a rate question.
        """
        survey = Survey.objects.filter(is_current=True).first()
        question = Question.objects.create(
            text="foo",
            type=Question.RATE,
            survey=survey,
            scale=5
        )

        choice = Choice(text="bar", question=question)
        self.assertRaises(ValidationError, choice.clean)

    def test_choice_with_same_text_same_question(self):
        """
        For the same question, the text of two choices must be different.
        """
        survey = Survey.objects.filter(is_current=True).first()
        question = Question.objects.create(
            text="foo",
            type=Question.UNIQUE,
            survey=survey,
            scale=5
        )

        Choice.objects.create(text="bar", question=question)
        choice = Choice(text="bar", question=question)

        self.assertRaises(IntegrityError, choice.save)


def set_up_survey(questions_type, questions_count=3, choices_per_question=3, rate_scale=5):
    """
    Set up database for answer tests, with one current survey and active
    questions with the given type.
    """
    survey = Survey.objects.create(title="survey_0", is_current=True)

    for i in range(questions_count):
        question = Question.objects.create(
            text="question_{}".format(i + 1),
            type=questions_type,
            survey=survey,
            is_active=True
        )

        if questions_type != Question.RATE:
            for j in range(choices_per_question):
                Choice.objects.create(
                    text="choice_{}.{}".format(i + 1, j + 1),
                    question=question
                )
        else:
            question.scale = rate_scale
            question.save()


class UniqueAnswerTest(TestCase):

    def setUp(self):
        set_up_survey(Question.UNIQUE)

    def test_unique_answer(self):
        """
        Regular use with a unique question and associated choice.
        """
        question = Question.objects.get(pk=1)
        choices = Choice.objects.filter(question_id=1)

        for choice in choices:
            answer = UniqueAnswer.objects.create(question=question, choice=choice)

            self.assertIn(answer, UniqueAnswer.objects.all())

    def test_unique_answer_with_unrelated_question(self):
        """
        The choice in the answer should belong to the associated question.
        """
        question = Question.objects.get(pk=1)
        choice = Choice.objects.filter(question_id=2).first()

        answer = UniqueAnswer(question=question, choice=choice)

        self.assertRaises(ValidationError, answer.clean)

    def test_unique_answer_with_non_unique_question(self):
        """
        An unique answer can not be associated with a non-unique question.
        """
        question = Question.objects.create(
            text="Foo",
            type=Question.MULTIPLE,
            survey=Survey.objects.first()
        )

        choice = Choice.objects.create(text="Bar", question=question)

        answer = UniqueAnswer(question=question, choice=choice)
        self.assertRaises(ValidationError, answer.clean)


class RateAnswerTest(TestCase):

    def setUp(self):
        set_up_survey(Question.RATE)

    def test_rate_answer(self):
        """
        Regular use with a rate question and associated rating.
        """
        question = Question.objects.first()

        for rating in range(question.scale):
            answer = RateAnswer.objects.create(question=question, rating=rating)
            self.assertEqual(answer.rating, rating)

    def test_rate_answer_with_too_high_rating(self):
        """
        The rating of the answer is limited by the question's scale, one can
        not give a rating higher than that.
        """
        question = Question.objects.first()

        rating = question.scale + 1
        answer = RateAnswer(question=question, rating=rating)
        self.assertRaises(ValidationError, answer.clean)

    def test_rate_answer_with_non_rate_question(self):
        """
        An unique answer can not be associated with a non-unique question.
        """
        question = Question.objects.create(
            text="Foo",
            type=Question.UNIQUE,
            survey=Survey.objects.first()
        )

        rating = 0
        answer = RateAnswer(question=question, rating=rating)
        self.assertRaises(ValidationError, answer.clean)


class UniqueAnswerFormTest(TestCase):

    def setUp(self):
        set_up_survey(Question.UNIQUE)

    def test_unique_answer_form(self):
        """
        Regular use with a unique question and associated choice.
        """
        question = Question.objects.get(pk=1)
        choices = Choice.objects.filter(question_id=1)

        for choice in choices:
            data = {'choice': choice.id, 'question': question.id}
            form = UniqueAnswerForm(data=data, question=question)

            self.assertTrue(form.is_valid())
            answer = form.save()

            self.assertIn(answer, UniqueAnswer.objects.all())
            self.assertEqual(answer.choice, choice)

    def test_unique_answer_form_not_current_survey(self):
        """
        One can not answer a question associated with a non-current survey.
        """
        question = Question.objects.get(pk=1)
        choice = Choice.objects.filter(question_id=1).first()

        survey = Survey.objects.get(question=question)
        survey.is_current = False
        survey.save()

        data = {'choice': choice.id, 'question': question.id}
        form = UniqueAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())

    def test_unique_answer_form_not_active_question(self):
        """
        One can not answer a question not marked as active.
        """
        question = Question.objects.get(pk=1)
        question.is_active = False
        question.save()
        choice = Choice.objects.filter(question_id=1).first()

        data = {'choice': choice.id, 'question': question.id}
        form = UniqueAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())

    def test_unique_answer_form_with_not_unique_question(self):
        """
        The question answered through the form must be a unique-choice one.
        """
        question = Question.objects.create(
            text="Foo",
            type=Question.MULTIPLE,
            survey=Survey.objects.first()
        )

        choice = Choice.objects.create(text="Bar", question=question)

        data = {'choice': choice.id, 'question': question.id}
        form = UniqueAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())

    def test_unique_answer_form_with_unrelated_question(self):
        """
        The choice in the answer should belong to the associated question.
        """
        question = Question.objects.get(pk=1)
        choice = Choice.objects.filter(question_id=2).first()

        data = {'choice': choice.id, 'question': question.id}
        form = UniqueAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())

    def test_unique_answer_form_with_no_choice(self):
        """
        The choice must not be None.
        """
        question = Question.objects.get(pk=1)

        data = {'question': question.id}
        form = UniqueAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())
        self.assertFalse(UniqueAnswer.objects.exists())

    def test_unique_answer_form_with_no_question(self):
        """
        The question must not be None.
        """
        choice = Choice.objects.first()

        data = {'choice': choice.id}
        form = UniqueAnswerForm(data=data, question=None)

        self.assertFalse(form.is_valid())


class MultipleAnswerFormTest(TestCase):

    def setUp(self):
        set_up_survey(Question.MULTIPLE)

    def test_multiple_answer_form(self):
        """
        Regular use with a multiple question and associated choices.
        """
        question = Question.objects.get(pk=1)
        choices = Choice.objects.filter(question_id=1)

        # Let us just try every possible choices combination, just to be sure
        for combination in itertools.combinations(choices, r=len(choices)):
            data = {
                'choices': [choice.id for choice in combination],
                'question': question.id
            }
            form = MultipleAnswerForm(data=data, question=question)

            self.assertTrue(form.is_valid())
            answer = form.save()

            self.assertIn(answer, MultipleAnswer.objects.all())
            self.assertEqual(list(answer.choices.all()), list(combination))

    def test_multiple_answer_form_not_current_survey(self):
        """
        One can not answer a question associated with a non-current survey.
        """
        question = Question.objects.get(pk=1)
        choices = Choice.objects.filter(question_id=1)

        survey = Survey.objects.get(question=question)
        survey.is_current = False
        survey.save()

        data = {
            'choices': [choice.id for choice in choices],
            'question': question.id
        }
        form = MultipleAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())

    def test_multiple_answer_form_not_active_question(self):
        """
        One can not answer a question not marked as active.
        """
        question = Question.objects.get(pk=1)
        question.is_active = False
        question.save()
        choices = Choice.objects.filter(question_id=1)

        data = {
            'choices': [choice.id for choice in choices],
            'question': question.id
        }
        form = MultipleAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())

    def test_multiple_answer_form_with_not_multiple_question(self):
        """
        The question answered through the form must be a multiple-choice one.
        """
        question = Question.objects.create(
            text="Foo",
            type=Question.UNIQUE,
            survey=Survey.objects.first()
        )

        choices = [
            Choice.objects.create(text="Bar1", question=question),
            Choice.objects.create(text="Bar2", question=question)
        ]

        data = {
            'choices': [choice.id for choice in choices],
            'question': question.id
        }
        form = MultipleAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())

    def test_multiple_answer_form_with_unrelated_question(self):
        """
        The choices in the answer should belong to the associated question.
        """
        question = Question.objects.get(pk=1)
        choices = Choice.objects.filter(question_id=2)

        data = {
            'choices': [choice.id for choice in choices],
            'question': question.id
        }
        form = MultipleAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())


class RateAnswerFormTest(TestCase):

    def setUp(self):
        set_up_survey(Question.RATE)

    def test_rate_answer_form(self):
        """
        Regular use with a rate question and associated rating.
        """
        question = Question.objects.first()

        for rating in range(question.scale):
            data = {
                'rating': rating,
                'question': question.id
            }
            form = RateAnswerForm(data=data, question=question)

            self.assertTrue(form.is_valid())
            answer = form.save()

            self.assertIn(answer, RateAnswer.objects.all())
            self.assertEqual(answer.rating, rating)

    def test_rate_answer_form_not_current_survey(self):
        """
        One can not answer a question associated with a non-current survey.
        """
        question = Question.objects.first()
        rating = 0

        survey = Survey.objects.get(question=question)
        survey.is_current = False
        survey.save()

        data = {
            'rating': rating,
            'question': question.id
        }
        form = RateAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())

    def test_rate_answer_form_not_active_question(self):
        """
        One can not answer a question not marked as active.
        """
        question = Question.objects.first()
        question.is_active = False
        question.save()
        rating = 0

        data = {
            'rating': rating,
            'question': question.id
        }
        form = RateAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())

    def test_rate_answer_form_with_not_tate_question(self):
        """
        The question answered through the form must be a rating one.
        """
        question = Question.objects.create(
            text="Foo",
            type=Question.UNIQUE,
            survey=Survey.objects.first()
        )

        rating = 0

        data = {
            'rating': rating,
            'question': question.id
        }
        form = RateAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())

    def test_rate_answer_form_with_too_high_rating(self):
        """
        The choices in the answer should belong to the associated question.
        """
        question = Question.objects.first()
        rating = question.scale + 1

        data = {
            'rating': rating,
            'question': question.id
        }
        form = RateAnswerForm(data=data, question=question)

        self.assertFalse(form.is_valid())

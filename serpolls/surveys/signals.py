import json

from django.db.models.signals import post_save
from django.dispatch import receiver

from channels import Group

from .models import Question


@receiver(post_save, sender=Question)
def notify_clients(sender, **kwargs):
    update = {
        'type': 'update-questions'
    }
    Group('survey').send({'text': json.dumps(update)})


@receiver(post_save)
def notify_results(sender, **kwargs):
    list_of_models = ('UniqueAnswer', 'MultipleAnswer', 'RateAnswer')

    # TODO: other question types
    if sender.__name__ in list_of_models:  # this is the dynamic part you want
        answer = kwargs.pop('instance')
        question = answer.question
        update = {
            'type': 'update-results',
            'question': {
                'id': question.id,
                'text': question.text
            },
            'results': question.get_answers_data()
        }

        Group('results').send({'text': json.dumps(update)})

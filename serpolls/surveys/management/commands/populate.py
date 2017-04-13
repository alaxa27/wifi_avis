import random

from django.core.management.base import BaseCommand
from surveys.models import Survey, Question, Choice


class Command(BaseCommand):
    help = 'populates the database with random questions'

    def add_arguments(self, parser):
        parser.add_argument('surveys_count', nargs='?', type=int)

    def handle(self, *args, **options):
        sc = options['surveys_count']
        n = sc if sc is not None else 1

        for i in range(n):
            random_survey()


choices = {
    'fruits': ['Pomme', 'Poire', 'Banane', 'Orange', 'Fraise', 'Framboise'],
    'colors': ['Rouge', 'Vert', 'Bleu', 'Jaune', 'Cyan', 'Magenta', 'Noir', 'Blanc'],
    'countries': ['France', 'Espagne', 'Royaume-Uni', 'Allemagne', 'Russie', 'Chine', 'Etats-Unis', 'Brésil'],
    'suits': ['Piques', 'Coeurs', 'Trèfles', 'Carreaux']
}


def random_survey():
    n = Survey.objects.count()
    s = Survey.objects.create(title="Sondage {:04d}".format(n))

    for i in range(1 + random.randrange(8)):
        random_choice_question(s)

    for i in range(1 + random.randrange(4)):
        random_rate_question(s)


def random_choice_question(s):
    t, _ = random.choice(Question.TYPES)

    if t == Question.UNIQUE:
        text = "Choisissez un unique élément parmi les suivants."
    elif t == Question.MULTIPLE:
        text = "Choisissez un ou plusieurs éléments parmi les suivants."
    elif t == Question.RANK:
        text = "Classez les éléments suivants."
    else:
        return

    q = Question.objects.create(text=text, type=t, survey=s)

    key, values = random.choice(list(choices.items()))
    n = max(2, random.randrange(len(values)))

    for choice in random.sample(values, n):
        Choice.objects.create(text=choice, question=q)


def random_rate_question(s):
    scale = random.choice([5, 10, 20])
    text = "Veuillez donner une note de 1 à {}.".format(scale)

    Question.objects.create(text=text, type=Question.RATE, scale=scale, survey=s)

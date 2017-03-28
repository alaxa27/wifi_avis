from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from .forms import AnswerFormManager
from .models import Question, Survey


def index(request):
    surveys = Survey.objects.all()
    return render(request, 'surveys/index.html', {'surveys': surveys})


def detail(request, survey_id):
    survey = get_object_or_404(Survey, id=survey_id)
    return render(request, 'surveys/detail.html', {'survey': survey})


def current_survey(request):
    survey = get_object_or_404(Survey, is_current=True)
    return render(request, 'surveys/current.html', {'survey': survey})


def active_questions(request):
    survey = get_object_or_404(Survey, is_current=True)
    questions = Question.objects.filter(
        is_active=True,
        survey=survey
    ).exclude(
        id__in=request.session.get('answered', [])
    ).exclude(  # FIXME: TO BE REMOVED WHEN FIXED
        type=Question.RANK
    )

    forms = []
    for question in questions:
        form = AnswerFormManager.get_form(question=question)
        # Prevent duplicate ids (two forms will produce the same items' ids)
        form.auto_id = False
        forms.append(form)

    pairs = []
    for question, form in zip(questions, forms):
        pairs.append({
            'question': question,
            'form': form
        })

    return render(request, 'surveys/question.html', {'pairs': pairs})


def answer(request, question_id):
    form = AnswerFormManager.get_form(
        data=request.POST,
        question=Question.objects.get(id=question_id)
    )

    answered = request.session.get('answered', [])
    if question_id not in answered:
        if form.is_valid():
            form.save()
            answered.append(question_id)
            request.session['answered'] = answered
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=401)

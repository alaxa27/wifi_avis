import json

from channels import Group

from django.contrib.admin.views.decorators import staff_member_required
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.views.decorators.csrf import csrf_exempt
from django.utils.translation import ugettext as _

from .forms import AnswerFormManager, LoginForm
from .models import Comment, Question, Respondent, Session


def current_survey(request):
    session = get_object_or_404(Session, is_current=True)
    return render(request, 'surveys/current.html', {'survey': session.survey})


def active_questions(request):
    session = get_object_or_404(Session, is_current=True)
    questions = Question.objects.filter(
        is_active=True,
        survey=session.survey
    ).exclude(
        id__in=request.session.get('answered', []),
    )

    if len(questions) == 0:
        return HttpResponse(status=204)

    forms = []
    for question in questions:
        form = AnswerFormManager.get_form(session=session, question=question)
        # Prevent duplicate ids (two forms will produce the same items' ids)
        form.auto_id = False
        forms.append(form)

    pairs = []
    for question, form in zip(questions, forms):
        pairs.append({
            'question': question,
            'form': form
        })

    return render(request, 'surveys/questions.html', {'pairs': pairs})


def answer(request, question_id=None):
    form = AnswerFormManager.get_form(
        data=request.POST,
        question=Question.objects.get(id=question_id),
        session=Session.objects.get(is_current=True)
    )

    answered = request.session.get('answered', [])
    if question_id not in answered:
        if form.is_valid():
            form.save()
            answered.append(question_id)
            request.session['answered'] = answered
            # return HttpResponse(status=201)
            return redirect('surveys:current')
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=401)


def skip(request, question_id):
    answered = request.session.get('answered', [])
    answered.append(question_id)
    request.session['answered'] = answered
    return HttpResponse(status=200)


def login(request):
    # Client already logged in
    if request.session.get('respondent_id') is not None:
        return redirect('surveys:current')

    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            respondent = form.save()
            request.session['respondent_id'] = respondent.id
            return redirect('surveys:current')

    form = LoginForm()
    return render(request, 'surveys/login.html', {'form': form})


@csrf_exempt
def comment(request):
    if request.method != 'POST':
        return HttpResponse(status=400)

    # A session must be running
    if not Session.objects.filter(is_current=True).exists():
        return HttpResponse(status=400)

    text = request.POST.get('text')
    if text is None:
        return HttpResponse(status=400)

    qs = Respondent.objects.filter(id=request.session.get('respondent_id'))
    respondent = None
    if qs.exists():
        respondent = qs.first()
        name = str(respondent)
        age = respondent.age
        gender = respondent.gender
    else:
        name = _("Anonymous")
        age = None
        gender = Respondent.UNDEFINED

    Group('comments').send({'text': json.dumps({
        'type': 'comment',
        'author': respondent.id if respondent else None,
        'name': name,
        'age': age,
        'gender': gender,
        'text': text
    })})

    #return HttpResponse(status=200)
    return redirect('surveys:current')


@staff_member_required
def comments_select(request):
    return render(request, 'surveys/comments_select.html')


@csrf_exempt
@staff_member_required
def select_comment(request):
    if request.method != 'POST':
        return HttpResponse(status=400)

    author = request.POST.get('author', None)
    author = None if author == 'null' else author
    text = request.POST.get('text')

    qs = Respondent.objects.filter(id=author)
    respondent = qs.first() if qs.exists() else None

    Comment.objects.create(
        author=respondent,
        text=text,
        session=Session.objects.get(is_current=True)
    )

    Group('comments-valid').send({'text': json.dumps({
        'type': 'comment',
        'name': str(respondent) if respondent is not None else _("Anonymous"),
        'text': text
    })})

    return HttpResponse(status=200)


@staff_member_required
def discard_all_comments(request):
    Group('comments-valid').send({'text': json.dumps({
            'type': 'discard-all-comments'
    })})

    return HttpResponse(status=200)


def results(request):
    return render(request, 'surveys/results.html')


def active_questions_list(request):
    return JsonResponse({
        'questions': [{
            'id': question.id,
            'text': question.text,
            'type': question.type,
            'choices':
                [choice.text for choice in question.choice_set.all()]
                if question.type != Question.RATE else
                [i for i in range(question.scale + 1)],
            'results': question.get_answers_data()
        } for question in Question.objects.filter(is_active=True, survey__session__is_current=True)
        ]
    })

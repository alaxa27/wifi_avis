function requestQuestions(url) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            refreshQuestions(this.responseText);
        }
    };

    xhr.open('GET', url, true);
    xhr.send();
}

function refreshQuestions(newQuestionsHtml) {
    const questionsElement = document.getElementById('questions');
    questionsElement.innerHTML = newQuestionsHtml;

    const forms = questionsElement.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
        setUpQuestionForm(forms[i]);
    }
}

function setUpQuestionForm(form) {
    form.addEventListener('submit', setUpSubmitXhr, false);
}

function setUpSubmitXhr(event) {
    event.preventDefault();
    const data = new FormData(this);

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 201) {
                form.remove();
            } else {
                console.log('xhr', xhr);
                window.alert("Could not submit your answer, please try again.");
            }
        }
    };

    xhr.open(form.method, form.action);
    xhr.send(data);
}
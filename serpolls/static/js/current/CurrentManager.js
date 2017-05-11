import {getWSProtocol} from '../util/websocket_protocol.js'

export class CurrentManager {
    constructor(questionsContainer, commentButton, urls) {
        this.questionsContainer = questionsContainer
        this.urls = urls
        this.connect()
        this._setUpCommentButton(commentButton)
        this.requestQuestions()
    }

    connect() {
        this.ws = new WebSocket(`${getWSProtocol()}://${window.location.host}${window.location.pathname}`)
        this.ws.onmessage = message => this._processMessage(message)
        this.ws.onclose = () => {
            window.setTimeout(this.connect, 5000)
        }
    }

    _processMessage(message) {
        const data = JSON.parse(message.data)
        switch (data.type) {
            case 'update-questions':
                this.requestQuestions()
                break
            default:
                break
        }
    }

    requestQuestions() {
        const xhr = new XMLHttpRequest()
        const that = this
        xhr.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                that.refreshQuestions(this.responseText)
            }
        }

        xhr.open('GET', this.urls.active, true)
        xhr.send()
    }

    refreshQuestions(newQuestionsHtml) {
        this.questionsContainer.innerHTML = newQuestionsHtml
        const forms = this.questionsContainer.getElementsByTagName('form')
        for (let form of forms) {
            this._setUpQuestionForm(form)
        }
    }

    _setUpQuestionForm(form) {
        if (form.classList.contains('question-rate')) {
            const input = document.getElementsByName('rating')[0]

            if (input.classList.contains("STARS")) {
                const ul = document.createElement('ul')
                form.insertBefore(ul, input.nextSibling)

                rating(ul, input.min, input.max, function(rating) {
                    input.value = rating
                })

                input.hidden = true
            }
        }

        form.addEventListener('submit', CurrentManager._setUpSubmitXhr, true)

        const skipButton = form.getElementsByClassName('skip')[0]
        skipButton.addEventListener('click', e => this._setUpSkipXhr(e, form), true)
    }

    static _setUpSubmitXhr(event) {
        event.preventDefault()

        const form = event.target
        const data = new FormData(form)
        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 201 || xhr.status === 200) {
                    form.remove()
                } else {
                    window.alert(gettext("Could not submit your answer, please try again."))
                }
            }
        }

        xhr.open(form.method, form.action)
        xhr.send(data)
    }

    _setUpSkipXhr(event, form) {
        event.preventDefault()

        if (!window.confirm(gettext("Skip the question?"))) {
            return
        }

        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                form.remove()
            }
        }

        const splitUrl = form.action.split('/');
        const questionId = splitUrl[splitUrl.length - 1];

        xhr.open('GET', this.urls.skip + questionId)
        xhr.send()
    }

    _setUpCommentButton(commentButton) {
        commentButton.addEventListener('click', () => {
            const comment = window.prompt(gettext("Please enter your comment."))
            if (comment !== null) {
                const xhr = new XMLHttpRequest()

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200 || xhr.status === 200) {
                            window.alert(gettext("Comment sent!"))
                        } else {
                            window.alert(gettext("Could not send comment, please try again."))
                        }
                    }
                }

                xhr.open('POST', this.urls.comment)
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
                xhr.send(`text=${comment}`)
            }
        })
    }

}
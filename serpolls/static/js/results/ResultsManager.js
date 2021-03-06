import {getWSProtocol} from '../util/websocket_protocol.js'

export class ResultsManager {
    constructor (displayManager, commentsManager, urls) {
        this.displayManager = displayManager
        this.commentsManager = commentsManager
        this.urls = urls
        this.connect()

        this.activeQuestions = []
        this.getActiveQuestions()
    }

    connect () {
        this.ws = new WebSocket(`${getWSProtocol()}://${window.location.host}${window.location.pathname}`)
        this.ws.onmessage = message => this._processMessage(message)
        this.ws.onclose = () => {
            window.setTimeout(this.connect, 5000)
        }

    }

    _processMessage (message) {
        const data = JSON.parse(message.data)

        switch (data.type) {
            case 'comment':
                this.commentsManager.add(data.name, data.text)
                break
            case 'update-questions':
                this.getActiveQuestions()
                break
            case 'update-results':
                this.displayManager.updateQuestion(data.question, data.results)
                break
            case 'remove-question':
                this.displayManager.remove(data.question)
                break
            case 'discard-all-comments':
                this.commentsManager.removeAll()
                break
            default:
                break
        }
    }

    getActiveQuestions () {
        const xhr = new XMLHttpRequest()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const questions = JSON.parse(xhr.responseText).questions
                this.displayManager.updateQuestions(questions)
            }
        }

        xhr.open('GET', this.urls.active)
        xhr.send()
    }
}
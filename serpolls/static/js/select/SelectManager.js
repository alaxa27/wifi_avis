import {getWSProtocol} from '../util/websocket_protocol.js'
import {StagedComment} from './StagedComment.js'
import {SelectedComment} from './SelectedComment.js'

export class SelectManager {
    constructor(stagedCommentsContainer, selectedCommentsContainer, discardCommentsButton, urls) {
        this.stagedCommentsContainer = stagedCommentsContainer
        this.selectedCommentsContainer = selectedCommentsContainer
        this.urls = urls
        this.connect()

        discardCommentsButton.addEventListener('click', () => {
            const stagedCC = this.stagedCommentsContainer
            while (stagedCC.firstChild) {
                stagedCC.removeChild(stagedCC.firstChild)
            }

            const selectedCC = this.selectedCommentsContainer
            while (selectedCC.firstChild) {
                selectedCC.removeChild(selectedCC.firstChild)
            }

            const xhr = new XMLHttpRequest()
            xhr.open('GET', this.urls.discardAll)
            xhr.send()
        })
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
            case 'comment':
                this.appendComment(data.author, data.name, data.text, data.age, data.gender)
                break
            default:
                break
        }
    }

    appendComment(author, name, text, age, gender) {
        const comment = new StagedComment(name, text)
        this.stagedCommentsContainer.appendFirst(comment)
        const selectedCommentsContainer = this.selectedCommentsContainer

        comment.validateButton.addEventListener('click', () => {
            const xhr = new XMLHttpRequest()

            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        comment.remove()
                        selectedCommentsContainer.appendFirst(new SelectedComment(name, text))
                    } else {
                        window.alert(gettext("Could not send comment, please try again."))
                    }
                }
            }

            xhr.open('POST', this.urls.select)
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhr.send(`author=${author}&name=${name}&text=${text}&age=${age}&gender=${gender}`)
        })
    }
}
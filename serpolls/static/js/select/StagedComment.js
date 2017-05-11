import {Comment} from '../results/Comment.js'

export class StagedComment extends Comment {
    constructor(name, text) {
        super(name, text)
    }

    connectedCallback() {
        super.connectedCallback()

        this.validateButton = document.createElement('button')
        this.validateButton.textContent = gettext("Validate")
        this.validateButton.className = 'btn btn-success'

        this.appendChild(this.validateButton)

        const discardButton = document.createElement('button')
        discardButton.textContent = gettext("Discard")
        discardButton.className = 'btn btn-danger'

        discardButton.addEventListener('click', () => this.remove())
        this.appendChild(discardButton)
    }
}

window.customElements.define('select-comment', StagedComment)
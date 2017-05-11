import {Comment} from '../results/Comment.js'

export class SelectedComment extends Comment {
    constructor(name, text) {
        super(name, text)
    }
}

window.customElements.define('validated-comment', SelectedComment)
import {Comment} from '../results/Comment.js'

export class SelectedComment extends Comment {
    constructor(author, text) {
        super(author, text)
    }
}

window.customElements.define('validated-comment', SelectedComment)
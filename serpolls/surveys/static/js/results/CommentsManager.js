import {Comment} from './Comment.js'

export class CommentsManager {
    constructor(commentsContainer) {
        this.commentsContainer = commentsContainer
    }

    add(author, text) {
        const comment = new Comment(author, text)
        this.commentsContainer.appendFirst(comment)
    }

    removeAll() {
        const cc = this.commentsContainer
        while (cc.firstChild) {
            cc.removeChild(cc.firstChild)
        }
    }
}
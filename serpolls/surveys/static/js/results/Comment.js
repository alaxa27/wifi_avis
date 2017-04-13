export class Comment extends HTMLElement {
    constructor(author, text) {
        super()
        this.author = author
        this.text = text
    }

    connectedCallback() {
        this.className = 'frame'
        this.innerHTML = `<div><h3>${this.author}</h3><p>${this.text}</p></div>`
    }
}

window.customElements.define('results-comment', Comment)
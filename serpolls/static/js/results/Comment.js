export class Comment extends HTMLElement {
    constructor(name, text) {
        super()
        this.name = name
        this.text = text
    }

    connectedCallback() {
        this.className = 'frame'
        this.innerHTML = `<div><h3>${this.name}</h3><p>${this.text}</p></div>`
    }
}

window.customElements.define('results-comment', Comment)

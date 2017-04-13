import {Display} from './Display.js'
import {Chart} from '../vendor/chart.min.js'

export class DisplayManager {
    constructor(chartsContainer) {
        this.chartsContainer = chartsContainer
        this.displays = []
        DisplayManager._initChartConfig()

    }

    static _initChartConfig() {
        Chart.defaults.global.defaultFontSize = 18
    }

    update(question, results) {
        let display = this._getAssociatedDisplay(question)
        if (!display) {
            display = this.newQuestion(question)
        }

        display.updateData(results)
    }

    newQuestion(question) {
        const display = new Display(question)
        this.displays.push(display)
        this.chartsContainer.appendChild(display)
        return display
    }

    remove(question) {
        const display = this._getAssociatedDisplay(question)
        if (display) {
            display.remove()
            this.displays.splice(this.displays.indexOf(display), 1)
        }
    }

    _getAssociatedDisplay(question) {
        return this.displays.find(e => e.question.id === question.id)
    }
}
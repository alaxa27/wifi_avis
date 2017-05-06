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

    updateQuestions(questions) {
        console.log("questions", questions)
        for (const question of questions) {
            let display = this._getAssociatedDisplay(question)
            if (!display) {
                display = this.newQuestion(question)
                display.updateData(question.results)
            }
        }

        for (const display of this.displays) {
            const question = display.question
            if (questions.map(q => q.id).includes(question.id)) {
                continue
            }
            this.remove(display)
        }
    }

    updateQuestion(question, results) {
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

    remove(display) {
        if (display) {
            this.displays.splice(this.displays.indexOf(display), 1)

            display.remove()
        }
    }

    _getAssociatedDisplay(question) {
        return this.displays.find(e => e.question.id === question.id)
    }
}
import {Chart} from '../vendor/chart.min.js'

const BACKGROUND_COLORS = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
]

const BORDER_COLORS = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]

export class Display extends HTMLElement {
    constructor(question) {
        super()
        this.question = question
    }

    connectedCallback() {
        this.className = 'frame'
        this.innerHTML = `<div><canvas class="chart"></canvas></div>`
        this.mean = document.createElement('p')
        this.appendChild(this.mean)

        const ctx = this.querySelector('.chart')

        const chartData = {
            labels: this.question.choices,
            datasets: [
                {
                    label: this.question.text,
                    data: [...new Array(this.question.choices.length)],
                    backgroundColor: BACKGROUND_COLORS,
                    borderColor: BORDER_COLORS,
                    borderWidth: 1
                }
            ]
        }

        const options = {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            tooltips: {
                enabled: false
            },
            responsive: false,
            animation: {
                onComplete: function () {
                    const chartInstance = this.chart
                    const ctx = chartInstance.ctx
                    ctx.font = Chart.helpers.fontString(
                        Chart.defaults.global.defaultFontSize,
                        Chart.defaults.global.defaultFontStyle,
                        Chart.defaults.global.defaultFontFamily
                    )
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'bottom'

                    this.data.datasets.forEach(function (dataset, i) {
                        const meta = chartInstance.controller.getDatasetMeta(i)
                        meta.data.forEach(function (bar, index) {
                            const data = dataset.data[index]
                            ctx.fillText(data, bar._model.x, bar._model.y - 5)
                        });
                    });
                },
            }
        }

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: options
        })

    }

    updateData(data) {
        this.chart.data.datasets[0].data = data
        this.chart.update()

        if (this.question.type === 'RATE') {
            let sum = 0
            let n = 0
            for (let i = 0; i < this.question.choices.length; i++) {
                n += data[i]
                sum += data[i] * this.question.choices[i]
            }

            const mean = sum / n
            this.updateMean(mean)
        }
    }

    updateMean(mean) {
        this.mean.textContent = `${gettext("Mean")}: ${mean}`
    }
}

window.customElements.define('results-display', Display)
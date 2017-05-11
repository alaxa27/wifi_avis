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

Chart.pluginService.register({
    beforeRender: function (chart) {
        if (chart.config.options.showAllTooltips) {
            // create an array of tooltips
            // we can't use the chart tooltip because there is only one tooltip per chart
            chart.pluginTooltips = [];
            chart.config.data.datasets.forEach(function (dataset, i) {
                chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                    chart.pluginTooltips.push(new Chart.Tooltip({
                        _chart: chart.chart,
                        _chartInstance: chart,
                        _data: chart.data,
                        _options: chart.options.tooltips,
                        _active: [sector]
                    }, chart));
                });
            });

            // turn off normal tooltips
            chart.options.tooltips.enabled = false;
        }
    },
    afterDraw: function (chart, easing) {
        if (chart.config.options.showAllTooltips) {
            // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
            if (!chart.allTooltipsOnce) {
                if (easing !== 1)
                    return;
                chart.allTooltipsOnce = true;
            }

            // turn on tooltips
            chart.options.tooltips.enabled = true;
            Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                tooltip.initialize();
                tooltip.update();
                // we don't actually need this since we are not animating tooltips
                tooltip.pivot();
                tooltip.transition(easing).draw();
            });
            chart.options.tooltips.enabled = false;
        }
    }
})

export class Display extends HTMLElement {
    constructor(question) {
        super()
        this.question = question
    }

    connectedCallback() {
        this.className = 'frame'
        this.innerHTML = `<div><canvas class="chart"></canvas></div>`
        // ChartJS pie charts do not display titles correctly
        if (this.question.type === 'UNIQ') {
            const title = document.createElement('h3')
            title.innerText = this.question.text
            this.appendFirst(title)
        }

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

        const type = this.question.type === 'UNIQ' ? 'pie' : 'bar'

        const options = {
            tooltips: {
                enabled: true,
                callbacks: {
                    title: function (tooltipItem, data) {
                        return null
                    },

                    label: function(tooltipItems, data) {
                        const points = data.datasets[tooltipItems.datasetIndex].data
                        const value = type === 'pie' ?
                            100 * points[tooltipItems.index] / points.reduce((acc, v) => acc + v) :
                            points[tooltipItems.index]

                        return Math.round(value * 100) / 100 + (type === 'pie' ? " %" : "")
                    },

                }
            },
            showAllTooltips: true,
            events: false,
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0,
            },
        }

        if (type === 'bar') {
            options.scales = {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }


        this.chart = new Chart(ctx, {
            type: type,
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

            const mean = Math.round(100 * sum / n) / 100
            this.updateMean(mean)
        }
    }

    updateMean(mean) {
        this.mean.textContent = `${gettext("Mean")}: ${mean}`
    }
}

window.customElements.define('results-display', Display)
import {mapSamples} from './rows.js'
import {sampleTitles} from './helpers.js'
import Chart from 'chart.js'

const generateHues = (sampleCount) => {
  const hues = []
  const hueInterval = 360 / sampleCount
  for (let i = 0; i < sampleCount; i += 1) {
    hues.push(i * hueInterval)
  }
  return hues
}

const addDataSourcesToChart = (chart, rows, sampleCount) => {
  const maxValues = []
  for (let sampleIdx = 0; sampleIdx < sampleCount; sampleIdx += 1) {
    const spectrum = rows.map((row) => row[sampleIdx + 1])
    maxValues[sampleIdx] = Math.max(...spectrum)
  }
  const normalisedRows = mapSamples(rows, (wavelength, sample, sampleIndex) => {
    return sample / maxValues[sampleIndex]
  })

  const log10Rows = mapSamples(rows, (wavelength, sample) => {
    return Math.log10(sample)
  })

  const toggleDataSource = (event) => {
    let data = []
    let yAxisLabel = ''
    if (event.target.value === 'raw') {
      yAxisLabel = 'Spectral irradiance [W/(m² nm)]'
      data = rows
    } else if (event.target.value === 'normalised') {
      yAxisLabel = 'Normalised spectral irradiance (relative to max.)'
      data = normalisedRows
    } else if (event.target.value === 'log10') {
      yAxisLabel = 'Log₁₀ spectral irradiance [log₁₀ W/(m² nm)]'
      data = log10Rows
    }
    chart.options.scales.yAxes[0].scaleLabel.labelString = yAxisLabel
    chart.data.datasets.forEach((dataset, index) => {
      dataset.data = data.map((row) => row[index + 1])
    })
    chart.update()
  }
  $('#chart-data-source input[name="chart-data"]').click(toggleDataSource)
  $('#chart-data-source input#chart-data-raw').prop('checked', true)
  $('#chart-data-source').show()
}

/* eslint-disable max-lines-per-function */
export const createChart = (chartCanvas, rows, sampleCount) => {
  const datasets = []
  const hues = generateHues(sampleCount)
  const labels = sampleTitles(sampleCount)

  for (let sampleIdx = 0; sampleIdx < sampleCount; sampleIdx += 1) {
    const lineColor = 'hsl(' + hues[sampleIdx] + ',100%,50%)'
    datasets[sampleIdx] = {
      'backgroundColor': lineColor,
      'borderColor': lineColor,
      'data': rows.map((row) => row[sampleIdx + 1]),
      'fill': false,
      'label': labels[sampleIdx],
      'pointRadius': 1
    }
  }
  const waveLengths = rows.map((row) => row[0]);

  const chart = new Chart(chartCanvas, { // eslint-disable-line no-new
    'data': {
      datasets,
      'labels': waveLengths
    },
    'options': {
      'scales': {
        'xAxes': [
          {
            'scaleLabel': {
              'display': true,
              'labelString': 'Wavelength [nm]'
            },
            'ticks': {
              'maxTicksLimit': 20
            }
          }
        ],
        'yAxes': [
          {
            'scaleLabel': {
              'display': true,
              'labelString': 'Spectral irradiance [W/(m² nm)]'
            }
          }
        ]
      }
    },
    'type': 'line'
  });

  addDataSourcesToChart(chart, rows, sampleCount)
}
/* eslint-enable max-lines-per-function */

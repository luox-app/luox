import {mapSamples} from './rows.js'
import {sampleTitles, radianceOrIrradianceSIUnit} from './helpers.js'
import Chart from 'chart.js'

const generateHues = (sampleCount) => {
  const hues = []
  const hueInterval = 360 / sampleCount
  for (let i = 0; i < sampleCount; i += 1) {
    hues.push(i * hueInterval)
  }
  return hues
}

/* eslint-disable max-lines-per-function */
export const createChart = (chartCanvas, radianceOrIrradiance, rows, sampleCount, yAxisScaling) => {
  const datasets = []
  const hues = generateHues(sampleCount)
  const labels = sampleTitles(sampleCount)
  let data = rows
  let yAxisLabel = `Spectral ${radianceOrIrradiance} [${radianceOrIrradianceSIUnit(radianceOrIrradiance)}]`

  if (yAxisScaling === 'normalised') {
    const maxValues = []
    for (let sampleIdx = 0; sampleIdx < sampleCount; sampleIdx += 1) {
      const spectrum = rows.map((row) => row[sampleIdx + 1])
      maxValues[sampleIdx] = Math.max(...spectrum)
    }
    data = mapSamples(rows, (wavelength, sample, sampleIndex) => {
      return sample / maxValues[sampleIndex]
    })
    yAxisLabel = `Normalised spectral ${radianceOrIrradiance} (relative to max.)`
  } else if (yAxisScaling === 'log10') {
    data = mapSamples(rows, (wavelength, sample) => {
      return Math.log10(sample)
    })
    yAxisLabel = `Log₁₀ spectral ${radianceOrIrradiance} [log₁₀ ${radianceOrIrradianceSIUnit(radianceOrIrradiance)}]`
  }

  for (let sampleIdx = 0; sampleIdx < sampleCount; sampleIdx += 1) {
    const lineColor = 'hsl(' + hues[sampleIdx] + ',100%,50%)'
    datasets[sampleIdx] = {
      'backgroundColor': lineColor,
      'borderColor': lineColor,
      'data': data.map((row) => row[sampleIdx + 1]),
      'fill': false,
      'label': labels[sampleIdx],
      'pointRadius': 1
    }
  }
  const waveLengths = rows.map((row) => row[0]);

  return new Chart(chartCanvas, { // eslint-disable-line no-new
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
              'labelString': yAxisLabel
            }
          }
        ]
      }
    },
    'type': 'line'
  });
}
/* eslint-enable max-lines-per-function */

import {mapSamples, interpolateData} from './rows.js'
import {createCalculationTable} from './calculationTable.js'
import {createSpectraTable} from './spectraTable.js'
import {sampleTitles} from './helpers.js'
import {downloadCSVButton} from './csvExport.js'
import Chart from 'chart.js'

const conversionFunction = (areaScale, powerScale) => {
  return (wavelength, sample) =>  sample / powerScale * areaScale
}

const createDownloadButtonsInFooter = (element, calculationTable, spectrumTable) => {
  const calcCSVButton = downloadCSVButton(calculationTable, "btn btn-primary", "download-calc", "Download calculation CSV")
  element.appendChild(calcCSVButton);
  const spectrumCSVButton = downloadCSVButton(spectrumTable, "btn btn-primary", "download-spectrum", "Download spectrum CSV")
  element.appendChild(spectrumCSVButton);
}

const createToggleButton = (target, expanded, text) => {
  const toggle = document.createElement('a')
  toggle.className = 'btn btn-outline-secondary ml-1'
  toggle.href = '#' + target
  toggle.dataset.toggle = 'collapse'
  toggle.innerText = text
  toggle.setAttribute('role', 'button')
  toggle.setAttribute('aria-expanded', expanded)
  toggle.setAttribute('aria-controls', target)
  return toggle
}

const createActionsForChart = () => {
  const chartToggle = createToggleButton('spectra-chart-and-controls', 'false', 'Toggle chart')
  document.getElementById('spectra-chart-actions').appendChild(chartToggle)
}

const createActionsForTables = (calculationTable, spectrumTable) => {
  const calcCSVButton = downloadCSVButton(calculationTable, "btn btn-outline-secondary", "download-calc", "Download table as CSV")
  const calcToggle = createToggleButton('calculation-table-container', 'true', 'Toggle table')
  document.getElementById('calculation-table-actions').appendChild(calcCSVButton)
  document.getElementById('calculation-table-actions').appendChild(calcToggle)

  const spectrumCSVButton = downloadCSVButton(spectrumTable, "btn btn-outline-secondary", "download-spectrum", "Download table as CSV")
  const spectraToggle = createToggleButton('spectra-table-container', 'false', 'Toggle table')
  document.getElementById('spectra-table-actions').appendChild(spectrumCSVButton)
  document.getElementById('spectra-table-actions').appendChild(spectraToggle)
}

const generateHues = (sampleCount) => {
  const hues = []
  const hueInterval = 360 / sampleCount
  for (let i = 0; i < sampleCount; i += 1) {
    hues.push(i * hueInterval)
  }
  return hues
}

/* eslint-disable max-lines-per-function */
const createChart = (chartCanvas, rows, sampleCount) => {
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
              'labelString': 'Spectral irradiance [W/(m² nm)]'
            }
          }
        ]
      }
    },
    'type': 'line'
  });
}
/* eslint-enable max-lines-per-function */

/* eslint-disable max-lines-per-function */
export const createTables = (rawRows, sampleCount, spectrumTable, calculationTable, areaScale, powerScale, footerButtons, chartCanvas, simplifiedReport) => {
  const unitConversion = conversionFunction(areaScale, powerScale)
  const rows = mapSamples(rawRows, unitConversion)
  const interpolatedRows = interpolateData(rows, sampleCount)

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

  createCalculationTable(calculationTable, interpolatedRows, sampleCount, simplifiedReport)

  const chart = createChart(chartCanvas, rows, sampleCount)
  $('#chart-data-source input[name="chart-data"]').click((event) => {
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
  })
  $('#chart-data-source input#chart-data-raw').prop('checked', true)
  $('#chart-data-source').show()

  createSpectraTable(spectrumTable, rows, sampleCount)

  if (simplifiedReport) {
    createActionsForTables(calculationTable, spectrumTable)
    createActionsForChart()
  } else {
    createDownloadButtonsInFooter(footerButtons, calculationTable, spectrumTable)
  }
}
/* eslint-enable max-lines-per-function */

export const createErrorTable = (errors, errorsTable) => {
  for (const error of errors) {
    const row = document.createElement('tr')

    const rowNum = document.createElement('td')
    const rowNumText = document.createTextNode(`line ${error.row}`)
    rowNum.appendChild(rowNumText)

    const message = document.createElement('td')
    const messageText = document.createTextNode(error.message)
    message.appendChild(messageText)

    row.appendChild(rowNum)
    row.appendChild(message)

    errorsTable.appendChild(row)
  }
}

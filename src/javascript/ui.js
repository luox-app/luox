import {mapSamples, interpolateData} from './rows.js'
import {createCalculationTable} from './calculationTable.js'
import {createSpectraTable} from './spectraTable.js'
import {downloadCSVButton} from './csvExport.js'
import {createChart} from './chart.js'
import {asDecimal, asExponential} from './helpers.js'

const conversionFunction = (areaScale, powerScale) => {
  return (wavelength, sample) =>  sample / powerScale * areaScale
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

const createNotationToggle = (table, actionsId, defaultNotation, decimalPrecision) => {
  const notationToggle = document.createElement('a')
  notationToggle.className = 'btn btn-outline-secondary ml-1'
  notationToggle.href = '#'
  notationToggle.innerText = 'Toggle notation'
  notationToggle.setAttribute('role', 'button')
  notationToggle.dataset.notation = defaultNotation

  const toggleNotation = (event) => {
    event.preventDefault()
    const button = event.target
    if (button.dataset.notation === 'decimal') {
      button.dataset.notation = 'scientific'
      table.querySelectorAll('td[data-notation-toggleable=true]').forEach((element) => {
        if (!isNaN(element.innerText)) {
          element.innerText = asExponential(Number(element.innerText))
        }
      })
    } else {
      button.dataset.notation = 'decimal'
      table.querySelectorAll('td[data-notation-toggleable=true]').forEach((element) => {
        if (!isNaN(element.innerText)) {
          element.innerText = asDecimal(Number(element.innerText), decimalPrecision)
        }
      })
    }
  }

  notationToggle.addEventListener('click', toggleNotation, false);
  document.getElementById(actionsId).appendChild(notationToggle)
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

export const createResults = (rawRows, sampleCount, spectrumTable, calculationTable, areaScale, powerScale, footerButtons, chartCanvas, simplifiedReport) => {
  const unitConversion = conversionFunction(areaScale, powerScale)
  const rows = mapSamples(rawRows, unitConversion)
  const interpolatedRows = interpolateData(rows, sampleCount)

  createCalculationTable(calculationTable, interpolatedRows, sampleCount, simplifiedReport)

  createChart(chartCanvas, rows, sampleCount)

  createSpectraTable(spectrumTable, rows, sampleCount)

  createActionsForTables(calculationTable, spectrumTable)
  createActionsForChart()
  createNotationToggle(calculationTable, 'calculation-table-actions', 'decimal', 2)
  createNotationToggle(spectrumTable, 'spectra-table-actions', 'scientific', 10)
}

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

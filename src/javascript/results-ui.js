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

export const createResults = (rawRows, sampleCount, areaScale, powerScale, simplifiedReport) => {
  const unitConversion = conversionFunction(areaScale, powerScale)
  const rows = mapSamples(rawRows, unitConversion)
  const interpolatedRows = interpolateData(rows, sampleCount)

  const calculationTable = document.getElementById('calculation-table')
  createCalculationTable(calculationTable, interpolatedRows, sampleCount, simplifiedReport)
  document.getElementById('calculation-table-actions').appendChild(
    downloadCSVButton(calculationTable, "btn btn-outline-secondary", "download-calc", "Download table as CSV")
  )
  document.getElementById('calculation-table-actions').appendChild(
    createToggleButton('calculation-table-container', 'true', 'Toggle table')
  )
  createNotationToggle(calculationTable, 'calculation-table-actions', 'decimal', 2)

  const chartCanvas = document.getElementById('chart-canvas')
  createChart(chartCanvas, rows, sampleCount)
  document.getElementById('spectra-chart-actions').appendChild(
    createToggleButton('spectra-chart-and-controls', 'false', 'Toggle chart')
  )

  const spectrumTable = document.getElementById('spectrum-table')
  createSpectraTable(spectrumTable, rows, sampleCount)
  document.getElementById('spectra-table-actions').appendChild(
    downloadCSVButton(spectrumTable, "btn btn-outline-secondary", "download-spectrum", "Download table as CSV")
  )
  document.getElementById('spectra-table-actions').appendChild(
    createToggleButton('spectra-table-container', 'false', 'Toggle table')
  )
  createNotationToggle(spectrumTable, 'spectra-table-actions', 'scientific', 10)
}

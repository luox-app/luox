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
  toggle.href = '#'
  toggle.innerText = text
  toggle.setAttribute('role', 'button')
  toggle.setAttribute('aria-expanded', expanded)
  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    if (target.style.display === 'none') {
      target.style.display = ''
    } else {
      target.style.display = 'none'
    }
  }, false)
  return toggle
}

const createNotationToggle = (table, defaultNotation, decimalPrecision) => {
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
  return notationToggle;
}

const renderCalculations = (interpolatedRows, sampleCount, simplifiedReport) => {
  const calculations = document.getElementById('calculations')
  const calculationTable = document.getElementById('calculation-table')
  createCalculationTable(calculationTable, interpolatedRows, sampleCount, simplifiedReport)
  const calculationActions = document.createElement('div')
  calculationActions.append(
    downloadCSVButton(calculationTable, "download-calc"),
    createToggleButton(calculationTable, 'true', 'Toggle table'),
    createNotationToggle(calculationTable, 'decimal', 2)
  )
  calculations.getElementsByClassName('heading-and-actions')[0].append(calculationActions)
}

const renderChart = (rows, sampleCount) => {
  const chart = document.getElementById('chart')
  const chartCanvas = document.getElementById('chart-canvas')
  createChart(chartCanvas, rows, sampleCount)
  const chartAndControls = document.getElementById('spectra-chart-and-controls')
  chartAndControls.style.display = 'none'
  const chartActions = document.createElement('div')
  chartActions.append(
    createToggleButton(chartAndControls, 'false', 'Toggle chart')
  )
  chart.getElementsByClassName('heading-and-actions')[0].append(chartActions)
}

const renderSpectra = (rows, sampleCount) => {
  const spectra = document.getElementById('spectra')
  const spectrumTable = document.getElementById('spectrum-table')
  createSpectraTable(spectrumTable, rows, sampleCount)
  spectrumTable.style.display = 'none'
  const spectraActions = document.createElement('div')
  spectraActions.append(
    downloadCSVButton(spectrumTable, "download-spectrum"),
    createToggleButton(spectrumTable, 'false', 'Toggle table'),
    createNotationToggle(spectrumTable, 'scientific', 10)
  )
  spectra.getElementsByClassName('heading-and-actions')[0].append(spectraActions)
}

export const createResults = (rawRows, sampleCount, areaScale, powerScale, simplifiedReport) => {
  const unitConversion = conversionFunction(areaScale, powerScale)
  const rows = mapSamples(rawRows, unitConversion)
  const interpolatedRows = interpolateData(rows, sampleCount)

  renderCalculations(interpolatedRows, sampleCount, simplifiedReport)
  renderChart(rows, sampleCount)
  renderSpectra(rows, sampleCount)
}

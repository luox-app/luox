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
  const container = document.getElementById('calculations')
  const table = document.getElementById('calculation-table')
  createCalculationTable(table, interpolatedRows, sampleCount, simplifiedReport)
  const actions = document.createElement('div')
  actions.append(
    downloadCSVButton(table, "download-calc"),
    createToggleButton(table, 'true', 'Toggle table'),
    createNotationToggle(table, 'decimal', 2)
  )
  container.getElementsByClassName('heading-and-actions')[0].append(actions)
}

const renderChart = (rows, sampleCount) => {
  const container = document.getElementById('chart')
  const canvas = document.getElementById('chart-canvas')
  createChart(canvas, rows, sampleCount)
  const chartAndControls = document.getElementById('spectra-chart-and-controls')
  chartAndControls.style.display = 'none'
  const actions = document.createElement('div')
  actions.append(
    createToggleButton(chartAndControls, 'false', 'Toggle chart')
  )
  container.getElementsByClassName('heading-and-actions')[0].append(actions)
}

const renderSpectra = (rows, sampleCount) => {
  const container = document.getElementById('spectra')
  const table = document.getElementById('spectrum-table')
  createSpectraTable(table, rows, sampleCount)
  table.style.display = 'none'
  const actions = document.createElement('div')
  actions.append(
    downloadCSVButton(table, "download-spectrum"),
    createToggleButton(table, 'false', 'Toggle table'),
    createNotationToggle(table, 'scientific', 10)
  )
  container.getElementsByClassName('heading-and-actions')[0].append(actions)
}

export const createResults = (rawRows, sampleCount, areaScale, powerScale, simplifiedReport) => {
  const unitConversion = conversionFunction(areaScale, powerScale)
  const rows = mapSamples(rawRows, unitConversion)
  const interpolatedRows = interpolateData(rows, sampleCount)

  renderCalculations(interpolatedRows, sampleCount, simplifiedReport)
  renderChart(rows, sampleCount)
  renderSpectra(rows, sampleCount)
}

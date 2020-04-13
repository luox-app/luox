import {parseCSV} from './csvParser.js'
import {createResults} from './ui.js'

const encodedCSV = window.sessionStorage.getItem('csv')
const csv = decodeURIComponent(atob(encodedCSV))
const areaScale = parseFloat(window.sessionStorage.getItem('areaScale'))
const powerScale = parseFloat(window.sessionStorage.getItem('powerScale'))

const fileUploadedSection =  document.getElementById('file-uploaded')
const resultsSection = document.getElementById('results')

let simplifiedReport = true
if (document.location.pathname.endsWith('explore-results.html')) {
  simplifiedReport = false
}

// eslint-disable-next-line no-unused-vars
const [errors, rawRows, sampleCount] = parseCSV(csv)
const spectrumTable = document.getElementById('spectrum-table')
const calculationTable = document.getElementById('calculation-table')
const footerButtons = document.getElementById('table-actions')
const chartCanvas = document.getElementById('chart-canvas')
createResults(rawRows, sampleCount, spectrumTable, calculationTable, areaScale, powerScale, footerButtons, chartCanvas, simplifiedReport)
resultsSection.style.display = 'block';
fileUploadedSection.style.display = 'block';

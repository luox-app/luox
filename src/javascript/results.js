import '../stylesheets/results.css'
import {parseCSV} from './csvParser.js'
import {mapSamples, interpolateData} from './rows.js'
import {renderResults} from './results-ui.js'

const encodedCSV = window.sessionStorage.getItem('csv')
const csv = decodeURIComponent(atob(encodedCSV))
const areaScale = parseFloat(window.sessionStorage.getItem('areaScale'))
const powerScale = parseFloat(window.sessionStorage.getItem('powerScale'))

let simplifiedReport = true
if (document.location.pathname.endsWith('explore-results.html')) {
  simplifiedReport = false
}

// eslint-disable-next-line no-unused-vars
const [errors, rawRows, sampleCount] = parseCSV(csv)
const rows = mapSamples(rawRows, (wavelength, sample) => sample / areaScale * powerScale)
const interpolatedRows = interpolateData(rows, sampleCount)

renderResults(rows, interpolatedRows, sampleCount, simplifiedReport)

import {readCSV, encodeCSV, parseCSV} from './csvParser.js'
import {createResults, createErrorTable} from './ui.js'

const fileInput = document.getElementById('file-input')
const uploadForm = document.getElementById('upload-form')

const handleFileSelect = () => {
  const fileList = fileInput.files
  const fileButton = document.getElementById('upload-form-submit')
  fileButton.disabled = fileList.length === 0
}

const handleSubmit = async (event) => {
  event.preventDefault();

  const errorsSection = document.getElementById('errors')

  const areaUnitSelect = document.getElementById('area-units')
  const powerUnitSelect = document.getElementById('power-units')
  const areaScale = parseFloat(areaUnitSelect.options[areaUnitSelect.selectedIndex].value)
  const powerScale = parseFloat(powerUnitSelect.options[powerUnitSelect.selectedIndex].value)

  const fileList = fileInput.files
  for (const file of fileList) {
    const data = await readCSV(file)
    // eslint-disable-next-line no-unused-vars
    const [errors, rawRows, sampleCount] = parseCSV(data)

    if (errors.length === 0) {
      const encodedCSV = encodeCSV(data)
      window.sessionStorage.setItem('csv', encodedCSV)
      window.sessionStorage.setItem('areaScale', areaScale)
      window.sessionStorage.setItem('powerScale', powerScale)
      if (document.location.pathname.endsWith('/upload-csv.html')) {
        document.location.assign('results.html')
      } else {
        document.location.assign('explore-results.html')
      }
    } else {
      const [errorsTable] = errorsSection.getElementsByClassName('errors')
      createErrorTable(errors, errorsTable)
      errorsSection.style.display = 'block';
    }
  }
}

if (fileInput) {
  fileInput.addEventListener("change", handleFileSelect, false);
}
if (uploadForm) {
  uploadForm.addEventListener("submit", handleSubmit, false);
}

if (document.location.pathname.endsWith('results.html')) {
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
}

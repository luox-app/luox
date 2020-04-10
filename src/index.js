import {readCSV, encodeCSV, parseCSV} from './csvParser.js'
import {createTables, createErrorTable} from './ui.js'

const fileInput = document.getElementById('file-input')
const uploadForm = document.getElementById('upload-form')

const handleFileSelect = () => {
  const fileList = fileInput.files
  const fileButton = document.getElementById('upload-form-submit')
  fileButton.disabled = fileList.length === 0
}

const handleSubmit = async (event) => {
  event.preventDefault();

  const fileUploadedSection =  document.getElementById('file-uploaded')
  const fileUploadSection = document.getElementById('file-upload')
  const resultsSection = document.getElementById('results')
  const errorsSection = document.getElementById('errors')

  const areaUnitSelect = document.getElementById('area-units')
  const powerUnitSelect = document.getElementById('power-units')
  const areaScale = parseFloat(areaUnitSelect.options[areaUnitSelect.selectedIndex].value)
  const powerScale = parseFloat(powerUnitSelect.options[powerUnitSelect.selectedIndex].value)

  const fileList = fileInput.files
  for (const file of fileList) {
    const data = await readCSV(file)
    if (document.location.pathname.endsWith('/upload-csv.html')) {
      const encodedCSV = encodeCSV(data)
      window.sessionStorage.setItem('csv', encodedCSV)
      window.sessionStorage.setItem('areaScale', areaScale)
      window.sessionStorage.setItem('powerScale', powerScale)
      document.location.assign('results.html')
    } else {
      const [errors, rawRows, sampleCount] = parseCSV(data)
      if (errors.length === 0) {
        const spectrumTable = document.getElementById('spectrum-table')
        const calculationTable = document.getElementById('calculation-table')
        const footerButtons = document.getElementById('table-actions')
        const chartCanvas = document.getElementById('chart-canvas')
        createTables(rawRows, sampleCount, spectrumTable, calculationTable, areaScale, powerScale, footerButtons, chartCanvas, false)
        resultsSection.style.display = 'block';
      } else {
        const [errorsTable] = errorsSection.getElementsByClassName('errors')
        createErrorTable(errors, errorsTable)
        errorsSection.style.display = 'block';
      }
      fileUploadSection.style.display = 'none';
      fileUploadedSection.style.display = 'block';
    }
  }
}

if (fileInput) {
  fileInput.addEventListener("change", handleFileSelect, false);
}
if (uploadForm) {
  uploadForm.addEventListener("submit", handleSubmit, false);
}

if (document.location.pathname.endsWith('/results.html')) {
  const encodedCSV = window.sessionStorage.getItem('csv')
  const csv = decodeURIComponent(atob(encodedCSV))
  const areaScale = parseFloat(window.sessionStorage.getItem('areaScale'))
  const powerScale = parseFloat(window.sessionStorage.getItem('powerScale'))

  const fileUploadedSection =  document.getElementById('file-uploaded')
  const resultsSection = document.getElementById('results')
  const errorsSection = document.getElementById('errors')

  const [errors, rawRows, sampleCount] = parseCSV(csv)
  if (errors.length === 0) {
    const spectrumTable = document.getElementById('spectrum-table')
    const calculationTable = document.getElementById('calculation-table')
    const footerButtons = document.getElementById('table-actions')
    const chartCanvas = document.getElementById('chart-canvas')
    createTables(rawRows, sampleCount, spectrumTable, calculationTable, areaScale, powerScale, footerButtons, chartCanvas, true)
    resultsSection.style.display = 'block';
    fileUploadedSection.style.display = 'block';
  } else {
    const [errorsTable] = errorsSection.getElementsByClassName('errors')
    createErrorTable(errors, errorsTable)
    errorsSection.style.display = 'block';
  }
}

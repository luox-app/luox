import {createTables} from './ui.js'
import Papa from 'papaparse'

const parseCSV = async (file) => {
  const fileContents = await file.text()
  const result = Papa.parse(fileContents,
    {"dynamicTyping": true,
    "header": false})
  const {data, errors} = result;

  const fieldCount = data[0].length
  const rows = data.filter(([wavelength]) =>
    wavelength >= 380 && wavelength <= 780
  )
  return [errors, rows, fieldCount -1]
}

const fileInput = document.getElementById('file-input')
const fileButton = document.getElementById('upload-form-submit')
const uploadForm = document.getElementById('upload-form')
const fileUploadSection = document.getElementById('file-upload')
const fileUploadedSection =  document.getElementById('file-uploaded')

const conversionFunction = (areaSelect, powerSelect) => {
  const areaScale = parseFloat(areaSelect.options[areaSelect.selectedIndex].value)
  const powerScale = parseFloat(powerSelect.options[powerSelect.selectedIndex].value)
  return (wavelength, sample) =>  sample / powerScale * areaScale
}

const handleFileSelect = () => {
  const fileList = fileInput.files
  fileButton.disabled = fileList.length === 0
}

const createErrorTable = (errors) => {
  const header = document.createElement('p')
  const textNode = document.createTextNode('We had some problems understanding that file:')
  header.appendChild(textNode)
  fileUploadedSection.appendChild(header)
  const table = document.createElement('table')
  table.setAttribute('class', 'errors')
  table.setAttribute('class', 'table')

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

    table.appendChild(row)
  }
  fileUploadedSection.appendChild(table)
}

const handleSubmit = async (event) => {
  event.preventDefault();

  const fileList = fileInput.files
  for (const file of fileList) {
    const [errors, rawRows, sampleCount] = await parseCSV(file)
    if (errors.length === 0) {
      const spectrumTable = document.getElementById('spectrum-table')
      const calculationTable = document.getElementById('calculation-table')
      const areaUnitSelect = document.getElementById('area-units')
      const powerUnitSelect = document.getElementById('power-units')
      const footerButtons = document.getElementById('table-actions')
      const unitConversion = conversionFunction(areaUnitSelect, powerUnitSelect)
      createTables(rawRows, sampleCount, spectrumTable, calculationTable, unitConversion, footerButtons)
    } else {
      createErrorTable(errors)
    }
    fileUploadSection.style.display = 'none';
    fileUploadedSection.style.display = 'block';
  }
}

fileInput.addEventListener("change", handleFileSelect, false);
uploadForm.addEventListener("submit", handleSubmit, false);

import {readCSV, encodeCSV, parseCSV} from './csvParser.js'
import {createErrorTable} from './ui.js'

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

fileInput.addEventListener("change", handleFileSelect, false);
uploadForm.addEventListener("submit", handleSubmit, false);

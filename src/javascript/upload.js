import '../stylesheets/upload.css'
import {readCSV, encodeCSV, parseCSV} from './csvParser.js'

const fileInput = document.getElementById('file-input')
const uploadForm = document.getElementById('upload-form')
const radianceOrIrradianceInput = document.getElementById('radiance-or-irradiance')
const perSrSuffix = document.getElementById('per-sr')

const handleFileSelect = () => {
  const fileList = fileInput.files
  const fileButton = document.getElementById('upload-form-submit')
  fileButton.disabled = fileList.length === 0
}

const createErrorTable = (errors, errorsTable) => {
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

const handleSubmit = async (event) => {
  event.preventDefault();

  const errorsSection = document.getElementById('errors')

  const radianceOrIrradianceSelect = document.getElementById('radiance-or-irradiance')
  const areaUnitSelect = document.getElementById('area-units')
  const powerUnitSelect = document.getElementById('power-units')
  const radianceOrIrradiance = radianceOrIrradianceSelect.options[radianceOrIrradianceSelect.selectedIndex].value
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
      window.sessionStorage.setItem('radianceOrIrradiance', radianceOrIrradiance)
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

radianceOrIrradianceInput.addEventListener('change', (event) => {
  if (event.target.options[event.target.selectedIndex].value === 'radiance') {
    perSrSuffix.style.display = ''
  } else {
    perSrSuffix.style.display = 'none'
  }
}, false)

perSrSuffix.style.display = 'none'
fileInput.addEventListener("change", handleFileSelect, false);
uploadForm.addEventListener("submit", handleSubmit, false);

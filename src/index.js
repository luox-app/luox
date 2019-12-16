import VL1924 from './vl1924.json'
import CIES026 from './cies026.json'
import {downloadCSVButton} from './csvExport.js'

const asExponential = (number) => number.toExponential(2)
const asDecimal = (number) => number.toFixed(2)

const appendCells = (table, cellType, cells) => {
  const row = document.createElement("tr")
  const domCells = cells.map((cellText) =>  {
    const cell = document.createElement(cellType)
    const text = document.createTextNode(cellText)
    cell.appendChild(text)
    return cell
  })
  for (const cell of domCells) {
    row.appendChild(cell)
  }
  table.appendChild(row)
  return domCells
}

const createSampleTableHeader = (table, sampleCount) => {
  const titles = ["Wavelength [nm]", "Spectral irradiance [W/(m² nm)]"]
  const cells = appendCells(table, "th", titles)
  cells[1].setAttribute("colspan", sampleCount)
}

const createTableHeader = (table, sampleCount) => {
  const sampleTitles = new Array(sampleCount).fill("").map((_, index) => "S"+index)
  const titles = ["Condition", ...sampleTitles]
  appendCells(table, "th", titles)
}

const createTableRow = (table, wavelength, samples, formatter) => {
  const formattedSamples = samples.map(formatter)
  appendCells(table, "td", [wavelength, ...formattedSamples])
}

const parseCSV = async (file) => {
  const fileContents = await file.text()
  const lines = fileContents.match(/[^\r\n]+/g)
  const fieldCount = lines[0].split(",").length
  const rows = lines.map((line) =>
    line.split(",").map(parseFloat)
  ).filter(([wavelength]) =>
    wavelength >= 380 && wavelength <= 780
  )
  return [rows, fieldCount -1]
}

const mapSamples = (rows, func) => {
  return rows.map((row) => {
    const [wavelength, ...samples] = row
    const mapped = samples.map((sample) =>
      func(wavelength, sample)
    )
    return [wavelength, ...mapped]
  })
}

const reduceSamples = (rows, sampleCount, func) => {
  return rows.reduce((acc, row) => {
    const [wavelength, ...samples] = row
    return acc.map((luminance, index) =>
      func(wavelength, luminance, samples[index])
    )},
    new Array(sampleCount).fill(0)
  )
}

const integrateWithWeights = (rows, sampleCount, data, key) => {
  const weighted = mapSamples(rows, (wavelength, sample) => {
    const weight = data[wavelength][key]
    return sample * weight
  })

  return reduceSamples(weighted, sampleCount,
    (w, runningTotal, sample) => runningTotal + sample
  )
}

const calculateLuminance = (rows, sampleCount) => {
  const key = 'vl1924'
  const samplesInWatts = integrateWithWeights(rows, sampleCount, VL1924, key)
  return samplesInWatts.map((sample) => sample * 683)
}

const calculateIrradiance = (rows, sampleCount, key) => {
  const samplesInWatts = integrateWithWeights(rows, sampleCount, CIES026, key)
  return samplesInWatts.map((sample) => sample * 1000)
}

const areaUnitSelect = document.getElementById('area-units')
const powerUnitSelect = document.getElementById('power-units')
const fileInput = document.getElementById('file-input')
const fileButton = document.getElementById('upload-form-submit')
const uploadForm = document.getElementById('upload-form')
const spectrumTable = document.getElementById('spectrum-table')
const calculationTable = document.getElementById('calculation-table')
const footerButtons = document.getElementById('table-actions')

const conversionFunction = (areaSelect, powerSelect) => {
  const areaScale = parseFloat(areaSelect.options[areaSelect.selectedIndex].value)
  const powerScale = parseFloat(powerSelect.options[powerSelect.selectedIndex].value)
  return (wavelength, sample) =>  sample / powerScale * areaScale
}

const handleFileSelect = () => {
  const fileList = fileInput.files
  console.log(fileList)
  fileButton.disabled = fileList.length === 0
}

const handleSubmit = async (event) => {
  event.preventDefault();

  const fileList = fileInput.files
  for (const file of fileList) {
    const [rawRows, sampleCount] = await parseCSV(file)
    const unitConversion = conversionFunction(areaUnitSelect, powerUnitSelect)
    const rows = mapSamples(rawRows, unitConversion)

    createTableHeader(calculationTable, sampleCount)

    const luminanceTotals = calculateLuminance(rows, sampleCount)
    const sConeTotals = calculateIrradiance(rows, sampleCount, 'sCone')
    const mConeTotals = calculateIrradiance(rows, sampleCount, 'mCone')
    const lConeTotals = calculateIrradiance(rows, sampleCount, 'lCone')
    const rodTotals = calculateIrradiance(rows, sampleCount, 'rod')
    const melTotals = calculateIrradiance(rows, sampleCount, 'mel')
    createTableRow(calculationTable, "Illuminance [lux]", luminanceTotals, asDecimal)
    createTableRow(calculationTable, "S-cone-opic irradiance (mW/m²)", sConeTotals, asDecimal)
    createTableRow(calculationTable, "M-cone-opic irradiance (mW/m²)", mConeTotals, asDecimal)
    createTableRow(calculationTable, "L-cone-opic irradiance (mW/m²)", lConeTotals, asDecimal)
    createTableRow(calculationTable, "Rhodopic irradiance (mW/m²)", rodTotals, asDecimal)
    createTableRow(calculationTable, "Melanopic irradiance (mW/m²)", melTotals, asDecimal)

    createSampleTableHeader(spectrumTable, sampleCount)
    for (const row of rows) {
      const [wavelength, ...samples] = row
      createTableRow(spectrumTable, wavelength, samples, asExponential)
    }

    const calcCSVButton = downloadCSVButton(calculationTable, "btn btn-primary", "download-calc", "Download calculation CSV")
    footerButtons.appendChild(calcCSVButton);
    const spectrumCSVButton = downloadCSVButton(spectrumTable, "btn btn-primary", "download-spectrum", "Download spectrum CSV")
    footerButtons.appendChild(spectrumCSVButton);

    document.getElementById('file-upload').style.display = 'none';
    document.getElementById('file-uploaded').style.display = 'block';
  }
}

fileInput.addEventListener("change", handleFileSelect, false);
uploadForm.addEventListener("submit", handleSubmit, false);

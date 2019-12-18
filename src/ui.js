import {mapSamples, calculateLuminance, calculateIrradiance, interpolateData} from './rows.js'
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

export const createTables = (rawRows, sampleCount, spectrumTable, calculationTable, unitConversion, footerButtons) => {
  const rows = mapSamples(rawRows, unitConversion)
  const interpolatedRows = interpolateData(rows, sampleCount)

  createTableHeader(calculationTable, sampleCount)

  const luminanceTotals = calculateLuminance(interpolatedRows, sampleCount)
  const sConeTotals = calculateIrradiance(interpolatedRows, sampleCount, 'sCone')
  const mConeTotals = calculateIrradiance(interpolatedRows, sampleCount, 'mCone')
  const lConeTotals = calculateIrradiance(interpolatedRows, sampleCount, 'lCone')
  const rodTotals = calculateIrradiance(interpolatedRows, sampleCount, 'rod')
  const melTotals = calculateIrradiance(interpolatedRows, sampleCount, 'mel')
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
}

export const createErrorTable = (errors, fileUploadedSection) => {
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

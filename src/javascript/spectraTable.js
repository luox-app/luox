import {appendCells, createTableRow} from './table.js'
import {asExponential} from './helpers.js'

const createSpectraTableHeader = (table, sampleCount) => {
  const titles = ["Wavelength [nm]", "Spectral irradiance [W/(m² nm)]"]
  const cells = appendCells(table, "th", titles)
  cells[1].setAttribute("colspan", sampleCount)
}

export const createSpectraTable = (table, rows, sampleCount) => {
  createSpectraTableHeader(table, sampleCount)
  for (const row of rows) {
    const [wavelength, ...samples] = row
    createTableRow(table, wavelength, samples, asExponential)
  }
}

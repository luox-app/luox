import {createTableHeader, createTableRow} from './table.js'
import {asExponential, radianceOrIrradianceSIUnit} from './helpers.js'

const createSpectraTableHeader = (table, radianceOrIrradiance, sampleCount) => {
  const titles = [
    "Wavelength [nm]",
    `Spectral ${radianceOrIrradiance} [${radianceOrIrradianceSIUnit(radianceOrIrradiance)}]`
  ]
  const cells = createTableHeader(table, titles)
  cells[1].setAttribute("colspan", sampleCount)
}

export const createSpectraTable = (table, radianceOrIrradiance, rows, sampleCount) => {
  createSpectraTableHeader(table, radianceOrIrradiance, sampleCount)
  for (const row of rows) {
    const [wavelength, ...samples] = row
    createTableRow(table, wavelength, samples, asExponential)
  }
}

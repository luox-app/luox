import {calculateLuminance, calculateAlphaOpic, calculateChromaticity31, calculateChromaticity64, calculateEquivalentDaylightAlphaOpic} from './rows.js'
import {createTableHeader, createTableRow} from './table.js'
import {asDecimal, sampleTitles} from './helpers.js'

const createCalculationTableHeader = (table, sampleCount) => {
  const titles = ["Condition", ...sampleTitles(sampleCount)]
  createTableHeader(table, titles)
}

/* eslint-disable max-lines-per-function */
export const createCalculationTable = (table, radianceOrIrradiance, rows, sampleCount, simplifiedReport) => {
  createCalculationTableHeader(table, sampleCount)

  let units = ''
  if (radianceOrIrradiance === 'radiance') {
    units = 'mW ⋅ m⁻² ⋅ sr'
  } else {
    units = 'mW ⋅ m⁻²'
  }

  const luminanceTotals = calculateLuminance(rows, sampleCount)
  const chromaticity31  = calculateChromaticity31(rows, sampleCount)
  const chromaticity31XValues = chromaticity31.map((c) => c.x)
  const chromaticity31YValues = chromaticity31.map((c) => c.y)
  const chromaticity64  = calculateChromaticity64(rows, sampleCount)
  const chromaticity64XValues = chromaticity64.map((c) => c.x)
  const chromaticity64YValues = chromaticity64.map((c) => c.y)
  const sConeTotals = calculateAlphaOpic(rows, sampleCount, 'sCone')
  const mConeTotals = calculateAlphaOpic(rows, sampleCount, 'mCone')
  const lConeTotals = calculateAlphaOpic(rows, sampleCount, 'lCone')
  const rodTotals = calculateAlphaOpic(rows, sampleCount, 'rod')
  const melTotals = calculateAlphaOpic(rows, sampleCount, 'mel')
  const equivalentDaylightAlphaOpic = calculateEquivalentDaylightAlphaOpic(sConeTotals, mConeTotals, lConeTotals, rodTotals, melTotals)

  if (radianceOrIrradiance === 'radiance') {
    createTableRow(table, "Luminance [cd/m²]", luminanceTotals, asDecimal)
  } else {
    createTableRow(table, "Illuminance [lux]", luminanceTotals, asDecimal)
  }
  if (!simplifiedReport) {
    createTableRow(table, "CIE 1931 xy chromaticity (x)", chromaticity31XValues, asDecimal)
    createTableRow(table, "CIE 1931 xy chromaticity (y)", chromaticity31YValues, asDecimal)
    createTableRow(table, "CIE 1964 x₁₀y₁₀ chromaticity (x₁₀)", chromaticity64XValues, asDecimal)
    createTableRow(table, "CIE 1964 x₁₀y₁₀ chromaticity (y₁₀)", chromaticity64YValues, asDecimal)
  }
  createTableRow(table, `S-cone-opic ${radianceOrIrradiance} (${units})`, sConeTotals, asDecimal)
  createTableRow(table, `M-cone-opic ${radianceOrIrradiance} (${units})`, mConeTotals, asDecimal)
  createTableRow(table, `L-cone-opic ${radianceOrIrradiance} (${units})`, lConeTotals, asDecimal)
  createTableRow(table, `Rhodopic ${radianceOrIrradiance} (${units})`, rodTotals, asDecimal)
  createTableRow(table, `Melanopic ${radianceOrIrradiance} (${units})`, melTotals, asDecimal)

  let equivalentDaylightUnit = ''
  if (radianceOrIrradiance === 'radiance') {
    equivalentDaylightUnit = "EDL [cd/m²]"
  } else {
    equivalentDaylightUnit = "EDI [lux]"
  }

  createTableRow(table, `S-cone-opic ${equivalentDaylightUnit}`, equivalentDaylightAlphaOpic.sc, asDecimal)
  createTableRow(table, `M-cone-opic ${equivalentDaylightUnit}`, equivalentDaylightAlphaOpic.mc, asDecimal)
  createTableRow(table, `L-cone-opic ${equivalentDaylightUnit}`, equivalentDaylightAlphaOpic.lc, asDecimal)
  createTableRow(table, `Rhodopic ${equivalentDaylightUnit}`, equivalentDaylightAlphaOpic.rh, asDecimal)
  createTableRow(table, `Melanopic ${equivalentDaylightUnit}`, equivalentDaylightAlphaOpic.mel, asDecimal)
}
/* eslint-enable max-lines-per-function */

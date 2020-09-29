import {
  calculateLuminance,
  calculateAlphaOpic,
  calculateChromaticity31,
  calculateChromaticity64,
  calculateEquivalentDaylightAlphaOpic,
  calculateAlphaOpicEfficiency,
  calculateColourRenderingIndices
} from './rows.js'
import {createTableHeader, createTableRow} from './table.js'
import {asDecimal, asInteger, sampleTitles} from './helpers.js'

const createCalculationTableHeader = (table, sampleCount) => {
  const titles = ["Condition", ...sampleTitles(sampleCount)]
  createTableHeader(table, titles)
}

/* eslint-disable max-lines-per-function */
export const createCalculationTable = (table, radianceOrIrradiance, rows, interpolatedRows, sampleCount, simplifiedReport) => {
  createCalculationTableHeader(table, sampleCount)

  let units = ''
  if (radianceOrIrradiance === 'radiance') {
    units = 'mW ⋅ m⁻² ⋅ sr'
  } else {
    units = 'mW ⋅ m⁻²'
  }

  const luminanceTotals = calculateLuminance(interpolatedRows, sampleCount)
  const chromaticity31  = calculateChromaticity31(interpolatedRows, sampleCount)
  const chromaticity31XValues = chromaticity31.map((c) => c.x)
  const chromaticity31YValues = chromaticity31.map((c) => c.y)
  const chromaticity64  = calculateChromaticity64(interpolatedRows, sampleCount)
  const chromaticity64XValues = chromaticity64.map((c) => c.x)
  const chromaticity64YValues = chromaticity64.map((c) => c.y)
  const sConeTotals = calculateAlphaOpic(interpolatedRows, sampleCount, 'sCone')
  const mConeTotals = calculateAlphaOpic(interpolatedRows, sampleCount, 'mCone')
  const lConeTotals = calculateAlphaOpic(interpolatedRows, sampleCount, 'lCone')
  const rodTotals = calculateAlphaOpic(interpolatedRows, sampleCount, 'rod')
  const melTotals = calculateAlphaOpic(interpolatedRows, sampleCount, 'mel')
  const equivalentDaylightAlphaOpic = calculateEquivalentDaylightAlphaOpic(sConeTotals, mConeTotals, lConeTotals, rodTotals, melTotals)
  const alphaOpicEfficiency = calculateAlphaOpicEfficiency(sConeTotals, mConeTotals, lConeTotals, rodTotals, melTotals, luminanceTotals)
  const colourRenderingIndices = calculateColourRenderingIndices(rows)

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

    if (colourRenderingIndices.length > 0) {
      createTableRow(table, "Colour rendering index (CIE Ra)", colourRenderingIndices, asInteger)
    }
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

  const alphaOpicEfficiencyUnit = 'ELR'

  createTableRow(table, `S-cone-opic ${alphaOpicEfficiencyUnit}`, alphaOpicEfficiency.sc, asDecimal)
  createTableRow(table, `M-cone-opic ${alphaOpicEfficiencyUnit}`, alphaOpicEfficiency.mc, asDecimal)
  createTableRow(table, `L-cone-opic ${alphaOpicEfficiencyUnit}`, alphaOpicEfficiency.lc, asDecimal)
  createTableRow(table, `Rhodopic ${alphaOpicEfficiencyUnit}`, alphaOpicEfficiency.rh, asDecimal)
  createTableRow(table, `Melanopic ${alphaOpicEfficiencyUnit}`, alphaOpicEfficiency.mel, asDecimal)
}
/* eslint-enable max-lines-per-function */

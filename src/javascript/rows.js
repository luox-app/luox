import VL1924 from '../data/vl1924.json'
import CIES026 from '../data/cies026.json'
import CIEXYZ31 from '../data/ciexyz31.json'
import CIEXYZ64 from '../data/ciexyz64.json'
import {sprague} from './sprague.js'

export const mapSamples = (rows, func) => {
  return rows.map((row) => {
    const [wavelength, ...samples] = row
    const mapped = samples.map((sample, sampleIndex) =>
      func(wavelength, sample, sampleIndex)
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

export const calculateLuminance = (rows, sampleCount) => {
  const key = 'vl1924'
  const samplesInWatts = integrateWithWeights(rows, sampleCount, VL1924, key)
  return samplesInWatts.map((sample) => sample * 683)
}

const calculateChromaticity = (rows, sampleCount, data) => {
  const X = integrateWithWeights(rows, sampleCount, data, 'X')
  const Y = integrateWithWeights(rows, sampleCount, data, 'Y')
  const Z = integrateWithWeights(rows, sampleCount, data, 'Z')

  const output = new Array(sampleCount)

  for (let i = 0; i < output.length; i +=1) {
    const x = X[i] / (X[i] + Y[i] + Z[i])
    const y = Y[i] / (X[i] + Y[i] + Z[i])

    output[i] = {
      x,
      y
    }
  }

  return output
}

export const calculateChromaticity31 = (rows, sampleCount) => {
  return calculateChromaticity(rows, sampleCount, CIEXYZ31)
}

export const calculateChromaticity64 = (rows, sampleCount) => {
  return calculateChromaticity(rows, sampleCount, CIEXYZ64)
}

export const calculateAlphaOpic = (rows, sampleCount, key) => {
  const samplesInWatts = integrateWithWeights(rows, sampleCount, CIES026, key)
  return samplesInWatts.map((sample) => sample * 1000)
}

export const calculateEquivalentDaylightAlphaOpic = (sConeTotals, mConeTotals, lConeTotals, rodTotals, melTotals) => {
  return {
    'lc': lConeTotals.map((s) => s / 1.6289),
    'mc': mConeTotals.map((s) => s / 1.4558),
    'mel': melTotals.map((s) => s / 1.3262),
    'rh': rodTotals.map((s) => s / 1.4497),
    'sc': sConeTotals.map((s) => s / 0.8173)
  }
}

export const calculateAlphaOpicEfficiency = (sConeTotals, mConeTotals, lConeTotals, rodTotals, melTotals, luminanceTotals) => {
  return {
    'lc': lConeTotals.map((s, idx) => s / luminanceTotals[idx]),
    'mc': mConeTotals.map((s, idx) => s / luminanceTotals[idx]),
    'mel': melTotals.map((s, idx) => s / luminanceTotals[idx]),
    'rh': rodTotals.map((s, idx) => s / luminanceTotals[idx]),
    'sc': sConeTotals.map((s, idx) => s / luminanceTotals[idx])
  }
}

export const interpolateData = (rows, sampleCount) => {
  const shortestWavelength = rows[0][0] // eslint-disable-line prefer-destructuring
  const longestWavelength = rows[rows.length - 1][0] // eslint-disable-line prefer-destructuring
  const wavelengthInterval = rows[1][0] - rows[0][0]
  const interpolatedRows = []
  for (let wavelength = shortestWavelength; wavelength <= longestWavelength; wavelength += 1) {
    interpolatedRows[wavelength - shortestWavelength] = [wavelength]
  }
  for (let locationIdx = 1; locationIdx <= sampleCount; locationIdx += 1) {
    const locationIrradiances = rows.map((row) => row[locationIdx])
    const interpolatedIrradiances = sprague(locationIrradiances, wavelengthInterval)
    for (let wavelengthIdx = 0; wavelengthIdx < interpolatedRows.length; wavelengthIdx += 1) {
      interpolatedRows[wavelengthIdx][locationIdx] = interpolatedIrradiances[wavelengthIdx]
    }
  }
  return interpolatedRows
}

export const scaleSamples = (rows, areaScale, powerScale) =>
  mapSamples(rows, (wavelength, sample) => sample / areaScale / powerScale)

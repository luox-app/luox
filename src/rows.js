import VL1924 from './vl1924.json'
import CIES026 from './cies026.json'
import CIEXYZ31 from './ciexyz31.json'
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

export const calculateIrradiance = (rows, sampleCount, key) => {
  const samplesInWatts = integrateWithWeights(rows, sampleCount, CIES026, key)
  return samplesInWatts.map((sample) => sample * 1000)
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

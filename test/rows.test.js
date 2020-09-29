import {
  calculateEquivalentDaylightAlphaOpic,
  calculateAlphaOpicEfficiency,
  scaleSamples,
  calculateColourRenderingIndices
} from './../src/javascript/rows.js'
import _ from 'lodash'
import {assert} from 'chai'

describe('calculateEquivalentDaylightAlphaOpic', () => {
  it('calculates the EDI/EDL', () => {
    const sConeTotals = [1.6257]
    const mConeTotals = [133.0005]
    const lConeTotals = [314.7398]
    const rodTotals = [79.3008]
    const melTotals = [52.3937]
    const output = calculateEquivalentDaylightAlphaOpic(sConeTotals, mConeTotals, lConeTotals, rodTotals, melTotals)

    assert.equal(1.99, output.sc[0].toFixed(2))
    assert.equal(91.36, output.mc[0].toFixed(2))
    assert.equal(193.22, output.lc[0].toFixed(2))
    assert.equal(54.70, output.rh[0].toFixed(2))
    assert.equal(39.51, output.mel[0].toFixed(2))
  });
});

describe('calculateEquivalentDaylightAlphaOpic', () => {
  it('calculates the EDI/EDL', () => {
    const sConeTotals = [1.6257]
    const mConeTotals = [133.0005]
    const lConeTotals = [314.7398]
    const rodTotals = [79.3008]
    const melTotals = [52.3937]
    const luminanceTotals = [173.9703]
    const output = calculateAlphaOpicEfficiency(sConeTotals, mConeTotals, lConeTotals, rodTotals, melTotals, luminanceTotals)

    assert.equal(0.01, output.sc[0].toFixed(2))
    assert.equal(0.76, output.mc[0].toFixed(2))
    assert.equal(1.81, output.lc[0].toFixed(2))
    assert.equal(0.46, output.rh[0].toFixed(2))
    assert.equal(0.30, output.mel[0].toFixed(2))
  });
});

describe('scaleSamples', () => {
  it('scales the input samples by the powerScale', () => {
    const rows = [[380, 1]]
    const areaScale = 1
    const powerScale = 1000
    assert.deepEqual([[380, 0.001]], scaleSamples(rows, areaScale, powerScale))
  })

  it('scales the input samples by the areaScale', () => {
    const rows = [[380, 1]]
    const areaScale = 10000
    const powerScale = 1
    assert.deepEqual([[380, 0.0001]], scaleSamples(rows, areaScale, powerScale))
  })
})

describe('calculateColourRenderingIndices', () => {
  it('returns an empty array if given samples not at 5nm intervals', () => {
    const rows = _.range(380, 781, 1).map((wavelength) => [wavelength, 1])

    assert.isEmpty(calculateColourRenderingIndices(rows))
  })

  it('returns an empty array if given samples at irregular intervals', () => {
    const rows = [
      [380, 1],
      [383, 1],
      [384, 1],
      [400, 1]
    ]

    assert.isEmpty(calculateColourRenderingIndices(rows))
  });

  it('returns the colour rendering indices for each sample', () => {
    const rows = _.range(380, 781, 5).map((wavelength) => [wavelength, 0.1, 0.2, 0.3])

    assert.deepEqual(calculateColourRenderingIndices(rows), [95.28417222077219, 95.28417222077219, 95.28417222077225])
  })
});

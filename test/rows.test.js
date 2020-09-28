var { calculateEquivalentDaylightAlphaOpic, calculateAlphaOpicEfficiency, scaleSamples } = require('./../src/javascript/rows.js')
var assert = require('chai').assert;

describe('calculateEquivalentDaylightAlphaOpic', function() {
  it('calculates the EDI/EDL', function() {
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

describe('calculateEquivalentDaylightAlphaOpic', function() {
  it('calculates the EDI/EDL', function() {
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

describe('scaleSamples', function() {
  it('scales the input samples by the powerScale', function() {
    const rows = [[380, 1]]
    const areaScale = 1
    const powerScale = 1000
    assert.deepEqual([[380, 0.001]], scaleSamples(rows, areaScale, powerScale))
  })

  it('scales the input samples by the areaScale', function() {
    const rows = [[380, 1]]
    const areaScale = 10000
    const powerScale = 1
    assert.deepEqual([[380, 0.0001]], scaleSamples(rows, areaScale, powerScale))
  })
})

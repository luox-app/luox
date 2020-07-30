var { calculateEquivalentDaylightAlphaOpic } = require('./../src/javascript/rows.js')
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

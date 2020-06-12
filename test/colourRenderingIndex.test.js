var { cie1960UCS, correlatedColourTemperature } = require('./../src/javascript/colourRenderingIndex.js')
var assert = require('assert')

describe('cie1960UCS', function() {
  it('calculates u from the chromaticity', function() {
    const ucs = cie1960UCS(0.3721, 0.3751)
    assert.equal(ucs.u.toFixed(3), 0.220)
  });

  it('calculates v from the chromaticity', function() {
    const ucs = cie1960UCS(0.3721, 0.3751)
    assert.equal(ucs.v.toFixed(3), 0.333)
  });
});

describe('correlatedColourTemperature', function() {
  it('calculates CCT using the McCarmy approximation', function() {
    const cct = correlatedColourTemperature(0.3721, 0.3751)
    assert.equal(cct.toFixed(1), 4228.8)
  });
});

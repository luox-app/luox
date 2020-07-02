var { cie1960UCS, correlatedColourTemperature, blackBodyReferenceSpectra, daylightIlluminantChromaticity, daylightReferenceSpectra, uvToCorrelatedColourTemperatureRobertson } = require('./../src/javascript/colourRenderingIndex.js')
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

describe('uvToCorrelatedColourTemperatureRobertson', function() {
  it('calculates CCT from u,v using the Robertson method', function() {
    const cct = uvToCorrelatedColourTemperatureRobertson(0.193741375998230, 0.315221043940594)
    assert.equal(cct.toFixed(3), 6500.016)
  });
});

describe('blackBodyReferenceSpectra', function() {
  it('calculates the blackbody reference spectra at temperature T', function() {
    const temperature = 4224.4;
    // Test data from Hunt and Pointer (2011), Appendix 7
    assert.equal(1.112, blackBodyReferenceSpectra(700e-9, temperature).toFixed(3))
    assert.equal(0.848, blackBodyReferenceSpectra(500e-9, temperature).toFixed(3))
    assert.equal(0.674, blackBodyReferenceSpectra(450e-9, temperature).toFixed(3))
  });
});

describe('daylightIlluminantChromaticity', function() {
  it('calculates the x chromaticity of the daylight illuminant', function() {
    assert.equal(0.3457, daylightIlluminantChromaticity(5000).x.toFixed(4))
    assert.equal(0.2938, daylightIlluminantChromaticity(8000).x.toFixed(4))
  });
  it('calculates the y chromaticity of the daylight illuminant', function() {
    assert.equal(0.3587, daylightIlluminantChromaticity(5000).y.toFixed(4))
    assert.equal(0.3092, daylightIlluminantChromaticity(8000).y.toFixed(4))
  });
});

describe('daylightReferenceSpectra', function() {
  it('returns the daylight reference spectra at the given wavelength and temperature', function() {
    // Test data from CIE 015:2018 (§4.1.2 Note 6 and Table 5)
    const t_d50 = 5000 * (1.4388 / 1.4380)
    assert.equal(27.179, daylightReferenceSpectra(385, t_d50).toFixed(3));
    assert.equal(100.755, daylightReferenceSpectra(540, t_d50).toFixed(3));

    const t_d75 = 7500 * (1.4388 / 1.4380)
    assert.equal(68.333, daylightReferenceSpectra(385, t_d75).toFixed(3));
    assert.equal(106.289, daylightReferenceSpectra(540, t_d75).toFixed(3));
  })
});

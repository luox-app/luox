var { cie1960UCS, correlatedColourTemperature, blackBodyReferenceSpectra, daylightIlluminantChromaticity, daylightReferenceSpectra, uvToCorrelatedColourTemperatureRobertson, testColourColorimetry, adaptiveColourShift } = require('./../src/javascript/colourRenderingIndex.js')
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

describe('testColourColorimetry', function() {
  it('returns the chromaticity for each of the test colours', function() {
    let referenceSpectra = []
    let lambda;
    for (lambda = 380; lambda <= 780; lambda += 5) {
      referenceSpectra.push([lambda, blackBodyReferenceSpectra(lambda * 1e-9, 4224.4)]);
    }

    let testColour1 = testColourColorimetry(referenceSpectra)[0];
    assert.equal(0.4395, testColour1.x.toFixed(4));
    assert.equal(0.3725, testColour1.y.toFixed(4));

    let testColour8 = testColourColorimetry(referenceSpectra)[7];
    assert.equal(0.3992, testColour8.x.toFixed(4));
    assert.equal(0.3177, testColour8.y.toFixed(4));
  });
});

describe('adaptiveColourShift', function() {
  it('returns uPrime and vPrime calculated for each test colour', function() {
    let testSpectra = [
      [380, 1.18], [385, 1.48], [390, 1.84], [395, 2.15],
      [400, 3.44], [405, 15.69], [410, 3.85], [415, 3.74],
      [420, 4.19], [425, 4.62], [430, 5.06], [435, 34.98],
      [440, 11.81], [445, 6.27], [450, 6.63], [455, 6.93],
      [460, 7.19], [465, 7.40], [470, 7.54], [475, 7.62],
      [480, 7.65], [485, 7.62], [490, 7.62], [495, 7.45],
      [500, 7.28], [505, 7.15], [510, 7.05], [515, 7.04],
      [520, 7.16], [525, 7.47], [530, 8.04], [535, 8.88],
      [540, 10.01], [545, 24.88], [550, 16.64], [555, 14.59],
      [560, 16.16], [565, 17.56], [570, 18.62], [575, 21.47],
      [580, 22.79], [585, 19.29], [590, 18.66], [595, 17.73],
      [600, 16.54], [605, 15.21], [610, 13.80], [615, 12.36],
      [620, 10.95], [625, 9.65], [630, 8.40], [635, 7.32],
      [640, 6.31], [645, 5.43], [650, 4.68], [655, 4.02],
      [660, 3.45], [665, 2.96], [670, 2.55], [675, 2.19],
      [680, 1.89], [685, 1.64], [690, 1.53], [695, 1.27],
      [700, 1.10], [705, 0.99], [710, 0.88], [715, 0.76],
      [720, 0.68], [725, 0.61], [730, 0.56], [735, 0.54],
      [740, 0.51], [745, 0.47], [750, 0.47], [755, 0.43],
      [760, 0.46], [765, 0.47], [770, 0.40], [775, 0.33],
      [780, 0.27]
    ];

    let referenceSpectra = []
    let lambda;
    for (lambda = 380; lambda <= 780; lambda += 5) {
      referenceSpectra.push([lambda, blackBodyReferenceSpectra(lambda * 1e-9, 4224.09)]);
    }

    let adaptiveShift1 = adaptiveColourShift(referenceSpectra, testSpectra)[0];
    assert.equal(0.2547, adaptiveShift1.uPrime.toFixed(4));
    assert.equal(0.3401, adaptiveShift1.vPrime.toFixed(4));

    let adaptiveShift8 = adaptiveColourShift(referenceSpectra, testSpectra)[7];
    assert.equal(0.2487, adaptiveShift8.uPrime.toFixed(4));
    assert.equal(0.3134, adaptiveShift8.vPrime.toFixed(4));
  });
});

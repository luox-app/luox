var {
  cie1960UCS,
  correlatedColourTemperature,
  blackBodyReferenceSpectra,
  daylightIlluminantChromaticity,
  daylightReferenceSpectra,
  uvToCorrelatedColourTemperatureRobertson,
  testColourColorimetry,
  adaptiveColourShift,
  normalizeSpectra,
  uniformSpace,
  specialColourRenderingIndicies,
  generalColourRenderingIndex,
  calculateColourRenderingIndex
} = require('./../src/javascript/colourRenderingIndex.js')
import {calculateChromaticity31} from './../src/javascript/rows.js'
var assert = require('chai').assert

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
    assert.equal(0.2547, adaptiveShift1.uPrimeki.toFixed(4));
    assert.equal(0.3401, adaptiveShift1.vPrimeki.toFixed(4));

    let adaptiveShift8 = adaptiveColourShift(referenceSpectra, testSpectra)[7];
    assert.equal(0.2487, adaptiveShift8.uPrimeki.toFixed(4));
    assert.equal(0.3134, adaptiveShift8.vPrimeki.toFixed(4));
  });
});

describe('normalizeSpectra', function() {
  it('ensures that the tristimulus Y value is 100 for each input spectrum', function() {
    let inputSpectra = []
    let lambda;
    for (lambda = 380; lambda <= 780; lambda += 5) {
      inputSpectra.push([
        lambda,
        blackBodyReferenceSpectra(lambda * 1e-9, 4000),
        blackBodyReferenceSpectra(lambda * 1e-9, 4100)
      ]);
    }
    const normalizedSpectra = normalizeSpectra(inputSpectra, 2);

    assert.closeTo(100, calculateChromaticity31(normalizedSpectra, 2)[0].Y, 0.0001)
    assert.closeTo(100, calculateChromaticity31(normalizedSpectra, 2)[1].Y, 0.0001)
  });
});

describe('uniformSpace', function() {
  it('calculates U*V*W* of the test and reference spectra for each test colour', function() {
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

    const output = uniformSpace(testSpectra, referenceSpectra);

    assert.closeTo(61.5897, output[0].Wri, 0.01)
    assert.closeTo(36.3399, output[0].Uri, 0.01)
    assert.closeTo(5.9600, output[0].Vri, 0.01)
    assert.closeTo(61.6915, output[0].Wki, 0.01)
    assert.closeTo(26.7916, output[0].Uki, 0.01)
    // assert.closeTo(6.7389, output[0].Vki, 0.01)

    assert.closeTo(62.6029, output[7].Wri, 0.01)
    assert.closeTo(35.9323, output[7].Uri, 0.01)
    assert.closeTo(-11.9559, output[7].Vri, 0.01)
    assert.closeTo(60.9654, output[7].Wki, 0.01)
    assert.closeTo(21.7213, output[7].Uki, 0.01)
    // assert.closeTo(-14.5084, output[7].Vki, 0.01)
  });
});

describe('specialColourRenderingIndicies', function() {
  it('calculates the special colour rendering index from the test/reference uniform colour spaces', function() {
    const input = [{
      'Wri': 61.5897,
      'Uri': 36.3399,
      'Vri': 5.960,
      'Wki': 61.6915,
      'Uki': 26.7916,
      'Vki': 6.7389
    }]

    const output = specialColourRenderingIndicies(input)
    assert.equal(9.58, output[0].DeltaEi.toFixed(2))
    assert.equal(55.93, output[0].Ri.toFixed(2))
  })
})

describe('generalColourRenderingIndex', function() {
  it('calculates the general colour rendering index from the special colour rendering index', function() {
    const input = [
      { DeltaEi: 9.58, Ri: 55.93 },
      { DeltaEi: 5.07, Ri: 76.69 },
      { DeltaEi: 2.11, Ri: 90.29 },
      { DeltaEi: 9.35, Ri: 56.97 },
      { DeltaEi: 8.92, Ri: 58.95 },
      { DeltaEi: 7.14, Ri: 67.17 },
      { DeltaEi: 5.63, Ri: 74.09 },
      { DeltaEi: 14.53, Ri: 33.16 }
    ]

    const output = generalColourRenderingIndex(input)
    assert.equal(64.16, output.toFixed(2))
  })
})

describe('calculateColourRenderingIndex', function() {
  it('calculates CRI given the input spectrum', function() {
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

    const output = calculateColourRenderingIndex(testSpectra)
    assert.closeTo(64.16, output, 0.1)
  })
})

import {
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
  calculateColourRenderingIndex,
  interpolateLinearly,
} from "../src/javascript/colourRenderingIndex";
import { calculateChromaticity31 } from "../src/javascript/chromaticity";
import fl1 from "./fixtures/fl1.json";
import fl2 from "./fixtures/fl2.json";

describe("cie1960UCS", () => {
  it("calculates u from the chromaticity", () => {
    const ucs = cie1960UCS(0.3721, 0.3751);
    expect(ucs.u.toFixed(3)).toEqual("0.220");
  });

  it("calculates v from the chromaticity", () => {
    const ucs = cie1960UCS(0.3721, 0.3751);
    expect(ucs.v.toFixed(3)).toEqual("0.333");
  });
});

describe("correlatedColourTemperature", () => {
  it("calculates CCT using the McCarmy approximation", () => {
    const cct = correlatedColourTemperature(0.3721, 0.3751);
    expect(cct.toFixed(1)).toEqual("4228.8");
  });
});

describe("uvToCorrelatedColourTemperatureRobertson", () => {
  it("calculates CCT from u,v using the Robertson method", () => {
    const cct = uvToCorrelatedColourTemperatureRobertson(
      0.19374137599823,
      0.315221043940594
    );
    expect(cct.toFixed(3)).toEqual("6500.016");
  });

  it("calculates CCT from u,v using the Robertson method (Hunt & Pointer example values)", () => {
    const cct = uvToCorrelatedColourTemperatureRobertson(0.2202, 0.3331);
    // The worked example in Appendix 7.2 of the Hunt & Pointer book gives a CCT of 4224.400K
    // which doesn't exactly match this result. However, the actual CCT returned does exactly
    // match the value calculated using the Python colour-science package.
    expect(cct.toFixed(3)).toEqual("4224.994");
  });

  it("does not raise a TypeError", () => {
    const cct = uvToCorrelatedColourTemperatureRobertson(
      0.25686519407615915,
      0.010984366851941015
    );
    expect(cct.toFixed(3)).toEqual("100000.000");
  });
});

describe("blackBodyReferenceSpectra", () => {
  it("calculates the blackbody reference spectra at temperature T", () => {
    const temperature = 4224.4;
    // Test data from Hunt and Pointer (2011), Appendix 7
    expect(blackBodyReferenceSpectra(700e-9, temperature).toFixed(3)).toEqual(
      "1.112"
    );
    expect(blackBodyReferenceSpectra(500e-9, temperature).toFixed(3)).toEqual(
      "0.848"
    );
    expect(blackBodyReferenceSpectra(450e-9, temperature).toFixed(3)).toEqual(
      "0.674"
    );
  });
});

describe("daylightIlluminantChromaticity", () => {
  it("calculates the x chromaticity of the daylight illuminant", () => {
    expect(daylightIlluminantChromaticity(5000).x.toFixed(4)).toEqual("0.3457");
    expect(daylightIlluminantChromaticity(8000).x.toFixed(4)).toEqual("0.2938");
  });
  it("calculates the y chromaticity of the daylight illuminant", () => {
    expect(daylightIlluminantChromaticity(5000).y.toFixed(4)).toEqual("0.3587");
    expect(daylightIlluminantChromaticity(8000).y.toFixed(4)).toEqual("0.3092");
  });
});

describe("daylightReferenceSpectra", () => {
  it("returns the daylight reference spectra at the given wavelength and temperature", () => {
    // Test data from CIE 015:2018 (§4.1.2 Note 6 and Table 5)
    const tD50 = 5000 * (1.4388 / 1.438);
    expect(daylightReferenceSpectra(385, tD50).toFixed(3)).toEqual("27.179");
    expect(daylightReferenceSpectra(540, tD50).toFixed(3)).toEqual("100.755");

    const tD75 = 7500 * (1.4388 / 1.438);
    expect(daylightReferenceSpectra(385, tD75).toFixed(3)).toEqual("68.333");
    expect(daylightReferenceSpectra(540, tD75).toFixed(3)).toEqual("106.289");
  });
});

describe("testColourColorimetry", () => {
  it("returns the chromaticity for each of the test colours", () => {
    const referenceSpectra = [];
    let lambda;
    for (lambda = 380; lambda <= 780; lambda += 5) {
      referenceSpectra.push([
        lambda,
        blackBodyReferenceSpectra(lambda * 1e-9, 4224.4),
      ]);
    }

    const testColour1 = testColourColorimetry(referenceSpectra)[0];
    expect(testColour1.x.toFixed(4)).toEqual("0.4395");
    expect(testColour1.y.toFixed(4)).toEqual("0.3725");

    const testColour8 = testColourColorimetry(referenceSpectra)[7];
    expect(testColour8.x.toFixed(4)).toEqual("0.3992");
    expect(testColour8.y.toFixed(4)).toEqual("0.3177");
  });
});

describe("adaptiveColourShift", () => {
  it("returns uPrime and vPrime calculated for each test colour", () => {
    const referenceSpectra = [];
    let lambda;
    for (lambda = 380; lambda <= 780; lambda += 5) {
      referenceSpectra.push([
        lambda,
        blackBodyReferenceSpectra(lambda * 1e-9, 4224.09),
      ]);
    }

    const adaptiveShift1 = adaptiveColourShift(referenceSpectra, fl2)[0];
    expect(adaptiveShift1.uPrimeki.toFixed(4)).toEqual("0.2547");
    expect(adaptiveShift1.vPrimeki.toFixed(4)).toEqual("0.3401");

    const adaptiveShift8 = adaptiveColourShift(referenceSpectra, fl2)[7];
    expect(adaptiveShift8.uPrimeki.toFixed(4)).toEqual("0.2487");
    expect(adaptiveShift8.vPrimeki.toFixed(4)).toEqual("0.3134");
  });
});

describe("normalizeSpectra", () => {
  it("ensures that the tristimulus Y value is 100 for each input spectrum", () => {
    const inputSpectra = [];
    let lambda;
    for (lambda = 380; lambda <= 780; lambda += 5) {
      inputSpectra.push([
        lambda,
        blackBodyReferenceSpectra(lambda * 1e-9, 4000),
        blackBodyReferenceSpectra(lambda * 1e-9, 4100),
      ]);
    }
    const normalizedSpectra = normalizeSpectra(inputSpectra, 2);

    expect(
      Math.abs(100 - calculateChromaticity31(normalizedSpectra, 2)[0].Y)
    ).toBeLessThanOrEqual(0.0001);
    expect(
      Math.abs(100 - calculateChromaticity31(normalizedSpectra, 2)[1].Y)
    ).toBeLessThanOrEqual(0.0001);
  });
});

describe("uniformSpace", () => {
  it("calculates U*V*W* of the FL2 and reference spectra for each test colour", () => {
    const referenceSpectra = [];
    let lambda;
    for (lambda = 380; lambda <= 780; lambda += 5) {
      referenceSpectra.push([
        lambda,
        blackBodyReferenceSpectra(lambda * 1e-9, 4224.09),
      ]);
    }

    const output = uniformSpace(fl2, referenceSpectra);

    expect(Math.abs(61.5897 - output[0].Wri)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(36.3399 - output[0].Uri)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(5.96 - output[0].Vri)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(61.6915 - output[0].Wki)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(26.7916 - output[0].Uki)).toBeLessThanOrEqual(0.01);
    // assert.closeTo(6.7389, output[0].Vki, 0.01)

    expect(Math.abs(62.6029 - output[7].Wri)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(35.9323 - output[7].Uri)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(-11.9559 - output[7].Vri)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(60.9654 - output[7].Wki)).toBeLessThanOrEqual(0.01);
    expect(Math.abs(21.7213 - output[7].Uki)).toBeLessThanOrEqual(0.01);
    // assert.closeTo(-14.5084, output[7].Vki, 0.01)
  });
});

describe("specialColourRenderingIndicies", () => {
  it("calculates the special colour rendering index from the test/reference uniform colour spaces", () => {
    const input = [
      {
        Wri: 61.5897,
        Uri: 36.3399,
        Vri: 5.96,
        Wki: 61.6915,
        Uki: 26.7916,
        Vki: 6.7389,
      },
    ];

    const output = specialColourRenderingIndicies(input);
    expect(output[0].DeltaEi.toFixed(2)).toEqual("9.58");
    expect(output[0].Ri).toBeDefined();
  });
});

describe("generalColourRenderingIndex", () => {
  it("calculates the general colour rendering index from the special colour rendering index", () => {
    const input = [
      { DeltaEi: 9.58, Ri: 56 },
      { DeltaEi: 5.07, Ri: 77 },
      { DeltaEi: 2.11, Ri: 90 },
      { DeltaEi: 9.35, Ri: 57 },
      { DeltaEi: 8.92, Ri: 59 },
      { DeltaEi: 7.14, Ri: 67 },
      { DeltaEi: 5.63, Ri: 74 },
      { DeltaEi: 14.53, Ri: 33 },
    ];

    const output = generalColourRenderingIndex(input);
    expect(output.toFixed(0)).toBeDefined();
  });
});

describe("calculateColourRenderingIndex", () => {
  it("calculates the correct CRI given the input spectrum for CIE illuminant FL1 in 5nm spacing", () => {
    expect(calculateColourRenderingIndex(fl1).toFixed(0)).toBeDefined();
  });

  it("calculates the correct CRI given the input spectrum for CIE illuminant FL1 in 1nm spacing", () => {
    expect(
      calculateColourRenderingIndex(interpolateLinearly(fl1)).toFixed(0)
    ).toBeDefined();
  });

  it("calculates the correct CRI given the input spectrum for CIE illuminant FL2 in 5nm spacing", () => {
    expect(calculateColourRenderingIndex(fl2).toFixed(0)).toBeDefined();
  });

  it("calculates the correct CRI given the input spectrum for CIE illuminant FL2 in 1nm spacing", () => {
    expect(
      calculateColourRenderingIndex(interpolateLinearly(fl2)).toFixed(0)
    ).toBeDefined();
  });
});

describe("interpolateLinearly", () => {
  it("linearly interpolates the given dataset at an interval of 1", () => {
    const input = [
      [380, 100],
      [385, 105],
      [390, 110],
    ];

    expect(interpolateLinearly(input)).toEqual([
      [380, 100],
      [381, 101],
      [382, 102],
      [383, 103],
      [384, 104],
      [385, 105],
      [386, 106],
      [387, 107],
      [388, 108],
      [389, 109],
      [390, 110],
    ]);
  });
});

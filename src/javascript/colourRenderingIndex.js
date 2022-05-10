import D_ILLUMINANT_S from "../data/d_illuminant.json";
import TEST_COLOURS from "../data/cri_test_colours.json";
import { calculateChromaticity31 } from "./chromaticity";
import {
  uvToCorrelatedColourTemperatureRobertson,
  uvToCorrelatedColourTemperatureOhno,
} from "./cctCalculations";

let intermediateValuesRa = {};

export const cie1960UCS = (x, y) => {
  const u = (4 * x) / (-2 * x + 12 * y + 3);
  const v = (6 * y) / (-2 * x + 12 * y + 3);

  return {
    u,
    v,
  };
};

// Cite: CIE 015:2018 Annex E
export const blackBodyspectralRadiance = (lambda, t) => {
  const pi = Math.PI;
  // Plank constant
  const h = 6.62607015e-34;
  // Boltzmann constant
  const k = 1.380649e-23;
  // Speed of light in a vacuum
  const c = 299792458;
  // Refractive index for dry air
  const n = 1;

  const c1 = 2 * pi * h * c ** 2;
  const c2 = (h * c) / k;

  return (
    ((c1 * n ** -2 * lambda ** -5) / pi) *
    (1 / (Math.exp(c2 / (n * lambda * t)) - 1))
  );
};

// Cite: CIE 015:2018 Annex E
export const blackBodyReferenceSpectra = (lambda, T) => {
  return (
    blackBodyspectralRadiance(lambda, T) / blackBodyspectralRadiance(560e-9, T)
  );
};

// Cite:: CIE 015:2018 equations 4.7, 4.8, 4.9
export const daylightIlluminantChromaticity = (T) => {
  let x = 0;
  if (T <= 7000) {
    x = -4.607e9 / T ** 3 + 2.9678e6 / T ** 2 + 0.09911e3 / T + 0.244063;
  } else {
    x = -2.0064e9 / T ** 3 + 1.9018e6 / T ** 2 + 0.24748e3 / T + 0.23704;
  }

  const y = -3 * x ** 2 + 2.87 * x - 0.275;

  return {
    x,
    y,
  };
};

// Cite:: CIE 015:2018 equations 4.10, 4.11
export const daylightReferenceSpectra = (lambda, T) => {
  const chromaticity = daylightIlluminantChromaticity(T);
  const m1 =
    (-1.3515 - 1.7703 * chromaticity.x + 5.9114 * chromaticity.y) /
    (0.0241 + 0.2562 * chromaticity.x - 0.7341 * chromaticity.y);
  const m2 =
    (0.03 - 31.4424 * chromaticity.x + 30.0717 * chromaticity.y) /
    (0.0241 + 0.2562 * chromaticity.x - 0.7341 * chromaticity.y);

  const s0 = D_ILLUMINANT_S[lambda].S0;
  const s1 = D_ILLUMINANT_S[lambda].S1;
  const s2 = D_ILLUMINANT_S[lambda].S2;

  return s0 + m1.toFixed(3) * s1 + m2.toFixed(3) * s2;
};

export const testColourColorimetry = (spectra) => {
  const spectraUnderTestColours = spectra.map((row) => {
    const [wavelength, sample] = row;

    const sampleUnderTestColours = TEST_COLOURS[wavelength].map(
      (testColour) => {
        return sample * testColour;
      }
    );
    return [wavelength, sampleUnderTestColours].flat();
  });

  return calculateChromaticity31(spectraUnderTestColours, 8);
};

export const adaptiveColourShift = (referenceSpectra, testSpectra) => {
  const c = (u, v) => {
    return (1 / v) * (4 - u - 10 * v);
  };

  const d = (u, v) => {
    return (1 / v) * (1.708 * v + 0.404 - 1.481 * u);
  };

  const [{ x: xk, y: yk }] = calculateChromaticity31(testSpectra, 1);
  const { u: uk, v: vk } = cie1960UCS(xk, yk);
  const ck = c(uk, vk);
  const dk = d(uk, vk);

  const [{ x: xr, y: yr }] = calculateChromaticity31(referenceSpectra, 1);
  const { u: ur, v: vr } = cie1960UCS(xr, yr);
  const cr = c(ur, vr);
  const dr = d(ur, vr);

  return testColourColorimetry(testSpectra).map((xkiyki) => {
    const { u: uki, v: vki } = cie1960UCS(xkiyki.x, xkiyki.y);
    const cki = c(uki, vki);
    const dki = d(uki, vki);

    const uPrimeki =
      (10.872 + 0.404 * (cr / ck) * cki - 4 * (dr / dk) * dki) /
      (16.518 + 1.481 * (cr / ck) * cki - (dr / dk) * dki);
    const vPrimeki =
      5.52 / (16.518 + 1.481 * (cr / ck) * cki - (dr / dk) * dki);

    return {
      uPrimeki,
      vPrimeki,
    };
  });
};

export const normalizeSpectra = (spectra, sampleCount) => {
  const chromaticity = calculateChromaticity31(spectra, sampleCount);
  return spectra.map((row) => {
    const normalized = new Array(sampleCount);

    for (let i = 0; i < sampleCount; i += 1) {
      const factor = 100 / chromaticity[i].Y;
      normalized[i] = row[i + 1] * factor;
    }

    return [row[0], normalized].flat();
  });
};

export const uniformSpace = (testSpectra, referenceSpectra) => {
  const normalizedTestSpectra = normalizeSpectra(testSpectra, 1);
  const normalizedReferenceSpectra = normalizeSpectra(referenceSpectra, 1);
  const testColourColorimetryTestSpectra = testColourColorimetry(
    normalizedTestSpectra
  );
  const testColourColorimetryReferenceSpectra = testColourColorimetry(
    normalizedReferenceSpectra
  );

  const xr = calculateChromaticity31(referenceSpectra, 1)[0].x;
  const yr = calculateChromaticity31(referenceSpectra, 1)[0].y;
  const ur = cie1960UCS(xr, yr).u;
  const vr = cie1960UCS(xr, yr).v;

  const uPrimek = ur;
  const vPrimek = vr;
  const uvPrimeki = adaptiveColourShift(referenceSpectra, testSpectra);

  const output = new Array(testColourColorimetryTestSpectra.length);

  for (let i = 0; i < output.length; i += 1) {
    const xri = testColourColorimetryReferenceSpectra[i].x;
    const yri = testColourColorimetryReferenceSpectra[i].y;
    const Yri = testColourColorimetryReferenceSpectra[i].Y;

    const uri = cie1960UCS(xri, yri).u;
    const vri = cie1960UCS(xri, yri).v;

    const { uPrimeki, vPrimeki } = uvPrimeki[i];

    const Yki = testColourColorimetryTestSpectra[i].Y;

    const Wri = 25 * Yri ** (1 / 3) - 17;
    const Uri = 13 * Wri * (uri - ur);
    const Vri = 13 * Wri * (vri - vr);

    const Wki = 25 * Yki ** (1 / 3) - 17;
    const Uki = 13 * Wki * (uPrimeki - uPrimek);
    const Vki = 13 * Wri * (vPrimeki - vPrimek);

    output[i] = {
      Uki,
      Uri,
      Vki,
      Vri,
      Wki,
      Wri,
    };
  }

  return output;
};

export const specialColourRenderingIndicies = (input) => {
  const output = new Array(input.length);

  for (let i = 0; i < output.length; i += 1) {
    const DeltaEi = Math.sqrt(
      (input[i].Uri - input[i].Uki) ** 2 +
        (input[i].Vri - input[i].Vki) ** 2 +
        (input[i].Wri - input[i].Wki) ** 2
    );

    const Ri = Math.round(100 - 4.6 * DeltaEi);

    output[i] = {
      DeltaEi,
      Ri,
    };
  }

  return output;
};

export const generalColourRenderingIndex = (input) =>
  input.reduce((sum, { Ri }) => sum + Ri, 0) / input.length;

export const interpolateLinearly = (spectra) => {
  const interpolatedSpectra = [];

  for (let i = 1; i < spectra.length; i += 1) {
    const [x1, y1] = spectra[i - 1];
    const [x2, y2] = spectra[i];
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    const m = deltaY / deltaX;

    for (let j = 0; j < deltaX; j += 1) {
      const newX = j * m + y1;

      interpolatedSpectra.push([x1 + j, newX]);
    }
  }

  interpolatedSpectra.push([
    spectra[spectra.length - 1][0],
    spectra[spectra.length - 1][1],
  ]);

  return interpolatedSpectra;
};

export const calculateColourRenderingIndex = (spectra) => {
  intermediateValuesRa = {}; // reset the container
  const [{ x, y }] = calculateChromaticity31(spectra, 1);
  const { u, v } = cie1960UCS(x, y);
  const T = uvToCorrelatedColourTemperatureRobertson(u, v);
  intermediateValuesRa.CCT = T;
  // eslint-disable-next-line no-unused-vars
  const { T: ohnoCCT, Duv: ohnoDuv } = uvToCorrelatedColourTemperatureOhno(
    u,
    v
  );

  let referenceSpectra = [];

  if (T < 5000) {
    referenceSpectra = spectra.map(([wavelength]) => [
      wavelength,
      blackBodyReferenceSpectra(wavelength * 1e-9, T),
    ]);
  } else {
    for (let lambda = 380; lambda <= 780; lambda += 5) {
      referenceSpectra.push([lambda, daylightReferenceSpectra(lambda, T)]);
    }
    referenceSpectra = interpolateLinearly(referenceSpectra);
  }

  const colourDifferences = uniformSpace(spectra, referenceSpectra);
  intermediateValuesRa.Ra = generalColourRenderingIndex(
    specialColourRenderingIndicies(colourDifferences)
  );

  if (Math.abs(ohnoDuv) >= 0.05) {
    intermediateValuesRa.Ra = "N/A";
    intermediateValuesRa.CCT = "N/A";
  }

  return intermediateValuesRa;
};

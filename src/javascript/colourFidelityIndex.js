/**
 * luox-NRC-CIERf is a module to calculate parameters for light source
 * colour appearance and colour rendering in the luox platform.
 * Copyright (C) 2022 Her Majesty the Queen in Right of Canada.
 * National Research Council of Canada. Ottawa, Canada.
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License v 3.0 as published by the Free Software Foundation.
 * Redistributions and modifications should credit the National Research Council of Canada as the originator of this code.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see <https://www.gnu.org/licenses/>.
 * */

import { create, all } from "mathjs";

// import TCS99_5NM from "../data/TCS99_5nm.json";
import TCS99_1NM from "../data/TCS99_1nm.json";
import CIEXYZ31 from "../data/ciexyz31.json";
import CIEXYZ64 from "../data/ciexyz64.json";
import D_ILLUMINANT_S from "../data/d_illuminant.json";
import { calculateChromaticity31 } from "./chromaticity";
import {
  daylightIlluminantChromaticity,
  cie1960UCS,
  interpolateLinearly,
} from "./colourRenderingIndex";
import { uvToCorrelatedColourTemperatureOhno } from "./cctCalculations";

const math = create(all);
let intermediateValuesRf;

// Eq. 2 of CIE224:2017
export const planckianRelativeSPD = (lambda, T) => {
  const c1 = 3.74183e-16;
  const c2 = 1.4388e-2;
  const sr = c1 / lambda ** 5 / (Math.exp(c2 / (T * lambda)) - 1);
  return sr;
};
/**
 * Calculate the relative spectral power distribution (SPD) of a
 * Planckian reference illuminant
 * @param {*} spectra
 * @param {*} T
 * @returns Sr
 */
export const calculatePlanckianSPD = (spectra, T) => {
  return spectra.map(([wavelength]) => [
    wavelength,
    planckianRelativeSPD(wavelength * 1e-9, T),
  ]);
};

/**
 * spectraJson has wavelength as key and the value will contain illmunant
 * This method will calculate sum product value from the
 * illuminant of the matching wavelength value by multiplying
 * variable length of map functions along with its axis value
 *
 * mapFunctionAxisPair will be fed in as a pair of [mapfunction, axis]
 *
 * @param {*} spectraArray
 * @param {*} mapFunctionAxisPair
 * @returns
 */
export const sumProduct = (spectraJson, ...args) => {
  let sum = 0;
  Object.keys(spectraJson).forEach((wavelength) => {
    const illuminant = spectraJson[wavelength];
    // Find the corresponding colour matching value
    let multipleCoefficient = 1;
    for (let i = 0; i < args.length; i += 2) {
      const mapFunction = args[i];
      const axis = args[i + 1];
      const mapVal = mapFunction[wavelength][axis]; // default axis is X-axis
      multipleCoefficient *= mapVal; // product of all map function values;
    }
    sum += illuminant * multipleCoefficient;
  });
  return sum;
};

export const jsonifySpectra = (spectra) => {
  const spectraJson = {};
  Object.keys(spectra).forEach((i) => {
    const [wavelength, spectraValue] = spectra[i];
    spectraJson[wavelength] = spectraValue;
  });
  return spectraJson;
};

/**
 * This was created separately from the daylightReferenceSpectra in the
 * colourRenderingIndex.js to meet the expected values calculated by using
 * the CIE CIE 2017 Colour Fidelity Index Calculator 1 nm - V.3(2017-07-15)
 *
 * @param {*} lambda
 * @param {*} T
 * @returns
 */
export const daylightReferenceSpectraNoRound = (lambda, T) => {
  const chromaticity = daylightIlluminantChromaticity(T);
  const m1 =
    (-1.3515 - 1.7703 * chromaticity.x + 5.9114 * chromaticity.y) /
    (0.0241 + 0.2562 * chromaticity.x - 0.7341 * chromaticity.y);
  const m2 =
    (0.03 - 31.4424 * chromaticity.x + 30.0717 * chromaticity.y) /
    (0.0241 + 0.2562 * chromaticity.x - 0.7341 * chromaticity.y);

  //  if (!Object.prototype.hasOwnProperty.call(intermediateValuesRf, "m1")) {
  //    intermediateValuesRf.m1 = m1;
  //    intermediateValuesRf.m2 = m2;
  //  }
  const s0 = D_ILLUMINANT_S[lambda].S0;
  const s1 = D_ILLUMINANT_S[lambda].S1;
  const s2 = D_ILLUMINANT_S[lambda].S2;
  return s0 + m1 * s1 + m2 * s2;
};

/**
 * Calculates mixture spectral power distribution (SPD)
 * @param {*} spectra
 * @param {*} T
 */
export const calculateMixtureSPD = (spectra, T) => {
  const pUnnorm = calculatePlanckianSPD(spectra, T);

  const tmpReferenceSpectra = [];
  for (let lambda = 380; lambda <= 780; lambda += 5) {
    tmpReferenceSpectra.push([
      lambda,
      daylightReferenceSpectraNoRound(lambda, T),
    ]);
  }

  let daylightIllumUnnorm = tmpReferenceSpectra;
  if (spectra[1][0] % 5 > 0) {
    // if the second wavelength is not modulo divisible by 5,
    // we can infer that it is measured in 1nm
    // then, we interpolate.
    daylightIllumUnnorm = interpolateLinearly(tmpReferenceSpectra);
  }

  const planckianY = sumProduct(jsonifySpectra(pUnnorm), CIEXYZ31, "Y");
  const daylightY = sumProduct(
    jsonifySpectra(daylightIllumUnnorm),
    CIEXYZ31,
    "Y"
  );

  // Renormalize Srp and Srd ref: Eq. 5a & 5b
  const normSrP = pUnnorm.map(([wavelength, illum]) => [
    wavelength,
    (illum / planckianY) * 100,
  ]);
  const normSrD = daylightIllumUnnorm.map(([wavelength, illum]) => [
    wavelength,
    (illum / daylightY) * 100,
  ]);

  // Obtain the relative SPD of the mixture 5c
  const Tb = 4000;
  const Te = 5000;
  let aP = 0;
  let aD = 0;

  if (T < Tb) {
    // if T < 4000
    aP = 0;
  } else if (T > Te) {
    // if T > 5000
    aP = 1;
    aD = 1;
  } else {
    aP = (Te - T) / (Te - Tb);
    aD = 1 - aP;
  }

  // // aP*I7 + aD*O7
  const Sr = [];
  Object.keys(spectra).forEach((i) => {
    const wavelength = spectra[i][0];
    if (normSrD[i][0] === wavelength && normSrP[i][0] === wavelength) {
      Sr.push([wavelength, aP * normSrP[i][1] + aD * normSrD[i][1]]);
    }
  });
  return Sr;
};

/**
 * Determine the 10 degree tristimulus values X10, Y10, Z10 of the
 * 99 TCS under the given input refSpectra using the CIE 1964 colour-matching
 * functions and the spectral radiance factors of the
 * 99 TCS
 * @param {*} refSpectra
 * @return tcsXYZ
 */
export const calculateColourAppearance = (refSpectra, tcsTable) => {
  const jsonSpectra = jsonifySpectra(refSpectra);
  const firstKey = Object.keys(tcsTable)[0];
  const tcsXYZ = {};

  Object.keys(tcsTable[firstKey]).forEach((key) => {
    tcsXYZ[key] = {
      X:
        (100 * sumProduct(jsonSpectra, CIEXYZ64, "X", tcsTable, key)) /
        sumProduct(jsonSpectra, CIEXYZ64, "Y"),
      Y:
        (100 * sumProduct(jsonSpectra, CIEXYZ64, "Y", tcsTable, key)) /
        sumProduct(jsonSpectra, CIEXYZ64, "Y"),
      Z:
        (100 * sumProduct(jsonSpectra, CIEXYZ64, "Z", tcsTable, key)) /
        sumProduct(jsonSpectra, CIEXYZ64, "Y"),
    };
  });
  return tcsXYZ;
};

/**
 * Returns a luminance adaption to the given truncated cone responses rgb list
 * Eq. 9b of CIE224:2017
 * @param {*} FL
 * @param {*} rgb
 * @returns
 */
export const luminanceAdaption = (FL, rgb) => {
  const tmpLuminance = [];
  Object.keys(rgb).forEach((i) => {
    tmpLuminance.push(
      (400 * ((FL * rgb[i]) / 100) ** 0.42) /
        (((FL * rgb[i]) / 100) ** 0.42 + 27.13) +
        0.1
    );
  });
  return tmpLuminance;
};

/**
 * Using math.multiply(matrix1, matrix2)
 * math.js library calculations return a math.matrix object
 * This helper method will return in Javascript Array Object
 * @param {*} array1
 * @param {*} array2
 * @returns
 */
export const matrixMultiplication = (array1, array2) => {
  const tmpResult = math.multiply(array1, array2).toArray();
  return [tmpResult[0], tmpResult[1], tmpResult[2]];
};

/**
 * Returns the CAM02-UCS colour appearance coordinates J`, a`, b` of the 99 TCS
 * under the reference illuminant and the test source.
 * section c of CIE224:2017
 *
 * parameter 'tcsVal' refers to the TCS key label in the imported TCS99.json
 *
 * @param {*} XrYrZr
 * @param {*} tcsVal
 */
export const convertToCAMUCS = (XrYrZr, tcsVal) => {
  const mcat02 = math.matrix([
    [0.7328, 0.4296, -0.1624],
    [-0.7036, 1.6975, 0.0061],
    [0.003, 0.0136, 0.9834],
  ]);
  const mhpe = math.matrix([
    [0.38971, 0.68898, -0.07868],
    [-0.22981, 1.1834, 0.04641],
    [0.0, 0.0, 1.0],
  ]);

  // set constants
  const LA = 100; // Luminance of the adapting field
  const Yb = 20; // Relative luminance of the background
  const Nc = 1;
  const c = 0.69;
  const D = 1;

  const k = 1 / (1 + 5 * LA);
  const FL =
    0.2 * k ** 4 * 5 * LA + 0.1 * (1 - k ** 4) ** 2 * (5 * LA) ** (1 / 3);

  const n = Yb / XrYrZr.Source.Y; // 0.2 from Eq. 11(c)
  const nbb = 0.725 * (1 / n) ** 0.2;
  const ncb = 0.725 * (1 / n) ** 0.2;
  const z = 1.48 + n ** (1 / 2);

  // 1. Convert from the XYZ space to the CAT02 RGB space
  const [X, Y, Z] = [XrYrZr[tcsVal].X, XrYrZr[tcsVal].Y, XrYrZr[tcsVal].Z];
  const [Xw, Yw, Zw] = [XrYrZr.Source.X, XrYrZr.Source.Y, XrYrZr.Source.Z];

  const [R, G, B] = matrixMultiplication(mcat02, [X, Y, Z]);
  const [Rw, Gw, Bw] = matrixMultiplication(mcat02, [Xw, Yw, Zw]);

  // 2. Apply a 'von Kries'- like chromatic adaption, Eq. 7d of CIE224:2017
  const [Rc, Gc, Bc] = [
    (D * (Yw / Rw) + 1 - D) * R,
    (D * (Yw / Gw) + 1 - D) * G,
    (D * (Yw / Bw) + 1 - D) * B,
  ];
  const [Rcw, Gcw, Bcw] = [
    (D * (Yw / Rw) + 1 - D) * Rw,
    (D * (Yw / Gw) + 1 - D) * Gw,
    (D * (Yw / Bw) + 1 - D) * Bw,
  ];

  // 3. Convert back to the tristimulus values, equataion 7e of CIE224:2017
  const [Xc, Yc, Zc] = matrixMultiplication(math.inv(mcat02), [Rc, Gc, Bc]);
  const [Xcw, Ycw, Zcw] = matrixMultiplication(math.inv(mcat02), [
    Rcw,
    Gcw,
    Bcw,
  ]);

  // Eq. 8
  const [Rprime, Gprime, Bprime] = matrixMultiplication(mhpe, [Xc, Yc, Zc]);
  const [Rprimew, Gprimew, Bprimew] = matrixMultiplication(mhpe, [
    Xcw,
    Ycw,
    Zcw,
  ]);

  // Eq. 9
  const [Rprimea, Gprimea, Bprimea] = luminanceAdaption(FL, [
    Rprime,
    Gprime,
    Bprime,
  ]);
  const [Rprimeaw, Gprimeaw, Bprimeaw] = luminanceAdaption(FL, [
    Rprimew,
    Gprimew,
    Bprimew,
  ]);

  // Eq. 10
  const a = Rprimea - (12 * Gprimea) / 11 + Bprimea / 11;
  const b = (1 / 9) * (Rprimea + Gprimea - 2 * Bprimea);

  // Eq. 11
  const A = (2 * Rprimea + Gprimea + (1 / 20) * Bprimea - 0.305) * nbb;
  const Aw = (2 * Rprimeaw + Gprimeaw + (1 / 20) * Bprimeaw - 0.305) * nbb;

  const J = 100 * (A / Aw) ** (c * z);

  // Eq. 12(b)
  let h = 0; // initialize
  if (a === 0 && b === 0) {
    h = 0;
  } else if (b >= 0) {
    h = (360 / (2 * Math.PI)) * Math.atan2(b, a);
  } else {
    h = 360 + (360 / (2 * Math.PI)) * Math.atan2(b, a);
  }

  const e = (12500 / 13) * ncb * Nc * (Math.cos((h * Math.PI) / 180 + 2) + 3.8); // Eq. 12(f)
  const t =
    (e * (a ** 2 + b ** 2) ** 0.5) / (Rprimea + Gprimea + (21 / 20) * Bprimea); // Eq. 12(e)

  const bigC = t ** 0.9 * (J / 100) ** 0.5 * (1.64 - 0.29 ** n) ** 0.73; // Eq. 12(d)
  const M = bigC * FL ** 0.25; // Colourfulness, Eq. 12(c)

  const Mprime = (1 / 0.0228) * Math.log(1 + 0.0228 * M);

  return {
    Jprime: ((1 + 100 * 0.007) * J) / (1 + 0.007 * J),
    aprime: Mprime * Math.cos((Math.PI / 180) * h),
    bprime: Mprime * Math.sin((Math.PI / 180) * h),
  };
};

/**
 * Calculates the final colour fidelity value from a given Rf_i
 * @param {*} dE
 * @returns
 */
export const toColourFidelityIndex = (dE) => {
  const cf = 6.73;
  let Rf = {};
  if (typeof dE === "number") {
    // single number is to get the General Colour Fidelity Indices
    Rf = 10 * Math.log(Math.E ** ((100 - cf * dE) / 10) + 1);
  } else {
    // otherwise, it should be the dictionary/json object
    Object.keys(dE).forEach((key) => {
      // 10 * LN(EXP((100 - cf * G30) / 10) + 1)
      const tmpRfi = 10 * Math.log(Math.E ** ((100 - cf * dE[key]) / 10) + 1);
      Rf[key] = tmpRfi;
      intermediateValuesRf[`${key}_Rfi`] = tmpRfi;
    });
  }
  return Rf;
};

/**
 * Calculates daylight SPD
 * @param {*} spectra
 * @param {*} T
 * @returns
 */
export const calculateDaylightSPD = (spectra, T) => {
  const tmpReferenceSpectra = [];
  for (let lambda = 380; lambda <= 780; lambda += 5) {
    tmpReferenceSpectra.push([
      lambda,
      daylightReferenceSpectraNoRound(lambda, T),
    ]);
  }
  let refSpectraUnnorm = tmpReferenceSpectra;
  if (spectra[1][0] % 5) {
    // true if spectra is in 1nm scale
    refSpectraUnnorm = interpolateLinearly(tmpReferenceSpectra);
  }

  const daylightY = sumProduct(jsonifySpectra(refSpectraUnnorm), CIEXYZ31, "Y");
  return refSpectraUnnorm.map(([wavelength, illum]) => [
    wavelength,
    (illum / daylightY) * 100,
  ]);
};

/**
 * CIE 2017 Colour fidelity Index
 *
 * @param {*} spectra
 * @returns
 */
export const calculateColourFidelityIndex = (spectra) => {
  intermediateValuesRf = {}; // reset the container
  // Use CIE1931 2 degree standard observer for CCT Ohno
  const [{ x, y }] = calculateChromaticity31(spectra, 1);
  const { u, v } = cie1960UCS(x, y);
  const uprime = (4 * x) / (-2 * x + 12 * y + 3);
  const vprime = (9 * y) / (-2 * x + 12 * y + 3);
  const { T, Duv } = uvToCorrelatedColourTemperatureOhno(u, v);
  intermediateValuesRf.u = u;
  intermediateValuesRf.v = v;
  intermediateValuesRf.uPrime = uprime;
  intermediateValuesRf.vPrime = vprime;
  intermediateValuesRf.CCT = T;
  intermediateValuesRf.Duv = Duv;

  let referenceSpectra = [];
  if (T < 4000) {
    // Calculate the relative SPD of a Planckian reference illuminant. Eq. 2
    referenceSpectra = calculatePlanckianSPD(spectra, T);
  } else if (T >= 4000 && T <= 5000) {
    // Calculate the mixture SPD of a Planckian and a daylight illuminant pair
    referenceSpectra = calculateMixtureSPD(spectra, T);
  } else if (T > 5000) {
    // Calculate a daylight phase
    referenceSpectra = calculateDaylightSPD(spectra, T);
  }

  /**
   * Calculate the colour appearance of the 99 TCS under
   * the test source and the reference illuminant
   */
  const XrYrZr = calculateColourAppearance(referenceSpectra, TCS99_1NM);
  const XtYtZt = calculateColourAppearance(spectra, TCS99_1NM);

  const Jabr = {};
  const Jabt = {};
  Object.keys(XrYrZr).forEach((key) => {
    Jabr[key] = convertToCAMUCS(XrYrZr, key);
  });
  Object.keys(XtYtZt).forEach((key) => {
    Jabt[key] = convertToCAMUCS(XtYtZt, key);
  });

  // CIE224:2017 Eq. 14(a), Calculate delta E, colour-appearance differences,
  // for each of the 99 TCS, i, and their average.
  const deltaEi = {};
  let sum = 0;
  Object.keys(Jabt).forEach((key) => {
    if (key !== "Source") {
      const t = Jabt[key];
      const r = Jabr[key];
      const tmpEi =
        ((r.Jprime - t.Jprime) ** 2 +
          (r.aprime - t.aprime) ** 2 +
          (r.bprime - t.bprime) ** 2) **
        0.5;
      deltaEi[key] = tmpEi;
      sum += tmpEi;
    }
  });
  const deltaEbar = (1 / 99) * sum; // off after 6th decimal place precision
  //  intermediateValuesRf.deltaEbar = deltaEbar;

  // Convert from colour-appearance difference to colour fidelity index value:
  // const Rfi = toColourFidelityIndex(deltaEi); // Eq. 15(a) Special Colour Fidelity Indices
  const Rf = toColourFidelityIndex(deltaEbar); // Eq. 15(b) General Colour Fidelity Indices

  intermediateValuesRf.Rf = Rf;

  if (Math.abs(intermediateValuesRf.Duv) >= 0.05) {
    intermediateValuesRf.Rf = "N/A";
    intermediateValuesRf.CCT = "N/A";
  }

  return intermediateValuesRf;
};

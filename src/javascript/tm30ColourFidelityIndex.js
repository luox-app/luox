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
import CES99_1NM from "../data/CES99_1nm.json";
import CIEXYZ31 from "../data/ciexyz31.json";
import CIEXYZ64 from "../data/ciexyz64.json";
import D_ILLUMINANT_S from "../data/d_illuminant.json";
import { uvToCorrelatedColourTemperatureOhno } from "./cctCalculations";

import {
  daylightIlluminantChromaticity,
  cie1960UCS,
  interpolateLinearly,
} from "./colourRenderingIndex";

const math = create(all);
let tm30IntermediateValues;
let binCount;

// Eq. 2 of CIE224:2017
export const planckianRelativeSPD = (lambda, T) => {
  const c1 = 3.74183e-16;
  const c2 = 1.4388e-2;
  const sr = c1 / lambda ** 5 / (Math.exp(c2 / (T * lambda)) - 1);
  return sr;
};
/**
 * Calculate the relative spectral power distribution (SPD) of a Planckian reference illuminant
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
export const spectraSumProduct = (spectraJson, ...args) => {
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

export const daylightReferenceSpectraNoRound = (lambda, T) => {
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

  const planckianY = spectraSumProduct(jsonifySpectra(pUnnorm), CIEXYZ31, "Y");
  const daylightY = spectraSumProduct(
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
        (100 * spectraSumProduct(jsonSpectra, CIEXYZ64, "X", tcsTable, key)) /
        spectraSumProduct(jsonSpectra, CIEXYZ64, "Y"),
      Y:
        (100 * spectraSumProduct(jsonSpectra, CIEXYZ64, "Y", tcsTable, key)) /
        spectraSumProduct(jsonSpectra, CIEXYZ64, "Y"),
      Z:
        (100 * spectraSumProduct(jsonSpectra, CIEXYZ64, "Z", tcsTable, key)) /
        spectraSumProduct(jsonSpectra, CIEXYZ64, "Y"),
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

export const toColourFidelityIndex = (deltaEi) => {
  const cf = 6.73;
  let Rf = {};
  if (typeof deltaEi === "number") {
    // single number is to get the General Colour Fidelity Indices
    Rf = 10 * Math.log(Math.E ** ((100 - cf * deltaEi) * 0.1) + 1);
  } else {
    // otherwise, it should be the dictionary/json object
    Object.keys(deltaEi).forEach((key) => {
      // 10 * LN(EXP((100 - cf * deltaE) / 10) + 1)
      const tmpRfi =
        10 * Math.log(Math.E ** ((100 - cf * deltaEi[key]) / 10) + 1);
      Rf[key] = tmpRfi;
    });
  }
  return Rf;
};

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
  const daylightY = spectraSumProduct(
    jsonifySpectra(refSpectraUnnorm),
    CIEXYZ31,
    "Y"
  );
  return refSpectraUnnorm.map(([wavelength, illum]) => [
    wavelength,
    (illum / daylightY) * 100,
  ]);
};

export const calculateTM30Normalization = (spectra) => {
  const normalY = spectraSumProduct(jsonifySpectra(spectra), CIEXYZ64, "Y");
  const ynorm = spectra.map(([wavelength, illum]) => [
    wavelength,
    (illum / normalY) * 100,
  ]);

  const Xt = spectraSumProduct(jsonifySpectra(ynorm), CIEXYZ31, "X");
  const Yt = spectraSumProduct(jsonifySpectra(ynorm), CIEXYZ31, "Y");
  const Zt = spectraSumProduct(jsonifySpectra(ynorm), CIEXYZ31, "Z");

  const x = Xt / (Xt + Yt + Zt);
  const y = Yt / (Xt + Yt + Zt);

  return { x, y };
};

/**
 * Decimal adjustment of a number.
 *
 * @param {String}  type  The type of adjustment.
 * @param {Number}  value The number.
 * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
 * @returns {Number} The adjusted value.
 */
function decimalAdjust(type, value, exp) {
  /* eslint-disable */
  // If the exp is undefined or zero...
  if (typeof exp === "undefined" || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
  /* eslint-enable */
}

// Decimal floor
const floor10 = (value, exp) => decimalAdjust("floor", value, exp);

/**
 * Populate the Color Evaluation Sample (CES) Calculations for each Hue-Angle Bin (j)
 *
 * @param {*} Jabr
 * @param {*} Jabt
 * @param {*} deltaEi
 * @returns
 */
export const getCESSummary = (Jabr, Jabt, deltaEi) => {
  const cesSummary = {};
  let hi = 0;
  let j = 0;

  // initialize the bins
  for (let c = 1; c < binCount + 1; c += 1) {
    cesSummary[c] = {
      deltaEi: [],
      refJ: [],
      refa: [],
      refb: [],
      testJ: [],
      testa: [],
      testb: [],
    };
  }

  Object.keys(deltaEi).forEach((i) => {
    const a = Jabr[i].aprime;
    const b = Jabr[i].bprime;
    let hueAngle = Math.atan2(b, a);
    if (hueAngle < 0) {
      hueAngle += 2 * Math.PI;
    }
    hi = hueAngle % (2.0 * Math.PI);
    j = floor10((hi / 2 / Math.PI) * 16, 0) + 1; // Hue-Angle Bin

    // sort the deltaEi, Jabr, Jabt by j
    cesSummary[j].deltaEi.push(deltaEi[i]);
    cesSummary[j].refJ.push(Jabr[i].Jprime);
    cesSummary[j].refa.push(Jabr[i].aprime);
    cesSummary[j].refb.push(Jabr[i].bprime);
    cesSummary[j].testJ.push(Jabt[i].Jprime);
    cesSummary[j].testa.push(Jabt[i].aprime);
    cesSummary[j].testb.push(Jabt[i].bprime);
  });

  return cesSummary;
};

/**
 * Calculate local Color Fidelity for each Hue-Angle Bin (j)
 *
 * @param {*} cesSummary
 * @returns
 */
export const getLocalColorFidelity = (cesSummary) => {
  const cf = 6.73;
  const RfHj = {};
  // Let's calculate the average deltaE for each bin
  Object.keys(cesSummary).forEach((bin) => {
    RfHj[bin] =
      10 *
      Math.log(
        Math.E ** ((100 - cf * math.mean(cesSummary[bin].deltaEi)) / 10) + 1
      );
  });
  return RfHj;
};

/**
 * Calculate the local averages for each Hue Angle Bin (j)
 *
 * @param {} cesSummary
 */
export const getHueAngleBinAverages = (cesSummary) => {
  const avgHueAngleBin = {};
  Object.keys(cesSummary).forEach((j) => {
    const hrefJ = (22.5 * j - 11.25) * (Math.PI / 180); // convert degrees to radians
    const pathXref = Math.cos(hrefJ);
    const pathYref = Math.sin(hrefJ);

    const aPrimeRefJ = math.mean(cesSummary[j].refa);
    const bPrimeRefJ = math.mean(cesSummary[j].refb);
    const aPrimeTestJ = math.mean(cesSummary[j].testa);
    const bPrimeTestJ = math.mean(cesSummary[j].testb);

    const tmpDenominator = Math.sqrt(aPrimeRefJ ** 2 + bPrimeRefJ ** 2);

    const daRelative = (aPrimeTestJ - aPrimeRefJ) / tmpDenominator;
    const dbRelative = (bPrimeTestJ - bPrimeRefJ) / tmpDenominator;

    avgHueAngleBin[j] = {
      thetaJ: (-1.0 * Math.PI) / 16 + (Math.PI / 8) * j,
      hrefJ,
      pathXref,
      pathYref,
      pathXtest: pathXref + daRelative,
      pathYtest: pathYref + dbRelative,
      daRelative,
      dbRelative,
      aPrimeRefJ,
      bPrimeRefJ,
      aPrimeTestJ,
      bPrimeTestJ,
    };
  });
  return avgHueAngleBin;
};

export const getLocalHueAndChromaShift = (avgHueAngleBin) => {
  const RhsH = {};
  const RcsH = {};

  Object.keys(avgHueAngleBin).forEach((j) => {
    const pathXdiff = avgHueAngleBin[j].pathXtest - avgHueAngleBin[j].pathXref;
    const pathYdiff = avgHueAngleBin[j].pathYtest - avgHueAngleBin[j].pathYref;

    // get Local Hue Shift
    RhsH[j] =
      -1.0 * pathXdiff * math.sin(avgHueAngleBin[j].thetaJ) +
      pathYdiff * math.cos(avgHueAngleBin[j].thetaJ);
    // get Local Chroma Shift
    RcsH[j] =
      pathXdiff * math.cos(avgHueAngleBin[j].thetaJ) +
      pathYdiff * math.sin(avgHueAngleBin[j].thetaJ);
  });

  return [RhsH, RcsH];
};

export const sumProduct = (arr1, arr2) => {
  return arr1.reduce(
    (sum, currentValofArr1, i) => sum + currentValofArr1 * arr2[i],
    0
  );
};

export const getGamutIndex = (avgHueAngleBin) => {
  const polygonAreaCalc = {
    aPrimeTestJdiff: [],
    bPrimeTestJdiff: [],
    aPrimeRefJdiff: [],
    bPrimeRefJdiff: [],
  };

  for (let j = 1; j < binCount + 1; j += 1) {
    // from 1 to bin count
    const nextBinIndex = j === binCount ? 1 : j + 1; // we go roundrobin for the last bin
    // append each calculated differences into the list in order by j
    polygonAreaCalc.aPrimeRefJdiff.push(
      avgHueAngleBin[nextBinIndex].aPrimeRefJ - avgHueAngleBin[j].aPrimeRefJ
    );
    polygonAreaCalc.bPrimeRefJdiff.push(
      (avgHueAngleBin[nextBinIndex].bPrimeRefJ + avgHueAngleBin[j].bPrimeRefJ) /
        2.0
    );
    polygonAreaCalc.aPrimeTestJdiff.push(
      avgHueAngleBin[nextBinIndex].aPrimeTestJ - avgHueAngleBin[j].aPrimeTestJ
    );
    polygonAreaCalc.bPrimeTestJdiff.push(
      (avgHueAngleBin[nextBinIndex].bPrimeTestJ +
        avgHueAngleBin[j].bPrimeTestJ) /
        2.0
    );
  }

  const Rg =
    (sumProduct(
      polygonAreaCalc.aPrimeTestJdiff,
      polygonAreaCalc.bPrimeTestJdiff
    ) /
      sumProduct(
        polygonAreaCalc.aPrimeRefJdiff,
        polygonAreaCalc.bPrimeRefJdiff
      )) *
    100.0;

  return Rg;
};

/**
 * TM30 Rf according to the section 4.1 in ANSI/IES TM-30-20
 * IES (2018). Method for evaluating light source color rendition. Technical memorandum, Illuminating Engineering Society, New York.
 *
 * Note that TM30 Rf and CIE Rf are not identical.
 * The CIE normalizes the test and reference using Y2, whereas the TM30 uses Y10.
 * Also, the CIE uses a Plankian Table with 1% increments, whereas the TM30 uses one with 0.25% increments.
 *
 * These two items result in differences that are in the decimals places that are not of practical significance,
 * but they make a difference when trying to validate calculations.
 * The TM30 Excel calculators and online calculator have been tested to match to ~8+ decimal places.
 *
 *
 *
 * @param {*} spectra
 */
export const calculateTM30ColourFidelityIndex = (spectra) => {
  binCount = 16;
  tm30IntermediateValues = {
    tm30CCT: "N/A",
    tm30Duv: "N/A",
    Rg: "N/A",
    RcsH1: "N/A",
    avgHueAngleBin: {},
    RfH1: "N/A",
    tm30Rf: "N/A",
  }; // reset the container
  // Use CIE1931 2 degree standard observer for CCT Ohno
  const { x, y } = calculateTM30Normalization(spectra);
  const { u, v } = cie1960UCS(x, y);
  const { CCT, Duv } = uvToCorrelatedColourTemperatureOhno(u, v, "IES"); // using TM30
  tm30IntermediateValues.tm30CCT = CCT;
  tm30IntermediateValues.tm30Duv = Duv;

  if (CCT <= 0) {
    return tm30IntermediateValues;
  }

  let referenceSpectra = [];
  if (CCT < 4000) {
    // Calculate the relative SPD of a Planckian reference illuminant. Eq. 2
    referenceSpectra = calculatePlanckianSPD(spectra, CCT);
  } else if (CCT > 5000) {
    // Calculate the mixture SPD of a Planckian and a daylight illuminant pair
    referenceSpectra = calculateDaylightSPD(spectra, CCT);
  } else {
    // Calculate a daylight phase
    referenceSpectra = calculateMixtureSPD(spectra, CCT);
  }

  /**
   * Calculate the colour appearance of the 99 TCS under
   * the test source and the reference illuminant
   */
  const XrYrZr = calculateColourAppearance(referenceSpectra, CES99_1NM);
  const XtYtZt = calculateColourAppearance(spectra, CES99_1NM);

  const Jabr = {};
  const Jabt = {};
  Object.keys(XrYrZr).forEach((key) => {
    Jabr[key] = convertToCAMUCS(XrYrZr, key);
  });
  Object.keys(XtYtZt).forEach((key) => {
    Jabt[key] = convertToCAMUCS(XtYtZt, key);
  });

  // CIE224:2017 Eq. 14(a), Calculate delta E, colour-appearance differences, for each of the 99 CES, i, and their average.
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
  const deltaEbar = sum / 99; // off after 6th decimal place precision

  // Convert from colour-appearance difference to colour fidelity index value:
  // const Rfi = toColourFidelityIndex(deltaEi); // Eq. 15(a) Special Colour Fidelity Indices
  const tm30Rf = toColourFidelityIndex(deltaEbar); // Eq. 15(b) General Colour Fidelity Indices
  tm30IntermediateValues.tm30Rf = tm30Rf;

  // get Color Evaluation Sample (CES) Summary
  const cesSummary = getCESSummary(Jabr, Jabt, deltaEi);

  // 4.8 Local Color Fidelity (Rf, hj)
  const RfHj = getLocalColorFidelity(cesSummary);
  // eslint-disable-next-line prefer-destructuring
  tm30IntermediateValues.RfH1 = RfHj[1];

  // 4.7 Local Hue Shift (Rhs, hj)
  // 4.6 Local Chroma Shift (Rcs, hj)
  const avgHueAngleBin = getHueAngleBinAverages(cesSummary);
  tm30IntermediateValues.avgHueAngleBin = avgHueAngleBin;
  // eslint-disable-next-line no-unused-vars
  const [RhsHj, RcsHj] = getLocalHueAndChromaShift(avgHueAngleBin);
  // eslint-disable-next-line prefer-destructuring
  tm30IntermediateValues.RcsH1 = RcsHj[1];

  // // 4.4 Gamut Index (Rg)
  const Rg = getGamutIndex(avgHueAngleBin);
  tm30IntermediateValues.Rg = Rg;

  if (Math.abs(tm30IntermediateValues.tm30Duv) >= 0.05) {
    Object.keys(tm30IntermediateValues).forEach((ki) => {
      if (ki !== "tm30Duv") {
        tm30IntermediateValues[ki] = "N/A";
      }
    });
  }

  return tm30IntermediateValues;
};

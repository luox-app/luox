import VL1924 from "../data/vl1924.json";
import CIES026 from "../data/cies026.json";
import { integrateWithWeights, rowsToSpectra, mapSamples } from "./rows";
import { calculateColourRenderingIndex } from "./colourRenderingIndex";
import { calculateColourFidelityIndex } from "./colourFidelityIndex";
import {
  calculateChromaticity31,
  calculateChromaticity64,
} from "./chromaticity";

export const calculateLuminance = (rows, sampleCount) => {
  const key = "vl1924";
  const K = 683.002;
  const samplesInWatts = integrateWithWeights(rows, sampleCount, VL1924, key);
  return samplesInWatts.map((sample) => sample * K);
};

export const relativeToAbsolute = (rows, sampleCount, relativePowers) => {
  const powers = calculateLuminance(rows, sampleCount);

  return mapSamples(
    rows,
    (wavelength, sample, index) =>
      sample * ((relativePowers[index] || 1) / powers[index])
  );
};

export const calculateAlphaOpic = (rows, sampleCount, key) => {
  const samplesInWatts = integrateWithWeights(rows, sampleCount, CIES026, key);
  return samplesInWatts.map((sample) => sample * 1000);
};

export const calculateEquivalentDaylightAlphaOpic = (
  sConeTotals,
  mConeTotals,
  lConeTotals,
  rodTotals,
  melTotals
) => {
  return {
    lc: lConeTotals.map((s) => s / 1.62890776589039),
    mc: mConeTotals.map((s) => s / 1.45582633881653),
    mel: melTotals.map((s) => s / 1.32621318911359),
    rh: rodTotals.map((s) => s / 1.4497035760559),
    sc: sConeTotals.map((s) => s / 0.817289644883213),
  };
};

export const calculateAlphaOpicEfficiency = (
  sConeTotals,
  mConeTotals,
  lConeTotals,
  rodTotals,
  melTotals,
  luminanceTotals
) => {
  return {
    lc: lConeTotals.map((s, idx) => s / luminanceTotals[idx]),
    mc: mConeTotals.map((s, idx) => s / luminanceTotals[idx]),
    mel: melTotals.map((s, idx) => s / luminanceTotals[idx]),
    rh: rodTotals.map((s, idx) => s / luminanceTotals[idx]),
    sc: sConeTotals.map((s, idx) => s / luminanceTotals[idx]),
  };
};

export const calculateColourRenderingIndices = (rows) => {
  return rowsToSpectra(rows).map((spectra) =>
    calculateColourRenderingIndex(spectra)
  );
};

export const calculateColourFidelityIndices = (rows) => {
  return rowsToSpectra(rows).map((spectra) =>
    calculateColourFidelityIndex(spectra)
  );
};

export const calculate = (rows, sampleCount) => {
  const luminanceTotals = calculateLuminance(rows, sampleCount);
  const sConeTotals = calculateAlphaOpic(rows, sampleCount, "sCone");
  const mConeTotals = calculateAlphaOpic(rows, sampleCount, "mCone");
  const lConeTotals = calculateAlphaOpic(rows, sampleCount, "lCone");
  const rodTotals = calculateAlphaOpic(rows, sampleCount, "rod");
  const melTotals = calculateAlphaOpic(rows, sampleCount, "mel");

  return {
    colourFidelityIndex: calculateColourFidelityIndices(rows),
    colourRenderingIndex: calculateColourRenderingIndices(rows),
    alphaOpicEfficiency: calculateAlphaOpicEfficiency(
      sConeTotals,
      mConeTotals,
      lConeTotals,
      rodTotals,
      melTotals,
      luminanceTotals
    ),
    chromaticity31: calculateChromaticity31(rows, sampleCount),
    chromaticity64: calculateChromaticity64(rows, sampleCount),
    equivalentDaylightAlphaOpic: calculateEquivalentDaylightAlphaOpic(
      sConeTotals,
      mConeTotals,
      lConeTotals,
      rodTotals,
      melTotals
    ),
    lConeTotals,
    luminanceTotals,
    mConeTotals,
    melTotals,
    rodTotals,
    sConeTotals,
  };
};

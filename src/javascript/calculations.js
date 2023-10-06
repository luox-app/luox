import VL1924 from "../data/vl1924.json";
import CIES026 from "../data/cies026.json";
import { integrateWithWeights, rowsToSpectra, mapSamples } from "./rows";
import { calculateColourRenderingIndex } from "./colourRenderingIndex";
import { calculateColourFidelityIndex } from "./colourFidelityIndex";
import { calculateColourFidelityIndexRounded } from "./colourFidelityIndexRounded";
import { calculateTM30ColourFidelityIndex } from "./tm30ColourFidelityIndex";
import {
  calculateChromaticity31,
  calculateChromaticity64,
} from "./chromaticity";

export const calculateLuminance = (selectedRows, selectedRowsSampleCount) => {
  const key = "vl1924";
  const K = 683.002;
  const samplesInWatts = integrateWithWeights(
    selectedRows,
    selectedRowsSampleCount,
    VL1924,
    key
  );
  return samplesInWatts.map((sample) => sample * K);
};

export const relativeToAbsolute = (
  selectedRows,
  selectedRowsSampleCount,
  relativePowers
) => {
  const powers = calculateLuminance(selectedRows, selectedRowsSampleCount);

  return mapSamples(
    selectedRows,
    (wavelength, sample, index) =>
      sample * ((relativePowers[index] || 1) / powers[index])
  );
};

export const calculateAlphaOpic = (
  selectedRows,
  selectedRowsSampleCount,
  key
) => {
  const samplesInWatts = integrateWithWeights(
    selectedRows,
    selectedRowsSampleCount,
    CIES026,
    key
  );
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

export const calculateColourRenderingIndices = (selectedRows) => {
  return rowsToSpectra(selectedRows).map((spectra) =>
    calculateColourRenderingIndex(spectra)
  );
};

export const calculateColourFidelityIndices = (selectedRows) => {
  return rowsToSpectra(selectedRows).map((spectra) =>
    calculateColourFidelityIndex(spectra)
  );
};

export const calculateColourFidelityIndicesRounded = (selectedRows) => {
  return rowsToSpectra(selectedRows).map((spectra) =>
    calculateColourFidelityIndexRounded(spectra)
  );
};

export const calculateTM30ColourFidelityIndices = (selectedRows) => {
  return rowsToSpectra(selectedRows).map((spectra) =>
    calculateTM30ColourFidelityIndex(spectra)
  );
};

export const calculate = (selectedRows, selectedRowsSampleCount) => {
  const luminanceTotals = calculateLuminance(
    selectedRows,
    selectedRowsSampleCount
  );
  const sConeTotals = calculateAlphaOpic(
    selectedRows,
    selectedRowsSampleCount,
    "sCone"
  );
  const mConeTotals = calculateAlphaOpic(
    selectedRows,
    selectedRowsSampleCount,
    "mCone"
  );
  const lConeTotals = calculateAlphaOpic(
    selectedRows,
    selectedRowsSampleCount,
    "lCone"
  );
  const rodTotals = calculateAlphaOpic(
    selectedRows,
    selectedRowsSampleCount,
    "rod"
  );
  const melTotals = calculateAlphaOpic(
    selectedRows,
    selectedRowsSampleCount,
    "mel"
  );

  return {
    colourFidelityIndex: calculateColourFidelityIndices(selectedRows),
    calculateColourFidelityIndexRounded: calculateColourFidelityIndicesRounded(
      selectedRows
    ),
    tm30ColourFidelityIndex: calculateTM30ColourFidelityIndices(selectedRows),
    colourRenderingIndex: calculateColourRenderingIndices(selectedRows),
    alphaOpicEfficiency: calculateAlphaOpicEfficiency(
      sConeTotals,
      mConeTotals,
      lConeTotals,
      rodTotals,
      melTotals,
      luminanceTotals
    ),
    chromaticity31: calculateChromaticity31(
      selectedRows,
      selectedRowsSampleCount
    ),
    chromaticity64: calculateChromaticity64(
      selectedRows,
      selectedRowsSampleCount
    ),
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

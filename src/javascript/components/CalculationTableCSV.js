import Papa from "papaparse";

const CalculationTableCSV = ({
  radianceOrIrradiance,
  measurementLabels,
  luminanceTotals,
  chromaticity31,
  chromaticity64,
  colourRenderingIndices,
  lConeTotals,
  mConeTotals,
  sConeTotals,
  melTotals,
  rodTotals,
  equivalentDaylightAlphaOpic,
  alphaOpicEfficiency,
}) => {
  const units =
    radianceOrIrradiance === "radiance" ? "mW ⋅ m⁻² ⋅ sr" : "mW ⋅ m⁻²";
  const equivalentDaylightUnit =
    radianceOrIrradiance === "radiance" ? "EDL [cd/m²]" : "EDI [lx]";

  const csv = Papa.unparse([
    ["Condition", ...Object.values(measurementLabels)],
    [
      radianceOrIrradiance === "radiance"
        ? "Luminance [cd/m²]"
        : "Illuminance [lx]",
      ...luminanceTotals,
    ],
    ["CIE 1931 xy chromaticity (x)", ...chromaticity31.map(({ x }) => x)],
    ["CIE 1931 xy chromaticity (y)", ...chromaticity31.map(({ y }) => y)],
    ["CIE 1964 x₁₀y₁₀ chromaticity (x₁₀)", ...chromaticity64.map(({ x }) => x)],
    ["CIE 1964 x₁₀y₁₀ chromaticity (y₁₀)", ...chromaticity64.map(({ y }) => y)],
    ["Colour rendering index (CIE Ra)", ...colourRenderingIndices],
    [`S-cone-opic ${radianceOrIrradiance} (${units})`, ...sConeTotals],
    [`M-cone-opic ${radianceOrIrradiance} (${units})`, ...mConeTotals],
    [`L-cone-opic ${radianceOrIrradiance} (${units})`, ...lConeTotals],
    [`Rhodopic ${radianceOrIrradiance} (${units})`, ...rodTotals],
    [`Melanopic ${radianceOrIrradiance} (${units})`, ...melTotals],
    [
      `S-cone-opic ${equivalentDaylightUnit}`,
      ...equivalentDaylightAlphaOpic.sc,
    ],
    [
      `M-cone-opic ${equivalentDaylightUnit}`,
      ...equivalentDaylightAlphaOpic.mc,
    ],
    [
      `L-cone-opic ${equivalentDaylightUnit}`,
      ...equivalentDaylightAlphaOpic.lc,
    ],
    [`Rhodopic ${equivalentDaylightUnit}`, ...equivalentDaylightAlphaOpic.rh],
    [`Melanopic ${equivalentDaylightUnit}`, ...equivalentDaylightAlphaOpic.mel],
    [`S-cone-opic ELR`, ...alphaOpicEfficiency.sc],
    [`M-cone-opic ELR`, ...alphaOpicEfficiency.mc],
    [`L-cone-opic ELR`, ...alphaOpicEfficiency.lc],
    [`Rhodopic ELR`, ...alphaOpicEfficiency.rh],
    [`Melanopic ELR`, ...alphaOpicEfficiency.mel],
  ]);

  return window.URL.createObjectURL(
    new Blob(["\ufeff", csv], { type: "text/csv" })
  );
};

export default CalculationTableCSV;

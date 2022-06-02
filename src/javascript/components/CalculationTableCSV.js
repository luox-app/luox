import Papa from "papaparse";

const CalculationTableCSV = ({
  radianceOrIrradiance,
  measurementLabels,
  luminanceTotals,
  chromaticity31,
  chromaticity64,
  lConeTotals,
  mConeTotals,
  sConeTotals,
  melTotals,
  rodTotals,
  equivalentDaylightAlphaOpic,
  alphaOpicEfficiency,
  colourFidelityIndex,
  tm30ColourFidelityIndex,
  colourRenderingIndex,
}) => {
  const units =
    radianceOrIrradiance === "radiance" ? "mW ⋅ m⁻² ⋅ sr" : "mW ⋅ m⁻²";
  const equivalentDaylightUnit =
    radianceOrIrradiance === "radiance" ? "EDL (cd/m²)" : "EDI (lx)";

  const getIntermediateVals = (indexVals, keySet) => {
    let heading = "";
    const displayArray = [];
    Object.keys(keySet).forEach((ki) => {
      heading = keySet[ki];
      displayArray.push([heading, ...indexVals.map((sample) => sample[ki])]);
    });
    return displayArray;
  };

  const rfKeyset = {
    u: `CIE 1960 UCS [u]`,
    uPrime: `CIE 1976 UCS [u prime]`,
    v: `CIE 1960 UCS [v]`,
    vPrime: `CIE 1976 UCS [v prime]`,
    Duv: "Duv",
  };
  const displayRows = getIntermediateVals(colourFidelityIndex, rfKeyset);

  const tm30Keyset = {
    tm30CCT: `TM30 - CCT (K) - Ohno, 2013`,
    tm30Duv: `TM30 - Duv`,
    tm30Rf: `TM30 - Colour Fidelity Index [Rf]`,
    Rg: `TM30 - Gamut Index (Rg)`,
    RcsH1: `TM30 - Rcs, h1`,
    RfH1: `TM30 - Rf, h1`,
  };
  const tm30rfDisplayRows = getIntermediateVals(
    tm30ColourFidelityIndex,
    tm30Keyset
  );

  // Papa takes an array of rows in the format of
  // ["heading text", reduced values from a package]
  // First construct the array:
  const contentRows = [
    ["Condition", ...Object.values(measurementLabels)],
    [
      radianceOrIrradiance === "radiance"
        ? "Luminance (cd/m²)"
        : "Illuminance (lx)",
      ...luminanceTotals,
    ],
    ["CIE 1931 xy chromaticity [x]", ...chromaticity31.map(({ x }) => x)],
    ["CIE 1931 xy chromaticity [y]", ...chromaticity31.map(({ y }) => y)],
    ["CIE 1964 x₁₀y₁₀ chromaticity [x₁₀]", ...chromaticity64.map(({ x }) => x)],
    ["CIE 1964 x₁₀y₁₀ chromaticity [y₁₀]", ...chromaticity64.map(({ y }) => y)],
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
    [`CCT (K) - Ohno, 2013`, ...colourFidelityIndex.map(({ CCT }) => CCT)],
    [
      `CCT (K) - Robertson, 1968`,
      ...colourRenderingIndex.map(({ CCT }) => CCT),
    ],
    [`Colour Fidelity Index [Rf]`, ...colourFidelityIndex.map(({ Rf }) => Rf)],
    [
      `Colour Rendering Index [Ra]`,
      ...colourRenderingIndex.map(({ Ra }) => Ra),
    ],
  ];

  const csv = Papa.unparse(
    contentRows.concat(displayRows).concat(tm30rfDisplayRows)
  );

  return window.URL.createObjectURL(
    new Blob(["\ufeff", csv], { type: "text/csv" })
  );
};

export default CalculationTableCSV;

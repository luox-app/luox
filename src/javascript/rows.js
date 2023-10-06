export const mapSamples = (selectedRows, func) => {
  return selectedRows.map((row) => {
    const [wavelength, ...samples] = row;
    const mapped = samples.map((sample, sampleIndex) =>
      func(wavelength, sample, sampleIndex)
    );
    return [wavelength, ...mapped];
  });
};

const reduceSamples = (selectedRows, selectedRowsSampleCount, func) => {
  return selectedRows.reduce((acc, row) => {
    const [wavelength, ...samples] = row;
    return acc.map((luminance, index) =>
      func(wavelength, luminance, samples[index])
    );
  }, new Array(selectedRowsSampleCount).fill(0));
};

export const integrateWithWeights = (
  selectedRows,
  selectedRowsSampleCount,
  data,
  key
) => {
  const deltaLambda = selectedRows[1][0] - selectedRows[0][0];

  const weighted = mapSamples(selectedRows, (wavelength, sample) => {
    const weight = data[wavelength][key];
    return sample * weight * deltaLambda;
  });

  return reduceSamples(
    weighted,
    selectedRowsSampleCount,
    (w, runningTotal, sample) => runningTotal + sample
  );
};

export const scaleSamples = (selectedRows, areaUnit, powerUnit) => {
  const powerScale = { microwatt: 1000000, milliwatt: 1000, watt: 1 }[
    powerUnit
  ];
  const areaScale = { millimetresq: 1000000, centimetresq: 10000, metresq: 1 }[
    areaUnit
  ];

  return mapSamples(
    selectedRows,
    (wavelength, sample) => (sample * areaScale) / powerScale
  );
};

export const rowsToSpectra = (selectedRows) => {
  const selectedRowsSampleCount = selectedRows[0].length - 1;

  return [...Array(selectedRowsSampleCount).keys()].map((index) =>
    selectedRows.map(([wavelength, ...measurements]) => [
      wavelength,
      measurements[index],
    ])
  );
};

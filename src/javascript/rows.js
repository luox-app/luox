export const mapSamples = (rows, func) => {
  return rows.map((row) => {
    const [wavelength, ...samples] = row;
    const mapped = samples.map((sample, sampleIndex) =>
      func(wavelength, sample, sampleIndex)
    );
    return [wavelength, ...mapped];
  });
};

const reduceSamples = (rows, sampleCount, func) => {
  return rows.reduce((acc, row) => {
    const [wavelength, ...samples] = row;
    return acc.map((luminance, index) =>
      func(wavelength, luminance, samples[index])
    );
  }, new Array(sampleCount).fill(0));
};

export const integrateWithWeights = (rows, sampleCount, data, key) => {
  const deltaLambda = rows[1][0] - rows[0][0];

  const weighted = mapSamples(rows, (wavelength, sample) => {
    const weight = data[wavelength][key];
    return sample * weight * deltaLambda;
  });

  return reduceSamples(
    weighted,
    sampleCount,
    (w, runningTotal, sample) => runningTotal + sample
  );
};

export const scaleSamples = (rows, areaUnit, powerUnit) => {
  const powerScale = { microwatt: 1000000, milliwatt: 1000, watt: 1 }[
    powerUnit
  ];
  const areaScale = { millimetresq: 1000000, centimetresq: 10000, metresq: 1 }[
    areaUnit
  ];

  return mapSamples(
    rows,
    (wavelength, sample) => (sample * areaScale) / powerScale
  );
};

export const rowsToSpectra = (rows) => {
  const sampleCount = rows[0].length - 1;

  return [...Array(sampleCount).keys()].map((index) =>
    rows.map(([wavelength, ...measurements]) => [
      wavelength,
      measurements[index],
    ])
  );
};

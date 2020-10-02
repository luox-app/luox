import sprague from "./sprague";

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
  const weighted = mapSamples(rows, (wavelength, sample) => {
    const weight = data[wavelength][key];
    return sample * weight;
  });

  return reduceSamples(
    weighted,
    sampleCount,
    (w, runningTotal, sample) => runningTotal + sample
  );
};

export const interpolateData = (rows, sampleCount) => {
  const shortestWavelength = rows[0][0];
  const longestWavelength = rows[rows.length - 1][0];
  const wavelengthInterval = rows[1][0] - rows[0][0];
  const interpolatedRows = [];
  for (
    let wavelength = shortestWavelength;
    wavelength <= longestWavelength;
    wavelength += 1
  ) {
    interpolatedRows[wavelength - shortestWavelength] = [wavelength];
  }
  for (let locationIdx = 1; locationIdx <= sampleCount; locationIdx += 1) {
    const locationIrradiances = rows.map((row) => row[locationIdx]);
    const interpolatedIrradiances = sprague(
      locationIrradiances,
      wavelengthInterval
    );
    for (
      let wavelengthIdx = 0;
      wavelengthIdx < interpolatedRows.length;
      wavelengthIdx += 1
    ) {
      interpolatedRows[wavelengthIdx][locationIdx] =
        interpolatedIrradiances[wavelengthIdx];
    }
  }
  return interpolatedRows;
};

export const scaleSamples = (rows, areaScale, powerScale) =>
  mapSamples(rows, (wavelength, sample) => sample / areaScale / powerScale);

export const rowsToSpectra = (rows) => {
  const sampleCount = rows[0].length - 1;

  return [...Array(sampleCount).keys()].map((index) =>
    rows.map(([wavelength, ...measurements]) => [
      wavelength,
      measurements[index],
    ])
  );
};

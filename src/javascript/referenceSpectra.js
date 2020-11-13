import SPECTRA from "../data/reference_spectra.json";

export const referenceSpectraNames = () => {
  return Object.keys(SPECTRA);
};

export const referenceSpectrum = (name, scaling) => {
  if (name === "none") {
    return { data: [], name };
  }

  const rawData = Object.entries(SPECTRA[name]);
  const maxValue = Math.max(...rawData.map((e) => e[1]));
  const data = [];

  rawData.forEach(([wavelength, value]) => {
    if (scaling === "normalised") {
      data.push({ x: wavelength, y: value / maxValue });
    } else if (scaling === "log10") {
      data.push({ x: wavelength, y: Math.log10(value) });
    } else {
      data.push({ x: wavelength, y: value });
    }
  });

  return { data, name };
};

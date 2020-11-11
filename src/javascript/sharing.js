import { SPD, encodeSPD, decodeSPD } from "spdurl";

export const rowsToURL = (rows, radianceOrIrradiance, csvHeader) => {
  if (rows.length < 2) {
    return "";
  }

  const url = [];
  const unit = radianceOrIrradiance === "radiance" ? "wr" : "wi";

  for (let i = 1; i < rows[0].length; i += 1) {
    const spd = SPD();
    const [[baseWavelength], [secondWavelength]] = rows;

    spd.base = baseWavelength;
    spd.delta = secondWavelength - baseWavelength;
    spd.unit = unit;
    spd.data = rows.map((row) => row[i]);
    spd.name = csvHeader[i - 1];
    url.push(encodeSPD(spd));
  }

  return url.join("|");
};

export const urlToRows = (url) => {
  if (url.length === 0) {
    return [[]];
  }

  try {
    const wavelengths = new Map();
    let radianceOrIrradiance;
    const csvHeader = [];

    url.split("|").forEach((enc) => {
      const { base, delta, unit, data, name } = decodeSPD(enc);

      switch (unit) {
        case "wi":
          radianceOrIrradiance = "irradiance";
          break;
        case "wr":
          radianceOrIrradiance = "radiance";
          break;
        default:
          throw new Error("only SPDURLs in W/m^2 or W/m^2/sr are supported");
      }

      csvHeader.push(name);

      data.forEach((sample, i) => {
        const wavelength = base + delta * i;

        if (!wavelengths.has(wavelength)) {
          wavelengths.set(wavelength, []);
        }

        wavelengths.get(wavelength).push(sample);
      });
    });

    const rows = Array.from(wavelengths).map(([wavelength, samples]) => [
      wavelength,
      ...samples,
    ]);

    return [rows, radianceOrIrradiance, csvHeader];
  } catch (error) {
    return [[]];
  }
};

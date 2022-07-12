import { SPD, encodeSPD, decodeSPD } from "spdurl";
import React, { useEffect, useState } from "react";

/**
 * This function will convert current results page into URL by
 * storing the information into hashed string
 * 
 * @param {*} rows 
 * @param {*} radianceOrIrradiance 
 * @param {*} measurementLabels 
 * @returns 
 */
export const rowsToURL = (rows, radianceOrIrradiance, measurementLabels) => {
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
    spd.name = measurementLabels[i - 1];
    url.push(encodeSPD(spd));
  }

  return url.join("|");
};


/**
 * This function will convert the given url and encode into values
 * required for loading the result page
 * 
 * @param {*} url 
 * @returns 
 */
export const urlToRows = (url) => {
  const [measurementLocalLabels, setMeasurementLocalLabels] = useState({});

  if (url.length === 0) {
    return [[]];
  }

  try {
    const wavelengths = new Map();
    let radianceOrIrradiance;
    const measurementLabelArray = [];

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

      measurementLabelArray.push(name);
      
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
    
    const measurementLabelArrayLocal = {...measurementLabelArray}

    return [rows, radianceOrIrradiance, measurementLabelArrayLocal];
  } catch (error) {
    // console.log(error);
    return [[]];
  }
};

import CIEXYZ31 from "../data/ciexyz31.json";
import CIEXYZ64 from "../data/ciexyz64.json";
import { integrateWithWeights } from "./rows";

const calculateChromaticity = (rows, sampleCount, data) => {
  const allX = integrateWithWeights(rows, sampleCount, data, "X");
  const allY = integrateWithWeights(rows, sampleCount, data, "Y");
  const allZ = integrateWithWeights(rows, sampleCount, data, "Z");

  const output = new Array(sampleCount);

  for (let i = 0; i < output.length; i += 1) {
    const x = allX[i] / (allX[i] + allY[i] + allZ[i]);
    const y = allY[i] / (allX[i] + allY[i] + allZ[i]);
    const Y = allY[i];

    output[i] = {
      Y,
      x,
      y,
    };
  }

  return output;
};

export const calculateChromaticity31 = (rows, sampleCount) => {
  return calculateChromaticity(rows, sampleCount, CIEXYZ31);
};

export const calculateChromaticity64 = (rows, sampleCount) => {
  return calculateChromaticity(rows, sampleCount, CIEXYZ64);
};

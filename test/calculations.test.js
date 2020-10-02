import _ from "lodash";
import {
  calculateEquivalentDaylightAlphaOpic,
  calculateAlphaOpicEfficiency,
  calculateColourRenderingIndices,
} from "../src/javascript/calculations";

describe("calculateEquivalentDaylightAlphaOpic", () => {
  it("calculates the EDI/EDL", () => {
    const sConeTotals = [1.6257];
    const mConeTotals = [133.0005];
    const lConeTotals = [314.7398];
    const rodTotals = [79.3008];
    const melTotals = [52.3937];
    const output = calculateEquivalentDaylightAlphaOpic(
      sConeTotals,
      mConeTotals,
      lConeTotals,
      rodTotals,
      melTotals
    );

    expect(output.sc[0].toFixed(2)).toEqual("1.99");
    expect(output.mc[0].toFixed(2)).toEqual("91.36");
    expect(output.lc[0].toFixed(2)).toEqual("193.22");
    expect(output.rh[0].toFixed(2)).toEqual("54.70");
    expect(output.mel[0].toFixed(2)).toEqual("39.51");
  });
});

describe("calculateAlphaOpicEfficiency", () => {
  it("calculates the EDI/EDL", () => {
    const sConeTotals = [1.6257];
    const mConeTotals = [133.0005];
    const lConeTotals = [314.7398];
    const rodTotals = [79.3008];
    const melTotals = [52.3937];
    const luminanceTotals = [173.9703];
    const output = calculateAlphaOpicEfficiency(
      sConeTotals,
      mConeTotals,
      lConeTotals,
      rodTotals,
      melTotals,
      luminanceTotals
    );

    expect(output.sc[0].toFixed(2)).toEqual("0.01");
    expect(output.mc[0].toFixed(2)).toEqual("0.76");
    expect(output.lc[0].toFixed(2)).toEqual("1.81");
    expect(output.rh[0].toFixed(2)).toEqual("0.46");
    expect(output.mel[0].toFixed(2)).toEqual("0.30");
  });
});

describe("calculateColourRenderingIndices", () => {
  it("returns the colour rendering indices for each sample when input is at 5nm intervals", () => {
    const rows = _.range(380, 781, 5).map((wavelength) => [
      wavelength,
      0.1,
      0.2,
      0.3,
    ]);

    expect(calculateColourRenderingIndices(rows)).toEqual([95, 95, 95]);
  });

  it("returns the colour rendering indices for each sample when input is at 1nm intervals", () => {
    const rows = _.range(380, 781, 1).map((wavelength) => [
      wavelength,
      0.1,
      0.2,
      0.3,
    ]);

    expect(calculateColourRenderingIndices(rows)).toEqual([95, 95, 95]);
  });
});

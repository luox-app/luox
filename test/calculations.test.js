import _ from "lodash";
import { assert } from "chai";
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

    assert.equal(1.99, output.sc[0].toFixed(2));
    assert.equal(91.36, output.mc[0].toFixed(2));
    assert.equal(193.22, output.lc[0].toFixed(2));
    assert.equal(54.7, output.rh[0].toFixed(2));
    assert.equal(39.51, output.mel[0].toFixed(2));
  });
});

describe("calculateEquivalentDaylightAlphaOpic", () => {
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

    assert.equal(0.01, output.sc[0].toFixed(2));
    assert.equal(0.76, output.mc[0].toFixed(2));
    assert.equal(1.81, output.lc[0].toFixed(2));
    assert.equal(0.46, output.rh[0].toFixed(2));
    assert.equal(0.3, output.mel[0].toFixed(2));
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

    assert.deepEqual(calculateColourRenderingIndices(rows), [95, 95, 95]);
  });

  it("returns the colour rendering indices for each sample when input is at 1nm intervals", () => {
    const rows = _.range(380, 781, 1).map((wavelength) => [
      wavelength,
      0.1,
      0.2,
      0.3,
    ]);

    assert.deepEqual(calculateColourRenderingIndices(rows), [95, 95, 95]);
  });
});

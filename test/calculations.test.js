import fs from "fs";
import path from "path";
import _ from "lodash";
import Papa from "papaparse";
import {
  calculateLuminance,
  calculateEquivalentDaylightAlphaOpic,
  calculateAlphaOpicEfficiency,
  calculateColourRenderingIndices,
  calculate,
} from "../src/javascript/calculations";
import spdD651nm100lx from "./fixtures/spd_d65_1nm_100lx.json";
import spdD652nm100lx from "./fixtures/spd_d65_2nm_100lx.json";

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

    expect(
      calculateColourRenderingIndices(rows).map((e) => e.toFixed(0))
    ).toEqual(["95", "95", "95"]);
  });

  it("returns the colour rendering indices for each sample when input is at 1nm intervals", () => {
    const rows = _.range(380, 781, 1).map((wavelength) => [
      wavelength,
      0.1,
      0.2,
      0.3,
    ]);

    expect(
      calculateColourRenderingIndices(rows).map((e) => e.toFixed(0))
    ).toEqual(["95", "95", "95"]);
  });
});

describe("calculateLuminance", () => {
  it("returns 100 lux for our reference D65 spectra spaced every 1nm", () => {
    const [luminance] = calculateLuminance(spdD651nm100lx, 1);
    expect(luminance).toBeCloseTo(100);
  });

  it("returns 100 lux for our reference D65 spectra spaced every 2nm", () => {
    const [luminance] = calculateLuminance(spdD652nm100lx, 1);
    expect(luminance).toBeCloseTo(100);
  });
});

describe("calculate", () => {
  it("returns expected results for 1st measurement in sample CSV", () => {
    const pathToSampleCsv = path.join(__dirname, "../src/examples/sample.csv");
    const sampleCsv = fs.readFileSync(pathToSampleCsv, "utf8");
    const parsed = Papa.parse(sampleCsv, {
      dynamicTyping: true,
      header: false,
      skipEmptyLines: true,
    });
    const rows = parsed.data.slice(1);

    const result = calculate(rows, 1);

    expect(result.sConeTotals[0].toFixed(7)).toEqual("779308.9768492");
    expect(result.mConeTotals[0].toFixed(7)).toEqual("1429290.7782750");
    expect(result.lConeTotals[0].toFixed(7)).toEqual("1610210.5327732");
    expect(result.rodTotals[0].toFixed(7)).toEqual("1295841.6832227");
    expect(result.melTotals[0].toFixed(7)).toEqual("1152778.6991833");
  });

  it("returns expected results for spd1_1nm CSV", () => {
    const pathToFixtureCsv = path.join(__dirname, "fixtures/spd1_1nm.csv");
    const fixtureCsv = fs.readFileSync(pathToFixtureCsv, "utf8");
    const parsed = Papa.parse(fixtureCsv, {
      dynamicTyping: true,
      header: false,
      skipEmptyLines: true,
    });
    const rows = parsed.data.slice(1);

    const result = calculate(rows, 1);

    expect(result.luminanceTotals[0].toFixed(2)).toEqual("38595.35");
    expect((result.sConeTotals[0] / 1e3).toFixed(2)).toEqual("25.30");
    expect((result.mConeTotals[0] / 1e3).toFixed(2)).toEqual("55.11");
    expect((result.lConeTotals[0] / 1e3).toFixed(2)).toEqual("61.75");
    expect((result.rodTotals[0] / 1e3).toFixed(2)).toEqual("50.23");
    expect((result.melTotals[0] / 1e3).toFixed(2)).toEqual("43.79");
  });

  it("returns expected results for spd1_2nm CSV", () => {
    const pathToFixtureCsv = path.join(__dirname, "fixtures/spd1_2nm.csv");
    const fixtureCsv = fs.readFileSync(pathToFixtureCsv, "utf8");
    const parsed = Papa.parse(fixtureCsv, {
      dynamicTyping: true,
      header: false,
      skipEmptyLines: true,
    });
    const rows = parsed.data.slice(1);

    const result = calculate(rows, 1);

    expect(result.luminanceTotals[0].toFixed(2)).toEqual("31819.10");
    expect((result.sConeTotals[0] / 1e3).toFixed(2)).toEqual("28.13");
    expect((result.mConeTotals[0] / 1e3).toFixed(2)).toEqual("43.48");
    expect((result.lConeTotals[0] / 1e3).toFixed(2)).toEqual("52.48");
    expect((result.rodTotals[0] / 1e3).toFixed(2)).toEqual("40.61");
    expect((result.melTotals[0] / 1e3).toFixed(2)).toEqual("37.06");
  });

  it("returns expected results for spd2_1nm CSV", () => {
    const pathToFixtureCsv = path.join(__dirname, "fixtures/spd2_1nm.csv");
    const fixtureCsv = fs.readFileSync(pathToFixtureCsv, "utf8");
    const parsed = Papa.parse(fixtureCsv, {
      dynamicTyping: true,
      header: false,
      skipEmptyLines: true,
    });
    const rows = parsed.data.slice(1);

    const result = calculate(rows, 1);

    expect(result.luminanceTotals[0].toFixed(2)).toEqual("38347.76");
    expect((result.sConeTotals[0] / 1e3).toFixed(2)).toEqual("23.16");
    expect((result.mConeTotals[0] / 1e3).toFixed(2)).toEqual("51.42");
    expect((result.lConeTotals[0] / 1e3).toFixed(2)).toEqual("62.90");
    expect((result.rodTotals[0] / 1e3).toFixed(2)).toEqual("44.97");
    expect((result.melTotals[0] / 1e3).toFixed(2)).toEqual("39.62");
  });

  it("returns expected results for spd2_5nm CSV", () => {
    const pathToFixtureCsv = path.join(__dirname, "fixtures/spd2_5nm.csv");
    const fixtureCsv = fs.readFileSync(pathToFixtureCsv, "utf8");
    const parsed = Papa.parse(fixtureCsv, {
      dynamicTyping: true,
      header: false,
      skipEmptyLines: true,
    });
    const rows = parsed.data.slice(1);

    const result = calculate(rows, 1);

    expect(result.luminanceTotals[0].toFixed(2)).toEqual("1000037.00");
    expect((result.sConeTotals[0] / 1e3).toFixed(2)).toEqual("508.29");
    expect((result.mConeTotals[0] / 1e3).toFixed(2)).toEqual("1281.23");
    expect((result.lConeTotals[0] / 1e3).toFixed(2)).toEqual("1616.08");
    expect((result.rodTotals[0] / 1e3).toFixed(2)).toEqual("924.36");
    expect((result.melTotals[0] / 1e3).toFixed(2)).toEqual("755.08");
  });

  it("returns expected results for spd3_5nm CSV", () => {
    const pathToFixtureCsv = path.join(__dirname, "fixtures/spd3_5nm.csv");
    const fixtureCsv = fs.readFileSync(pathToFixtureCsv, "utf8");
    const parsed = Papa.parse(fixtureCsv, {
      dynamicTyping: true,
      header: false,
      skipEmptyLines: true,
    });
    const rows = parsed.data.slice(1);

    const result = calculate(rows, 1);

    expect(result.luminanceTotals[0].toFixed(2)).toEqual("999991.87");
    expect((result.sConeTotals[0] / 1e3).toFixed(2)).toEqual("378.63");
    expect((result.mConeTotals[0] / 1e3).toFixed(2)).toEqual("1199.80");
    expect((result.lConeTotals[0] / 1e3).toFixed(2)).toEqual("1623.51");
    expect((result.rodTotals[0] / 1e3).toFixed(2)).toEqual("732.96");
    expect((result.melTotals[0] / 1e3).toFixed(2)).toEqual("554.04");
  });
});

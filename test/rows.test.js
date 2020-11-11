import { scaleSamples } from "../src/javascript/rows";

describe("scaleSamples", () => {
  it("converts 1 W/m2 to 1 W/m2", () => {
    const rows = [[380, 1]];
    const areaUnit = "metresq";
    const powerUnit = "watt";
    expect(scaleSamples(rows, areaUnit, powerUnit)).toEqual([[380, 1]]);
  });

  it("converts 1,000 mW/m2 to 1 W/m2", () => {
    const rows = [[380, 1000]];
    const areaUnit = "metresq";
    const powerUnit = "milliwatt";
    expect(scaleSamples(rows, areaUnit, powerUnit)).toEqual([[380, 1]]);
  });

  it("converts 1,000,000 uW/m2 to 1 W/m2", () => {
    const rows = [[380, 1000000]];
    const areaUnit = "metresq";
    const powerUnit = "microwatt";
    expect(scaleSamples(rows, areaUnit, powerUnit)).toEqual([[380, 1]]);
  });

  it("converts 0.0001 W/cm2 to 1 W/m2", () => {
    const rows = [[380, 0.0001]];
    const areaUnit = "centimetresq";
    const powerUnit = "watt";
    expect(scaleSamples(rows, areaUnit, powerUnit)).toEqual([[380, 1]]);
  });

  it("converts 0.000001 W/mm2 to 1 W/m2", () => {
    const rows = [[380, 0.000001]];
    const areaUnit = "millimetresq";
    const powerUnit = "watt";
    expect(scaleSamples(rows, areaUnit, powerUnit)).toEqual([[380, 1]]);
  });

  it("converts between combinations of area and power units e.g. 0.1 mW/cm2 to 1 W/m2", () => {
    const rows = [[380, 0.1]];
    const areaUnit = "centimetresq";
    const powerUnit = "milliwatt";
    expect(scaleSamples(rows, areaUnit, powerUnit)).toEqual([[380, 1]]);
  });
});

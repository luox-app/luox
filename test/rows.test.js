import { scaleSamples } from "../src/javascript/rows";

describe("scaleSamples", () => {
  it("scales the input samples by the powerUnit", () => {
    const rows = [[380, 1]];
    const areaUnit = "metresq";
    const powerUnit = "milliwatt";
    expect(scaleSamples(rows, areaUnit, powerUnit)).toEqual([[380, 0.001]]);
  });

  it("scales the input samples by the areaScale", () => {
    const rows = [[380, 1]];
    const areaUnit = "centimetresq";
    const powerUnit = "watt";
    expect(scaleSamples(rows, areaUnit, powerUnit)).toEqual([[380, 0.0001]]);
  });
});

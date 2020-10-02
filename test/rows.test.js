import { scaleSamples } from "../src/javascript/rows";

describe("scaleSamples", () => {
  it("scales the input samples by the powerScale", () => {
    const rows = [[380, 1]];
    const areaScale = 1;
    const powerScale = 1000;
    expect(scaleSamples(rows, areaScale, powerScale)).toEqual([[380, 0.001]]);
  });

  it("scales the input samples by the areaScale", () => {
    const rows = [[380, 1]];
    const areaScale = 10000;
    const powerScale = 1;
    expect(scaleSamples(rows, areaScale, powerScale)).toEqual([[380, 0.0001]]);
  });
});

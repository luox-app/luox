import { assert } from "chai";
import { scaleSamples } from "../src/javascript/rows";

describe("scaleSamples", () => {
  it("scales the input samples by the powerScale", () => {
    const rows = [[380, 1]];
    const areaScale = 1;
    const powerScale = 1000;
    assert.deepEqual([[380, 0.001]], scaleSamples(rows, areaScale, powerScale));
  });

  it("scales the input samples by the areaScale", () => {
    const rows = [[380, 1]];
    const areaScale = 10000;
    const powerScale = 1;
    assert.deepEqual(
      [[380, 0.0001]],
      scaleSamples(rows, areaScale, powerScale)
    );
  });
});

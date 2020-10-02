import { asExponential } from "../src/javascript/helpers";

describe("asExponential", () => {
  it("should return a number larger than 1 in scientific notation", () => {
    expect(asExponential(136)).toEqual("1.36e+02");
  });

  it("should return a number smaller than 1 in scientific notation", () => {
    expect(asExponential(0.0136)).toEqual("1.36e-02");
  });

  it("should not have a leading zero in the exponent for larger numbers", () => {
    expect(asExponential(13600000000)).toEqual("1.36e+10");
  });
});

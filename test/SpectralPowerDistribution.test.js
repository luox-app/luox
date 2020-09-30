import { assert } from "chai";
import _ from "lodash";
import SpectralPowerDistribution from "../src/javascript/SpectralPowerDistribution";

/* eslint-disable-next-line max-lines-per-function */
describe("SpectralPowerDistribution", () => {
  describe("interval", () => {
    it("returns 1 if the distribution is at 1nm intervals", () => {
      const distribution = new SpectralPowerDistribution(
        _.range(380, 781, 1).map((wavelength) => [wavelength, 1])
      );

      assert.equal(distribution.interval, 1);
    });

    it("returns 5 if the distribution is at 5nm intervals", () => {
      const distribution = new SpectralPowerDistribution(
        _.range(380, 781, 5).map((wavelength) => [wavelength, 1])
      );

      assert.equal(distribution.interval, 5);
    });

    it("throws an error if the wavelengths are at irregular intervals", () => {
      const distribution = new SpectralPowerDistribution([
        [380, 1],
        [383, 1],
        [384, 1],
        [400, 1],
      ]);

      assert.throws(
        () => distribution.interval,
        "Wavelengths are at irregular intervals"
      );
    });
  });

  describe("wavelengths", () => {
    it("returns an array of the wavelengths", () => {
      const distribution = new SpectralPowerDistribution([
        [380, 1],
        [385, 2],
        [390, 3],
        [395, 4],
        [400, 5],
      ]);

      assert.deepEqual(distribution.wavelengths, [380, 385, 390, 395, 400]);
    });
  });

  describe("measurements", () => {
    it("returns each measurement as its own array of arrays", () => {
      const distribution = new SpectralPowerDistribution([
        [380, 1, 10],
        [385, 2, 20],
        [390, 3, 30],
        [395, 4, 40],
        [400, 5, 50],
      ]);

      assert.deepEqual(distribution.measurements, [
        [
          [380, 1],
          [385, 2],
          [390, 3],
          [395, 4],
          [400, 5],
        ],
        [
          [380, 10],
          [385, 20],
          [390, 30],
          [395, 40],
          [400, 50],
        ],
      ]);
    });
  });
});

import { rowsToURL, urlToRows } from "../src/javascript/sharing";

describe("rowsToURL", () => {
  it("returns an empty string if there aren't enough rows", () => {
    expect(rowsToURL([[380, 1]], "irradiance")).toEqual("");
  });

  it("returns a single SPDURL if there is only one set of samples", () => {
    expect(
      rowsToURL(
        [
          [380, 1],
          [385, 2],
        ],
        "irradiance"
      )
    ).toEqual("spd1,380,5,wi,5,pf6r");
  });

  it("returns a SPDURL with the wr unit for radiances", () => {
    expect(
      rowsToURL(
        [
          [380, 1],
          [385, 2],
        ],
        "radiance"
      )
    ).toEqual("spd1,380,5,wr,5,pf6r");
  });

  it("returns two SPDURLs joined with a pipe if there are multiple sets of samples", () => {
    expect(
      rowsToURL(
        [
          [380, 1, 3],
          [385, 2, 4],
        ],
        "irradiance"
      )
    ).toEqual("spd1,380,5,wi,5,pf6r|spd1,380,5,wi,9,y06r");
  });

  it("calculates the base from the first row", () => {
    expect(
      rowsToURL(
        [
          [390, 1],
          [400, 2],
        ],
        "irradiance"
      )
    ).toEqual("spd1,390,10,wi,5,pf6r");
  });

  it("calculates the delta from the first two rows", () => {
    expect(
      rowsToURL(
        [
          [390, 1],
          [410, 2],
        ],
        "irradiance"
      )
    ).toEqual("spd1,390,20,wi,5,pf6r");
  });
});

describe("urlToRows", () => {
  it("returns empty rows if the URL is empty", () => {
    const [rows] = urlToRows("");

    expect(rows).toEqual([]);
  });

  it("returns the rows for a single SPDURL", () => {
    const [[[wavelength1, sample1], [wavelength2, sample2]]] = urlToRows(
      "spd1,380,5,wi,5,pf6r"
    );

    expect(wavelength1).toEqual(380);
    expect(sample1).toBeCloseTo(1.0);
    expect(wavelength2).toEqual(385);
    expect(sample2).toBeCloseTo(2.0);
  });

  it("returns irradiance if the SPDURL unit is wi", () => {
    const [, radianceOrIrradiance] = urlToRows("spd1,380,5,wi,5,pf6r");

    expect(radianceOrIrradiance).toEqual("irradiance");
  });

  it("returns radiance if the SPDURL unit is wr", () => {
    const [, radianceOrIrradiance] = urlToRows("spd1,380,5,wr,5,pf6r");

    expect(radianceOrIrradiance).toEqual("radiance");
  });

  it("returns the rows for multiple SPDURLs", () => {
    const [[[wavelength, sample1, sample2]]] = urlToRows(
      "spd1,380,5,wi,5,pf6r|spd1,380,5,wi,9,y06r"
    );

    expect(wavelength).toEqual(380);
    expect(sample1).toBeCloseTo(1.0);
    expect(sample2).toBeCloseTo(3.0);
  });

  it("returns an empty rows for unsupported SPDURLs", () => {
    const [rows] = urlToRows("spd1,380,5,uwi,5,pf6r");

    expect(rows).toEqual([]);
  });
});
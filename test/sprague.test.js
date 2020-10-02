import sprague from "../src/javascript/sprague";

describe("sprague", () => {
  it("should return unmodified input when interpolation factor is 1", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    expect(sprague(input, 1)).toEqual(input);
  });

  it("should generate intermediate values when interpolation factor is 2", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const expected = [
      1,
      1.5,
      2,
      2.5,
      3,
      3.5,
      4,
      4.5,
      5,
      5.5,
      6,
      6.5,
      7,
      7.5,
      8,
      8.5,
      9,
      9.5,
      10,
      10.5,
      11,
      11.5,
      12,
      12.5,
      13,
      13.5,
      14,
      14.5,
      15,
      15.5,
      16,
    ];

    expect(sprague(input, 2)).toEqual(expected);
  });

  it("should generate intermediate values when interpolation factor is 3", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    const expected = [
      1.0,
      1.3333,
      1.6667,
      2.0,
      2.3333,
      2.6667,
      3.0,
      3.3333,
      3.6667,
      4.0,
      4.3333,
      4.6667,
      5.0,
      5.3333,
      5.6667,
      6.0,
      6.3333,
      6.6667,
      7.0,
      7.3333,
      7.6667,
      8.0,
      8.3333,
      8.6667,
      9.0,
      9.3333,
      9.6667,
      10.0,
      10.3333,
      10.6667,
      11.0,
      11.3333,
      11.6667,
      12.0,
      12.3333,
      12.6667,
      13.0,
      13.3333,
      13.6667,
      14.0,
      14.3333,
      14.6667,
      15.0,
      15.3333,
      15.6667,
      16.0,
    ];
    const actual = sprague(input, 3);

    expect(actual.map((n) => n.toFixed(4))).toEqual(
      expected.map((n) => n.toFixed(4))
    );
  });

  it("should generate the same values as the matlab code for the same input", () => {
    const input = [
      9.73e-5,
      1.67e-6,
      5.56e-5,
      7.15e-4,
      6.14e-3,
      9.54e-3,
      2.63e-3,
      6.9e-4,
      2.35e-4,
      9.64e-5,
      5.61e-5,
      3.04e-5,
      3.78e-5,
      3.38e-5,
      6.34e-5,
      1.22e-4,
    ];
    const expected = [
      0.0000973,
      0.0000830695,
      0.0000725613,
      0.0000600094,
      0.0000438577,
    ];

    const actual = sprague(input, 10).slice(0, 5);

    expect(actual.map((n) => n.toFixed(10))).toEqual(
      expected.map((n) => n.toFixed(10))
    );
  });
});

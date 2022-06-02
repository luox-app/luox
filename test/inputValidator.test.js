import validateInput from "../src/javascript/inputValidator";

expect.extend({
  toHaveMessage(validationErrors, validationMessage) {
    const pass = validationErrors
      .map((v) => v.message)
      .includes(validationMessage);

    if (pass) {
      return {
        message: () =>
          `expected ${JSON.stringify(
            validationErrors
          )} not to contain an error with message ${validationMessage}`,
        pass: true,
      };
    }

    return {
      message: () =>
        `expected ${JSON.stringify(
          validationErrors
        )} to contain an error with message ${validationMessage}`,
      pass: false,
    };
  },
});

describe("inputValidator", () => {
  it("should return no validation errors for valid input", () => {
    expect(
      validateInput(
        ["lambda", "Observation 1"],
        [
          [380, 1],
          [385, 2],
        ]
      )
    ).toEqual([]);
  });

  it("should return a validation error if the number of header columns is greater than 6", () => {
    expect(
      validateInput(["lambda", "M1", "M2", "M3", "M4", "M5", "M6"], [[]])
    ).toHaveMessage(
      "Input CSV must contain no more than 5 observations in light user mode. Please check the box for the power user mode if you wish to process more columns."
    );
  });

  it("should return a validation error if the number of columns in the header is different to the body", () => {
    expect(validateInput(["lambda", "M1"], [[380]])).toHaveMessage(
      "Expected to have one header for each column"
    );
  });

  it("should return a validation error if there is a NaN value in the body", () => {
    expect(
      validateInput(
        ["lambda", "M1"],
        [
          [380, NaN],
          [390, 0.02],
        ]
      )
    ).toHaveMessage("Values must be valid numbers");
  });

  it("should return a validation error if there is a null value in the header", () => {
    expect(validateInput(["lambda", null], [[380, 0.01]])).toHaveMessage(
      "Please check if you have any empty columns, or if every line ends with a comma. If it does, please remove the comma at the end of the line."
    );
  });

  it("should return a validation error if there is a null value in the body", () => {
    expect(
      validateInput(
        ["lambda", "M1"],
        [
          [380, null],
          [390, 0.02],
        ]
      )
    ).toHaveMessage(
      "Please check if you have any empty columns, or if every line ends with a comma. If it does, please remove the comma at the end of the line."
    );
  });

  it("should return a validation error if the number of rows in the body is less than two", () => {
    expect(validateInput(["lambda", "M1"], [[380, 0.01]])).toHaveMessage(
      "Data for at least 2 wavelengths is required"
    );
  });

  it("should return a validation error if the frequency column is not sorted", () => {
    expect(validateInput(["lambda"], [[380], [390], [385]])).toHaveMessage(
      "The first column should contain wavelengths sorted in ascending order"
    );
  });

  it("should return a validation error if the frequency column contains non-integer values", () => {
    expect(validateInput(["lambda"], [[380], [380.5]])).toHaveMessage(
      "Every element in the first (wavelength) column should be an integer and in the range of visible light (e.g. 380, 381, ... 780)"
    );
  });

  it("should return a validation error if the frequency column has inconsistent spacing", () => {
    expect(validateInput(["lambda"], [[380], [381], [383]])).toHaveMessage(
      "The first (wavelength) column should have consistent spacing (e.g. 380, 385, 390 ... 780)"
    );
  });

  it("should return a validation error if the frequency column has spacing of less than 1", () => {
    expect(validateInput(["lambda"], [[380], [380], [380]])).toHaveMessage(
      "The first (wavelength) column should have a spacing of at least 1. Currently the spacing is 0."
    );
  });

  it("should return a validation error if the frequency column has spacing of more than 10", () => {
    expect(validateInput(["lambda"], [[380], [391], [402]])).toHaveMessage(
      "The first (wavelength) column should have a spacing of less than 10. Currently the spacing is 11."
    );
  });
});

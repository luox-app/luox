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
      validateInput(["lambda", "1", "2", "3", "4", "5", "6"], [[]])
    ).toHaveMessage("Input CSV must contain no more than 5 observations");
  });

  it("should return a validation error if the number of columns in the header is different to the body", () => {
    expect(validateInput(["lambda", "1"], [380])).toHaveMessage(
      "Expected to have one header for each column"
    );
  });

  it("should return a validation error if the frequency column is not sorted", () => {
    expect(validateInput(["lambda"], [[380], [390], [385]])).toHaveMessage(
      "The first column should contain wavelengths sorted in ascending order"
    );
  });

  it("should return a validation error if the frequency column contains non-integer values", () => {
    expect(validateInput(["lambda"], [[380], [380.5]])).toHaveMessage(
      "Every element in the first (wavelength) column should be an integer and in the range of visible light (e.g. 380, 381, ... 740)"
    );
  });

  it("should return a validation error if the frequency column has inconsistent spacing", () => {
    expect(validateInput(["lambda"], [[380], [381], [383]])).toHaveMessage(
      "The first (wavelength) column should have consistent spacing (e.g. 380, 385, 390 ... 740)"
    );
  });
});

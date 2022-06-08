const validateNumberOfObservations = (header) => {
  if (header.length > 6) {
    return {
      row: 0,
      message:
        "Input CSV must contain no more than 5 observations in light user mode. Please check the box for the power user mode if you wish to process more columns.",
    };
  }
  return null;
};

const validateNumbers = (body) => {
  const firstRowWithNaN = body.findIndex((row) =>
    row.some((value) => Number.isNaN(value))
  );

  if (firstRowWithNaN >= 0) {
    return {
      row: firstRowWithNaN + 1,
      message: "Values must be valid numbers",
    };
  }

  return null;
};

const validateHeaderForEachColumn = (header, body) => {
  const headerColumnCount = header ? header.length : 0;
  const bodyColumnCount = body ? body[0].length : 0;

  if (headerColumnCount !== bodyColumnCount) {
    return {
      row: 1,
      message: "Expected to have one header for each column",
    };
  }

  return null;
};

const validateNonNullValues = (header, body) => {
  const allRows = [header].concat(body);
  const hasNull = (value) => value === null;
  const firstRowWithNull = allRows.findIndex((row) => row.some(hasNull));

  if (firstRowWithNull >= 0) {
    return {
      row: firstRowWithNull,
      message:
        "Please check if you have any empty columns, or if every line ends with a comma. If it does, please remove the comma at the end of the line.",
    };
  }

  return null;
};

const validateNumberOfWavelengths = (body) => {
  if (body.length < 2) {
    return {
      row: null,
      message: "Data for at least 2 wavelengths is required",
    };
  }

  return null;
};

const validateWavelengthColumnSorted = (body) => {
  const isSortedAscending = (array) => {
    return array.every(function elementGreaterThanPrevious(element, idx) {
      return idx === 0 || element > array[idx - 1];
    });
  };

  const wavelengths = body.map((row) => row[0]);

  if (!isSortedAscending(wavelengths)) {
    return {
      row: null,
      message:
        "The first column should contain wavelengths sorted in ascending order",
    };
  }

  return null;
};

const range = (start, stop, step) => {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
};

const validateWavelengthColumnContainsIntegerWavelengths = (body) => {
  const wavelengths = body.map((row) => row[0]);

  const isIntegerAndVisible = (array) => {
    return array.every(function visibleIntegerWavelengthsIncludes(element) {
      return range(380, 780, 1).includes(element);
    });
  };

  if (!isIntegerAndVisible(wavelengths)) {
    return {
      row: null,
      message:
        "Every element in the first (wavelength) column should be an integer and in the range of visible light (e.g. 380, 381, ... 780)",
    };
  }

  return null;
};

const validateWavelengthColumnHasConsistentDelta = (body) => {
  const wavelengths = body.map((row) => row[0]);
  const deltas = wavelengths.slice(1).map((v, i) => v - wavelengths[i]);
  const everyDeltaEqual = deltas.every((e) => e === deltas[0]);

  if (!everyDeltaEqual) {
    return {
      row: null,
      message:
        "The first (wavelength) column should have consistent spacing (e.g. 380, 385, 390 ... 780)",
    };
  }

  return null;
};

const validateWavelengthDeltaIsInRange = (body) => {
  const wavelengthDelta = (body[1] || [])[0] - (body[0] || [])[0];

  if (wavelengthDelta < 1) {
    return {
      row: null,
      message: `The first (wavelength) column should have a spacing of at least 1. Currently the spacing is ${wavelengthDelta}.`,
    };
  }

  if (wavelengthDelta > 10) {
    return {
      row: null,
      message: `The first (wavelength) column should have a spacing of less than 10. Currently the spacing is ${wavelengthDelta}.`,
    };
  }

  return null;
};

const inputValidator = (header, body, powerMode) => {
  const errors = [];
  if (!powerMode) {
    errors.push(validateNumberOfObservations(header));
  }
  errors.push(validateNumbers(body));
  errors.push(validateHeaderForEachColumn(header, body));
  errors.push(validateNonNullValues(header, body));
  errors.push(validateNumberOfWavelengths(body));
  errors.push(validateWavelengthColumnSorted(body));
  errors.push(validateWavelengthColumnContainsIntegerWavelengths(body));
  errors.push(validateWavelengthColumnHasConsistentDelta(body));
  errors.push(validateWavelengthDeltaIsInRange(body));

  return errors.filter((e) => e);
};

export default inputValidator;

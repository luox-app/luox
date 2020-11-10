const validateNumberOfObservations = (header) => {
  if (header.length > 6) {
    return {
      row: 1,
      message: "Input CSV must contain no more than 5 observations",
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

const validateWavelengthColumnSorted = (body) => {
  const isSortedAscending = (array) => {
    return array.every(function elementGreaterThanPrevious(element, idx) {
      return idx === 0 || element > array[idx - 1];
    });
  };

  const wavelengths = body.map((row) => parseFloat(row[0]));

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

const inputValidator = (header, body) => {
  const errors = [];

  errors.push(validateNumberOfObservations(header));
  errors.push(validateHeaderForEachColumn(header, body));
  errors.push(validateWavelengthColumnSorted(body));
  errors.push(validateWavelengthColumnContainsIntegerWavelengths(body));
  errors.push(validateWavelengthColumnHasConsistentDelta(body));

  return errors.filter((e) => e);
};

export default inputValidator;

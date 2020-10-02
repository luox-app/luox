import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import SpectraCSV from "./SpectraCSV";
import { asExponential, radianceOrIrradianceSIUnit } from "../helpers";

const SpectraTableRow = ({ wavelength, samples, exponentialNotation }) => {
  /* eslint-disable react/no-array-index-key */
  return (
    <tr>
      <th>{wavelength}</th>
      {samples.map((sample, index) => (
        <td key={index}>
          {exponentialNotation ? asExponential(sample) : sample}
        </td>
      ))}
    </tr>
  );
};

SpectraTableRow.propTypes = {
  wavelength: PropTypes.number.isRequired,
  samples: PropTypes.arrayOf(PropTypes.number).isRequired,
  exponentialNotation: PropTypes.bool.isRequired,
};

const SpectraTable = ({ rows, sampleCount, radianceOrIrradiance }) => {
  const [exponentialNotation, setExponentialNotation] = useState(true);
  const spectraDownloadUrl = useMemo(
    () => SpectraCSV({ radianceOrIrradiance, rows }),
    [radianceOrIrradiance, rows]
  );

  const handleExponentialNotation = () => {
    setExponentialNotation((checked) => !checked);
  };

  return (
    <section>
      <div className="row">
        <div className="col text-left">
          <label htmlFor="spectra-exponential-notation">
            <input
              type="checkbox"
              checked={exponentialNotation}
              onChange={handleExponentialNotation}
              id="spectra-exponential-notation"
            />
            {" Use exponential notation?"}
          </label>
        </div>
        <div className="col text-right">
          <a
            download="download-spectrum.csv"
            className="btn btn-outline-secondary"
            href={spectraDownloadUrl}
          >
            Download CSV
          </a>
        </div>
      </div>
      <table className="table table-sm mt-3 result-table">
        <thead>
          <tr>
            <th>Wavelength [nm]</th>
            <th colSpan={sampleCount}>
              Spectral {radianceOrIrradiance} [
              {radianceOrIrradianceSIUnit(radianceOrIrradiance)}]
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([wavelength, ...samples], index) => (
            <SpectraTableRow
              key={index}
              wavelength={wavelength}
              samples={samples}
              exponentialNotation={exponentialNotation}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

SpectraTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  sampleCount: PropTypes.number.isRequired,
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
};

export default SpectraTable;

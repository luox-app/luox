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

const SpectraTableEllipsisRow = ({ exampleRow }) => {
  return (
    <tr>
      {exampleRow.map((_, i) => (
        <td key={i}>...</td>
      ))}
    </tr>
  );
};

SpectraTableEllipsisRow.propTypes = {
  exampleRow: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const SpectraTable = ({ rows, sampleCount, radianceOrIrradiance }) => {
  const [exponentialNotation, setExponentialNotation] = useState(true);
  const [displayAllRows, setDisplayAllRows] = useState(false);

  const spectraDownloadUrl = useMemo(
    () => SpectraCSV({ radianceOrIrradiance, rows }),
    [radianceOrIrradiance, rows]
  );

  const handleExponentialNotation = () => {
    setExponentialNotation((checked) => !checked);
  };

  const handleDisplayAllRows = () => {
    setDisplayAllRows((checked) => !checked);
  };

  const truncateTable = () => {
    return rows.length > 5;
  };

  const rowsToDisplay = () => {
    return displayAllRows ? rows : rows.slice(0, 5);
  };

  const displayEllipsisRow = () => {
    return truncateTable() && !displayAllRows;
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
        <div className="col text-center">
          {truncateTable() && (
            <label htmlFor="spectra-all-rows">
              <input
                type="checkbox"
                checked={displayAllRows}
                onChange={handleDisplayAllRows}
                id="spectra-all-rows"
              />
              {" Display all rows?"}
            </label>
          )}
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
          {rowsToDisplay().map(([wavelength, ...samples], index) => (
            <SpectraTableRow
              key={index}
              wavelength={wavelength}
              samples={samples}
              exponentialNotation={exponentialNotation}
            />
          ))}
          {displayEllipsisRow() && (
            <SpectraTableEllipsisRow exampleRow={rows[0]} />
          )}
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

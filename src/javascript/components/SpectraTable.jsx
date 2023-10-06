import React, { useState, useMemo, useEffect } from "react";
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

const SpectraTableHeader = ({
  selectedRowsSampleCount,
  measurementLabels,
  radianceOrIrradiance,
}) => {
  /* eslint-disable react/no-array-index-key */

  return (
    <thead>
      <tr>
        <th colSpan={selectedRowsSampleCount + 1} className="text-center">
          Spectral {radianceOrIrradiance} [
          {radianceOrIrradianceSIUnit(radianceOrIrradiance)}]
        </th>
      </tr>
      <tr>
        <th>Wavelength [nm]</th>
        {Object.entries(measurementLabels).map(([key, value]) => (
          <th key={key}>{value}</th>
        ))}
      </tr>
    </thead>
  );
};

SpectraTableHeader.propTypes = {
  selectedRowsSampleCount: PropTypes.number.isRequired,
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
};

const SpectraTable = ({
  selectedRows,
  selectedRowsSampleCount,
  radianceOrIrradiance,
  measurementLabels,
}) => {
  const [exponentialNotation, setExponentialNotation] = useState(true);
  const [displayAllRows, setDisplayAllRows] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const tooltipTutorial = localStorage.getItem("tooltip_tutorial");
    if (tooltipTutorial === "1") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  });

  const spectraDownloadUrl = useMemo(
    () => SpectraCSV({ radianceOrIrradiance, selectedRows }),
    [radianceOrIrradiance, selectedRows]
  );

  const handleExponentialNotation = () => {
    setExponentialNotation((checked) => !checked);
  };

  const handleDisplayAllRows = () => {
    setDisplayAllRows((checked) => !checked);
  };

  const truncateTable = () => {
    return selectedRows.length > 5;
  };

  const rowsToDisplay = () => {
    return displayAllRows ? selectedRows : selectedRows.slice(0, 5);
  };

  const displayEllipsisRow = () => {
    return truncateTable() && !displayAllRows;
  };

  return (
    <section>
      <div className="row">
        <div className="col text-left py-2">
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
        <div className="col text-center py-2">
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
            className="btn btn-outline-secondary tooltip"
            href={spectraDownloadUrl}
          >
            Download CSV
            <span
              className={isActive ? "tooltiptext" : "tooltiptext displayNone"}
            >
              Download Data as CSV
            </span>
          </a>
        </div>
      </div>
      <div className="row table-row">
        <table className="table table-sm table-striped table-bordered table-hover generate-csv-table mt-5 result-table">
          <SpectraTableHeader
            selectedRowsSampleCount={selectedRowsSampleCount}
            measurementLabels={measurementLabels}
            radianceOrIrradiance={radianceOrIrradiance}
          />
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
              <SpectraTableEllipsisRow exampleRow={selectedRows[0]} />
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

SpectraTable.propTypes = {
  selectedRows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    .isRequired,
  selectedRowsSampleCount: PropTypes.number.isRequired,
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default SpectraTable;

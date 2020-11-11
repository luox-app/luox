import React from "react";
import PropTypes from "prop-types";
import CalculationTable from "./CalculationTable";
import SpectraTable from "./SpectraTable";
import Chart from "./Chart";
import { rowsToURL } from "../sharing";

const Results = ({
  rows,
  sampleCount,
  radianceOrIrradiance,
  measurementLabels,
}) => {
  if (rows.length === 0) {
    return null;
  }

  const sharingID = rowsToURL(rows, radianceOrIrradiance, measurementLabels);

  const copySharingURL = ({ target }) => {
    target.setSelectionRange(0, target.value.length);
    document.execCommand("copy");
  };

  return (
    <div className="row">
      <div className="col">
        <h2 className="my-3">
          Step 3. Check we have understood your input correctly.
        </h2>

        <Chart
          radianceOrIrradiance={radianceOrIrradiance}
          rows={rows}
          sampleCount={sampleCount}
          measurementLabels={measurementLabels}
        />

        <h2 className="my-3">
          Step 4. Download the stimulus specification tables and include them in
          your report.
        </h2>

        <CalculationTable
          rows={rows}
          sampleCount={sampleCount}
          radianceOrIrradiance={radianceOrIrradiance}
          measurementLabels={measurementLabels}
        />

        <h2 className="my-3">
          Step 5. Include the full spectral power distribution in your
          supplementary material.
        </h2>

        <p>
          Where a journal does not offer the capability of making Supplementary
          Material available, files can be made available on{" "}
          <a href="https://figshare.com/">Figshare</a>, the{" "}
          <a href="https://osf.io/">Open Science Framework</a> or{" "}
          <a href="https://github.com/">GitHub</a>. Some institutions also offer
          repositories for research data.
        </p>

        <SpectraTable
          rows={rows}
          sampleCount={sampleCount}
          radianceOrIrradiance={radianceOrIrradiance}
          measurementLabels={measurementLabels}
        />

        <h2 className="my-3">
          Step 6. Share an online version of this report.
        </h2>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={`${window.location.origin}/u/${sharingID}`}
            onClick={copySharingURL}
            readOnly
          />
          <small className="form-text text-muted">
            Click above to copy the URL to your clipboard
          </small>
        </div>
      </div>
    </div>
  );
};

Results.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  sampleCount: PropTypes.number.isRequired,
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
  measurementLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Results;

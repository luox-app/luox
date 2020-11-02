import React from "react";
import PropTypes from "prop-types";
import CalculationTable from "./CalculationTable";
import SpectraTable from "./SpectraTable";
import Chart from "./Chart";
import { rowsToURL } from "../sharing";

const Results = ({ rows, sampleCount, radianceOrIrradiance }) => {
  if (rows.length === 0) {
    return null;
  }

  const sharingID = rowsToURL(rows, radianceOrIrradiance);

  return (
    <div className="row">
      <div className="col">
        <h2 className="my-3">
          Step 2. Check we have understood your input correctly.
        </h2>

        <Chart
          radianceOrIrradiance={radianceOrIrradiance}
          rows={rows}
          sampleCount={sampleCount}
        />

        <h2 className="my-3">
          Step 3. Download the stimulus specification tables and include them in
          your report.
        </h2>

        <CalculationTable
          rows={rows}
          sampleCount={sampleCount}
          radianceOrIrradiance={radianceOrIrradiance}
        />

        <h2 className="my-3">
          Step 4. Include the full spectral power distribution in your
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
        />

        <h2 className="my-3">
          Step 5. Share an online version of this report.
        </h2>

        <p>
          <a href={`/u/${sharingID}`} className="btn btn-outline-secondary">
            Share this report with others
          </a>
        </p>
      </div>
    </div>
  );
};

Results.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  sampleCount: PropTypes.number.isRequired,
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
};

export default Results;

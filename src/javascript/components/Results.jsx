import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import PropTypes from "prop-types";
import CalculationTable from "./CalculationTable";
import SpectraTable from "./SpectraTable";
import Chart from "./Chart";
import { rowsToURL } from "../sharing";

// export const t0 = performance.now();

const Results = ({
  rows,
  sampleCount,
  radianceOrIrradiance,
  measurementLabels,
  powerMode,
  isLoaded,
  setLoaded,
  refHAB,
  setRefHAB,
}) => {
  const originalButtonText = "Copy to clipboard";
  const [buttonText, setButtonText] = useState(originalButtonText);

  if (rows.length === 0) {
    return null;
  }

  const sharingID = rowsToURL(rows, radianceOrIrradiance, measurementLabels);
  const sharingURL = `${window.location.origin}/u/${sharingID}`;

  const buttonDisabled = () => {
    return buttonText !== originalButtonText;
  };

  const copySharingURL = () => {
    const sharingURLInput = document.querySelector("input#sharing-url");
    sharingURLInput.select();
    if (document.execCommand("copy")) {
      setButtonText("Copied!");
    } else {
      setButtonText("Failed to copy!");
    }
    setTimeout(() => {
      setButtonText(originalButtonText);
    }, 1000);
  };

  return (
    <div className="row">
      <div className="col">
        <h2 className="my-3">
          Step 3. Check we have understood your input correctly.
        </h2>
        <p className="lead">
          Check that we have loaded the correct number of observations. Also
          check the units of measurement. It may help to compare your spectra to
          a standard reference spectra. For example, if your measurements were
          made in daylight, check that they have a similar shape to{" "}
          <code>CIE Standard Illuminant D65</code>. Your data might be easier to
          read if you change the y-axis scale.
        </p>
        {!powerMode && (
          <Chart
            radianceOrIrradiance={radianceOrIrradiance}
            rows={rows}
            sampleCount={sampleCount}
            measurementLabels={measurementLabels}
          />
        )}

        <h2 className="my-3">
          Step 4. Download the stimulus specification tables and include them in
          your report.
        </h2>

        <CalculationTable
          rows={rows}
          sampleCount={sampleCount}
          radianceOrIrradiance={radianceOrIrradiance}
          measurementLabels={measurementLabels}
          isLoaded={isLoaded}
          setLoaded={setLoaded}
          refHAB={refHAB}
          setRefHAB={setRefHAB}
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
            id="sharing-url"
            type="text"
            className="form-control my-2"
            value={sharingURL}
            readOnly
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <button
              className="btn btn-primary btn-block my-2"
              type="button"
              onClick={copySharingURL}
              disabled={buttonDisabled()}
            >
              {buttonText}
            </button>
          </div>
          <div className="col">
            <HashLink
              className="btn btn-secondary btn-block my-2"
              role="button"
              to="/about#requesting-doi-for-sharing-url"
            >
              Request DOI
            </HashLink>
          </div>
        </div>
      </div>
    </div>
  );
};

Results.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  sampleCount: PropTypes.number.isRequired,
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  powerMode: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  refHAB: PropTypes.arrayOf(PropTypes.object),
  setLoaded: PropTypes.func.isRequired,
  setRefHAB: PropTypes.func.isRequired,
};
Results.defaultProps = {
  refHAB: undefined,
};
export default Results;

import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { calculate } from "../calculations";
import CalculationTableCSV from "./CalculationTableCSV";
import { asDecimal, asExponential } from "../helpers";

const CalculationTableHeader = ({ measurementLabels }) => {
  return (
    <thead>
      <tr>
        <th key="condition">Condition</th>
        {Object.entries(measurementLabels).map(([key, value]) => (
          <th key={key}>{value}</th>
        ))}
      </tr>
    </thead>
  );
};

CalculationTableHeader.propTypes = {
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
};

const CalculationTableRow = ({ heading, samples, exponentialNotation }) => {
  /* eslint-disable react/no-array-index-key */

  if (samples.length === 0) {
    return null;
  }

  return (
    <tr>
      <th>{heading}</th>
      {samples.map((sample, index) => (
        <td key={index}>
          {exponentialNotation ? asExponential(sample) : asDecimal(sample)}
        </td>
      ))}
    </tr>
  );
};

CalculationTableRow.propTypes = {
  exponentialNotation: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
  samples: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const CalculationTable = ({
  radianceOrIrradiance,
  rows,
  sampleCount,
  measurementLabels,
}) => {
  const calculation = useMemo(() => calculate(rows, sampleCount), [
    rows,
    sampleCount,
  ]);
  const calculationTableDownloadUrl = useMemo(
    () =>
      CalculationTableCSV({
        radianceOrIrradiance,
        measurementLabels,
        ...calculation,
      }),
    [radianceOrIrradiance, measurementLabels, calculation]
  );

  const {
    luminanceTotals,
    chromaticity31,
    chromaticity64,
    lConeTotals,
    mConeTotals,
    sConeTotals,
    melTotals,
    rodTotals,
    equivalentDaylightAlphaOpic,
    alphaOpicEfficiency,
  } = calculation;

  const units =
    radianceOrIrradiance === "radiance" ? "mW ⋅ m⁻² ⋅ sr" : "mW ⋅ m⁻²";

  const [exponentialNotation, setExponentialNotation] = useState(false);
  const [advanced, setAdvanced] = useState(false);

  const handleExponentialNotation = () => {
    setExponentialNotation((checked) => !checked);
  };

  const handleAdvanced = () => {
    setAdvanced((checked) => !checked);
  };

  const equivalentDaylightUnit =
    radianceOrIrradiance === "radiance" ? "EDL [cd/m²]" : "EDI [lx]";

  return (
    <section>
      <div className="row">
        <div className="col text-left">
          <label htmlFor="calculation-exponential-notation">
            <input
              type="checkbox"
              checked={exponentialNotation}
              onChange={handleExponentialNotation}
              id="calculation-exponential-notation"
            />
            {" Use exponential notation?"}
          </label>
        </div>
        <div className="col text-center">
          <label htmlFor="calculation-advanced-calculations">
            <input
              type="checkbox"
              checked={advanced}
              onChange={handleAdvanced}
              id="calculation-advanced-calculations"
            />
            {" Show advanced calculations?"}
          </label>
        </div>
        <div className="col text-right">
          <a
            download="download-calc.csv"
            className="btn btn-outline-secondary"
            href={calculationTableDownloadUrl}
          >
            Download CSV
          </a>
        </div>
      </div>
      <table className="table table-sm mt-3 result-table">
        <CalculationTableHeader measurementLabels={measurementLabels} />
        <tbody>
          <CalculationTableRow
            heading={
              radianceOrIrradiance === "radiance"
                ? "Luminance [cd/m²]"
                : "Illuminance [lx]"
            }
            samples={luminanceTotals}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading="CIE 1931 xy chromaticity (x)"
            samples={chromaticity31.map(({ x }) => x)}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading="CIE 1931 xy chromaticity (y)"
            samples={chromaticity31.map(({ y }) => y)}
            exponentialNotation={exponentialNotation}
          />
          {advanced && (
            <>
              <CalculationTableRow
                heading="CIE 1964 x₁₀y₁₀ chromaticity (x₁₀)"
                samples={chromaticity64.map(({ x }) => x)}
                exponentialNotation={exponentialNotation}
              />
              <CalculationTableRow
                heading="CIE 1964 x₁₀y₁₀ chromaticity (y₁₀)"
                samples={chromaticity64.map(({ y }) => y)}
                exponentialNotation={exponentialNotation}
              />
            </>
          )}
          <CalculationTableRow
            heading={`S-cone-opic ${radianceOrIrradiance} (${units})`}
            samples={sConeTotals}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`M-cone-opic ${radianceOrIrradiance} (${units})`}
            samples={mConeTotals}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`L-cone-opic ${radianceOrIrradiance} (${units})`}
            samples={lConeTotals}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`Rhodopic ${radianceOrIrradiance} (${units})`}
            samples={rodTotals}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`Melanopic ${radianceOrIrradiance} (${units})`}
            samples={melTotals}
            exponentialNotation={exponentialNotation}
          />

          <CalculationTableRow
            heading={`S-cone-opic ${equivalentDaylightUnit}`}
            samples={equivalentDaylightAlphaOpic.sc}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`M-cone-opic ${equivalentDaylightUnit}`}
            samples={equivalentDaylightAlphaOpic.mc}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`L-cone-opic ${equivalentDaylightUnit}`}
            samples={equivalentDaylightAlphaOpic.lc}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`Rhodopic ${equivalentDaylightUnit}`}
            samples={equivalentDaylightAlphaOpic.rh}
            exponentialNotation={exponentialNotation}
          />
          <CalculationTableRow
            heading={`Melanopic ${equivalentDaylightUnit}`}
            samples={equivalentDaylightAlphaOpic.mel}
            exponentialNotation={exponentialNotation}
          />
          {advanced && (
            <>
              <CalculationTableRow
                heading="S-cone-opic ELR"
                samples={alphaOpicEfficiency.sc}
                exponentialNotation={exponentialNotation}
              />
              <CalculationTableRow
                heading="M-cone-opic ELR"
                samples={alphaOpicEfficiency.mc}
                exponentialNotation={exponentialNotation}
              />
              <CalculationTableRow
                heading="L-cone-opic ELR"
                samples={alphaOpicEfficiency.lc}
                exponentialNotation={exponentialNotation}
              />
              <CalculationTableRow
                heading="Rhodopic ELR"
                samples={alphaOpicEfficiency.rh}
                exponentialNotation={exponentialNotation}
              />
              <CalculationTableRow
                heading="Melanopic ELR"
                samples={alphaOpicEfficiency.mel}
                exponentialNotation={exponentialNotation}
              />
            </>
          )}
        </tbody>
      </table>
    </section>
  );
};

CalculationTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  sampleCount: PropTypes.number.isRequired,
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CalculationTable;

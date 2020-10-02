import React, {useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import {calculate} from '../rows';
import CalculationTableCSV from './CalculationTableCSV';
import {asDecimal, asExponential, sampleTitles} from '../helpers'

const CalculationTableHeader = ({sampleCount}) => {
  const titles = ["Condition", ...sampleTitles(sampleCount)];

  return (
    <thead>
      <tr>
        {titles.map((title) => <th key={title}>{title}</th>)}
      </tr>
    </thead>
  );
}

CalculationTableHeader.propTypes = {
  'sampleCount': PropTypes.number
};

const CalculationTableRow = ({heading, samples, exponentialNotation}) => {
  if (samples.length === 0) {
    return null;
  }

  return (
    <tr>
      <th>{heading}</th>
      {samples.map((sample, index) => <td key={index}>{exponentialNotation ? asExponential(sample) : asDecimal(sample)}</td>)}
    </tr>
  );
};

CalculationTableRow.propTypes = {
  exponentialNotation: PropTypes.bool,
  heading: PropTypes.string,
  samples: PropTypes.array
};

const CalculationTable = ({radianceOrIrradiance, rows, sampleCount}) => {
  const calculation = useMemo(() => calculate(rows, sampleCount), [rows, sampleCount]);
  const calculationTableDownloadUrl = useMemo(() => CalculationTableCSV({ radianceOrIrradiance, sampleCount, ...calculation }), [radianceOrIrradiance, sampleCount, calculation]);

  const {
    luminanceTotals,
    chromaticity31,
    chromaticity64,
    colourRenderingIndices,
    lConeTotals,
    mConeTotals,
    sConeTotals,
    melTotals,
    rodTotals,
    equivalentDaylightAlphaOpic,
    alphaOpicEfficiency
  } = calculation;

  const units = radianceOrIrradiance === 'radiance' ? 'mW ⋅ m⁻² ⋅ sr' : 'mW ⋅ m⁻²';

  const [exponentialNotation, setExponentialNotation] = useState(false);
  const [advanced, setAdvanced] = useState(false);

  const handleExponentialNotation = () => {
    setExponentialNotation((checked) => !checked);
  };

  const handleAdvanced = () => {
    setAdvanced((checked) => !checked);
  };

  const equivalentDaylightUnit = radianceOrIrradiance === 'radiance' ? 'EDL [cd/m²]' : 'EDI [lux]';

  return (
    <section>
      <div className="row">
        <div className="col text-left">
          <label>
            <input type="checkbox" checked={exponentialNotation} onChange={handleExponentialNotation} />
            {' Use exponential notation?'}
          </label>
        </div>
        <div className="col text-center">
          <label>
            <input type="checkbox" checked={advanced} onChange={handleAdvanced} />
            {' Show advanced calculations?'}
          </label>
        </div>
        <div className="col text-right">
          <a download="download-calc.csv" className="btn btn-outline-secondary" href={calculationTableDownloadUrl}>Download CSV</a>
        </div>
      </div>
      <table className="table table-sm mt-3 result-table">
        <CalculationTableHeader sampleCount={sampleCount} />
        <tbody>
          <CalculationTableRow heading={radianceOrIrradiance === 'radiance' ? 'Luminance [cd/m²]' : 'Illuminance [lux]'} samples={luminanceTotals} exponentialNotation={exponentialNotation} />
          {advanced && (
            <>
              <CalculationTableRow heading={`CIE 1931 xy chromaticity (x)`} samples={chromaticity31.map(({x}) => x)} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`CIE 1931 xy chromaticity (y)`} samples={chromaticity31.map(({y}) => y)} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`CIE 1964 x₁₀y₁₀ chromaticity (x₁₀)`} samples={chromaticity64.map(({x}) => x)} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`CIE 1964 x₁₀y₁₀ chromaticity (y₁₀)`} samples={chromaticity64.map(({y}) => y)} exponentialNotation={exponentialNotation} />
            </>
          )}
          {colourRenderingIndices.length > 0 && (
            <tr>
              <th>Colour rendering index (CIE Ra)</th>
              {colourRenderingIndices.map((sample, index) => <td key={index}>{sample}</td>)}
            </tr>
          )}
          <CalculationTableRow heading={`S-cone-opic ${radianceOrIrradiance} (${units})`} samples={sConeTotals} exponentialNotation={exponentialNotation} />
          <CalculationTableRow heading={`M-cone-opic ${radianceOrIrradiance} (${units})`} samples={mConeTotals} exponentialNotation={exponentialNotation} />
          <CalculationTableRow heading={`L-cone-opic ${radianceOrIrradiance} (${units})`} samples={lConeTotals} exponentialNotation={exponentialNotation} />
          <CalculationTableRow heading={`Rhodopic ${radianceOrIrradiance} (${units})`} samples={rodTotals} exponentialNotation={exponentialNotation} />
          <CalculationTableRow heading={`Melanopic ${radianceOrIrradiance} (${units})`} samples={melTotals} exponentialNotation={exponentialNotation} />
          {advanced && (
            <>
              <CalculationTableRow heading={`S-cone-opic ${equivalentDaylightUnit}`} samples={equivalentDaylightAlphaOpic.sc} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`M-cone-opic ${equivalentDaylightUnit}`} samples={equivalentDaylightAlphaOpic.mc} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`L-cone-opic ${equivalentDaylightUnit}`} samples={equivalentDaylightAlphaOpic.lc} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`Rhodopic ${equivalentDaylightUnit}`} samples={equivalentDaylightAlphaOpic.rh} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`Melanopic ${equivalentDaylightUnit}`} samples={equivalentDaylightAlphaOpic.mel} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`S-cone-opic ELR`} samples={alphaOpicEfficiency.sc} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`M-cone-opic ELR`} samples={alphaOpicEfficiency.mc} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`L-cone-opic ELR`} samples={alphaOpicEfficiency.lc} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`Rhodopic ELR`} samples={alphaOpicEfficiency.rh} exponentialNotation={exponentialNotation} />
              <CalculationTableRow heading={`Melanopic ELR`} samples={alphaOpicEfficiency.mel} exponentialNotation={exponentialNotation} />
            </>
          )}
        </tbody>
      </table>
    </section>
  );
};

CalculationTable.propTypes = {
  rows: PropTypes.array,
  sampleCount: PropTypes.number,
  radianceOrIrradiance: PropTypes.oneOf(['radiance', 'irradiance'])
};

export default CalculationTable;

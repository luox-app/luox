import React, {useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import SpectraCSV from './SpectraCSV';
import {asExponential, radianceOrIrradianceSIUnit} from '../helpers'

const SpectraTableRow = ({wavelength, samples, exponentialNotation}) => {
  return (
    <tr>
      <th>{wavelength}</th>
      {samples.map((sample, index) => <td key={index}>{exponentialNotation ? asExponential(sample) : sample}</td>)}
    </tr>
  );
};

SpectraTableRow.propTypes = {
  wavelength: PropTypes.number,
  samples: PropTypes.array,
  exponentialNotation: PropTypes.bool
};

const SpectraTable = ({rows, sampleCount, radianceOrIrradiance}) => {
  const [exponentialNotation, setExponentialNotation] = useState(true);
  const spectraDownloadUrl = useMemo(() => SpectraCSV({ radianceOrIrradiance, rows }), [radianceOrIrradiance, rows])

  const handleExponentialNotation = () => {
    setExponentialNotation((checked) => !checked);
  };

  return (
    <section>
      <div className="row">
        <div className="col text-left">
          <label>
            <input type="checkbox" checked={exponentialNotation} onChange={handleExponentialNotation} />
            {' Use exponential notation?'}
          </label>
        </div>
        <div className="col text-right">
          <a download="download-spectrum.csv" className="btn btn-outline-secondary" href={spectraDownloadUrl}>Download CSV</a>
        </div>
      </div>
      <table className="table table-sm mt-3 result-table">
        <thead>
          <tr>
            <th>Wavelength [nm]</th>
            <th colSpan={sampleCount}>Spectral {radianceOrIrradiance} [{radianceOrIrradianceSIUnit(radianceOrIrradiance)}]</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([wavelength, ...samples], index) =>
            <SpectraTableRow key={index} wavelength={wavelength} samples={samples} exponentialNotation={exponentialNotation} />)}
        </tbody>
      </table>
    </section>
  );
};

SpectraTable.propTypes = {
  rows: PropTypes.array,
  sampleCount: PropTypes.number,
  radianceOrIrradiance: PropTypes.oneOf(['radiance', 'irradiance'])
};

export default SpectraTable;

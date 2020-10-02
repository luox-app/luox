import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {createChart} from '../chart'

const Chart = ({radianceOrIrradiance, rows, sampleCount}) => {
  const chartRef = useRef();
  const [yAxisScaling, setYAxisScaling] = useState('raw');

  const handleYAxisScaling = ({target: {value}}) => {
    setYAxisScaling(value);
  };

  useEffect(() => {
    let chart;

    if (chartRef.current) {
      chart = createChart(chartRef.current, radianceOrIrradiance, rows, sampleCount, yAxisScaling);
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [radianceOrIrradiance, rows, sampleCount, yAxisScaling]);

  return (
    <section>
      <form>
        <div className="form-check-inline">
          <label className="form-check-label">
            <input className="form-check-input" type="radio" name="chart-data" value="raw" checked={yAxisScaling === 'raw'} onChange={handleYAxisScaling} />
            Raw data
          </label>
        </div>
        <div className="form-check-inline">
          <label className="form-check-label">
            <input className="form-check-input" type="radio" name="chart-data" value="normalised" checked={yAxisScaling === 'normalised'} onChange={handleYAxisScaling} />
            Normalised data
          </label>
        </div>
        <div className="form-check-inline">
          <label className="form-check-label">
            <input className="form-check-input" type="radio" name="chart-data" value="log10" checked={yAxisScaling === 'log10'} onChange={handleYAxisScaling} />
            Log10
          </label>
        </div>
      </form>
      <canvas width="400" height="200" ref={chartRef}></canvas>
    </section>
  );
};

Chart.propTypes = {
  radianceOrIrradiance: PropTypes.oneOf(['radiance', 'irradiance']),
  rows: PropTypes.array,
  sampleCount: PropTypes.number
};

export default Chart;

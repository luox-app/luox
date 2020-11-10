import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import createChart from "../chart";

const Chart = ({ radianceOrIrradiance, rows, sampleCount, csvHeader }) => {
  const chartRef = useRef();
  const [yAxisScaling, setYAxisScaling] = useState("raw");

  const handleYAxisScaling = ({ target: { value } }) => {
    setYAxisScaling(value);
  };

  useEffect(() => {
    let chart;

    if (chartRef.current) {
      chart = createChart(
        chartRef.current,
        radianceOrIrradiance,
        rows,
        sampleCount,
        csvHeader,
        yAxisScaling
      );
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [radianceOrIrradiance, rows, sampleCount, csvHeader, yAxisScaling]);

  return (
    <section>
      <form>
        <div className="form-check-inline">
          <label htmlFor="raw-y-axis" className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              name="chart-data"
              value="raw"
              checked={yAxisScaling === "raw"}
              onChange={handleYAxisScaling}
              id="raw-y-axis"
            />
            Raw data
          </label>
        </div>
        <div className="form-check-inline">
          <label htmlFor="normalised-y-axis" className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              name="chart-data"
              value="normalised"
              checked={yAxisScaling === "normalised"}
              onChange={handleYAxisScaling}
              id="normalised-y-axis"
            />
            Normalised data
          </label>
        </div>
        <div className="form-check-inline">
          <label htmlFor="log10-y-axis" className="form-check-label">
            <input
              className="form-check-input"
              type="radio"
              name="chart-data"
              value="log10"
              checked={yAxisScaling === "log10"}
              onChange={handleYAxisScaling}
              id="log10-y-axis"
            />
            Log10
          </label>
        </div>
      </form>
      <canvas width="400" height="200" ref={chartRef} />
    </section>
  );
};

Chart.propTypes = {
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  sampleCount: PropTypes.number.isRequired,
  csvHeader: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Chart;

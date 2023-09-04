import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import { Button } from "react-bootstrap";
import createChart from "../chart";
import { referenceSpectraNames } from "../referenceSpectra";

const Chart = ({
  radianceOrIrradiance,
  selectedRows,
  selectedRowsSampleCount,
  measurementLabels,
}) => {
  const windowWidth = window.innerWidth;
  const chartRef = useRef();
  const [yAxisScaling, setYAxisScaling] = useState("raw");
  const [displayedReference, setDisplayedReference] = useState("none");
  const handleYAxisScaling = ({ target: { value } }) => {
    setYAxisScaling(value);
  };

  const handleReferenceSpectraSelect = ({ target: { value } }) => {
    setDisplayedReference(value);
  };

  const downloadChart = (downloadType) => {
    if (downloadType === "png") {
      htmlToImage
        .toBlob(document.getElementById("canvasChart"))
        .then(function (blob) {
          saveAs(blob, "canvasChart.png");
        });
    } else if (downloadType === "svg") {
      htmlToImage
        .toSvg(document.getElementById("canvasChart"))
        .then(function (blob) {
          saveAs(blob, "canvasChart.svg");
        });
    }
  };

  useEffect(() => {
    let chart;
    if (chartRef.current) {
      chart = createChart(
        chartRef.current,
        radianceOrIrradiance,
        selectedRows,
        selectedRowsSampleCount,
        measurementLabels,
        yAxisScaling,
        displayedReference
      );
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [
    radianceOrIrradiance,
    selectedRows,
    selectedRowsSampleCount,
    measurementLabels,
    yAxisScaling,
    displayedReference,
  ]);

  return (
    <section>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 col-xs-12 pt-5">
            <div className="row">
              <div>
                <h5>Y-axis scale</h5>
                <form>
                  <div className="form-check">
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
                  <div className="form-check">
                    <label
                      htmlFor="normalised-y-axis"
                      className="form-check-label"
                    >
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
                  <div className="form-check">
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
              </div>
            </div>
            <div className="row mt-3">
              <h5>Reference spectrum</h5>
              <form>
                <div className="form-group">
                  <label htmlFor="referenceSpectraSelect">
                    Reference spectra
                    <select
                      className="form-control"
                      id="referenceSpectraSelect"
                      onChange={handleReferenceSpectraSelect}
                    >
                      <option value="none" key="none">
                        Select a reference spectrum
                      </option>
                      {referenceSpectraNames().map((name) => (
                        <option value={name} key={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-8 col-xs-12">
            {windowWidth < 500 ? (
              <canvas
                width="800"
                height="800"
                ref={chartRef}
                id="canvasChart"
              />
            ) : (
              <canvas
                width="400"
                height="200"
                ref={chartRef}
                id="canvasChart"
              />
            )}
            <div className="col-md-12">
              <Button
                variant="primary"
                onClick={() => downloadChart("png")}
                className="btn-sm my-1"
              >
                Download Chart as PNG
              </Button>
              <Button
                variant="success"
                onClick={() => downloadChart("svg")}
                className="btn-sm mx-3 my-1"
              >
                Download Chart as SVG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Chart.propTypes = {
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
    .isRequired,
  selectedRowsSampleCount: PropTypes.number.isRequired,
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Chart;

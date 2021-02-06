import React from "react";
import { useParams } from "react-router-dom";
import CalculationTable from "./CalculationTable";
import SpectraTable from "./SpectraTable";
import Chart from "./Chart";
import { urlToRows } from "../sharing";
import "bootstrap/js/dist/alert";

const Report = () => {
  const { id } = useParams();

  const [rows, radianceOrIrradiance, measurementLabels] = urlToRows(id);
  const sampleCount = rows[0].length - 1;

  return (
    <div className="row">
      <div className="col">
        <div
          className="mt-3 alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          The reproduced spectrum has been compressed and then decompressed, so
          there maybe small numerical differences.
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <h2 className="my-3">Light Exposure Report</h2>

        <p>
          This report meets the{" "}
          <a href="https://doi.org/10.3390/clockssleep1030024">
            minimum reporting guidelines
          </a>{" "}
          for reporting the stimulus conditions involving light as an
          intervention in chronobiology, sleep research and environmental
          psychology experiments.
        </p>

        <Chart
          radianceOrIrradiance={radianceOrIrradiance}
          rows={rows}
          sampleCount={sampleCount}
          measurementLabels={measurementLabels}
        />

        <h2 className="my-3">Stimulus specification tables</h2>

        <CalculationTable
          rows={rows}
          sampleCount={sampleCount}
          radianceOrIrradiance={radianceOrIrradiance}
          measurementLabels={measurementLabels}
        />

        <h2 className="my-3">Full spectral power distribution</h2>

        <SpectraTable
          rows={rows}
          sampleCount={sampleCount}
          radianceOrIrradiance={radianceOrIrradiance}
        />
      </div>
    </div>
  );
};

export default Report;

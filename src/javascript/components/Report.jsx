import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CalculationTable from "./CalculationTable";
import SpectraTable from "./SpectraTable";
import Chart from "./Chart";
import { urlToRows } from "../sharing";
import "bootstrap/js/dist/alert";

const Report = () => {
  const { id } = useParams();

  const [selectedRows, radianceOrIrradiance, measurementLabels] = urlToRows(id);

  const selectedRowsSampleCount = selectedRows[0].length - 1;

  const [isLoaded, setLoaded] = useState(true);
  const [refHAB, setRefHAB] = useState(null);

  const powerMode = selectedRowsSampleCount < 6;

  return (
    <div className="row mt-50 text-center">
      <div className="col px-5">
        <div
          className="mt-5 text-center alert alert-warning alert-dismissible fade show"
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

        <h2 className="my-3 mt-5">Light Exposure Report</h2>

        <p>
          This report meets the{" "}
          <a href="https://doi.org/10.3390/clockssleep1030024">
            minimum reporting guidelines
          </a>{" "}
          for reporting the stimulus conditions involving light as an
          intervention in chronobiology, sleep research and environmental
          psychology experiments.
        </p>
        {powerMode && (
          <Chart
            radianceOrIrradiance={radianceOrIrradiance}
            selectedRows={selectedRows}
            selectedRowsSampleCount={selectedRowsSampleCount}
            measurementLabels={measurementLabels}
          />
        )}
        <h2 className="my-3">Stimulus specification tables</h2>

        <CalculationTable
          selectedRows={selectedRows}
          selectedRowsSampleCount={selectedRowsSampleCount}
          radianceOrIrradiance={radianceOrIrradiance}
          measurementLabels={measurementLabels}
          isLoaded={isLoaded}
          setLoaded={setLoaded}
          refHAB={refHAB}
          setRefHAB={setRefHAB}
        />

        <h2 className="my-3">Full spectral power distribution</h2>

        <SpectraTable
          selectedRows={selectedRows}
          selectedRowsSampleCount={selectedRowsSampleCount}
          radianceOrIrradiance={radianceOrIrradiance}
          measurementLabels={measurementLabels}
        />
      </div>
    </div>
  );
};

export default Report;

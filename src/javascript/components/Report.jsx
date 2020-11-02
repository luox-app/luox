import React from "react";
import { useParams } from "react-router-dom";
import CalculationTable from "./CalculationTable";
import SpectraTable from "./SpectraTable";
import Chart from "./Chart";
import { urlToRows } from "../sharing";

const Report = () => {
  const { id } = useParams();

  const [rows, radianceOrIrradiance] = urlToRows(id);
  const sampleCount = rows[0].length - 1;

  return (
    <div className="row">
      <div className="col">
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
        />

        <h2 className="my-3">Stimulus specification tables</h2>

        <CalculationTable
          rows={rows}
          sampleCount={sampleCount}
          radianceOrIrradiance={radianceOrIrradiance}
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

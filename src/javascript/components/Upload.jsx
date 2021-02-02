import React, { useState, useEffect } from "react";
import UploadForm from "./UploadForm";
import Results from "./Results";

const Upload = () => {
  const [radianceOrIrradiance, setRadianceOrIrradiance] = useState(
    "irradiance"
  );
  const [rows, setRows] = useState([]);
  const [sampleCount, setSampleCount] = useState(0);
  const [measurementLabels, setMeasurementLabels] = useState({});

  useEffect(() => {
    document.title = "luox: Upload spectrum and generate report";
  });

  return (
    <>
      <div className="row">
        <div className="col">
          <h1 className="mt-5">Upload spectrum and generate report</h1>
        </div>
      </div>
      <UploadForm
        radianceOrIrradiance={radianceOrIrradiance}
        measurementLabels={measurementLabels}
        setRadianceOrIrradiance={setRadianceOrIrradiance}
        setRows={setRows}
        setSampleCount={setSampleCount}
        setMeasurementLabels={setMeasurementLabels}
      />
      <Results
        rows={rows}
        sampleCount={sampleCount}
        radianceOrIrradiance={radianceOrIrradiance}
        measurementLabels={measurementLabels}
      />
    </>
  );
};

export default Upload;

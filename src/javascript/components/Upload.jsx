import React, { useState, useRef, useEffect } from "react";
import UploadForm from "./UploadForm";
import Results from "./Results";

const Upload = () => {
  const [radianceOrIrradiance, setRadianceOrIrradiance] = useState(
    "irradiance"
  );
  const [rows, setRows] = useState([]);
  const [sampleCount, setSampleCount] = useState(0);
  const [measurementLabels, setMeasurementLabels] = useState({});
  const [csv, setCSV] = useState([]);
  const [relativePowers, setRelativePowers] = useState({});
  const [powerMode, setPowerMode] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [refHAB, setRefHAB] = useState(null);
  const fileInput = useRef();

  const userModeChange = () => {
    setPowerMode((checked) => !checked);
    if (fileInput.current.files.length > 0) {
      setCSV([]);
      setMeasurementLabels({});
      setRelativePowers({});
      setLoaded(false);
      setRefHAB(null);

      fileInput.current.value = null;
    }
  };

  const LoadingIndicator = () => {
    return (
      isLoaded && (
        <div className="overlay">
          <h1>Calculating... Please wait... </h1>
          <div className="loading-container">
            <div className="loader" />
          </div>
        </div>
      )
    );
  };

  useEffect(() => {
    // code to run after render goes here
    document.title = "luox: Upload spectrum and generate report";
  });

  return (
    <>
      <div className="row">
        <div className="col">
          <h1 className="mt-5">Upload spectrum and generate report</h1>
          <label htmlFor="pro_mode_checkbox" className="promode-label">
            <input
              type="checkbox"
              id="pro_mode_checkbox"
              value="proMode"
              checked={powerMode}
              onChange={userModeChange}
            />{" "}
            Power user mode (check if your SPD columns &gt; 5)
          </label>
        </div>
      </div>
      <LoadingIndicator />

      <UploadForm
        radianceOrIrradiance={radianceOrIrradiance}
        measurementLabels={measurementLabels}
        setRadianceOrIrradiance={setRadianceOrIrradiance}
        setRows={setRows}
        setSampleCount={setSampleCount}
        setMeasurementLabels={setMeasurementLabels}
        csv={csv}
        setCSV={setCSV}
        relativePowers={relativePowers}
        setRelativePowers={setRelativePowers}
        setPowerMode={setPowerMode}
        powerMode={powerMode}
        fileInput={fileInput}
        setRefHAB={setRefHAB}
        isLoaded={isLoaded}
        setLoaded={setLoaded}
      />

      <Results
        rows={rows}
        sampleCount={sampleCount}
        radianceOrIrradiance={radianceOrIrradiance}
        measurementLabels={measurementLabels}
        powerMode={powerMode}
        isLoaded={isLoaded}
        setLoaded={setLoaded}
        refHAB={refHAB}
        setRefHAB={setRefHAB}
      />
    </>
  );
};

export default Upload;

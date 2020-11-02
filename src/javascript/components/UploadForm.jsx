import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { readCSV, parseCSV } from "../csvParser";
import { scaleSamples } from "../rows";
import ErrorTable from "./ErrorTable";

const UploadForm = ({
  radianceOrIrradiance,
  setRadianceOrIrradiance,
  setRows,
  setSampleCount,
}) => {
  const [powerScale, setPowerScale] = useState(1);
  const [areaScale, setAreaScale] = useState(1);
  const [errors, setErrors] = useState([]);
  const [csv, setCSV] = useState("");
  const fileInput = useRef();

  const handleRadianceOrIrradiance = ({ target: { value } }) => {
    setRadianceOrIrradiance(value);
  };

  const handlePowerScale = ({ target: { value } }) => {
    setPowerScale(parseFloat(value));
  };

  const handleAreaScale = ({ target: { value } }) => {
    setAreaScale(parseFloat(value));
  };

  const handleFileInput = () => {
    if (fileInput.current.files.length > 0) {
      const [file] = fileInput.current.files;

      readCSV(file).then((data) => setCSV(data));
    }
  };

  useEffect(() => {
    if (csv) {
      const [csvErrors, csvRows, csvSampleCount] = parseCSV(csv);

      if (csvErrors.length === 0) {
        setRows(scaleSamples(csvRows, areaScale, powerScale));
        setSampleCount(csvSampleCount);
        setErrors(csvErrors);
      } else {
        setErrors(csvErrors);
        setRows([]);
        setSampleCount(0);
      }
    }
  }, [setRows, setSampleCount, csv, powerScale, areaScale]);

  return (
    <>
      <div className="row">
        <div className="col">
          <h2 className="my-3">
            Step 1. Upload your spectral power distribution data.
          </h2>

          <form>
            <div className="form-group">
              <input
                type="file"
                ref={fileInput}
                onChange={handleFileInput}
                className="form-control-file"
                id="file-input"
              />
            </div>
          </form>

          <ErrorTable errors={errors} />
        </div>
      </div>
      {csv.length > 0 && (
        <div className="row">
          <div className="col">
            <h2 className="my-3">Step 2. Tell us more about your data.</h2>
            <form>
              <div className="form-inline">
                <p>
                  {"My data contains spectra with wavelength in nm and "}
                  <select
                    value={radianceOrIrradiance}
                    onChange={handleRadianceOrIrradiance}
                    className="form-control"
                  >
                    <option value="irradiance">irradiances</option>
                    <option value="radiance">radiances</option>
                  </select>
                  {" in "}
                  <select
                    value={powerScale}
                    onChange={handlePowerScale}
                    className="form-control"
                  >
                    <option value="1000000">µW</option>
                    <option value="1000">mW</option>
                    <option value="1">W</option>
                  </select>
                  {" per "}
                  <select
                    value={areaScale}
                    onChange={handleAreaScale}
                    className="form-control"
                  >
                    <option value="1000000">mm²</option>
                    <option value="10000">cm²</option>
                    <option value="1">m²</option>
                  </select>
                  {radianceOrIrradiance === "radiance" && " per sr"}
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

UploadForm.propTypes = {
  radianceOrIrradiance: PropTypes.string.isRequired,
  setRadianceOrIrradiance: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  setSampleCount: PropTypes.func.isRequired,
};

export default UploadForm;

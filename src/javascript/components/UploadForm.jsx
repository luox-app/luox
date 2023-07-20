import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import ErrorTable from "./ErrorTable";

import parseCSV from "../csvParser";
import { relativeToAbsolute } from "../calculations";
import { scaleSamples } from "../rows";
import validateInput from "../inputValidator";

const UploadForm = ({
  measurementLabels,
  radianceOrIrradiance,
  setRadianceOrIrradiance,
  setRows,
  setSampleCount,
  setMeasurementLabels,
  relativePowers,
  setRelativePowers,
  setCSV,
  csv,
  powerMode,
  fileInput,
  setRefHAB,
  isLoaded,
  setLoaded,
}) => {
  const [powerScale, setPowerScale] = useState("watt");
  const [areaScale, setAreaScale] = useState("metresq");
  const [fileType, setFileType] = useState("csv");
  const [errors, setErrors] = useState([]);
  const [absoluteOrRelative, setAbsoluteOrRelative] = useState("absolute");

  const SPDX_INVALID =
    "Error Parsing SPDX File. Please Verify That The File Is In The Proper Format.";

  const ALL_ROW_CONST = "All";

  const reset = () => {
    setCSV([]);
    setMeasurementLabels({});
    setRelativePowers({});
    setLoaded(false);
    setRefHAB(null);
  };

  const handleRadianceOrIrradiance = ({ target: { value } }) => {
    setRadianceOrIrradiance(value);
  };

  const handleAbsoluteOrRelative = ({ target: { value } }) => {
    setAbsoluteOrRelative(value);
  };

  const handlePowerScale = ({ target: { value } }) => {
    setPowerScale(value);
  };

  const handleAreaScale = ({ target: { value } }) => {
    setAreaScale(value);
  };

  const handleRelativePowers = (index) => ({ target: { value } }) => {
    setRelativePowers((powers) => ({
      ...powers,
      [index]: value,
    }));
  };

  const handleMeasurementLabel = (index) => ({ target: { value } }) => {
    setMeasurementLabels((labels) => ({
      ...labels,
      [index]: value,
    }));
  };

  const handleFileTypeChange = (e) => {
    fileInput.current.value = null; // eslint-disable-line no-param-reassign
    reset();
    if (e.target.checked) {
      setFileType(e.target.value);
    } else {
      if (e.target.value === "spdx") {
        setFileType("csv");
        return;
      }
      setFileType("spdx");
    }
  };

  const handleData = (data) => {
    const [rawHeader, ...rawBody] = data;

    let header = rawHeader;
    let fullBody = rawBody;
    if (rawHeader.every((value) => typeof value === "number")) {
      fullBody = [rawHeader].concat(rawBody);
      header = rawHeader.map((_, index) =>
        index === 0 ? "lambda" : `Observation ${index}`
      );
    }

    const body = fullBody.map((row) => row.map((value) => parseFloat(value)));

    const validationErrors = validateInput(header, body, powerMode);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      reset();
    } else {
      setErrors([]);
      const [, ...labels] = header;
      setMeasurementLabels({ ...labels });
      setCSV(body);
      setRelativePowers(
        Object.fromEntries(new Array(header.length - 1).fill("1").entries())
      );
    }
  };

  const handleFileInput = () => {
    reset();
    if (fileInput.current.files.length > 0) {
      const [file] = fileInput.current.files;
      if (file) {
        setLoaded(true);
      }
      if (fileType === "csv") {
        if (file.name.toLowerCase().indexOf(".csv") === -1) {
          setErrors([
            {
              row: ALL_ROW_CONST,
              message: "Invalid File Format. File Needs To Be In .CSV Format",
            },
          ]);
          reset();
          return;
        }
        parseCSV(file).then(({ data, errors: csvErrors }) => {
          if (csvErrors.length > 0) {
            setErrors(csvErrors);
            reset();
          } else {
            handleData(data);
          }
        });
      } else if (fileType === "spdx") {
        if (file.name.toLowerCase().indexOf(".spdx") === -1) {
          setErrors([
            {
              row: ALL_ROW_CONST,
              message: "Invalid File Format. File Needs To Be In .SPDX Format",
            },
          ]);
          reset();
          return;
        }
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (evt) => {
          const parser = new DOMParser();
          const dom = parser.parseFromString(
            evt.target.result,
            "application/xml"
          );
          if (dom.documentElement.nodeName === "parsererror") {
            reset();
            setErrors([
              {
                row: ALL_ROW_CONST,
                message: SPDX_INVALID,
              },
            ]);
            return;
          }

          const relOrAbs = dom.getElementsByTagName("SpectralQuantity");
          if (relOrAbs.length > 0) {
            if (relOrAbs[0].innerHTML.toLowerCase().indexOf("radian") !== -1) {
              setAbsoluteOrRelative("absolute");
              if (
                relOrAbs[0].innerHTML.toLowerCase().indexOf("irradian") !== -1
              ) {
                setRadianceOrIrradiance("irradiance");
              } else {
                setRadianceOrIrradiance("radiance");
              }
            } else {
              setAbsoluteOrRelative("relative");
            }
          }
          const paths = [].slice.call(dom.getElementsByTagName("SpectralData"));
          if (!(paths.length > 0)) {
            reset();
            setErrors([
              {
                row: ALL_ROW_CONST,
                message: SPDX_INVALID,
              },
            ]);
            return;
          }
          const data = [];

          paths.forEach((element) => {
            data.push([
              parseFloat(element.getAttribute("wavelength")),
              parseFloat(element.innerHTML),
            ]);
          });

          handleData(data);
        };
        reader.onerror = () => {
          reset();
          setErrors([
            {
              row: ALL_ROW_CONST,
              message: SPDX_INVALID,
            },
          ]);
        };
      }
    }
  };

  useEffect(() => {
    // const fileTypes = ["CSV", "SPDX"];
    // const [file, setFile] = useState(null);
    if (csv.length > 0) {
      const sampleCount = csv[0].length - 1;
      if (absoluteOrRelative === "absolute") {
        setRows(scaleSamples(csv, areaScale, powerScale));
      } else {
        const powers = Object.fromEntries(
          Object.entries(relativePowers)
            .map(([k, v]) => [k, parseFloat(v)])
            .filter(([, v]) => !Number.isNaN(v) && v > 0)
        );
        setRows(relativeToAbsolute(csv, sampleCount, powers));
      }
      setLoaded(true);
      setSampleCount(sampleCount);
    } else {
      setRows([]);
      setSampleCount(0);
    }
  }, [
    setRows,
    setLoaded,
    setSampleCount,
    // measurementLabels,
    csv,
    powerScale,
    areaScale,
    absoluteOrRelative,
    relativePowers,
  ]);

  return (
    <>
      <div className="row">
        <div className="col">
          <h2 className="my-3">
            Step 1. Upload your spectral power distribution data.
          </h2>

          <form>
            <p>Select an import File Type:</p>
            <div>
              <label htmlFor="csv">
                <input
                  type="radio"
                  id="csv"
                  name="file_type"
                  value="csv"
                  checked={fileType === "csv"}
                  onChange={(e) => handleFileTypeChange(e)}
                />{" "}
                .CSV
              </label>
            </div>

            <div>
              <label htmlFor="spdx">
                <input
                  type="radio"
                  id="spdx"
                  name="file_type"
                  value="spdx"
                  checked={fileType === "spdx"}
                  onChange={(e) => handleFileTypeChange(e)}
                />{" "}
                .SPDX
              </label>
            </div>

            <div className="form-group">
              <div className="file-drop-area col-md-6 offset-md-3 col-xs-12">
                <span className="choose-file-button">Choose files</span>
                <span className="file-message">
                  or drag and drop files here
                </span>
                <input
                  type="file"
                  ref={fileInput}
                  disabled={isLoaded}
                  onChange={handleFileInput}
                  className="form-control-file ml-100 mt-2 file-input"
                  id="file-input"
                />
              </div>
            </div>
          </form>
          <ErrorTable errors={errors} />
        </div>
      </div>

      {csv.length > 0 && (
        <div className="row">
          <div className="col">
            <h2 className="my-3">Step 2. Tell us more about your data.</h2>
            <form className="form-inline text-start">
              <p className="lead" style={{ lineHeight: "2.5rem" }}>
                {"My data contains "}
                <select
                  value={absoluteOrRelative}
                  onChange={handleAbsoluteOrRelative}
                  className="form-control form-control-sm"
                >
                  <option value="absolute">absolute</option>
                  <option value="relative">relative</option>
                </select>
                {" spectra with wavelength in nm. "}
                <MeasurementLabels
                  measurementLabels={measurementLabels}
                  onChange={handleMeasurementLabel}
                />
                {absoluteOrRelative === "absolute" && (
                  <AbsoluteUnits
                    radianceOrIrradiance={radianceOrIrradiance}
                    handleRadianceOrIrradiance={handleRadianceOrIrradiance}
                    powerScale={powerScale}
                    handlePowerScale={handlePowerScale}
                    areaScale={areaScale}
                    handleAreaScale={handleAreaScale}
                  />
                )}
                {absoluteOrRelative === "relative" && (
                  <RelativeUnits
                    radianceOrIrradiance={radianceOrIrradiance}
                    setRadianceOrIrradiance={setRadianceOrIrradiance}
                    measurementLabels={measurementLabels}
                    handleRelativePowers={handleRelativePowers}
                    relativePowers={relativePowers}
                  />
                )}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

UploadForm.propTypes = {
  radianceOrIrradiance: PropTypes.string.isRequired,
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  relativePowers: PropTypes.objectOf(PropTypes.string).isRequired,
  csv: PropTypes.arrayOf(PropTypes.array).isRequired,
  powerMode: PropTypes.bool.isRequired,
  fileInput: PropTypes.objectOf(PropTypes.object).isRequired,
  isLoaded: PropTypes.bool.isRequired,

  setRadianceOrIrradiance: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  setSampleCount: PropTypes.func.isRequired,
  setMeasurementLabels: PropTypes.func.isRequired,
  setRelativePowers: PropTypes.func.isRequired,
  setCSV: PropTypes.func.isRequired,
  setRefHAB: PropTypes.func.isRequired,
  setLoaded: PropTypes.func.isRequired,
};

const AbsoluteUnits = ({
  radianceOrIrradiance,
  handleRadianceOrIrradiance,
  powerScale,
  handlePowerScale,
  areaScale,
  handleAreaScale,
}) => {
  return (
    <>
      <br />
      {"Each measurement column contains "}
      <select
        value={radianceOrIrradiance}
        onChange={handleRadianceOrIrradiance}
        className="form-control form-control-sm"
      >
        <option value="irradiance">irradiances</option>
        <option value="radiance">radiances</option>
      </select>
      {" in "}
      <select
        value={powerScale}
        onChange={handlePowerScale}
        className="form-control form-control-sm"
      >
        <option value="microwatt">µW</option>
        <option value="milliwatt">mW</option>
        <option value="watt">W</option>
      </select>
      {" per "}
      <select
        value={areaScale}
        onChange={handleAreaScale}
        className="form-control form-control-sm"
      >
        <option value="millimetresq">mm²</option>
        <option value="centimetresq">cm²</option>
        <option value="metresq">m²</option>
      </select>
      {radianceOrIrradiance === "radiance" && " per sr"}.
    </>
  );
};

AbsoluteUnits.propTypes = {
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
  handleRadianceOrIrradiance: PropTypes.func.isRequired,
  powerScale: PropTypes.string.isRequired,
  handlePowerScale: PropTypes.func.isRequired,
  areaScale: PropTypes.string.isRequired,
  handleAreaScale: PropTypes.func.isRequired,
};

const RelativeUnits = ({
  radianceOrIrradiance,
  setRadianceOrIrradiance,
  measurementLabels,
  handleRelativePowers,
  relativePowers,
}) => {
  const luminanceOrIlluminance =
    radianceOrIrradiance === "radiance" ? "luminance" : "illuminance";

  const handleLuminanceOrIlluminance = ({ target: { value } }) => {
    setRadianceOrIrradiance(value === "luminance" ? "radiance" : "irradiance");
  };

  const units = radianceOrIrradiance === "radiance" ? "(cd/m²)" : "(lx)";

  return (
    <>
      {"I have separately measured "}
      <select
        value={luminanceOrIlluminance}
        onChange={handleLuminanceOrIlluminance}
        className="form-control form-control-sm"
      >
        <option value="luminance">luminance</option>
        <option value="illuminance">illuminance</option>
      </select>
      {Object.entries(measurementLabels).map(([key, title], index) => (
        <React.Fragment key={key}>
          <RelativePower
            title={title}
            onChange={handleRelativePowers(index)}
            value={relativePowers[index]}
            units={units}
          />
          <Separator
            index={index}
            length={Object.keys(measurementLabels).length}
          />
        </React.Fragment>
      ))}
      .
    </>
  );
};

RelativeUnits.propTypes = {
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
  setRadianceOrIrradiance: PropTypes.func.isRequired,
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  handleRelativePowers: PropTypes.func.isRequired,
  relativePowers: PropTypes.objectOf(PropTypes.string).isRequired,
};

const RelativePower = ({ title, onChange, value, units }) => {
  const handleInput = ({ target }) => {
    target.reportValidity();
  };

  return (
    <>
      {" "}
      for <span className="font-italic">{title}</span> at{" "}
      <input
        type="number"
        className="form-control form-control-sm"
        onChange={onChange}
        onInput={handleInput}
        value={value}
        min="0.00001"
        step="any"
        required
      />{" "}
      {units}
    </>
  );
};

RelativePower.propTypes = {
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  units: PropTypes.string.isRequired,
};

const MeasurementLabels = ({ measurementLabels, onChange }) => {
  return (
    <>
      {"Label my measurements as "}
      {Object.entries(measurementLabels).map(([key, label], index) => (
        <React.Fragment key={key}>
          <input
            className="form-control form-control-sm"
            value={label}
            onChange={onChange(key)}
          />
          <Separator
            index={index}
            length={Object.keys(measurementLabels).length}
          />
        </React.Fragment>
      ))}
      {". "}
    </>
  );
};

MeasurementLabels.propTypes = {
  measurementLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

const Separator = ({ index, length }) => {
  const penultimateIndex = length - 2;

  if (index < penultimateIndex) {
    return <>, </>;
  }

  if (index === penultimateIndex) {
    return <> and </>;
  }

  return null;
};

Separator.propTypes = {
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
};

export default UploadForm;

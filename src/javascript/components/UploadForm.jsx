import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import parseCSV from "../csvParser";
import validateInput from "../inputValidator";
import { scaleSamples } from "../rows";
import ErrorTable from "./ErrorTable";
import { relativeToAbsolute } from "../calculations";

const UploadForm = ({
  measurementLabels,
  radianceOrIrradiance,
  setRadianceOrIrradiance,
  setRows,
  setSampleCount,
  setMeasurementLabels,
}) => {
  const [powerScale, setPowerScale] = useState(1);
  const [areaScale, setAreaScale] = useState(1);
  const [errors, setErrors] = useState([]);
  const [csv, setCSV] = useState([]);
  const [absoluteOrRelative, setAbsoluteOrRelative] = useState("absolute");
  const [relativePowers, setRelativePowers] = useState({});

  const fileInput = useRef();

  const handleRadianceOrIrradiance = ({ target: { value } }) => {
    setRadianceOrIrradiance(value);
  };

  const handleAbsoluteOrRelative = ({ target: { value } }) => {
    setAbsoluteOrRelative(value);
  };

  const handlePowerScale = ({ target: { value } }) => {
    setPowerScale(parseFloat(value));
  };

  const handleAreaScale = ({ target: { value } }) => {
    setAreaScale(parseFloat(value));
  };

  const handleRelativePowers = (index) => ({ target: { value } }) => {
    setRelativePowers((powers) => ({
      ...powers,
      [index]: value,
    }));
  };

  const handleFileInput = () => {
    if (fileInput.current.files.length > 0) {
      const [file] = fileInput.current.files;

      parseCSV(file).then(({ data, errors: csvErrors }) => {
        if (csvErrors.length > 0) {
          setErrors(csvErrors);
          setCSV([]);
          setMeasurementLabels({});
          setRelativePowers({});
        } else {
          const [header, ...body] = data;

          const validationErrors = validateInput(header, body);
          if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setCSV([]);
            setMeasurementLabels({});
            setRelativePowers({});
          } else {
            setErrors([]);
            const [, ...labels] = header;
            setMeasurementLabels({ ...labels });
            setCSV(body);
            setRelativePowers(
              Object.fromEntries(
                new Array(header.length - 1).fill("1").entries()
              )
            );
          }
        }
      });
    }
  };

  useEffect(() => {
    if (csv.length > 0) {
      const sampleCount = csv[0].length - 1;

      if (absoluteOrRelative === "absolute") {
        setRows(scaleSamples(csv, areaScale, powerScale));
      } else {
        const powers = Object.fromEntries(
          Object.entries(relativePowers)
            .map(([k, v]) => [k, parseFloat(v)])
            .filter(([, v]) => !Number.isNaN(v))
        );

        setRows(relativeToAbsolute(csv, sampleCount, powers));
      }

      setSampleCount(sampleCount);
    } else {
      setRows([]);
      setSampleCount(0);
    }
  }, [
    setRows,
    setSampleCount,
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
            <form className="form-inline">
              <p>
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
  setRadianceOrIrradiance: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
  setSampleCount: PropTypes.func.isRequired,
  setMeasurementLabels: PropTypes.func.isRequired,
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
        <option value="1000000">µW</option>
        <option value="1000">mW</option>
        <option value="1">W</option>
      </select>
      {" per "}
      <select
        value={areaScale}
        onChange={handleAreaScale}
        className="form-control form-control-sm"
      >
        <option value="1000000">mm²</option>
        <option value="10000">cm²</option>
        <option value="1">m²</option>
      </select>
      {radianceOrIrradiance === "radiance" && " per sr"}.
    </>
  );
};

AbsoluteUnits.propTypes = {
  radianceOrIrradiance: PropTypes.oneOf(["radiance", "irradiance"]).isRequired,
  handleRadianceOrIrradiance: PropTypes.func.isRequired,
  powerScale: PropTypes.number.isRequired,
  handlePowerScale: PropTypes.func.isRequired,
  areaScale: PropTypes.number.isRequired,
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

  const units = radianceOrIrradiance === "radiance" ? "[cd/m²]" : "[lux]";

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
  return (
    <>
      {" "}
      for <span className="font-italic">{title}</span> at{" "}
      <input
        type="number"
        className="form-control form-control-sm"
        onChange={onChange}
        value={value}
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

import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Results from "./Results";
import UploadForm from "./UploadForm";

const Intro = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <h1 className="my-5">Reporting Light Exposure</h1>

        <p className="lead mb-5">
          Use this tool to meet the{" "}
          <a href="https://doi.org/10.3390/clockssleep1030024">
            minimum reporting guidelines
          </a>{" "}
          for reporting the stimulus conditions involving light as an
          intervention in chronobiology, sleep research and environmental
          psychology experiments.
        </p>

        <p>The minimum reporting guidelines are:</p>

        <ul>
          <li>
            Measure and report the spectral power distribution of the acute
            stimulus from the observer’s point of view at a known and specified
            angle and distance from the source
          </li>
          <li>
            Measure and report the spectral power distribution of the background
            light environment from the observer’s point of view at a known and
            specified angle and distance from the source
          </li>
          <li>Make spectra available in tabulated form</li>
          <li>Report α-opic (ir)radiances and illuminance</li>
          <li>
            Describe the timing properties of stimulus (clock time, duration and
            pattern)
          </li>
          <li>
            Describe the spatial properties of stimulus (spatial arrangement and
            extent)
          </li>
          <li>Report measurement conditions and equipment</li>
        </ul>

        <p className="my-5">
          You’ll need a CSV file containing the spectral power distribution of
          the acute stimulus and background light environment from the
          observer’s point of view.
        </p>

        <p>
          <Link to="/generate-csv" className="btn btn-primary">
            Start now
          </Link>
        </p>
      </div>
    </div>
  );
};

const GenerateCSV = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <h1 className="my-5">Reporting Light Exposure</h1>

        <p className="lead my-5">
          Generate a CSV file containing the spectral power distribution of all
          of the measurements taken during the experiment.
        </p>

        <h2 className="mb-3">Specification</h2>

        <p className="mb-3">
          The first field contains the wavelength in nanometers. The subsequent
          fields contain the spectral (ir)radiance for each of the measurements
          taken during the experiment:
        </p>

        <table className="table mb-5">
          <thead>
            <tr>
              <th>Field</th>
              <th>Required?</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Yes</td>
              <td>Wavelength in nanometers</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Yes</td>
              <td>
                First measurement spectral (ir)radiance in µW/mW/W per
                mm²/cm²/m² (per sr)
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>No</td>
              <td>
                Second measurement spectral (ir)radiance in µW/mW/W per
                mm²/cm²/m² (per sr)
              </td>
            </tr>
            <tr>
              <td>N</td>
              <td>No</td>
              <td>
                Nth measurement spectral (ir)radiance in µW/mW/W per mm²/cm²/m²
                (per sr)
              </td>
            </tr>
          </tbody>
        </table>

        <h3>Example</h3>

        <pre>
          <code>
            {`Wavelength,Measurement 1,Measurement 2,Measurement n
380,0.00E+00,9.73E-05,0.00E+00 390,0.00E+00,1.67E-06,0.00E+00 ...
770,2.30E-06,3.46E-05,2.72E-06 780,8.15E-06,5.00E-05,6.12E-06`}
          </code>
        </pre>

        <ul>
          <li>
            <a download="sample.csv" href="/examples/sample.csv">
              Download example spectral power distribution
            </a>
          </li>
        </ul>

        <p className="my-5">
          <Link to="/upload" className="btn btn-primary">
            Next
          </Link>
        </p>
      </div>
    </div>
  );
};

const Upload = () => {
  const [radianceOrIrradiance, setRadianceOrIrradiance] = useState(
    "irradiance"
  );
  const [rows, setRows] = useState([]);
  const [sampleCount, setSampleCount] = useState(0);

  return (
    <>
      <div className="row">
        <div className="col">
          <h1 className="mt-5">Reporting Light Exposure</h1>
        </div>
      </div>
      <UploadForm
        radianceOrIrradiance={radianceOrIrradiance}
        setRadianceOrIrradiance={setRadianceOrIrradiance}
        setRows={setRows}
        setSampleCount={setSampleCount}
      />
      <Results
        rows={rows}
        sampleCount={sampleCount}
        radianceOrIrradiance={radianceOrIrradiance}
      />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/upload">
          <Upload />
        </Route>
        <Route path="/generate-csv">
          <GenerateCSV />
        </Route>
        <Route path="/">
          <Intro />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

import React from "react";
import { Link } from "react-router-dom";

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

export default Intro;

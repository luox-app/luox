import React from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <h1 className="my-5">luox: Home</h1>

        <p className="lead mb-5">
          Use this tool to meet the{" "}
          <a href="https://doi.org/10.3390/clockssleep1030024">
            minimum reporting guidelines
          </a>{" "}
          for reporting the stimulus conditions involving light as an
          intervention in chronobiology, sleep research and environmental
          psychology experiments.
        </p>

        <p className="my-5">
          For more information about purpose, calculated quantities, and key
          references, please see{" "}
          <a href="/about" title="About page">
            the About page
          </a>
          .
        </p>

        <p className="my-5">
          You’ll need a CSV file containing the spectral power distribution of
          the acute stimulus and background light environment from the
          observer’s point of view.
        </p>

        <p>
          <Link to="/format-info" className="btn btn-primary">
            Start now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Intro;

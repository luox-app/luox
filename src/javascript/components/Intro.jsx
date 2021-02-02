import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import WellcomeLogo from "../../images/wellcome-logo.png";
import SllLogo from "../../images/society-of-light-and-lighting-logo.png";
import UooLogo from "../../images/university-of-oxford-logo.svg";

const Intro = () => {
  useEffect(() => {
    document.title = "luox: Home";
  });

  return (
    <>
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
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <h1 className="my-5">Funding</h1>
          </div>
          <div className="row">
            <div className="col">
              <a href="http://www.wellcome.ac.uk/">
                <img
                  src={WellcomeLogo}
                  width="100%"
                  alt="Wellcome Trust logo"
                />
              </a>
              <p className="text-center">
                Wellcome Trust (204686/Z/16/Z, 204686/Z/16/C)
              </p>
            </div>
            <div className="col">
              <a href="https://www.cibse.org/society-of-light-and-lighting">
                <img
                  src={SllLogo}
                  width="100%"
                  alt="Society of Light & Lighting logo"
                />
              </a>
              <p className="text-center">
                Society of Light & Lighting (2020 Jean Heap Bursary)
              </p>
            </div>
            <div className="col">
              <a href="https://www.ox.ac.uk/">
                <img
                  src={UooLogo}
                  width="100%"
                  style={{ backgroundColor: "#002147" }}
                  alt="University of Oxford logo"
                />
              </a>
              <p className="text-center">
                University of Oxford van Houten Fund (VH-148)
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;

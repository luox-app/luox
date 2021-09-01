import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import WellcomeLogo from "../../images/wellcome-logo.png";
import SllLogo from "../../images/society-of-light-and-lighting-logo.png";
import UooLogo from "../../images/university-of-oxford-logo.svg";
import CieLogo from "../../images/cie-logo.jpg";
import IesLogo from "../../images/illuminating-engineering-society-logo.png";

const Intro = () => {
  useEffect(() => {
    document.title = "luox: Home";
  });

  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mt-5 mb-4">Home</h1>

          <p className="lead mb-4">
            Use this tool to meet the{" "}
            <a href="https://doi.org/10.3390/clockssleep1030024">
              minimum reporting guidelines
            </a>{" "}
            for reporting the stimulus conditions involving light as an
            intervention in chronobiology, sleep research and environmental
            psychology experiments.
          </p>

          <p className="my-4">
            For more information about purpose, calculated quantities, and key
            references, please see{" "}
            <a href="/about" title="About page">
              the About page
            </a>
            .
          </p>

          <p className="my-4">
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
          <h3 className="my-4">Help us improve luox</h3>
          <p>
            We would like to hear from you to improve the luox platform.
            Completing this survey takes only around 6 minutes.
          </p>
          <a href="https://forms.office.com/r/kSp3fHCBJF">
            <button type="button" className="btn btn-secondary">
              Complete the survey
            </button>
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <h3 className="my-4">Funding</h3>
          <div className="row">
            <div className="col">
              <a href="http://www.wellcome.ac.uk/">
                <img
                  src={WellcomeLogo}
                  width="30%"
                  className="mx-auto d-block"
                  alt="Wellcome Trust logo"
                />
              </a>
              <p style={{ fontSize: "75%" }} className="text-center">
                Wellcome Trust (204686/Z/16/Z, 204686/Z/16/C)
              </p>
            </div>
            <div className="col">
              <a href="https://www.cibse.org/society-of-light-and-lighting">
                <img
                  src={SllLogo}
                  width="30%"
                  className="mx-auto d-block"
                  alt="Society of Light & Lighting logo"
                />
              </a>
              <p style={{ fontSize: "75%" }} className="text-center">
                Society of Light & Lighting (2020 Jean Heap Bursary)
              </p>
            </div>
            <div className="col">
              <a href="https://www.ox.ac.uk/">
                <img
                  src={UooLogo}
                  width="30%"
                  style={{ backgroundColor: "#002147" }}
                  className="mx-auto d-block"
                  alt="University of Oxford logo"
                />
              </a>
              <p style={{ fontSize: "75%" }} className="text-center">
                University of Oxford van Houten Fund (VH-148)
              </p>
            </div>
            <div className="col">
              <a href="https://www.ies.org/">
                <img
                  src={IesLogo}
                  width="60%"
                  className="mx-auto d-block"
                  alt="Illuminating Engineering Society logo"
                />
              </a>
              <p style={{ fontSize: "75%" }} className="text-center">
                Illuminating Engineering Society
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <h3 className="my-4">Validation</h3>
          <p>
            This software incorporates methods, formulae, spectral function
            calculations and spectra from the International Commission on
            Illumination (CIE). The CIE endorses this software having made a
            black-box evaluation of the software as of Feb. 11, 2021, finding
            that the software performs satisfactorily. This software is not a
            replacement for the CIE publications and works from which it is
            derived. The user is advised to consult the original publications
            and works for proper understanding of and calculation of the result
            of this software.
          </p>
          <p>
            <a href="http://cie.co.at/">
              <img src={CieLogo} width="30%" alt="CIE logo" />
            </a>
          </p>
          <p>
            This software loads SPDX files according to TM-27-20.
          </p>
          <p>
            <a href="http://www.ies.org/">
              <img src={IesLogo} width="30%" alt="Illuminating Engineering Society logo" />
            </a>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <p className="my-4">
            This site is powered by{" "}
            <a href="https://www.netlify.com/" title="Netlify">
              Netlify
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Intro;

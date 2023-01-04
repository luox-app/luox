import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import WellcomeLogo from "../../images/wellcome-logo.png";
import luoxLogo from "../../images/logo.svg";
import SllLogo from "../../images/society-of-light-and-lighting-logo.png";
import UooLogo from "../../images/university-of-oxford-logo.svg";
import CieLogo from "../../images/cie-logo.jpg";
import IesLogo from "../../images/illuminating-engineering-society-logo.png";
import NRCLogo from "../../images/nrc-signature-e-kr.jpg";

const Intro = () => {
  useEffect(() => {
    document.title = "luox: Home";
  });

  return (
    <>
      <div className="row mt-5">
        <div className="col-12">
          <p>
            {" "}
            <a href="http://luox.app/">
              <img src={luoxLogo} width="20%" alt="luox logo" />
            </a>
          </p>

          <p className="lead mb-4">
            luox is a free-to-use and open-source tool for calculating light-
            and lighting-related quantities directly in the browser. The tool
            was inspired by the development of{" "}
            <a href="https://doi.org/10.3390/clockssleep1030024">
              minimum reporting guidelines
            </a>{" "}
            for reporting the stimulus conditions involving light as an
            intervention in chronobiology, sleep research and environmental
            psychology experiments.
          </p>

          <p className="my-4">
            For further information about purpose, calculated quantities, and
            key references, please see{" "}
            <a href="/about" title="About page">
              the About page
            </a>
            .
          </p>

          <p className="my-4">
            You will need a CSV (comma-separated) or SPDX (following ANSI/IES
            TM-27-20) file containing the spectral radiance or irradiance
            distribution. luox is operated by the joint research group
            Chronobiology & Health at the Technical University of Munich and
            Translational Sensory and Circadian Neuroscience at the Max Planck
            Institute for Biological Cybernetics (Prof. Dr. Manuel Spitschan).
          </p>

          <p>
            <Link to="/format-info" className="btn btn-primary">
              Start now
            </Link>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h3 className="my-4">Funding & Support</h3>
          <div className="row">
            <div className="col-3">
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
            <div className="col-3">
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
            <div className="col-3">
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
            <div className="col-3">
              <a href="https://www.ies.org/">
                <img
                  src={IesLogo}
                  width="100%"
                  className="mx-auto d-block"
                  alt="Illuminating Engineering Society logo"
                />
              </a>
              <p style={{ fontSize: "75%" }} className="text-center">
                Illuminating Engineering Society
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
              <div className="col-6">
                <a href="https://nrc.canada.ca/en">
                  <img
                    src={NRCLogo}
                    width="100%"
                    className="img-fluid nrclogo"
                    alt="National Research Council of Canada logo"
                  />
                </a>
                <p style={{ fontSize: "75%" }} className="text-center">
                  National Research Council of Canada
                </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h3 className="my-4">Validation</h3>
          <p>
            This software incorporates methods, formulae, spectral function
            calculations and spectra from the International Commission on
            Illumination (CIE). The CIE endorses this software having made a
            black-box evaluation of the software as of Feb. 11, 2021, finding
            that the software performs satisfactorily to calculate quantities
            and indices derived from CIE publications. This software is not a
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
            This software has been validated to load SPDX files according to
            TM-27-20. This software offers optional calculation of indices from
            IES TM-30-20. These optional calculations have not been validated.
          </p>
          <p>
            <a href="http://www.ies.org/">
              <img src={IesLogo} width="30%" alt="IES logo" />
            </a>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
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

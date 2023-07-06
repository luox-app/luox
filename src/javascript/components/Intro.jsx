import React, { useEffect } from "react";
import WellcomeLogo from "../../images/wellcome-logo.png";
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
      <section
        id="hero"
        className="d-flex justify-cntent-center align-items-center"
      >
        <div
          id="heroCarousel"
          className="container carousel carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          <div className="carousel-item active">
            <div className="carousel-container">
              <h2 className="animate__animated animate__fadeInDown">
                Welcome to <span>luox</span>
              </h2>
              <p className="animate__animated animate__fadeInUp">
                luox is a free-to-use and open-source tool for calculating
                light- and lighting-related quantities directly in the browser.
                The tool was inspired by the development of{" "}
                <a href="https://doi.org/10.3390/clockssleep1030024">
                  minimum reporting guidelines
                </a>{" "}
                for reporting the stimulus conditions involving light as an
                intervention in chronobiology, sleep research and environmental
                psychology experiments.
              </p>
              <p className="animate__animated animate__fadeInUp">
                For further information about purpose, calculated quantities,
                and key references, please see{" "}
                <a href="/about" title="About page">
                  the About page
                </a>
                .
              </p>

              <p className="animate__animated animate__fadeInUp">
                You will need a CSV (comma-separated) or SPDX (following
                ANSI/IES TM-27-20) file containing the spectral radiance or
                irradiance distribution. luox is operated by the joint research
                group Chronobiology & Health at the Technical University of
                Munich and Translational Sensory and Circadian Neuroscience at
                the Max Planck Institute for Biological Cybernetics (Prof. Dr.
                Manuel Spitschan).
              </p>
              <a
                href="/format-info"
                className="btn-get-started animate__animated animate__fadeInUp"
              >
                Start Now
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="row mt-5">
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
      </div> */}
      <main>
        <section className="portfolio">
          <div className="container">
            <div className="section-title">
              <h2>Funding & Support</h2>
            </div>

            <div
              className="row portfolio-container  justify-content-center"
              data-aos="fade-up"
              data-aos-easing="ease-in-out"
              data-aos-duration="500"
            >
              {/* <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 portfolio-wrap filter-card ">
                <div className="portfolio-item">
                  <a href="http://www.wellcome.ac.uk/">
                    <img
                      src={WellcomeLogo}
                      alt="Wellcome Trust logo"
                      width="100%"
                      height="100%"
                    />
                    <div className="portfolio-info">
                      <h3>Wellcome Trust (204686/Z/16/Z, 204686/Z/16/C)</h3>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 portfolio-wrap filter-card">
                <div className="portfolio-item">
                  <a href="https://www.cibse.org/society-of-light-and-lighting">
                    <img
                      src={SllLogo}
                      alt="Society of Light & Lighting logo"
                      width="100%"
                      height="100%"
                    />
                    <div className="portfolio-info">
                      <h3>
                        Society of Light & Lighting (2020 Jean Heap Bursary)
                      </h3>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 portfolio-wrap filter-card">
                <div className="portfolio-item ">
                  <a href="https://www.ox.ac.uk/">
                    <img
                      src={UooLogo}
                      alt="University of Oxford logo"
                      width="100%"
                    />
                    <div className="portfolio-info">
                      <h3>University of Oxford van Houten Fund (VH-148)</h3>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 portfolio-wrap filter-card">
                <div className="portfolio-item py-30 px-4">
                  <a href="https://www.ies.org/">
                    <img
                      src={IesLogo}
                      alt="Illuminating Engineering Society logo"
                      width="100%"
                    />
                    <div className="portfolio-info">
                      <h3>Illuminating Engineering Society</h3>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-lg-6 offset-3 portfolio-wrap filter-card">
                <div className="portfolio-item  py-30 px-4">
                  <a href="https://nrc.canada.ca/en">
                    <img
                      src={NRCLogo}
                      className="img-fluid"
                      alt="National Research Council of Canada logo"
                      width="100%"
                    />
                    <div className="portfolio-info">
                      <h3>National Research Council of Canada</h3>
                    </div>
                  </a>
                </div>
              </div> */}
              <div className="col-md-3 col-sm-6 col-xs-12 portfolio-wrap filter-card">
                <div className="portfolio-item">
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
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12 portfolio-wrap filter-card">
                <div className="portfolio-item">
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
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12 portfolio-wrap filter-card">
                <div className="portfolio-item">
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
              </div>
              <div className="col-md-3 col-sm-6 col-xs-12 portfolio-wrap filter-card">
                <div className="portfolio-item">
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
              <div className="col-md-6 offset-md-3 col-xs-12 offset-xs-0 portfolio-wrap filter-card">
                <div className="portfolio-item">
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
        </section>
        <section className="features">
          <div className="container">
            <div className="section-title">
              <h2>Validation</h2>
            </div>

            <div className="row" data-aos="fade-up">
              <div className="col-md-2">
                <a href="http://cie.co.at/">
                  <img src={CieLogo} width="100%" alt="CIE logo" />
                </a>
              </div>
              <div className="col-md-10 pt-4">
                <p className="fst-italic">
                  This software incorporates methods, formulae, spectral
                  function calculations and spectra from the International
                  Commission on Illumination (CIE). The CIE endorses this
                  software having made a black-box evaluation of the software as
                  of Feb. 11, 2021, finding that the software performs
                  satisfactorily to calculate quantities and indices derived
                  from CIE publications. This software is not a replacement for
                  the CIE publications and works from which it is derived. The
                  user is advised to consult the original publications and works
                  for proper understanding of and calculation of the result of
                  this software.
                </p>
              </div>
            </div>

            <div className="row" data-aos="fade-up">
              <div className="col-md-3 order-1 order-md-2">
                <a href="http://www.ies.org/">
                  <img src={IesLogo} width="100%" alt="IES logo" />
                </a>
              </div>
              <div className="col-md-9 pt-4 order-2 order-md-1">
                <p className="fst-italic">
                  This software has been validated to load SPDX files according
                  to TM-27-20. This software offers optional calculation of
                  indices from IES TM-30-20. These optional calculations have
                  not been validated.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* <div className="row">
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
      </div> */}
      {/* <div className="row">
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
      </div> */}
    </>
  );
};

export default Intro;
